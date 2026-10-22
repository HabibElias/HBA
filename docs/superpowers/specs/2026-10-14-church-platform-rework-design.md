# Design Specification: Hiwot Birhan Summit Branch Website Rework

| | |
|---|---|
| **Date** | 2026-10-14 |
| **Status** | Approved by User |
| **Architecture** | Next.js App Router (Server-First Componentized Architecture) |
| **Design Framework** | Tailwind CSS v4, shadcn/ui, Google Fonts (Fraunces + Inter + Noto Ethiopic) |
| **Documentation Basis** | `docs/PRD-hiwot-birhan-summit-website.md`, `docs/BRAND-hiwot-birhan-summit.md`, `docs/DESIGN.md`, `nextjs-best-practices.md`, HTML mockups |

---

## 1. Executive Summary

This specification outlines the complete architectural overhaul and component-based refactor of the Hiwot Birhan Addis Ababa Summit branch web application. The rework migrates the current single-page legacy prototype (which suffered from broken links, static placeholders, and a monolithic 1,400-line global stylesheet) into a clean, modern, multi-page Next.js App Router application.

The new implementation strictly follows:
1. **Next.js Best Practices (`nextjs-best-practices.md`)**: React Server Components by default, minimal client boundaries pushed to interactive leaves, zero 1,000-line pages, Server Actions for form submissions, and `next/font` for web font optimization.
2. **Brand & Design Systems (`docs/BRAND-hiwot-birhan-summit.md`, `docs/DESIGN.md`)**: Summit Indigo (`#3A33A0`) primary identity, warm Paper (`#FAF9F6`) canvas, Deep Indigo (`#1B1763`) dark surfaces, Radiance Gold (`#C8993A`) delicate dividers, pill-shaped geometry, and bilingual support (English & Amharic).
3. **Faithful Visual Replication**: Clean componentization of all 4 HTML mockup screens (`Home`, `Our Story & Values`, `Programs & Past Archive`, `Visit & Contact`).

---

## 2. Information Architecture & Routing

The application adopts dedicated multi-page routes in the Next.js App Router:

```
app/
  layout.tsx              # Root Layout: HTML wrapper, font definitions, persistent Header & Footer
  globals.css             # Refactored Tailwind CSS v4 directives & design tokens
  page.tsx                # Route: / (Home Landing & Section Overview)
  about/
    page.tsx              # Route: /about (Our Story, Values, Faith & Leadership)
  programs/
    page.tsx              # Route: /programs (Upcoming Assemblies & Past Programs Archive)
  visit/
    page.tsx              # Route: /visit (Directions, Ethiopian Time Guide, Schedule & Contact)
  actions/
    contact.ts            # Server Action: Contact & Prayer Request processing
```

### Shared Shell Components (`components/navigation/`)
- **`HeaderNav`**: Sticky top navigation bar. Includes the primary logo lockup (Fraunces wordmark + Summit Indigo SVG icon), desktop navigation links (`Home`, `About`, `Programs & Events`, `Visit & Contact`), locale toggle, and primary CTA button ("Plan your visit").
- **`MobileNavDrawer`** (`"use client"`): Accessible off-canvas slide-out menu with all links, contact shortcuts, and language toggle.
- **`Footer`**: Deep Indigo container with gold accent top border, church logo mark, service schedule summary, navigation sitemap links, social/Telegram channels, and copyright statement.

---

## 3. Design Tokens & Styling System

All styles adhere to `docs/DESIGN.md` and `docs/BRAND-hiwot-birhan-summit.md`:

### Color Palette
- **`primary` (Summit Indigo)**: `#3A33A0` — Primary actions, active navigation states, headings, primary brand icon.
- **`primary-deep` (Deep Indigo)**: `#1B1763` — Footer background, hero gradient anchor, reversed dark cards.
- **`primary-soft` (Soft Indigo)**: `#6B64D6` — Hover interactions, secondary badges.
- **`accent` (Radiance Gold)**: `#C8993A` — 2px decorative divider lines and subtle highlights (never used as body text on light backgrounds).
- **`background` (Paper)**: `#FAF9F6` — Warm off-white canvas replacing stark white for natural warmth.
- **`surface` (White)**: `#FFFFFF` — Card surfaces, modal backgrounds, and form inputs.
- **`foreground` (Ink)**: `#14122B` — Primary body copy and dark headings.
- **`tint` (Mist)**: `#ECEBF8` — Resting borders (`1px solid #ECEBF8`) and alternating tinted section backgrounds.
- **`muted-foreground`**: `#5B5878` — Secondary helper labels and timestamps.

### Typography
- **Headings & Display**: `Fraunces` (Latin) paired with `Noto Serif Ethiopic` (Amharic).
- **Body & Interface**: `Inter` (Latin) paired with `Noto Sans Ethiopic` (Amharic).
- **Ethiopic Typesetting Rules**:
  - Line-height increased to 1.35x–1.7x for Amharic glyph legibility.
  - No faux italics on Amharic text; emphasis achieved via Summit Indigo color or semibold weight.

### Component Geometry
- **Buttons, badges, tags**: Pill radius (`rounded-full` / `999px`).
- **Cards, modals, inputs**: Soft radius (`rounded-2xl` / `16px`).
- **Elevation**: Clean border separation without heavy box shadows.

---

## 4. Page & Component Decomposition

Each page file is composed exclusively of modular, self-contained components under 150 lines:

### 4.1 Route `/` — Home Page (`app/page.tsx`)
1. **`HeroSection`**: Summit Indigo to Deep Indigo gradient backdrop, subtle logo watermark, gold accent rule, welcoming headline ("Come and worship with us"), supporting copy, and dual CTAs ("Plan your visit" / "Watch sermon").
2. **`ServiceSummary`**: Floating schedule cards (`-mt-6 z-20`) on Mist canvas detailing Sunday Morning Worship, Sunday Afternoon Service, and translation details.
3. **`AboutIntro`**: Welcome summary from pastoral team, quote callout, and button linking to `/about`.
4. **`MinistriesPreview`**: 4 cards highlighting Worship & Choir, Youth Ministry, Children's Awana, and Prayer & Care with meeting times.
5. **`FeaturedEvent`**: Deep Indigo showcase card for the next upcoming major assembly with date badge and registration trigger.
6. **`SermonPreview`**: Media card with latest message title, scripture reference, speaker, and link to message archive.
7. **`GalleryPreview`**: Responsive 4-image photo grid showing vibrant fellowship and worship moments.
8. **`VisitCta`**: Bottom banner inviting newcomers to explore schedule and transit directions on `/visit`.

### 4.2 Route `/about` — Our Story & Values (`app/about/page.tsx`)
1. **`StoryHero`**: Tint banner with Fraunces title and branch mission statement.
2. **`ScriptureBanner`**: Gold-bordered card featuring John 8:12 / Matthew 5:14.
3. **`FoundingTimeline`**: Chronological milestone tracker covering founding, fellowship growth, and the launch of the Summit branch.
4. **`ValuesPillars`**: 5 core pillars (Gospel-Centered, Warm Welcome, Discipleship & Family, Prayerful Dependence, Serving Our City).
5. **`FaithAccordion`**: Structured statement of faith (God, Scripture, Jesus Christ, Salvation, The Church).
6. **`LeadershipGrid`**: Circular portrait cards of pastors and ministry coordinators with roles and bio summaries.
7. **`AboutVisitCta`**: Warm prompt encouraging visitors to worship together this Sunday.

### 4.3 Route `/programs` — Programs & Past Archive (`app/programs/page.tsx`)
1. **`ProgramsHero`**: Programs banner and mission overview.
2. **`UpcomingSection`**: Cards for upcoming assemblies and youth camps with date badges and registration modals.
3. **`ArchiveFilterBar`** (`"use client"`): Category pills (All, Youth Camp, Awana, Conferences) and year filters (2024, 2023, 2022).
4. **`PastProgramsGrid`**: Retrospective program cards containing attendee stats, recap summaries, and photo previews.
5. **`ArchivalPhotoGrid`**: Photo album highlights with interactive lightbox viewer.
6. **`CommunityStoryCta`**: Form/invitation for members to submit memories and photos from past events.

### 4.4 Route `/visit` — Visit, Directions & Contact (`app/visit/page.tsx`)
1. **`VisitHero`**: "There is room for you here" newcomer greeting.
2. **`TimeExplainerCallout`**: Clear explanation of Ethiopian Local Time (ቀን / ማታ) vs East Africa Time (EAT) to eliminate schedule confusion.
3. **`WeeklyScheduleGrid`**: Comprehensive cards for Sunday Morning Worship, Thursday Prayer Night, Saturday Youth Fellowship, and Awana.
4. **`WhatToExpect`**: 5 guide cards (Arrival & Greeting, Sunday Service Flow, What to Wear, Children & Nursery, Language & Translations).
5. **`TransitDirections`**: Map integration, landmarks in Summit, and minibus/taxi routes from Megenagna and Bole.
6. **`ContactChannels`**: Tap-to-call phone numbers, email, official Telegram channel link, and office hours.
7. **`ContactFormSection`** (`"use client"`): Interactive shadcn form with Name, Contact, Inquiry Category, Message, and Prayer Request toggle.

---

## 5. Interactive Components & Server Actions

### shadcn/ui Component Catalog (`components/ui/`)
- **`Button`**: Pill-shaped with primary (Summit Indigo), secondary outline, and on-dark variants.
- **`Input` & `Textarea`**: 16px touch-friendly fields with Mist borders and Summit Indigo focus rings.
- **`Select`**: Accessible dropdown for inquiry category selection.
- **`Dialog`**: Accessible modal pop-up for event registration and high-resolution photo viewing (`Lightbox`).
- **`Badge`**: Pill tags for time formatting, status badges, and event categories.
- **`Tabs`**: Clean tab switchers for archive categories.

### Server Action: Form Submission (`app/actions/contact.ts`)
- **Validation**: Schema-checked using Zod.
- **State Handling**: Utilizes React 19 `useActionState` for seamless form submission without page refresh.
- **Feedback**: Instant inline success/error states ("Thank you. We received your message and will be in touch.").
- **Reliability**: Eliminates silent failures (addressing PRD requirement FR-V5).

### Bilingual Support (i18n)
- Persistent language switching (`en` and `am`).
- Structured message catalog (`messages/en.json`, `messages/am.json`) with typesafe accessors.
- Automatic document font swapping and line-height adaptation.

---

## 6. Verification & Quality Gates

1. **Build Integrity**: Zero TypeScript errors (`tsc --noEmit`), clean Next.js production build (`pnpm build`).
2. **File Size Compliance**: All page and component files kept under 150 lines.
3. **Visual Fidelity**: Verified against HTML mockups in `docs/screens/` across mobile (375px), tablet (768px), and desktop (1280px).
4. **Accessibility (WCAG AA)**: Contrast ratios >= 4.5:1 for body copy and 3:1 for UI elements.
