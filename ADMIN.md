# Summit content workspace

The admin area is part of this Next.js application at `/admin`. It uses Better Auth for password sign-in and database sessions, Drizzle for database access and migrations, and `@libsql/client` for local SQLite or Turso Cloud. Public signup is disabled.

## First local run

```sh
pnpm install
npm run setup:local
npm run db:migrate
npm run db:seed
npm run admin:create
npm run dev
```

`setup:local` creates `data/` and an ignored `.env.local` with a random session secret. It never overwrites an existing environment file. The seed preserves existing records, roles, and permissions; it does not create users. `admin:create` asks for the first owner's name, email, and password in an interactive terminal. Password input is hidden, and no shared/default password exists. Run the same command from a trusted administrative terminal for owner recovery.

The current local database has already been migrated and seeded from the existing website. Run `npm run admin:create` to provision your own login. Existing church names, contacts, schedules, event descriptions, and leadership biographies were retained from the repository; the seed does not independently verify those facts.

## Turso Cloud

Create/select your Turso database and set these **server-only** variables in `.env.local` or the deployment environment:

```dotenv
TURSO_DATABASE_URL=libsql://your-database-your-account.turso.io
TURSO_AUTH_TOKEN=your-database-auth-token
BETTER_AUTH_URL=https://your-church-domain.example
BETTER_AUTH_SECRET=your-cryptographically-random-secret-at-least-32-characters
```

Keep the database token and auth secret out of source control and `NEXT_PUBLIC_*` variables. Set `BETTER_AUTH_URL` to the exact public origin. Apply `npm run db:migrate`, then seed once and create an owner against that configured database. Build with `npm run build` and run with `npm start`. Migrations are explicit release steps, not automatically executed during web requests. Local `file:` databases are intended for development or a persistent server disk; use Turso Cloud on an ephemeral/serverless host.

No Turso Cloud URL/token was available during implementation. Integration is implemented and verified against SQLite through the same libSQL driver; remote connectivity must be checked after configuring your database.

## What staff can manage

| Collection | Public use |
| --- | --- |
| Programs & events | Programs listing, individual gathering pages, home featured events, calendar downloads |
| Past gatherings | Searchable/filterable program archive, recaps, photo galleries, optional recording links |
| Sermons & teaching | Home page recent messages, scripture, speakers, optional recording links |
| Weekly schedule | Home gathering cards, Visit schedule and Sunday invitation, footer times |
| Leadership | About page pastoral profiles |
| Church details | Visit contact channels, contact email drafts, public address and footer contact links |
| Image library | Existing local photographs and uploaded event/recap images |

Home and About text, photographs, links, ministry descriptions, history, values, and faith statements are editable under **Pages**. Page composition and decorative artwork remain in code. Events, schedules, sermons, recaps, and leadership profiles remain in their dedicated content editors.

The editor provides English and Amharic fields, a draft preview, image selection, and display ordering. Start/end fields use East Africa Time; calendar downloads contain UTC dates. Events are sorted by start time and leave the upcoming list after their end time. A completed gathering's recap is authored separately, allowing staff to select appropriate photos and narrative.

To create an entry, choose **Create event**, **Create recap**, **Create sermon**, **Create gathering**, or **Create profile** on the overview or its content list. The new-entry editor offers **Create draft** and, for publishers, **Create & publish**. Editors can create drafts; Viewers cannot create entries. Church details is one shared record and is edited in place.

Admin buttons, inputs, labels, selects, checkboxes, language tabs, image selection, staff dialogs, and destructive confirmations use the reinstalled shadcn/ui Base components, adapted to the church color tokens. Dialogs support keyboard dismissal and focus management. Public contact fields and archive controls use the same input components. Matching church icon artwork is used in white on dark surfaces and indigo on light surfaces.

## Roles and enforcement

| Role | Default access |
| --- | --- |
| Owner | All content, publishing, staff, roles, and activity |
| Administrator | All content and publishing; staff with equal or lower access; activity |
| Editor | Draft events, recaps, sermons, schedules, and leadership; upload images |
| Viewer | Read and preview content; inspect the permissions matrix |

Owners can create custom roles and edit non-owner role permissions. The Owner role is immutable. Users cannot change their own role or disable their own account, and the server protects the last active owner. Staff management cannot assign or modify a more privileged role. Role grants are reloaded from the database on each authorized request; they are not trusted from client state or a cached session cookie.

Every protected page, Server Action, and media-management endpoint checks the session and permissions independently. Password changes are required before a provisioned staff account can enter the workspace. Access changes and temporary-password resets revoke existing sessions. Staff creation/reset does not send email: share the temporary password privately. An administrator can reset a staff password from **Staff access → Manage**. Better Auth hashes passwords and rate-limits sign-in attempts using database storage. Deploy behind a proxy that overwrites trusted client IP headers; do not expose a spoofable origin if relying on forwarded-IP throttling.

## Publishing and data safety

- Draft payloads and draft ordering are separate from published snapshots. Public components receive only published data, never draft payloads or staff details.
- Saves use revision checks so stale editors cannot silently overwrite newer changes. Publishing validates both languages, dates, links, and media paths on the server.
- Unpublishing removes an entry from public queries while retaining its draft. A published entry must be unpublished before deletion. Church details cannot be deleted or unpublished.
- Content and access changes write an activity record in the same transaction. Passwords and session tokens are not written to that log.
- React renders plain text; the editor does not accept executable HTML. Links are limited to HTTPS or local paths. Image selections are constrained to the site's image paths.

## Images

Uploads accept JPEG, PNG, or WebP up to 4 MB, decode with a pixel limit, strip metadata, resize to at most 1600×1600, and store WebP output up to 1 MB. SVG and document uploads are rejected. Upload requests require a permitted staff account and a matching origin. Images are public assets; the upload form explicitly warns against uploading private documents.

CMS uploads are validated and compressed by the authenticated Next.js media endpoint, then uploaded to Cloudinary using the configured unsigned preset. Turso stores only the image URL, Cloudinary public ID, dimensions, alt text, and attribution; new image bytes are never stored in the database. Image delivery uses Cloudinary URLs. Existing `/public` images stay local. Legacy `/api/media/:id` links redirect after `npm run media:migrate`; the migration replaces content references and clears transferred blobs. Video/audio remain links.

The `deel-assets` preset must allow unsigned image uploads. Limit allowed formats and sizes in Cloudinary as well: public unsigned presets can be called outside the app, even though the CMS upload endpoint enforces staff permissions. General Cloudinary asset deletion/administration requires API credentials, which are not used here. See [Cloudinary upload documentation](https://cloudinary.com/documentation/client_side_uploading).

## Verification and maintenance

```sh
npm run test:cms
npm run build
```

The tests use isolated in-memory SQLite and exercise draft/published separation (including ordering), direct permission denial, unsafe values, stale saves, owner protections, role escalation, session revocation, password reset, signup denial, sign-in, and audit records. Browser verification covers actual Server Action replay with a Viewer/anonymous session, mobile tables, editing/publishing, uploads, staff access, public filters, event details, and calendars. Browser fixtures are created only in a separate ignored test database.

Generate a migration with `npm run db:generate` after schema changes, review the SQL, and apply it with `npm run db:migrate`. Retain the committed migration history. Back up production data before destructive migrations and configure Turso recovery/retention appropriate to your deployment.

## Research informing the implementation

- [Turso: Drizzle integration](https://docs.turso.tech/sdk/ts/orm/drizzle) — libSQL client, environment configuration, and Drizzle integration.
- [Better Auth: Next.js](https://better-auth.com/docs/integrations/next) — route handler, server sessions, and client sign-in.
- [Better Auth: Drizzle adapter](https://better-auth.com/docs/adapters/drizzle) — SQLite adapter and schema management.
- [Better Auth: database concepts](https://better-auth.com/docs/concepts/database) — core tables, additional user fields, and session hooks.
- [Better Auth: rate limiting](https://better-auth.com/docs/concepts/rate-limit) — database-backed throttling and trusted proxy considerations.
- [shadcn/ui: Base dialog](https://ui.shadcn.com/docs/components/base/dialog) — accessible popup composition using Base UI.
- Installed Next.js documentation: `node_modules/next/dist/docs/01-app/02-guides/authentication.md` — authenticate and authorize near data access, including every Server Action and Route Handler.

## Vercel deployment with the configured cloud services

The supplied Turso database has been migrated and seeded. Current local content, roles, staff password hashes, and audit history were imported without copying active sessions. Your existing owner login remains valid. The local SQLite database is retained as a backup; an ignored copy of the previous environment is at `data/pre-cloud.env.local`.

Copy the six variable names from `.env.vercel.example` into Vercel's project environment settings. Use the private values from `.env.local` for `TURSO_AUTH_TOKEN` and `BETTER_AUTH_SECRET`. Set `BETTER_AUTH_URL` to your exact production HTTPS origin, not localhost. Keep the Cloudinary cloud name and preset exactly as shown. Set these variables before building; Next.js embeds `NEXT_PUBLIC_*` values at build time. Redeploy when they change.

The supplied `turso://` endpoint is configured with the equivalent `libsql://` scheme used by this project's verified @libsql/client/Drizzle connection. See [Turso's TypeScript reference](https://docs.turso.tech/sdk/ts/reference).

Use the Next.js preset and `npm run build` on Vercel. Do not run the local import or seed during every build. For later schema releases, run `npm run db:migrate` from a trusted terminal with the target cloud environment. `npm run db:seed` only fills missing default records. `npm run media:migrate` resumes any legacy image transfer. `npm run db:import-local` is a one-time, transaction-protected import requiring an empty migrated cloud database and a `SOURCE_DATABASE_URL=file:...` source.

Check the production homepage, admin login, image library, and one upload after deploying. New uploads use the Cloudinary CDN; the public image gallery is explicitly included in the server trace for library discovery on Vercel.
# Page editing

Open **Pages** in the admin sidebar, choose **Home** or **About**, and select a section. Home text, button links, ministry and community cards, gallery captions, and photographs are editable. About includes the hero, calling, timeline, values, statement of faith, leadership introduction, and visit invitation. Leadership profiles remain in Leadership. English and Amharic use the existing language tabs. Home hero photographs rotate every 6.5 seconds; the starred photograph appears first. Remove all hero photographs to use the purple background alone. The old `/admin/landing` URL redirects to `/admin/pages/home`.

Page changes use the existing **Church details** permissions and share that entry's draft, revision checks, and publication. Saving a draft does not change the public site; publishing applies saved Home, About, and church details together. The editor explains this shared publication scope.

The weekly carousel uses published **Weekly schedule** entries in display order. Its background uses the starred gathering photograph, or the first photograph; a gathering without photos keeps the original lilac card. Events and sermons continue to be managed in their existing admin sections. The selected local photos are bundled under `public/gallery/landing`.

## Managing library photographs

Staff with `media.write` can edit a photograph's library name and alt text or remove it from the library using its **Edit** and **Remove** buttons. Existing content retains its saved descriptions. Removal checks both drafts and published content and refuses to remove referenced photographs. The confirmation makes clear that removal is from the library and picker; the hosted Cloudinary file is retained. Metadata edits and removal are audited and reject stale edits. Viewers cannot invoke these mutations, including directly through server actions.

## Public-page caching

Public pages are prerendered and published database content is cached. Publishing and unpublishing invalidate public content immediately; saving drafts does not. Admin authentication and draft reads remain uncached. A returning visitor's browser may reuse its route data for up to 60 seconds; an already-open page does not update itself automatically. See [PERFORMANCE.md](PERFORMANCE.md) for cache lifetimes, deployment considerations, measurements, and repeatable tests. No database migration is needed for this optimization.
