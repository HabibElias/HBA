# Design Specification: Admin Overview Redesign & Quick Actions

| | |
|---|---|
| **Date** | 2026-10-23 |
| **Status** | Approved by User |
| **Surface** | Admin Overview Dashboard (`/admin`) |
| **Mode** | Operate (Task completion, high scanability, dense utility, respectful church branding) |
| **Design Basis** | `DESIGN.md`, `impeccable/operate.md`, `impeccable/craft-floor.md` |

---

## 1. Executive Summary

This specification outlines the redesign of the Church Management Platform's Admin Overview page (`app/admin/(workspace)/page.tsx`). The goal is to transform the overview from a passive, text-heavy collection list into an actionable, high-utility operational dashboard. 

The redesigned page features:
1. **Permission-Aware Quick Actions Grid**: High-visibility 1-click creation shortcuts for all key content domains (Events, Sermons, Weekly Gatherings, Leadership Profiles, Past Program Recaps, and Media Library uploads), eliminating nested menus and scattered buttons.
2. **Operational Health & Pulse Indicators**: High-signal summary metrics (Live content, Pending drafts, Media assets, Upcoming gatherings) giving editors and administrators immediate awareness of church communications status.
3. **Restructured Two-Column Work Hub**:
   - **Content Hub**: Organized collection management cards with live published/draft tallies, last updated cues, and quick access to browse and manage.
   - **Review & Drafts Stream**: Priority queue of drafts and pending changes waiting for review, with clear status indicators and one-click resumption.
4. **Recent Activity Feed**: Chronological audit trail of staff actions (content changes, publishing, access updates).

---

## 2. Adherence to `DESIGN.md` & Impeccable Craft Floor

The implementation strictly honors the committed design system in `DESIGN.md` and the craft standards from `impeccable`:

### Colors & Proportions
- **Canvas**: Warm Paper (`#FAF9FE` / `var(--admin-bg)`).
- **Cards & Surfaces**: Clean White (`#FFFFFF`) with 1px Mist border (`#e7e4ee` / `var(--admin-line)`).
- **Primary Voice**: Summit Indigo (`#4C24B8` / `var(--admin-accent)`).
- **Ink & Typography**: Deep Ink (`#15103A` / `var(--admin-ink)`) for headings; Slate (`#5E597D` / `var(--admin-muted)`) for secondary copy.
- **Accents**: Radiance Gold (`#C8993A`) reserved strictly for subtle badges, stars, and micro-accents. No low-contrast gold text on light backgrounds.
- **Strictly Avoided (AI Slop Bans)**:
  - NO generic gradient text.
  - NO blurry glassmorphism / decorative backdrops.
  - NO hero-metric templates (no gigantic detached numbers with tiny floating labels).
  - NO generic icon-plus-heading same-size repetitive boxes.
  - NO colored thick accent borders (`border-left: 4px`).
  - NO emojis or unicode characters in place of authentic Lucide icon strokes.

### Typography & Geometry
- **Headings**: `font-display` (`'Fraunces', serif`, weight 600).
- **Controls & Body**: `font-sans` (`'Plus Jakarta Sans'`, weights 400, 500, 600).
- **Border Radii**:
  - Cards: `14px` (`border-radius: 14px`).
  - Quick action buttons / tiles: `10px`–`12px`.
  - Pill badges: `rounded-full` (`9999px`).

---

## 3. Page Structure & Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. Header & Pulse Metrics                                                  │
│   - Greeting: "Welcome back, [First Name]" + Role badge + Addis Ababa Date  │
│   - 4 Pulse Chips: Published Items · Pending Drafts · Photos · Upcoming     │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. Quick Actions                                                            │
│   - 6 Permission-Aware Creation Cards (Icon + Action Title + Micro-desc):   │
│     [+ Event]   [+ Sermon]   [+ Gathering]   [+ Leader]   [+ Recap]   [+ Upload]
├───────────────────────────────────────────────────────┬─────────────────────┤
│ 3. Content Hub (Left Col, ~62%)                       │ 4. Aside (~38%)     │
│   - Visual domain cards:                              │   - Ready for Review│
│     • Programs & Events (count, draft badge, link)    │     (Drafts queue)  │
│     • Sermons & Teaching (count, draft badge, link)   │   - Your Access     │
│     • Weekly Schedule (count, draft badge, link)      │     (Role scope &   │
│     • Pastoral Leadership (count, draft badge, link)  │      permissions)   │
│     • Past Gatherings Archive (count, photos count)   │                     │
│     • Church Details & Settings (status)              │                     │
├───────────────────────────────────────────────────────┴─────────────────────┤
│ 5. Recent Activity (Audit Log)                                              │
│   - Chronological list of recent content & access mutations (for audit.read)│
└─────────────────────────────────────────────────────────────────────────────┘
```

### Detailed Component Specifications

#### 1. Header & Pulse Metrics
- **Greeting**: `"Welcome back, " + staff.name.split(" ")[0]` in `Fraunces` 28px/32px.
- **Context Pill**: Displays the user's role (e.g. `Owner`, `Administrator`, `Editor`, `Viewer`) in a soft indigo tint badge, along with today's date formatted in East Africa Time (`Africa/Addis_Ababa`).
- **Pulse Metrics Bar**: Compact horizontal row displaying key numbers:
  - **Live Content**: Total items across all collections currently live.
  - **Needs Attention**: Total drafts and unreleased edits.
  - **Media Assets**: Total image assets in Cloudinary library.
  - **Upcoming Gatherings**: Scheduled events with dates >= today.

#### 2. Quick Actions Grid
A dedicated section titled **Quick Actions** with a clear secondary heading. Each card is an interactive link with:
- Solid background (`#FFFFFF`), 1px Mist border, hover state: Summit Indigo border + light tint background (`#f6f4fc`).
- Distinct Lucide icon inside an indigo-tint circular or rounded icon container.
- Action label: `New event`, `New sermon`, `New gathering`, `New profile`, `New recap`, `Upload photos`.
- Context subtitle: e.g., `"Announce assembly"`, `"Publish sermon audio & notes"`, `"Update gathering times"`, `"Pastoral team profile"`, `"Archive photos"`, `"Add to media library"`.
- **Permission gating**:
  - `New event` requires `events.write`
  - `New sermon` requires `sermons.write`
  - `New gathering` requires `schedules.write`
  - `New profile` requires `leaders.write`
  - `New recap` requires `recaps.write`
  - `Upload photos` requires `media.write`
  - If a staff member has fewer permissions (e.g. Viewer), the Quick Actions section gracefully hides or shows an educational empty card explaining their access level.

#### 3. Content Hub
A clean card grid or list representing the core collections:
- **Events**: Icon `CalendarDays`, published count, draft count, link to `/admin/content/events`.
- **Sermons**: Icon `BookOpen`, published count, draft count, link to `/admin/content/sermons`.
- **Weekly Schedule**: Icon `Clock`, gathering count, link to `/admin/content/schedules`.
- **Leadership**: Icon `Users`, pastor/director count, link to `/admin/content/leaders`.
- **Recaps & Archives**: Icon `Archive`, past event count, link to `/admin/content/recaps`.
- **Church Details**: Icon `Settings`, address/phone summary, link to `/admin/content/settings`.

#### 4. Ready for Review & Role Status
- **Review Queue**:
  - Lists up to 6 drafts or items where `version > publishedVersion`.
  - Displays status badge (`Draft` in amber/yellow tint or `Changes pending` in blue/indigo tint).
  - Shows collection name and item title.
  - Direct 1-click link to the editor `/admin/content/[kind]/[id]`.
  - Empty state when queue is empty: `"You're all caught up"` with `CheckCircle2` icon.
- **Your Access**:
  - Explains the user's role and capabilities clearly (Publishing rights, Drafting rights, or Read-only preview).
  - Link to `/admin/roles` to see detailed permission breakdowns.

#### 5. Recent Activity Timeline
- For staff with `audit.read` permission.
- Displays the last 6 actions from `auditLog` with actor name, detail description, and timestamp in EAT.
- Link to full activity log at `/admin/activity`.

---

## 4. Technical Architecture & Implementation

### Server Component (`app/admin/(workspace)/page.tsx`)
- Remains a React Server Component (RSC), fetching all data concurrently via `Promise.all`:
  1. Counts per collection from `content` grouped by `kind`.
  2. Total media asset count from `media` table.
  3. Pending review list (`publishedVersion is null or version > publishedVersion`) ordered by `updatedAt desc`.
  4. Upcoming events count (`kind = 'events'`).
  5. Audit log events (if `staff.permissions.includes("audit.read")`).
- Zero client bundle overhead for data fetching.

### Stylesheet (`app/admin/admin.css`)
- Clean, semantic CSS classes:
  - `.admin-pulse-bar`, `.admin-pulse-chip`
  - `.admin-quick-actions-grid`, `.admin-quick-action-card`
  - `.admin-content-hub-grid`, `.admin-content-hub-card`
  - Responsive media queries ensuring seamless layout on 1440px, 1024px, 768px, and 480px.

---

## 5. Verification Plan

1. **TypeScript Check**: `pnpm exec tsc --noEmit` ensures zero type errors across all routes.
2. **Automated Test Suites**:
   - `pnpm test:cms` (13 tests)
   - `pnpm test:media` (3 tests)
   - `tests/media-pagination.test.ts` (6 tests)
3. **Production Build**: `pnpm build` verifies successful compilation of all static and dynamic routes.
4. **Visual Inspection**: Verify visual hierarchy, contrast ratios, and responsive wrapping across mobile and desktop.
