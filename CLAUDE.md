# CLAUDE.md — Project guide for Claude Code

Marketing-agency website for **Fivo LLC** (Sterling Heights, MI). React + Vite + Tailwind. Deployed on Vercel (auto-deploys on push to `main`).

## Commands
- `npm install` — install deps
- `npm run dev` — local dev server
- `npm run build` — production build to `/dist`
- `npm run preview` — preview the build

## Stack
React 18, Vite 5, React Router 6 (`BrowserRouter`), Tailwind 3, `react-helmet-async` for SEO/head. No backend yet — content is local.

## Architecture (read before editing)
- **`src/utils/store.js` is the data seam.** All editable content is read through it (`getServices`, `getLocations`, `getReviews`, `getCaseStudies`, `getCompany`, `getServiceLocationPage`) and written through it (`saveCollection`, `saveServiceLocationPage`). Today it reads `src/data/*` with a `localStorage` overlay. To add a real backend (Supabase/Strapi/custom API), swap the function bodies here — **do not** make components import data directly.
- **Programmatic SEO:** `src/utils/serviceContent.js` generates per-service content; `src/utils/serviceLocation.js` generates a unique page for every service × location. Routes: `/services/:serviceSlug/:locationSlug`. Keep generated copy unique per combo (no thin/duplicate content).
- **SEO:** every page renders `<SEOHead>` with a unique title/description + JSON-LD via `src/utils/schema.js` (Organization, LocalBusiness, Service, FAQ, Breadcrumb).
- **Seed data:** `src/data/` — `company.js` (NAP/brand), `services.js` (37), `locations.js` (15), `reviews.js`, `caseStudies.js`.
- **Admin:** `src/admin/` — dashboard + managers. Routing in `src/App.jsx` (lazy-loaded, `RequireAuth` guard).

## Conventions
- Reuse the brand classes from `src/index.css` / `tailwind.config.js`: `container-x`, `section`, `eyebrow`, `card`, `card-hover`, `btn`, `btn-primary` (orange), `btn-secondary`/`btn-ghost` (blue). Brand = blue primary + orange accent.
- Icons come from the inline set in `src/components/Icon.jsx` (`<Icon name="..." />`). Add a new key there rather than pulling in an icon library.
- Demo content stays clearly labeled (`isDemo` → "Demo" badge) and uses **no invented metrics**.

## Gotchas
- **Never put `\uXXXX` escapes in JSX *text*** (e.g. between tags). JSX text is not a JS string, so it renders literally. Use the real character (`—`, `'`, `"`) or an HTML entity (`&mdash;`, `&rsquo;`). Inside JS string literals (object props, attributes) `\uXXXX` is fine.
- **`vercel.json`** has an SPA rewrite so deep React Router routes don't 404 on refresh — keep it.
- **`sitemap.xml` is generated, not hand-edited.** `scripts/generate-sitemap.js` enumerates static routes + every service, location, and service×location URL from `src/data/`. It runs automatically as the npm `prebuild` hook (and standalone via `npm run sitemap`). The output `public/sitemap.xml` is gitignored — never edit it by hand; change the data and rebuild. Base URL comes from `company.website`.
- **Demo auth is NOT secure** (`src/admin/auth.js`). Client-side only. Replace with real server-side auth before treating anything as production. Keep secrets server-side; only `VITE_`-prefixed env vars reach the browser.
- **Contact form** (`src/pages/Contact.jsx`) POSTs to `VITE_CONTACT_ENDPOINT` when set (see `.env.example`), else runs in demo mode (nothing transmitted). It has a honeypot + client validation only — the receiving endpoint MUST still re-validate, rate-limit, and spam-check server-side.
- Legal pages (`Privacy`, `Terms`) are templates pending counsel review.

See `README.md` for the full production checklist.
