# Fundamental Baptist Church · San Isidro

[![README views](https://hits.sh/github.com/gbgabiola/fbcsi.svg?label=README%20views&color=552146&labelColor=32142e)](https://hits.sh/github.com/gbgabiola/fbcsi/)

Church website built with Next.js, TypeScript, and Supabase. Vercel hosts the site at [fbcsi.vercel.app](https://fbcsi.vercel.app/).

## Development

Use Node.js 24.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Public pages work without authentication configuration.

## Administrator setup

The website supports one administrator through Supabase email-code authentication.

1. Apply the migrations in supabase/migrations/ to the intended Supabase project.
2. Disable public sign-ups and anonymous sign-ins. Create one confirmed administrator account.
3. Assign its Auth user ID using the Supabase SQL Editor.

   ```sql
   insert into public.site_admin (user_id)
   values ('replace-with-admin-uuid'::uuid);
   ```

4. Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in .env.local or the deployment environment.
5. Configure SMTP and include {{ .Token }} in the Magic Link email template.
6. For CAPTCHA, set TURNSTILE_SITE_KEY in the application, authorize the deployed hostname in Turnstile, and enable Turnstile in Supabase Auth with the matching secret key.
7. Test /sign-in, administrator access, and sign-out.

Keep credentials out of Git. The Turnstile secret belongs in Supabase Auth configuration.

Church content currently lives in app/page.tsx, app/bible-guide.tsx, app/church-updates.tsx, and lib/church.ts. The [administrator content plan](docs/admin-content-plan.md) describes the proposed editor.

## Checks and deployment

```sh
npm run typecheck
npm run build
npm test
```

Vercel imports gbgabiola/fbcsi. Main deploys to production and pull requests receive previews. The build settings in vercel.json run all checks. Set SITE_URL to the production HTTPS address and configure the authentication variables above. Verify real email-code sign-in after deployment.

## Contributions and releases

Create a short-lived branch from an up-to-date main. Use focused commits and a pull request. Merge after CI passes, verify deployment, and delete the merged local and remote branches.

Use Semantic Versioning in package.json. Prepare version changes with npm version patch --no-git-tag-version on a release branch, then commit the package files and merge through a pull request. Use minor for new features and major for incompatible changes.

After merging, pull main and create an annotated tag matching the package version, such as v1.0.1. Push that tag to trigger the Release workflow. It validates the version and source commit, runs checks, and publishes GitHub release notes. Confirm the corresponding production deployment separately. Roll back through Vercel by promoting a known-good deployment.

## License

[MIT](LICENSE) · Copyright (c) 2026 gbgabiola.
