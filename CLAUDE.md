# CLAUDE.md — Project guide for Claude Code

Marketing-agency website for **Fivo LLC** (Sterling Heights, MI). React + Vite + Tailwind. Deployed on Vercel (auto-deploys on push to `main`).

## Commands
- `npm install` — install deps
- `npm run dev` — local dev server
- `npm run build` — production build to `/dist`
- `npm run preview` — preview the build

## Stack
React 18, Vite 5, **`vite-react-ssg`** (static pre-rendering on top of React Router 6 data router), Tailwind 3. Head/meta via `vite-react-ssg`'s `<Head>`. No backend yet — content is local.

## Architecture (read before editing)
- **Static site generation (SSG).** `npm run build` runs `vite-react-ssg build`, which pre-renders **every** public route to its own static `index.html` (real title/meta/canonical/OG/JSON-LD + content baked into the HTML — not a client-only SPA shell). `dirStyle: 'nested'` → `/about/index.html`. Crawlers and link-preview scrapers see full HTML without running JS; the page then hydrates into a normal SPA.
  - **Routes live in `src/App.jsx` as a data-router array** (`export const routes`), consumed by `ViteReactSSG` in `src/main.jsx`. Dynamic routes carry `getStaticPaths()` to enumerate concrete URLs (services, locations, every service×location). Public pages use the data-router `lazy: () => ({ Component })` form so SSG can resolve them; admin pages use `React.lazy` (client-only).
  - **`/admin` is excluded from SSG** via `ssgOptions.includedRoutes` in `vite.config.js` (also drops `:`-templates and `*`). It runs client-only behind the demo auth guard and is `noindex`.
  - **SSG-safety:** nothing may touch `window`/`document`/`localStorage` during render (only inside `useEffect`). `store.js` reads `localStorage` inside try/catch, so it safely falls back to seed data when pre-rendering in Node — keep that pattern.
- **`src/utils/store.js` is the data seam.** All editable content is read through it (`getServices`, `getLocations`, `getReviews`, `getCaseStudies`, `getCompany`, `getServiceLocationPage`) and written through it (`saveCollection`, `saveServiceLocationPage`). Today it reads `src/data/*` with a `localStorage` overlay. To add a real backend (Supabase/Strapi/custom API), swap the function bodies here — **do not** make components import data directly.
- **Programmatic SEO:** `src/utils/serviceContent.js` generates per-service content; `src/utils/serviceLocation.js` generates a unique page for every service × location. Routes: `/services/:serviceSlug/:locationSlug`. Keep generated copy unique per combo (no thin/duplicate content).
- **SEO:** every page renders `<SEOHead>` (uses `<Head>` from `vite-react-ssg`) with a unique title/description + JSON-LD via `src/utils/schema.js` (Organization, LocalBusiness, Service, FAQ, Breadcrumb). `index.html` has **no** static `<title>`/description on purpose — `<SEOHead>` injects them per page; don't re-add them or you'll get duplicate tags.
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
