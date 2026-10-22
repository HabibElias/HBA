---
name: Hiwot Birhan Addis Ababa Summit Branch
description: A calm, warm, reverent digital home for the Addis Ababa Summit branch. Light and life, shared with everyone.
colors:
  primary: "#4C24B8"
  primary-deep: "#2A136E"
  primary-soft: "#7652E4"
  accent: "#C8993A"
  neutral-bg: "#FAF9FE"
  neutral-surface: "#FFFFFF"
  neutral-fg: "#15103A"
  tint: "#EDEAFB"
  muted-fg: "#5E597D"
  destructive: "#DC2626"
  success: "#16A34A"
  warning: "#D97706"
  info: "#2563EB"
state:
  primary-hover: "color-mix(in srgb, {colors.primary} 88%, black)"
  primary-active: "color-mix(in srgb, {colors.primary} 78%, black)"
  primary-deep-hover: "color-mix(in srgb, {colors.primary-deep} 88%, white)"
  tint-hover: "color-mix(in srgb, {colors.tint} 92%, {colors.primary})"
  focus-ring: "2px solid {colors.primary}"
  focus-ring-dark: "2px solid #8F89EA"
  disabled-opacity: 0.4
dark:
  bg: "#15103A"
  surface: "#2A136E"
  tint: "#231F6E"
  fg: "#FAF9FE"
  muted-fg: "#B9B5E8"
  primary: "#8F89EA"
  border: "#231F6E"
  accent: "#C8993A"
spacing:
  unit: "0.5rem"
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "6": "1.5rem"
  "8": "2rem"
  "12": "3rem"
  "16": "4rem"
  "24": "6rem"
rounded:
  sm: "8px"
  md: "24px"
  control: "12px"
  pill: "9999px"
  full: "9999px"
surface:
  border-resting: "1px solid {colors.tint}"
  border-hover: "1px solid {colors.primary}"
  divider-gold: "2px solid {colors.accent}"
typography:
  display:
    fontFamily: "'Fraunces', 'Noto Serif Ethiopic', serif"
    fontWeight: 600
    usage: "Display, H1-H3, card titles, quotes, and the wordmark. Latin uses Fraunces; Amharic uses Noto Serif Ethiopic."
  body:
    fontFamily: "'Plus Jakarta Sans', 'Noto Sans Ethiopic', sans-serif"
    fontWeight: "400 500 600"
    usage: "Body copy, navigation, buttons, labels, forms, and tables. Latin uses Plus Jakarta Sans; Amharic uses Noto Sans Ethiopic."
typescale:
  display: { mobile: "2.25rem", desktop: "3.75rem", lineHeight: "1.1", lineHeightAmharic: "1.3", weight: 600 }
  h1: { mobile: "2rem", desktop: "3rem", lineHeight: "1.15", lineHeightAmharic: "1.35", weight: 600 }
  h2: { mobile: "1.625rem", desktop: "2.25rem", lineHeight: "1.2", lineHeightAmharic: "1.4", weight: 600 }
  h3: { mobile: "1.25rem", desktop: "1.5rem", lineHeight: "1.3", lineHeightAmharic: "1.45", weight: 600 }
  body: { mobile: "1rem", desktop: "1.125rem", lineHeight: "1.5", lineHeightAmharic: "1.7", weight: 400 }
  small: { size: "0.875rem", lineHeight: "1.5", lineHeightAmharic: "1.7", weight: 400 }
  button: { size: "0.9375rem", lineHeight: "1.2", weight: 600 }
breakpoints:
  sm: "640px"
  md: "768px"
  lg: "1024px"
  xl: "1280px"
  2xl: "1536px"
motion:
  fast: "100ms"
  base: "150ms"
  slow: "250ms"
  easing: "ease-out"
  reduced-motion: "respect prefers-reduced-motion: no transforms, opacity fades only"
border:
  width: "1px"
  color: "{colors.tint}"
logo:
  full-mark-min-width: "64px / 20mm"
  clear-space: "X = width of the cross arm, free on all four sides, measured from the outer ring"
  color-on-light: "{colors.primary}"
  color-on-dark: "#FFFFFF"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.pill}"
    border: "1px solid {colors.primary}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    border: "1px solid {colors.primary}"
  button-on-dark-primary:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.primary-deep}"
    rounded: "{rounded.pill}"
    border: "1px solid {colors.neutral-surface}"
  button-on-dark-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.neutral-surface}"
    rounded: "{rounded.pill}"
    border: "1px solid {colors.neutral-surface}"
  card:
    backgroundColor: "{colors.neutral-surface}"
    textColor: "{colors.neutral-fg}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.tint}"
  card-tint:
    backgroundColor: "{colors.tint}"
    textColor: "{colors.neutral-fg}"
    rounded: "{rounded.md}"
    border: "none"
---

# Design System: Hiwot Birhan Addis Ababa Summit Branch

## Overview

**Creative North Star: "Calm Warmth with a Single Indigo Line"**

Hiwot Birhan Addis Ababa Summit branch is a Christian family that gathers in Addis Ababa to worship God, hear His Word, and grow together in faith. *Hiwot* means life and *Birhan* means light. The interface embodies this identity: clear, open, reverent, and welcoming, never corporate or institutional.

Every visual decision traces directly back to the church mark:
- **One indigo voice:** Summit Indigo (`#4C24B8`) is the authentic color sampled from the church logo file. It carries primary navigation, active actions, and identity.
- **Soft, circular geometry:** Pill-shaped buttons (`rounded-full`) echo the circular mark. Cards and images use a comfortable 16px radius (`rounded-2xl`). Leader portraits are framed in clean circles.
- **Paper, not sterile white:** The default canvas is warm Paper (`#FAF9FE`), with pure white (`#FFFFFF`) reserved for cards and surfaces that gently lift off it.
- **Gold is a whisper:** Radiance Gold (`#C8993A`) appears only as subtle accent rules, icons, and highlights on light surfaces. It is **never** used as text on light backgrounds (WCAG 2.47:1 contrast failure). On dark indigo, it provides warm, legible emphasis. Total gold footprint remains under 5% of any view.
- **Tonal separation over heavy shadows:** Separation is achieved through clean background alternations (Paper vs. Mist vs. Deep Indigo) and 1px Mist borders, not artificial 20px black drop shadows or glassy blur blobs.
- **Bilingual by default:** Equal care is given to English and Amharic. Amharic receives generous line-height (~1.7 for body, ~1.35 for headings), authentic Ethiopic typefaces (`Noto Serif Ethiopic` & `Noto Sans Ethiopic`), and strictly **no artificial italics**.

### Proportion Rule
**60% Paper and White · 20% Summit Indigo · 10% Mist & Deep Indigo · ≤5% Radiance Gold.**

---

## Foundations

### Color Palette

| Token | Name | Hex | Role | Source |
|---|---|---|---|---|
| `primary` | Summit Indigo | `#4C24B8` | Primary buttons, active links, brand highlights, focus ring | Sampled from logo |
| `primary-deep` | Deep Indigo | `#2A136E` | Dark sections, hero canvas, footer, reversed-logo surfaces | Brand Guidelines |
| `primary-soft` | Soft Indigo | `#7652E4` | Hover states, secondary accents, large display subtitles | Brand Guidelines |
| `accent` | Radiance Gold | `#C8993A` | Thin divider rules, icons, highlights on light; text only on dark | Brand Guidelines |
| `neutral-bg` | Paper | `#FAF9FE` | Default page background (warm luminous off-white) | Brand Guidelines |
| `neutral-surface`| White | `#FFFFFF` | Cards, input fields, popovers | Brand Guidelines |
| `neutral-fg` | Ink | `#15103A` | Primary body text and headings on light surfaces | Brand Guidelines |
| `tint` | Mist | `#EDEAFB` | Resting borders, tinted cards, schedule bands | Brand Guidelines |
| `muted-fg` | Muted Text | `#5E597D` | Secondary labels, captions, schedule metadata (6.4:1 contrast) | Brand Guidelines |

#### Accessible Combinations (WCAG Standards)

| Foreground | Background | Ratio | Permitted Use |
|---|---|---|---|
| Ink (`#15103A`) | Paper (`#FAF9FE`) | 17.3:1 | Primary body text and headlines |
| Summit Indigo (`#4C24B8`) | Paper (`#FAF9FE`) | 9.2:1 | Headlines, primary buttons, links |
| White (`#FFFFFF`) | Summit Indigo (`#4C24B8`) | 9.7:1 | Button text, badges |
| White (`#FFFFFF`) | Deep Indigo (`#2A136E`) | 15.6:1 | Dark section headlines and copy |
| Radiance Gold (`#C8993A`) | Deep Indigo (`#2A136E`) | 6.0:1 | Text and highlights on dark sections |
| Radiance Gold (`#C8993A`) | Ink (`#15103A`) | 7.0:1 | Text and highlights on dark mode |
| **Radiance Gold (`#C8993A`)** | **Paper / White** | **2.47:1** | **FORBIDDEN FOR TEXT (Lines & icons only)** |

---

## Typography

### Font Pairing
- **Display & Headings (Latin):** Fraunces (`font-display`, weight 600). Warm, editorial, dignified serif.
- **Display & Headings (Amharic):** Noto Serif Ethiopic (weight 600). Loaded explicitly; never relies on system fallbacks.
- **Body & UI (Latin):** Plus Jakarta Sans (`font-sans`, weights 400, 500, 600). Geometric, humanist, modern, crisp, and welcoming sans-serif.
- **Body & UI (Amharic):** Noto Sans Ethiopic (weights 400, 500, 600). Line-height set to 1.65–1.75.

### Type Scale (Mobile / Desktop)
- **Display (Hero):** `36px` / `60px`, line-height: `1.1` (Amharic `1.3`), weight: `600`.
- **H1:** `32px` / `48px`, line-height: `1.15` (Amharic `1.35`), weight: `600`.
- **H2:** `24px` / `36px`, line-height: `1.2` (Amharic `1.4`), weight: `600`.
- **H3:** `18px` / `24px`, line-height: `1.3` (Amharic `1.45`), weight: `600`.
- **Body:** `15px` / `17px`, line-height: `1.6` (Amharic `1.7`), weight: `400`.
- **Small / Meta:** `13px` / `14px`, line-height: `1.5` (Amharic `1.7`), weight: `500`.
- **Button / Label:** `14px` / `15px`, line-height: `1.2`, weight: `600`, sentence case.

### Strict Amharic Typography Rules
1. **Never use italics on Amharic text.** `Noto Serif Ethiopic` has no genuine italic posture. Slanted Ethiopic glyphs render broken or deformed. For emphasis in Amharic, use Summit Indigo color, a weight change (bold), or a subtle background tint.
2. **Generous line-height.** Ethiopic characters feature ascenders and descenders that collide under standard Latin line heights. Always provide at least 1.65–1.75 line-height.

---

## Iconography & Directional Arrows

- **Navigational Link Arrows:** Any hyperlink or button linking to an internal or external destination that uses a directional arrow MUST use `ArrowUpRight` (pointing up-right, e.g. from `lucide-react`) with a subtle hover translation: `group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200`. The parent container must carry `group` (or `group/arrow`).
- **Inline Flow & Sequence Indicators:** For sequential steps, breadcrumbs, or in-line forward markers (e.g. `->`), use the `ChevronRight` (`>`) icon from `lucide-react`. Never use raw text `->` or generic right arrows for breadcrumb-like progression.

---

## Shapes, Elevation & Spacing

- **Buttons & Tags:** Fully pill-shaped (`rounded-full` / `9999px`), echoing the circular church seal.
- **Cards & Images:** Soft 16px radius (`rounded-2xl`).
- **Portraits & Avatars:** Pure circles (`rounded-full` with 1:1 aspect ratio).
- **Flat-by-Default:** Zero heavy drop shadows. No `shadow-2xl` or artificial colored halos. Resting cards use a crisp `1px solid #EDEAFB` border. On hover, apply subtle `-1px` transform and a gentle diffuse shadow (`0 4px 12px rgba(27, 23, 99, 0.06)`).
- **Section Rhythm:** Alternating full-width horizontal bands of Paper (`#FAF9FE`), Mist (`#EDEAFB`), and Deep Indigo (`#2A136E`).

---

## Logo & Visual Authority

The church logo is a circular line-art mark with single stroke weight and one color:
1. **Cross** at the center: The Gospel at the foundation of all things.
2. **Globe** (Africa and Europe): Rooted in Africa with a heart for the world.
3. **Radiating lines**: Light (*Birhan*).
4. **Drops / seeds**: Word sown, grace poured out, life (*Hiwot*).
5. **Outer circle**: Wholeness, family, belonging.

### Logo Rules
- On light backgrounds: Summit Indigo (`#4C24B8`) on Paper or White.
- On dark backgrounds: Reversed pure White (`#FFFFFF`) on Deep Indigo or darkened photos.
- Minimum full mark size: `64px` digital / `20mm` print.
- Clear space `X` = width of the cross arm on all sides.
- **Never:** rotate, recolor, fill in strokes, add glows/drop shadows, stretch, crop the outer ring, or substitute random cross icons.

---

## Visual Inspiration Reference (`docs/Inspiration.webp`)

The project reference document `docs/Inspiration.webp` establishes the desired spatial rhythm, editorial photography layout, and welcoming church presence. Our design system translates the strengths of this inspiration reference while strictly enforcing the Hiwot Birhan Summit brand guidelines and eliminating all generic AI-slop patterns:

### 1. Architectural Translation Matrix

| Inspiration Feature (`Inspiration.webp`) | Hiwot Birhan Summit Implementation | Rationale & Brand Alignment |
|---|---|---|
| **Deep Purple / Royal Hero Banner** | Deep Indigo (`#2A136E`) with authentic Ethiopian sanctuary worship photography | Rooted in brand guidelines color palette (`#2A136E` / `#4C24B8`) rather than arbitrary purple. |
| **Organic Mask / Torn Edge on Hero** | Crisp soft 16px geometric framing (`rounded-2xl`) with single-line borders | Maintains authentic line-art character from the single-stroke church seal. |
| **Quick Action Pill / Circular Cards** | Service Times bar with generous vertical spacing (`py-16 md:py-24`, replacing cramped negative margins) with circular icon discs and dual-time badges | Delivers immediate, practical schedule guidance for newcomers without superficial decoration. |
| **Layered Photographic Storytelling** | Warm 16px cards with authentic Ethiopian fellowship photos and Fraunces editorial quotes | Real community presence replacing stock imagery or generic charity appeals. |
| **Media & Sermon Showcase Card** | Side-by-side card with 16:9 thumbnail, gold play button, series tags, scripture reading box, and audio/video controls | Directly adapts the inspiration's media showcase (`Love the Lord Your God...`) to Pastor Dawit's sermon archive. |
| **Event Calendar & Gathering List** | High-contrast `FeaturedEvent` card paired with date-aligned schedule rows (`WeeklyScheduleGrid`) | Provides clear chronological visibility for Sunday services, Thursday prayer, and Saturday youth. |
| **Social & Community Channels** | Soft Mist (`#EDEAFB`) cards for phone, email, and official Telegram (`@HiwotBirhanSummit`) | Pragmatic local communication channels tailored to Addis Ababa habits. |
| **Reverent Full-Bleed Footer** | Deep Indigo (`#2A136E`) container with white vector church seal and complete bilingual schedule summary | Dignified closing surface echoing the architectural line-art motif in the inspiration. |

### 2. Deliberate Purging of Inspiration Anti-Patterns

While `docs/Inspiration.webp` offers strong layout inspiration, it contains generic non-profit elements that must **never** appear in the Hiwot Birhan Summit platform:
- **No generic charity/emergency fundraising:** Omit US non-profit campaigns ("Water Wells", "Syria Family Home", "Donate Now" primary CTAs). The Summit church's primary call to action is welcoming believers and seekers into worship ("Plan your first visit", "Come and worship with us").
- **No arbitrary slider numbers:** Omit meaningless `1 2 3` counter digits.
- **No Latin filler copy or corporate buzzwords:** All text is real, contextual, and bilingual (English and natural Amharic).
- **No fake metrics:** Zero arbitrary counters (`400+ Believers`, `10+ Years`).

---

## Component Standards

### 1. Header Navigation
- Unified Deep Indigo background (`#2A136E` / `bg-primary-deep text-white`), sticky container with subtle backdrop blur and clean `1px solid rgba(255, 255, 255, 0.1)` bottom border across ALL routes.
- Authentic reversed White circular church seal icon lockup (`size-12 sm:size-14` / 48px–56px) calibrated to fit all viewports cleanly.
- Clean navigation links in crisp white with active indicator highlight (`bg-white/20`).
- High-contrast Language Toggle (English / አማርኛ) and on-dark pill CTA button (`variant: "on-dark"`).

### 2. Hero Section
- Deep Indigo (`#2A136E`) background.
- Watermark: Subtle low-opacity (12–15%) authentic reversed church mark on the canvas—**never** generic Lucide Sparkles or pulsing radial blobs.
- NO decorative lines or artificial accent bars above headlines. Clear, unencumbered space.
- Display headline: "Come and worship *with us.*" / "በአዲስ አበባ የሕይወትን ብርሃን ማወጅ".
- Dual pill buttons:
  - Primary: White pill with Deep Indigo text (`variant: "on-dark"`).
  - Secondary: Transparent pill with 1px White border and White text (`variant: "on-dark-outline"`).
- **Hero Imagery (Brush Cut Out):** Hand-crafted painterly brush mask (directly inspired by `docs/Inspiration.webp`) replacing generic rectangular cards. Features layered artisanal underlays (Radiance Gold `#C8993A` and Soft Indigo `#7652E4`) and organic bristle flicks along the left and bottom perimeter.
- **Bottom Canvas Transition:** Organic torn-brush SVG divider tearing the Deep Indigo hero into the warm Paper canvas (`#FAF9FE`) below, followed by generous vertical breathing room (`py-16 md:py-24`) leading into service schedules.

### 3. Service Times & Schedules
- Clean 3-column layout on Paper or Mist (`Sunday Worship`, `Thursday Bible Study & Prayer`, `Saturday Youth & Choir`).
- Clear dual time format: International EAT (e.g. `9:00 AM – 12:00 PM`) and Ethiopian Local Time (`3:00 – 6:00 ጠዋት`).
- Clean typography with no low-contrast gold text and no cramped negative margins.

### 4. About & Narrative Sections
- Warm, human storytelling without bureaucratic jargon.
- Circular photo framing or crisp 16px rounded cards.
- Five Guiding Pillars presented with clean icon discs and biblical scriptures.

### 5. Programs & Past Archive
- Clean event cards with date, time, and Summit venue tags.
- Past program chronicle documenting real fellowship milestones, testimonies, and audio archives.
- High-fidelity modal lightbox for genuine event photography.

### 6. Visit & Directions
- Pragmatic directions: Minibus/taxi from Megenagna (Summit Gate 2), Light Rail Transit (LRT Ayat line, Summit Station), and free compound parking.
- Interactive contact channels (Phone, Email, Telegram `@HiwotBirhanSummit`).
- Accessible contact form with clean error/success states.

### 7. Footer
- Deep Indigo (`#2A136E`) full-bleed container with subtle top border.
- Reversed White brand lockup, service schedules summary, contact channels, and warm benediction.

---

## Explicit Craft Floor: AI-Slop Bans

To prevent the design from regressing into generic "AI slop", every component must adhere to these absolute rules:

1. **NO kicker eyebrows above headings.**
   - *Banned:* `<span className="text-accent text-xs font-bold uppercase">ABOUT OUR CHURCH FAMILY • ስለ እኛ</span>`
   - *Fix:* Delete the label. Let the heading carry its own weight with natural typography.
2. **NO arbitrary numbered labels.**
   - *Banned:* `01 / Welcome`, `02 / Join us`, `01`, `02`, `03` badges on cards.
   - *Fix:* Remove arbitrary numbers unless representing an essential sequential guide.
3. **NO fake hero-metric templates.**
   - *Banned:* Artificial stat counters (`10+ Years`, `400+ Believers`, `24+ Major Conferences`, `4.8k Souls Impacted`).
   - *Fix:* Church is a living family, not a SaaS analytics dashboard. Focus on authentic mission copy and welcoming invitations.
4. **NO gradient text or artificial glows.**
   - *Banned:* `bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`, glowing radial blurs, `animate-pulse` dots on badges.
   - *Fix:* Crisp solid colors with intentional typography weight.
5. **NO low-contrast gold text on light surfaces.**
   - *Banned:* `<span className="text-accent font-semibold">Ethiopian Time</span>` on white or paper backgrounds.
   - *Fix:* Gold is reserved for lines, icons, and highlights on light surfaces; on dark surfaces, it serves as high-contrast emphasis.
6. **NO identical nested cards.**
   - *Banned:* Outer card container containing inner cards with identical icons and helper texts.
   - *Fix:* Direct, scannable editorial layouts with natural typographic hierarchy.
7. **NO fake generic icons for the church mark.**
   - *Banned:* Generic SVG circle with cross strokes or lucide icon substitutes.
   - *Fix:* Use the authentic Hiwot Birhan vector logo SVG across all lockups and watermarks.
8. **NO horizontal or vertical divider lines slicing the layout.**
   - *Banned:* Decorative accent lines above headings (`<div className="w-10 h-0.5 bg-accent" />`), underline borders under headings (`border-b border-border pb-4`), section divider borders (`border-t border-border`), list dividers (`divide-y divide-border`, `border-y`), vertical timeline stems (`border-l-2 border-border`), and interior card separator lines (`border-t border-border/40`).
   - *Fix:* Remove all divider lines across all pages. Content boundaries are established purely through generous whitespace, clear typographic hierarchy, and seamless background tonal transitions.
9. **Expansive Breathing Room & Spacing Floor.**
   - *Banned:* Cramped sections (`py-12`, `py-16`), tight card paddings, negative margins (such as `-mt-10`) crushing sections into preceding hero areas, compressed list spacing.
   - *Fix:* Section vertical padding floor is `py-28 md:py-36 lg:py-40`. Large cards use `p-8 sm:p-12 md:p-16` with generous internal rhythm (`space-y-8` to `space-y-14`) and relaxed grid gaps (`gap-8` to `gap-14`) allowing the content to breathe.
10. **Unified Header and Hero Continuity Across All Routes.**
   - *Banned:* Header layout shifts, disparate navbar colors per page, or pale grey hero headers clashing with the landing page aesthetic.
   - *Fix:* Unified sticky Deep Indigo (`#2A136E`) header with white church seal icon and on-dark pill actions across every page, matched seamlessly by Deep Indigo page intros (`PageIntro`, `VisitHero`) on all sub-routes without dividing lines.


## Restored implementation and page direction (21 October 2026)

The restored implementation preserves the current Summit purple palette. The existing hero uses the tonal stops #251060, #351786, #4C24B8, and #5627C9, with rgba(120, 84, 230, 0.32) and rgba(76, 36, 184, 0.38) atmospheric overlays. Its photograph shade uses rgb(37 16 96 / 36%) on desktop and rgb(37 16 96 / 20%) on mobile. These are incumbent treatments preserved during restoration, not new palette additions.

- Home retains the original 65%-width desktop photo and painterly mask. No broad sweeping lower edge is applied to the landing hero.
- The navigation is fully transparent at the top of each page. Once scrolled, it uses its solid purple surface and painted lower edge.
- Painted section transitions belong to full-width bands and the footer. Cards and other photographs keep clean 24px rounded corners; inputs and selects use 12px (.75rem).
- Sermon cards have white surfaces on the lilac band, wrapping metadata, equal row heights, and a one/two/three-column phone/tablet/desktop layout.
- Reveals are prepared only below the viewport, run once, and stop for reduced motion or keyboard focus. There are no perpetual ambient or architectural floating animations.
- About is a narrative photo essay with an editorial story, open values, faith accordion, and people profiles.
- Programs is an agenda with landscape event rows, downloadable calendar entries, filters, recaps, and a genuine photo gallery.
- Visit is a practical planner with a shared weekly timetable, directions, direct contact channels, and an email-draft composer.
- Gathering times are maintained in lib/data/schedules.ts; homepage and footer summaries derive from that schedule.
- Contact messages are prepared as email drafts for visitors to review and send in their own email app. The interface never claims delivery.
- The generated sanctuary illustration remains a decorative footer asset, separate from the authentic church logo.
