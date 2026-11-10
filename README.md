# Fundamental Baptist Church · San Isidro

Next.js App Router and TypeScript serve the public church site. Supabase provides managed email-code sign-in and PostgreSQL for the single administrator assignment.

## Local development

Use Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. The public homepage works without Supabase configuration. Edit the church content in `app/page.tsx` and the shared schedule in `lib/church.ts`. The official logo is `public/fbcsi-logo.jpg`. The 48px favicon in `app/icon.png` is derived from it.

## Configure the administrator

1. Choose a church-owned Supabase project. Enable email sign-in and disable public sign-ups and anonymous sign-ins.
2. Apply the SQL migration in `supabase/migrations/` using the project's migration workflow or SQL Editor.
3. Create one confirmed administrator account in Supabase Authentication. Copy its user ID and run the following in the SQL Editor with your administrator privileges.

   ```sql
   insert into public.site_admin (user_id)
   values ('replace-with-the-admin-auth-user-id'::uuid);
   ```

4. Copy `.env.example` to `.env.local` and set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY`. Existing `NEXT_PUBLIC_SUPABASE_*` values are accepted as fallbacks. The app uses the signed-in session and row-level security to verify the administrator assignment.
5. Include `{{ .Token }}` in the **Magic Link** email template so the administrator receives the full email code (6 to 10 digits, depending on the project settings). Configure production SMTP and open `/sign-in` to test signing in and out.

The database permits a single administrator assignment. To transfer access, update that row from the SQL Editor to the new confirmed account's user ID. The application checks the assignment on each protected request.

## Checks and deployment

```sh
npm run typecheck
npm run build
npm test
npm start
```

Deploy to a Next.js-capable Node.js host and set both Supabase environment variables there. Keep admin responses uncached at any reverse proxy.

For a no-cost deployment, use a Render **Free Web Service** with the repository's default branch. Set the build command to `npm ci && npm run build` and the start command to `npm start -- --hostname 0.0.0.0`. Use its included `.onrender.com` address and configure the Supabase environment variables in the service settings. The free service can take about a minute to wake after 15 minutes of inactivity.

The integration test starts the production build with a local Supabase HTTP fixture. It checks signed-out and non-admin access, successful admin access, and session clearing when the assignment lookup is unavailable. It does not send email.

Keep Supabase Auth rate limits enabled. Where the host supports it, apply an additional per-client-IP limit to `POST /sign-in` at the edge. Check host logs for `Administrator sign-in code request failed` and verify a real code reaches the administrator, opens `/admin`, and signs out successfully.

### Optional bot protection for administrator sign-in

Supabase Auth rate limits apply regardless of hosting provider. To add a managed bot check on Render Free, configure Cloudflare Turnstile:

1. Create a Turnstile widget in Cloudflare and authorize the deployed hostname `fbcsi.onrender.com`. Use a separate test widget for local development.
2. Add the widget's public site key as `TURNSTILE_SITE_KEY` in Render and redeploy. Check that the widget loads on `/sign-in`.
3. In Supabase Authentication, open **Bot and Abuse Protection**, enable CAPTCHA, choose **Turnstile**, and save the widget's secret in Supabase.
4. Verify a fresh code request, code entry, and sign-out in production. If activation fails, disable CAPTCHA in Supabase first, then remove `TURNSTILE_SITE_KEY` from Render and redeploy.

The public pages never load the widget. Supabase verifies the challenge tokens and keeps its rate limits enabled. Keep the Turnstile secret out of Render, the repository, and client code.

## Content to confirm with the church

- The Friday outreach start time in San Jose.
- The congregation’s approved statement of faith and any affiliations it wants listed. The site presents general Baptist background with links to Bible and Baptist references.
