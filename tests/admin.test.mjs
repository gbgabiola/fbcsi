import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { setTimeout } from "node:timers/promises";
import { test } from "node:test";
import { createServerClient } from "@supabase/ssr";

const require = createRequire(import.meta.url);
const userId = "00000000-0000-0000-0000-000000000001";
const user = { id: userId, aud: "authenticated", role: "authenticated", app_metadata: {}, user_metadata: {} };

async function listen(server) {
  server.listen(0, "127.0.0.1");
  await once(server, "listening");
  return server.address().port;
}

function jwtPart(value) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

async function sessionCookie(url) {
  const cookies = new Map();
  const client = createServerClient(url, "test-publishable-key", {
    cookies: {
      getAll: () => Array.from(cookies, ([name, value]) => ({ name, value })),
      setAll: (values) => values.forEach(({ name, value }) => cookies.set(name, value)),
    },
  });
  // The fixture verifies this symmetric token through Supabase Auth's /user endpoint.
  const header = jwtPart({ alg: "HS256", typ: "JWT" });
  const payload = jwtPart({ sub: userId, exp: Math.floor(Date.now() / 1000) + 3600, role: "authenticated" });
  const { error } = await client.auth.setSession({
    access_token: [header, payload, "dGVzdA"].join("."),
    refresh_token: "test-refresh-token",
  });
  assert.ifError(error);
  assert.ok(cookies.size > 0);
  return Array.from(cookies, ([name, value]) => name + "=" + value).join("; ");
}

test("protects the admin route and clears a session after access is revoked", { timeout: 30000 }, async (t) => {
  let assigned = false;
  let assignmentUnavailable = false;
  let assignmentRequests = 0;
  let logoutRequests = 0;
  const fixturePaths = [];
  const auth = createServer((request, response) => {
    const pathname = new URL(request.url, "http://localhost").pathname;
    fixturePaths.push(pathname);
    if (pathname === "/auth/v1/logout") {
      logoutRequests++;
      response.writeHead(204).end();
      return;
    }

    response.setHeader("Content-Type", "application/json");
    if (pathname === "/auth/v1/user") {
      response.end(JSON.stringify(user));
    } else if (pathname === "/rest/v1/site_admin") {
      assignmentRequests++;
      if (assignmentUnavailable) {
        response.writeHead(503).end(JSON.stringify({ message: "Fixture database unavailable" }));
      } else {
        response.end(JSON.stringify(assigned ? [{ user_id: userId }] : []));
      }
    } else {
      response.writeHead(404).end("{}");
    }
  });

  const authUrl = "http://127.0.0.1:" + await listen(auth);
  t.after(() => { auth.closeAllConnections(); auth.close(); });
  const portProbe = createServer();
  const port = await listen(portProbe);
  await new Promise((resolve) => portProbe.close(resolve));

  const origin = "http://127.0.0.1:" + port;
  const next = spawn(process.execPath, [
    require.resolve("next/dist/bin/next"), "start", "--hostname", "127.0.0.1", "--port", String(port),
  ], {
    env: {
      ...process.env,
      SUPABASE_URL: authUrl,
      SUPABASE_PUBLISHABLE_KEY: "test-publishable-key",
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  t.after(async () => {
    if (next.exitCode === null && next.signalCode === null) {
      next.kill();
      await once(next, "exit");
    }
  });
  let output = "";
  next.stdout.on("data", (chunk) => { output += chunk; });
  next.stderr.on("data", (chunk) => { output += chunk; });

  let ready = false;
  for (let attempt = 0; attempt < 50 && next.exitCode === null; attempt++) {
    const response = await fetch(origin).catch(() => null);
    if (response) {
      ready = response.ok;
      await response.body?.cancel();
      break;
    }
    await setTimeout(100);
  }
  assert.ok(ready, output);

  const get = (path, cookie) => fetch(origin + path, {
    redirect: "manual",
    headers: cookie ? { cookie } : {},
  });
  const expectSignInRedirect = async (cookie) => {
    const response = await get("/admin", cookie);
    assert.equal(response.status, 307);
    assert.equal(response.headers.get("Location"), "/sign-in");
    assert.match(response.headers.get("Cache-Control"), /no-store/);
    await response.body?.cancel();
  };

  await expectSignInRedirect();
  const cookie = await sessionCookie(authUrl);
  await expectSignInRedirect(cookie);
  const denied = await get("/sign-in", cookie);
  assert.ok((await denied.text()).includes(">Sign out</button>"), "Expected a sign-out form for the denied session. Fixture requests: " + fixturePaths.join(", ") + ". " + output);

  assigned = true;
  const admin = await get("/admin", cookie);
  assert.equal(admin.status, 200);
  const html = await admin.text();
  assert.match(html, /You are signed in as the site administrator/);
  const action = html.match(/name="(\$ACTION_ID_[^"]+)"/)?.[1];
  assert.ok(action, "Expected a sign-out server action in the form");

  assignmentUnavailable = true;
  const lookupsBeforeLogout = assignmentRequests;
  const form = new FormData();
  form.set(action, "");
  const logout = await fetch(origin + "/admin", {
    method: "POST",
    redirect: "manual",
    headers: { cookie, origin },
    body: form,
  });
  assert.equal(logout.status, 303);
  assert.equal(logout.headers.get("Location"), "/sign-in");
  assert.equal(logoutRequests, 1);
  assert.equal(assignmentRequests, lookupsBeforeLogout);
  assert.ok(logout.headers.getSetCookie().some((value) => /sb-.*auth-token=.*Max-Age=0/i.test(value)));
  await logout.body?.cancel();
});

