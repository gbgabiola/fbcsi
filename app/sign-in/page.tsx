import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { signOut } from "../admin/actions";
import { getAdminAccess } from "../../lib/supabase/admin";
import { createSupabaseClient } from "../../lib/supabase/server";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = { title: "Administrator sign-in", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function SignInPage({ searchParams }: {
  searchParams: Promise<{ status?: string | string[] }>;
}) {
  const supabase = await createSupabaseClient();
  const access = supabase ? await getAdminAccess(supabase) : "signed-out";
  const signOutFailed = (await searchParams).status === "sign-out-error";

  if (access === "granted" && !signOutFailed) redirect("/admin");

  return (
    <main id="main" className="wrap section">
      <div className="admin-panel">
        <h1>Administrator sign-in</h1>
        {signOutFailed && <p role="alert">You could not be signed out. Please try again.</p>}
        {access !== "signed-out" || signOutFailed ? (
          <form className="sign-out" action={signOut}>
            <button className="secondary-button" type="submit">Sign out</button>
          </form>
        ) : (
          <>
            <p>Use the email address assigned to the church website administrator.</p>
            {supabase ? <SignInForm siteKey={process.env.TURNSTILE_SITE_KEY} /> : <p>Administrator sign-in is currently unavailable.</p>}
          </>
        )}
      </div>
    </main>
  );
}
