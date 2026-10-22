# Website restoration — 21 October 2026

This record captures the accepted design decisions and the completed restoration so they can be reviewed after future Git changes.

## Preserved decisions

- Original landing hero: 65% desktop photograph width, original painterly photo mask, original mobile fade.
- Header: transparent at the top; solid surface and painted edge after scrolling.
- Rounded cards and photographs, with cutouts reserved for section boundaries and the header.
- White sermon cards on lilac, wrapping metadata, and responsive equal-height rows.
- Reveals run once without visible-content flashing. Reduced-motion and keyboard users see content immediately.
- Generated sanctuary artwork in the footer. Original PNG: `public/illustrations/summit-sanctuary.png`.

## Distinct pages

- **Home:** the restored welcome, gathering summaries, ministries, messages, and community photography.
- **About:** a photo essay, chronological story, editorial values, accessible faith accordion, and simple team profiles.
- **Programs:** upcoming agenda rows, calendar downloads, filterable archive, empty-state recovery, and photo dialogs.
- **Visit:** first-visit planning, one consistent weekly schedule, time guidance, transit directions, direct contact channels, and email draft preparation.

## Functional behavior

- Calendar files use UTC dates, escaped text, stable event identifiers, and UTF-8-safe line folding.
- Mobile navigation uses a portal, full viewport height, Escape dismissal, focus trapping, and focus restoration.
- The contact composer validates input and prepares a mailto draft. Visitors review and send it themselves; there is no simulated delivery confirmation.
- Next.js image optimization and TypeScript build validation are enabled.
- Brand fonts are self-hosted in `public/fonts`, with their licenses, so production builds do not require Google Fonts access.

## Local verification

Use `npm run dev`, `npx tsc --noEmit --incremental false`, and `npm run build`.

Review `/`, `/about`, `/programs`, and `/visit` at phone, tablet, and desktop sizes in both English and Amharic. Check navigation, archive filters/reset, gallery dialogs, calendar downloads, email draft validation, section links, and reduced-motion behavior.

Completed: production build (including TypeScript), all four routes at desktop/tablet/mobile widths, Amharic mobile layouts, local image and anchor checks, navigation focus trapping, archive filtering/reset, gallery dismissal, calendar downloads, email draft validation, and one-time/reduced-motion/focus-triggered reveal checks. No browser errors or horizontal overflow were found.

The existing purple brand palette remains intentional. The design detector's palette advisories were reviewed against the existing design; no new suppressions were added.
