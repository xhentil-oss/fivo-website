# CLAUDE.md — Project guide for Claude Code

Marketing-agency website for **Fivo LLC** (Sterling Heights, MI). React + Vite + Tailwind, **server-rendered (SSR) with a MariaDB backend**, run as a Node/Express app on a VPS (see `DEPLOY.md`).

## Commands
- `npm install` — install deps (NOTE: on the dev machine, run `npm install --include=dev` — see the devDep-prune memory)
- `npm run dev` — dev server (Express + Vite middleware SSR), `NODE_ENV=development`
- `npm run build` — build client (`dist/client`) + SSR bundle (`dist/server`)
- `npm run start` — production server (`NODE_ENV=production node server.js`)
- `npm run db:seed` — apply `db/schema.sql` + seed content + create admin user (reads `.env`)

## Stack
React 18, Vite 5 **SSR** (custom, via `server.js`), React Router 6 **data router**, Tailwind 3, `react-helmet-async` for head. **Express API + MariaDB** backend (`server/`, `db/`). Node ≥ 20.

## Architecture (read before editing)
- **SSR, not static.** `server.js` (Express) serves `/api` and server-renders every request: it loads a content **snapshot** from MariaDB (via `server/repo.js`, short-TTL cached) and calls `__setSnapshot()` in `src/entry-server.jsx` right before `renderToString`. Dev uses Vite middleware; prod serves `dist/client` + imports `dist/server/entry-server.js`. The snapshot is also serialized to `window.__CONTENT__` for client hydration (`src/entry-client.jsx`).
  - **Routes live in `src/App.jsx` as a data-router array** (`export const routes`). SSR uses `createStaticHandler(routes)` → **`dataRoutes`** (lazy-resolved — must use `dataRoutes`, not `routes`, or nothing renders) → `createStaticRouter`. Public pages use `lazy: () => ({ Component })`; admin pages use `React.lazy` (client-only).
  - **SSR-safety:** nothing may touch `window`/`document`/`localStorage` during render (only in `useEffect`). The per-request snapshot pattern keeps `store.js` reads synchronous; it's safe because `renderToString` is synchronous (set snapshot → render → clear, no awaits between).
  - **Seed fallback:** `server/repo.js` returns bundled `src/data/*` when `DB_NAME` is unset or a query fails — so the app runs locally without MariaDB and degrades gracefully in prod.
- **`src/utils/store.js` is the data seam.** Reads (`getServices`, `getLocations`, `getReviews`, `getCaseStudies`, `getCompany`, `getServiceLocationPage`) come from the snapshot (server: `__setSnapshot`; client: `window.__CONTENT__`; fallback: seed). Writes (`saveCollection`, `saveServiceLocationPage`) are **async** and POST to the API (`utils/api.js`) → MariaDB. Don't make components import `src/data/*` directly for editable content — go through the store.
- **Backend:** `server/db.js` (mysql2 pool), `server/repo.js` (content + auth queries, cache), `server/auth.js` (bcrypt + JWT bearer), `server/api.js` (routes). Schema in `db/schema.sql`, seed/migration in `db/seed.mjs`. Content is stored as JSON blobs in a generic `content` table + `settings` + `service_location_pages`; `users` holds bcrypt-hashed admins.
- **Programmatic SEO:** `src/utils/serviceContent.js` generates per-service content; `src/utils/serviceLocation.js` generates a **varied** unique page for every service × location (deterministic hash picks phrasings; weaves in `locations.js` `neighborhoods`/`economy`). Keep copy unique per combo.
- **SEO:** every page renders `<SEOHead>` (`react-helmet-async`) with unique title/description + JSON-LD via `src/utils/schema.js` (Organization, LocalBusiness, Service, WebSite, FAQ, Breadcrumb; schema reads live company via `getCompany()`). `index.html` has `<!--app-head-->` / `<!--app-html-->` placeholders and **no** static `<title>` — injected per page by SSR; don't re-add.
- **Seed data:** `src/data/` — `company.js` (NAP/brand), `services.js` (37), `locations.js` (15), `reviews.js`, `caseStudies.js`.
- **Admin:** `src/admin/` — dashboard + managers, `RequireAuth` guard. Real auth: `login()` → `POST /api/auth/login` (bcrypt check in MariaDB) → JWT stored in `localStorage`, sent as `Authorization: Bearer` on writes. Manager save handlers call the async `store` writes (currently fire-and-forget — adding await + error UI is a known TODO).

## Conventions
- Reuse the brand classes from `src/index.css` / `tailwind.config.js`: `container-x`, `section`, `eyebrow`, `card`, `card-hover`, `btn`, `btn-primary` (orange), `btn-secondary`/`btn-ghost` (blue). Brand = blue primary + orange accent.
- Icons come from the inline set in `src/components/Icon.jsx` (`<Icon name="..." />`). Add a new key there rather than pulling in an icon library.
- Demo content stays clearly labeled (`isDemo` → "Demo" badge) and uses **no invented metrics**.

## Gotchas
- **Never put `\uXXXX` escapes in JSX *text*** (e.g. between tags). JSX text is not a JS string, so it renders literally. Use the real character (`—`, `'`, `"`) or an HTML entity (`&mdash;`, `&rsquo;`). Inside JS string literals (object props, attributes) `\uXXXX` is fine.
- **Deployment is the VPS** (Node + MariaDB + nginx), not Vercel — see `DEPLOY.md`. `vercel.json` is legacy/unused now.
- **`sitemap.xml` is generated, not hand-edited.** `scripts/generate-sitemap.js` runs as the npm `prebuild` hook (and `npm run sitemap`), enumerating every URL from `src/data/`. Output `public/sitemap.xml` is gitignored; copied into `dist/client` by the build. Base URL from `company.website`.
- **Auth is server-side** (`server/auth.js` + `src/admin/auth.js`). JWT bearer (not a cookie) so writes aren't CSRF-able. `JWT_SECRET` is required in prod (server refuses to boot without it). Only `VITE_`-prefixed env vars reach the browser — keep DB creds / JWT secret server-side.
- **Contact form** (`src/pages/Contact.jsx`) POSTs to `/api/contact` → MariaDB `contact_messages` (server validates + rate-limits + honeypot `company_url`). Override target with `VITE_CONTACT_ENDPOINT`.
- Legal pages (`Privacy`, `Terms`) are templates pending counsel review.

See `README.md` for the full production checklist.
