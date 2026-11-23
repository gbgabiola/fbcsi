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

### Vercel deployment

Use the gbgabiola Vercel Hobby account and connect the GitHub repository gbgabiola/fbcsi. The project uses Node.js 24 and the Next.js preset. The build command in vercel.json runs type checking, a production build, and the administrator integration test before the deployment can succeed.

1. Sign in to Vercel with GitHub, select Add New → Project, and import gbgabiola/fbcsi. If prompted, authorize the Vercel GitHub App for this repository.
2. Use the project name fbcsi and production branch main. Accept the repository's build settings.
3. Add SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY to the Production environment. Add TURNSTILE_SITE_KEY when Supabase CAPTCHA protection is enabled.
4. Set SITE_URL to the assigned production HTTPS address. When it is absent, the app uses Vercel's VERCEL_PROJECT_PRODUCTION_URL, with the existing Render address as a fallback for other hosts.
5. Deploy and confirm the assigned address under Settings → Domains. The address fbcsi.vercel.app depends on availability.
6. Authorize the final hostname in the existing Cloudflare Turnstile widget. Update the Supabase Authentication Site URL and any configured redirect URLs to the production address.
7. Verify the homepage, logo, favicon, sitemap, theme switch, email-code sign-in, administrator access, and sign-out. Check that administrator responses are private and uncached.
8. Pushes to main deploy to production. Pull requests receive preview deployments through the Vercel GitHub integration. Configure a separate Supabase test project for authenticated previews.
9. After the live checks pass, update Google Search Console and retire the Render deployment.

Production environment values belong in Vercel settings. Local credentials and the .vercel project link are ignored by Git.

### Versions and releases

The package.json version follows Semantic Versioning. Git tags use the same version with a v prefix. GitHub Releases record source milestones, while Vercel Deployments record the commits actually deployed.

The first recorded release is v1.0.0. From a clean, up-to-date main checkout, prepare the next release using:

```sh
git pull --ff-only
npm run typecheck
npm run build
npm test
npm version patch -m "Release %s"
git push origin main --follow-tags
```

Use npm version minor for added features and npm version major for incompatible changes. npm version updates package.json and package-lock.json, commits them, and creates an annotated tag.

The Release workflow runs on version tags. It verifies that the tag matches the stable package version and belongs to main, runs the checks, and publishes a GitHub Release with generated notes. A release is published only after those checks pass. Rerunning a successful workflow preserves its existing release.

The Vercel GitHub integration owns deployment. A GitHub Release does not by itself prove that a production deployment succeeded. Confirm the matching commit in Vercel Deployments before announcing a live version. To roll back the website, promote a previous known-good Vercel deployment, then fix main and publish a new patch version.

The integration test starts the production build with a local Supabase HTTP fixture. It checks signed-out and non-admin access, successful admin access, and session clearing when the assignment lookup is unavailable. It does not send email.

Keep Supabase Auth rate limits enabled. Where the host supports it, apply an additional per-client-IP limit to `POST /sign-in` at the edge. Check host logs for `Administrator sign-in code request failed` and verify a real code reaches the administrator, opens `/admin`, and signs out successfully.

### Optional bot protection for administrator sign-in

Supabase Auth rate limits apply regardless of hosting provider. To add a managed bot check, configure Cloudflare Turnstile:

1. Create a Turnstile widget in Cloudflare and authorize the final deployed hostname. Use a separate test widget for local development.
2. Add the widget's public site key as `TURNSTILE_SITE_KEY` in Vercel and redeploy. Check that the widget loads on `/sign-in`.
3. In Supabase Authentication, open **Bot and Abuse Protection**, enable CAPTCHA, choose **Turnstile**, and save the widget's secret in Supabase.
4. Verify a fresh code request, code entry, and sign-out in production. If activation fails, disable CAPTCHA in Supabase first, then remove `TURNSTILE_SITE_KEY` from Vercel and redeploy.

The public pages never load the widget. Supabase verifies the challenge tokens and keeps its rate limits enabled. Keep the Turnstile secret out of hosting environment variables, the repository, and client code.

## Content to confirm with the church

- The Friday outreach start time in San Jose.
- The congregation’s approved statement of faith and any affiliations it wants listed. The site presents general Baptist background with links to Bible and Baptist references.
