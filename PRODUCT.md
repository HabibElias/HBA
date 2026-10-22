# Hiwot Birhan Summit website

<!-- impeccable:product-schema 1 -->

## Platform

Web. A Next.js application with a public church website and a staff content workspace.

## Users and purpose

Visitors and members find gatherings, teaching, the church story, directions, and contact information in English and Amharic. Staff manage the site's changing content through authenticated admin pages.

## Confirmed constraints

- Preserve the established church identity and accepted landing hero.
- Use section/header/footer cutouts; keep cards and photos rounded.
- Keep the other public pages distinct and professional.
- Integrate the backend in this Next.js project, using Turso SQLite/libSQL.
- User-confirmed roles: Owner, Administrator, Editor, Viewer. Editors save drafts; administrators publish and manage staff.
- Keep administrative authorization enforced on the backend, not only by hiding UI controls.

## Current scope

The CMS manages events, program recaps, sermons, weekly schedules, leadership profiles, contact details, and public image uploads. Owners manage permissions. Static page composition and long-form story/faith content remain code-managed. See ADMIN.md for setup and the specific content-to-page mapping.

## Open deployment configuration

Turso Cloud credentials and the production origin have not been supplied. Local SQLite uses the same libSQL driver. An owner creates their own credentials through an interactive provisioning command.
