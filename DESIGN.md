---
name: Hiwot Birhan Addis Ababa Summit branch
description: An authentic, welcoming church design system blending reverent editorial typography with modern, accessible community warmth.
colors:
  primary: "#302b9b"
  primary-foreground: "#f8f9ff"
  accent: "#6569d8"
  foreground: "#11143d"
  background: "#f8f9ff"
  surface: "#edf0ff"
  surface-strong: "#dfe4ff"
  border: "#cfd3ef"
  muted-foreground: "#5d6384"
  sermon-bg: "#3530a2"
  sermon-light: "#e0e2fa"
  sermon-muted: "#b9bce8"
  white: "#ffffff"
typography:
  display:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(3.2rem, 7vw, 6.4rem)"
    fontWeight: 400
    lineHeight: 0.95
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(2.8rem, 5.5vw, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.03em"
  quote:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(2rem, 4.5vw, 4rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  lead:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.15rem, 1.8vw, 1.45rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  body-sm:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.08em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "28px"
  xl: "48px"
  section: "clamp(5rem, 8vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.foreground}"
    textColor: "{colors.background}"
    rounded: "{rounded.sm}"
    padding: "0 24px"
    height: "50px"
  button-light:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.sm}"
    padding: "0 24px"
    height: "50px"
  button-hover:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
---

# Design System: Hiwot Birhan Addis Ababa Summit branch

## Overview

**Creative North Star: "The Welcoming Sanctuary"**

The Hiwot Birhan visual language combines the dignity and reverence of an established Ethiopian church family with open, contemporary warmth. Rather than relying on generic SaaS cards or heavy drop shadows, the aesthetic is anchored in rich editorial serif typography, deliberate contrast, and deep royal indigo tones balanced against clean, cool paper surfaces.

Every element communicates hospitality, spiritual grounding, and community life. Dense, rhythmic service schedules and clear event timelines are rendered with structured row layouts rather than cluttered floating cards. Typography leads with confidence, giving headlines emotional resonance while maintaining clear, legible utility for gathering times, locations, and ways to connect.

**Key Characteristics:**
- **Reverent Editorial Headlines:** Grand DM Serif Display headings paired with italic emphasis words in lavender accent.
- **Tonal Canvas Depth:** Crisp `#f8f9ff` base with layered `#edf0ff` and `#dfe4ff` surfaces rather than decorative shadow halos.
- **Structured Row Architecture:** Flat, horizontal service and event items separated by delicate borders with interactive directional hover cues.
- **Clear Communal Purpose:** Direct, compassionate copy free of generic placeholder slop, tailored specifically for the Addis Ababa Summit community.

## Colors

The palette is rooted in deep indigo and royal ultramarine tones, softened by cool paper backgrounds and illuminated with vibrant lavender-periwinkle accents.

### Primary
- **Royal Indigo** (`#302b9b`): The central brand anchor, used for primary interactive highlights, top header rules, featured sermon backdrops, and active states.
- **Indigo Foreground** (`#11143d`): Deep midnight indigo used for high-contrast primary text, hero scrim overlays, and prominent buttons.

### Secondary
- **Vibrant Lavender Accent** (`#6569d8`): Used selectively on italicized headline words, quote icons, event category tags, and interactive links to bring warmth and vitality.
- **Sermon Atmosphere Indigo** (`#3530a2`): Rich interior container tint for featured media art.
- **Sermon Soft Text** (`#e0e2fa`): High-contrast light periwinkle for paragraphs on dark indigo canvases.
- **Sermon Muted Text** (`#b9bce8`): Secondary metadata and timestamp labels on dark banners.

### Neutral
- **Paper Light** (`#f8f9ff`): The clean, luminous page background that keeps the interface breathable and open.
- **Surface Soft** (`#edf0ff`): Subdued lavender-tinted background for hover states and form success containers.
- **Surface Strong** (`#dfe4ff`): Solid section surface tint for the welcome intro, upcoming events, and footer.
- **Soft Indigo Border** (`#cfd3ef`): Subtle divider line used on row borders and input underline strokes.
- **Muted Slate** (`#5d6384`): Secondary descriptive text and metadata for optimal readability and balanced hierarchy.

### Named Rules
**The Sanctuary Accent Rule.** The vibrant lavender accent (`#6569d8`) is reserved for moments of emphasis (italic headline keywords, tag labels, and quote iconography). It is never applied as a solid container fill.
**The No-Dead-Gray Rule.** Neutral borders and muted text are always tinted with soft indigo undertones (`#cfd3ef`, `#5d6384`), never sterile monochrome grays.

## Typography

**Display Font:** DM Serif Display (with Georgia, serif fallback)
**Body Font:** Geist (with system-ui, sans-serif fallback)
**Label/Tag Font:** Geist Bold (with uppercase tracking)

**Character:** A dignified dialogue between classic editorial serif warmth and crisp modern sans precision.

### Hierarchy
- **Display** (weight: 400, `clamp(3.2rem, 7vw, 6.4rem)`, line-height: 0.95, tracking: -0.035em): Hero headline and primary section announcements.
- **Headline** (weight: 400, `clamp(2.8rem, 5.5vw, 5.5rem)`, line-height: 0.96, tracking: -0.03em): Major section headers with italic accent highlights.
- **Quote** (weight: 400, `clamp(2rem, 4.5vw, 4rem)`, line-height: 1.05, tracking: -0.03em): Testimonial and scripture quote displays.
- **Title** (weight: 600, `20px`, line-height: 1.3, tracking: -0.02em): Service names, event titles, and form headings.
- **Lead** (weight: 400, `clamp(1.15rem, 1.8vw, 1.45rem)`, line-height: 1.5, tracking: -0.02em): Section introduction statements.
- **Body** (weight: 400, `15px`, line-height: 1.6): Paragraph copy, descriptions, and location details (measure: 60–70ch).
- **Body-sm** (weight: 600, `13px`, line-height: 1.5): Navigation links, button labels, time labels, and mobile menu items.
- **Label** (weight: 700, `11px`, letter-spacing: 0.08em, uppercase): Event categories, form labels, and footer metadata.

### Named Rules
**The Natural Emphasis Rule.** Headings use italic serif styling with the accent color on key phrases (e.g. *for you*, *real life*, *Sunday*) to create human warmth and melodic cadence.

## Layout

The spatial model uses a full-width structured shell with generous clamp-based section padding (`clamp(5rem, 8vw, 8rem) clamp(1.25rem, 8vw, 8rem)`). 

- **Header:** Sticky 88px container with strong brand mark, horizontal navigation, and direct CTA.
- **Hero:** Full-bleed visual canvas with high-contrast text overlay, right-aligned meta badge, and dual action links.
- **Grid Structure:** Two-column split layouts (`1fr 1.2fr` on intro and contact; `1.25fr 0.75fr` on sermon feature) collapsing cleanly into single-column flows below 768px.
- **Rhythm:** Generous macro-spacing between thematic sections, combined with tight micro-spacing inside list rows.

## Elevation & Depth

The system relies primarily on **tonal layering** and distinct surface backgrounds (`#f8f9ff` vs `#dfe4ff` vs `#11143d`) rather than heavy drop shadows.

### Shadow Vocabulary
- **Button Hover Shadow** (`0 4px 16px rgba(17, 20, 61, 0.15)`): Diffuse soft elevation applied exclusively during active interaction and hover states.
- **Primary Accent Shadow** (`0 4px 16px rgba(48, 43, 155, 0.25)`): Applied when hovering dark buttons for a refined interactive lift.

### Named Rules
**The Flat-By-Default Rule.** Surfaces and cards remain flat at rest. Subtle depth and translation occur solely in response to user focus and hover interactions.

## Shapes

- **Base Radius:** Flat-to-subtle (`4px` to `8px`) on buttons and confirmation containers.
- **Sermon Feature Art:** Large rounded container (`24px` radius) providing geometric contrast to linear text blocks.
- **Form Fields:** Clean borderless inputs with solid bottom strokes (`1.5px solid var(--border)`), shifting smoothly to primary indigo on focus.

## Components

### Buttons
- **Shape:** Subtle rounded rectangle (radius: 4px).
- **Primary / Dark:** Midnight indigo (`#11143d`) fill, `#f8f9ff` text, padding `0 24px`, height `50px`. Hovers to Royal Indigo (`#302b9b`) with `-1px` transform.
- **Light / Hero:** Crisp paper (`#f8f9ff`) fill, `#11143d` text, padding `0 24px`, height `50px`. Hovers to pure white with soft elevation.
- **Header CTA:** Inline underline link with `2px solid` stroke and `ArrowUpRight` icon.

### Service & Event Rows
- **Layout:** Three-column grid (`180px 1fr auto`) bounded by `1px solid var(--border)`.
- **Hover State:** Smooth background shift to `#edf0ff` with directional icon micro-translation (`translate(2px, -2px)`).
- **Typography:** Bold day/time stamp, semi-bold title, and muted description.

### Sermon Feature Banner
- **Container:** Full-bleed split banner in Royal Indigo (`#302b9b`) with high-contrast `#f8f9ff` typography.
- **Media Art:** Integrated listening badge with centered play icon and soft geometric framing.

### Contact & Connection Form
- **Fields:** Underline-only inputs with uppercase labels and smooth color transition on `:focus`.
- **Feedback:** Inline accessible confirmation card with checkmark icon and option to reset.

## Do's and Don'ts

### Do:
- **Do** preserve the authentic church name (*Hiwot Birhan Addis Ababa Summit branch*) and local Addis Ababa context across all copies.
- **Do** use DM Serif Display for major headlines and allow headings to speak with italic accents.
- **Do** use structured row dividers (`1px solid #cfd3ef`) for time-based items instead of floating card grids.
- **Do** tint all secondary neutrals and backgrounds with cool indigo hues.

### Don't:
- **Don't** add arbitrary numbered labels (`01 / Welcome`, `02 / Join us`) or kicker eyebrows above headings.
- **Don't** use generic stock church template names (e.g. *Harbor Church*, *Portland, OR*).
- **Don't** introduce heavy multi-color gradient text or gratuitous glassmorphism blur effects.
- **Don't** use pure monochrome gray borders or black shadows without indigo tinting.
