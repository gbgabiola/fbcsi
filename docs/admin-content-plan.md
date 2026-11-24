# Administrator-managed church content

## Objective

Let the sole registered administrator maintain the public church website through /admin. Keep the existing Supabase email-code sign-in, Turnstile protection, and single-row site_admin assignment. Visitors can read published content without signing in.

This document is an implementation plan. Content editing is not implemented yet.

## Content scope

| Admin section | Editable content |
| --- | --- |
| Church details | Name, village and street address, map URL, phone, email, and social URLs |
| Welcome | Heading, introduction, and invitation text |
| Gatherings | Day, gathering name, time or time awaiting confirmation, location, and display order |
| Beliefs and practices | Titles, descriptions, Scripture references, and display order |
| Bible guide | Introductions, book groups, reading suggestions, and translation information |
| Updates | Public Facebook post URLs and display order, using the existing embed component |
| Branding and search | Official logo, favicon, site title, and description |

Facebook updates initially use administrator-entered URLs. Automatic retrieval would require a separate Meta API integration and permission review. The production hostname, authentication settings, API credentials, and administrator assignment remain deployment or database configuration.

## Data and authorization

1. Add a singleton church_settings table for identity, contact details, welcome content, and search metadata. Use typed columns and database constraints.
2. Add ordered tables for gatherings, beliefs, practices, Bible guide entries, and Facebook post links. Keep Bible guide relationships explicit where needed, with foreign keys and cascading behavior chosen for each relationship.
3. Enable row-level security on every exposed table. Public SELECT policies allow only published content. Writes require auth.uid() to match the sole site_admin user_id. Keep assignment changes outside the content editor.
4. Give authenticated users only the privileges needed by these policies. Use the existing session-based server client and check administrator access in every mutation. Never expose a service-role key.
5. Track updated_at and a revision number. Reject saves against an outdated revision so two tabs cannot silently overwrite each other.
6. Seed the existing approved website content through a migration. Preserve stable identifiers, order, confirmed contact information, and missing-time states.

## Editing and publication

Use accessible forms with labels, field-level errors, save feedback, and an unsaved-change warning. Group forms by the existing website sections.

Start with direct publication per section. Validate the complete section on the server and save it in one transaction, with revision checking. Failed saves preserve the last published content. Show a preview of the proposed values before destructive removals. Offer draft workflows later only if the church needs them.

Validate phone and email fields, text lengths, schedule values, order, and HTTPS URLs. Allow only supported social and Facebook post hosts. Render plain text through React and use a restricted format for Scripture references. Avoid arbitrary HTML or scripts.

For logo and favicon uploads, use a dedicated Supabase Storage bucket with administrator-only writes. Restrict file size and raster formats, validate actual image content, and use generated filenames. Keep the original approved assets as migration defaults.

## Public rendering and reliability

Read content through shared server-side data functions. Cache public published content and invalidate affected pages after a successful save. Keep admin and authentication responses private and uncached.

Generate metadata, structured data, and the sitemap from the same published settings. Keep the deployment's SITE_URL as the canonical origin. A database outage must preserve a previously cached public version where available and produce clear admin feedback.

Use versioned SQL migrations, an export procedure, and a documented restore procedure. Confirm what backups the selected Supabase plan actually provides before relying on them.

## Delivery sequence

1. **Settings foundation** — schema, RLS, initial data, shared read functions, and church contact/settings forms.
2. **Schedules and welcome** — validated ordered gatherings and welcome editor, connected to public pages.
3. **Teaching content and updates** — beliefs, practices, Bible guide, and Facebook link management.
4. **Branding** — validated image uploads, metadata editing, and accessible previews.
5. **Production rollout** — migration rehearsal, authorization tests, cache invalidation checks, exports and restore verification, then a minor-version release.

Each phase uses a short-lived branch and pull request with focused commits. Review the Vercel preview, merge after CI passes, verify production, and delete the merged branch.

## Acceptance checks

- Signed-out users and authenticated users without the administrator assignment cannot read private editor state or modify content, including direct API requests.
- Public visitors receive only published content and public assets.
- Valid edits appear throughout the public page, footer, metadata, and structured data after publication.
- Invalid input, failed transactions, and concurrent saves preserve a consistent published version.
- Existing content survives migration with the same meaning, ordering, and references.
- Forms, uploads, and publication work on mobile and by keyboard.
- A real administrator can request a code, sign in, edit, publish, and sign out.
- Content can be exported and restored using the documented procedure.
