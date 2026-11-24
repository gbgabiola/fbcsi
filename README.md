# Fundamental Baptist Church · San Isidro

[![README views](https://hits.sh/github.com/gbgabiola/fbcsi.svg?label=README%20views&color=552146&labelColor=32142e)](https://hits.sh/github.com/gbgabiola/fbcsi/)

Church website built with Next.js, TypeScript, and Supabase, deployed on [Vercel](https://fbcsi.vercel.app/). One administrator signs in using an email code.

## Development

Use Node.js 24.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000. Public pages work without authentication configuration.

## Configuration

Set SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in .env.local or Vercel. Set SITE_URL to the production HTTPS address.

Apply the migrations in supabase/migrations/. Disable public sign-ups and anonymous sign-ins in Supabase, create one confirmed administrator, and assign its Auth user ID to public.site_admin. Configure SMTP and include {{ .Token }} in the Magic Link email template.

For CAPTCHA, set TURNSTILE_SITE_KEY in the app and configure the matching secret in Supabase Auth. Authorize the deployed hostname in Turnstile. Keep credentials out of Git.

## Checks and deployment

```sh
npm run typecheck
npm run build
npm test
```

Vercel deploys main to production and creates pull request previews. The build settings in vercel.json run the checks. Verify administrator sign-in and sign-out after deployment.

## Git workflow and releases

Use short-lived branches and focused Conventional Commits, such as feat(admin), fix(auth), and docs(readme). Open a pull request into main and merge after CI passes using a merge commit to preserve individual commits. Delete the merged remote and local branches.

Use Semantic Versioning in package.json. Prepare version changes with npm version patch --no-git-tag-version on a release branch, then commit both package files and merge through a pull request. Use minor for features and major for incompatible changes.

Create an annotated vX.Y.Z tag matching the merged package version and push it to trigger the validated GitHub Release workflow. Confirm the corresponding Vercel production deployment separately.

## License

[MIT](LICENSE) · Copyright (c) 2026 gbgabiola.
