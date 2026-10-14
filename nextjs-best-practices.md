# Getting Started with Next.js — Best Practices

A practical guide for developers starting out with Next.js (App Router). This covers project structure, data fetching, components, styling, performance, and common pitfalls.

---

## 1. Project Setup

- Use the official starter: `npx create-next-app@latest`
- Choose **TypeScript** — even for small projects, it catches bugs early and makes refactors safer.
- Choose the **App Router** (`/app` directory) over the older Pages Router (`/pages`). App Router is the current standard and where new features land first.
- Enable ESLint during setup, and add Prettier for consistent formatting.

```bash
npx create-next-app@latest my-app --typescript --eslint --app
```

---

## 2. Folder Structure

A clean, scalable structure for a mid-sized app:

```
app/
  (marketing)/          # route group — doesn't affect URL
    page.tsx
    about/page.tsx
  (dashboard)/
    layout.tsx
    dashboard/page.tsx
  api/
    users/route.ts       # API route handler
  layout.tsx              # root layout
  globals.css
components/
  ui/                     # small reusable primitives (Button, Input)
  features/               # feature-specific components
lib/
  db.ts                   # database client
  auth.ts                 # auth helpers
  utils.ts
types/
  index.ts
```

**Tips:**
- Use **route groups** `(folderName)` to organize routes without affecting the URL path.
- Keep components close to where they're used unless they're truly shared (`components/ui`).
- Put non-component logic (API clients, helpers, validation schemas) in `lib/`.

---

## 3. Server vs Client Components

This is the single most important mental model shift in the App Router.

- **Everything is a Server Component by default.** They run on the server, can access databases/secrets directly, and ship zero JS to the browser.
- Add `"use client"` at the top of a file **only** when you need:
  - `useState`, `useEffect`, or other React hooks
  - Browser APIs (`window`, `localStorage`)
  - Event handlers (`onClick`, `onChange`)
  - Third-party libraries that rely on browser context

**Best practice:** Push `"use client"` as far down the tree as possible. Don't mark a whole page as client just because one button needs an `onClick`— isolate that button into its own small client component.

```tsx
// app/page.tsx — Server Component (default)
import LikeButton from "@/components/LikeButton";

export default async function Page() {
  const data = await getData(); // direct server-side fetch, no API route needed
  return (
    <div>
      <h1>{data.title}</h1>
      <LikeButton /> {/* only this is a client component */}
    </div>
  );
}
```

---

## 4. Data Fetching

- Fetch data directly inside Server Components with `async/await` — no need for `useEffect` + `fetch` on the client for initial page data.
- Use the built-in `fetch` caching options:
  - `fetch(url, { cache: "force-cache" })` — cached indefinitely (default for GET)
  - `fetch(url, { cache: "no-store" })` — always fresh (dynamic data)
  - `fetch(url, { next: { revalidate: 60 } })` — revalidate every 60 seconds (ISR)
- For mutations, use **Server Actions** instead of hand-rolled API routes when possible:

```tsx
// app/actions.ts
"use server";

export async function createPost(formData: FormData) {
  const title = formData.get("title");
  await db.post.create({ data: { title } });
}
```

```tsx
// in a component
<form action={createPost}>
  <input name="title" />
  <button type="submit">Create</button>
</form>
```

- Only build a `route.ts` API handler when you need a public HTTP endpoint (e.g., for a webhook or external client), not just for internal form submissions.

---

## 5. Rendering Strategies

| Strategy | When to use | How |
|---|---|---|
| Static (SSG) | Content rarely changes (blog, docs) | Default behavior with cached `fetch` |
| ISR | Content changes occasionally | `revalidate` option in `fetch` |
| Dynamic (SSR) | Content is user-specific or always fresh | `cache: "no-store"` or use `cookies()`/`headers()` |
| Client-side | Highly interactive, no SEO need (dashboards) | `"use client"` + `useEffect`/SWR/React Query |

Default to static/ISR wherever possible — it's faster and cheaper. Only go fully dynamic when the data genuinely must be per-request.

---

## 6. Styling

- Tailwind CSS is the most common pairing with Next.js and works well out of the box with `create-next-app`.
- If not using Tailwind, CSS Modules (`Component.module.css`) are the built-in, zero-config option and avoid class name collisions.
- Avoid global CSS except for truly global resets/typography (`globals.css`).

---

## 7. Images & Fonts

- Always use `next/image` instead of `<img>` — it handles lazy loading, responsive sizing, and format optimization automatically.
- Always use `next/font` (e.g., `next/font/google`) instead of linking fonts via `<link>` — it self-hosts fonts and eliminates layout shift.

```tsx
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
```

---

## 8. Environment Variables

- Put secrets in `.env.local` (never commit this file — add it to `.gitignore`).
- Variables must be prefixed `NEXT_PUBLIC_` to be exposed to the browser. Everything else stays server-only by default — keep it that way for actual secrets (API keys, DB URLs).

---

## 9. Metadata & SEO

Use the built-in Metadata API instead of manually writing `<head>` tags:

```tsx
// app/blog/[slug]/page.tsx
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}
```

---

## 10. Error & Loading States

App Router gives you file conventions for free — use them:

- `loading.tsx` — automatic loading UI while a route segment fetches data (uses Suspense under the hood)
- `error.tsx` — automatic error boundary for a route segment
- `not-found.tsx` — custom 404 UI

```
app/
  dashboard/
    page.tsx
    loading.tsx
    error.tsx
```

---

## 11. Performance Checklist

- Minimize `"use client"` boundaries (see section 3).
- Use `next/image` and `next/font` (see section 7).
- Use `<Suspense>` boundaries to stream in slow data instead of blocking the whole page.
- Avoid large client-side dependencies for small tasks (e.g., don't import a whole date library for one format call).
- Use `next/dynamic` to lazy-load heavy client components that aren't needed immediately:

```tsx
import dynamic from "next/dynamic";
const HeavyChart = dynamic(() => import("@/components/HeavyChart"), { ssr: false });
```

---

## 12. Common Pitfalls to Avoid

- **Marking pages `"use client"` unnecessarily** — kills server rendering benefits for the whole subtree.
- **Fetching in `useEffect` for initial data** when a Server Component could fetch it directly — causes loading spinners and waterfalls that aren't needed.
- **Forgetting `revalidate`/cache settings** — data can go stale or refetch too often without realizing it.
- **Not using route groups/layouts** — leads to duplicated headers/nav across pages instead of shared layouts.
- **Committing `.env.local`** — always double-check `.gitignore`.
- **Using `<img>` and `<link>` for fonts** instead of `next/image` and `next/font`.

---

## 13. Recommended Reading Order

1. App Router fundamentals (Server vs Client Components)
2. Data fetching + caching
3. Layouts, loading, and error conventions
4. Server Actions for mutations
5. Metadata API for SEO
6. Deployment (Vercel is the simplest path, but Next.js also runs on any Node host or via Docker)

---

*A good habit early on: build one small full CRUD feature (e.g., a simple notes app) using Server Components, Server Actions, and the loading/error conventions above. That one exercise touches almost everything in this guide.*
