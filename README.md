# Fivo LLC — Marketing Agency Website

A premium, conversion-focused marketing agency website for **Fivo LLC**, built with **React + Vite + Tailwind CSS**. It includes a full public site, a programmatic SEO system that generates a unique landing page for every **service × location** combination, JSON-LD structured data throughout, and a content-management **admin dashboard**.

This is a real, runnable front-end project with a clean **backend seam** so you can connect a CMS or database later without rewriting the UI.

---

## Quick start

```bash
npm install
npm run dev      # local dev server (http://localhost:5173)
npm run build    # production build to /dist
npm run preview  # preview the production build
```

Requires Node 18+ (built and tested on Node 22).

---

## What's included

**Public site**
- Home (hero, trust bar, problem/solution, services, funnel, social proof, case study, CTA)
- About, Services index, individual Service pages
- **Service + Location** landing pages — `/services/:service/:location`
- Location pages — `/locations/:location`
- Case Studies, Contact (full validated form), Privacy, Terms, 404

**Programmatic SEO**
- Every service combined with every location auto-generates a **unique** page: unique H1, SEO title, meta description, intro, local context, location-specific FAQs, internal links to related services and nearby areas, and a CTA — written to avoid thin/duplicate content.
- With the seeded data that's **37 services × 15 locations = 555 unique landing pages**, all routed and rendered on demand.

**SEO & structured data**
- Per-page `<title>`, meta description, canonical, Open Graph, and Twitter tags via `react-helmet-async` (`src/components/SEOHead.jsx`).
- JSON-LD builders in `src/utils/schema.js`: Organization, LocalBusiness, Service, FAQ, and Breadcrumb schema.
- `public/robots.txt` (disallows `/admin`, references the sitemap).

**Admin dashboard** (`/admin`)
- Dashboard overview, Services manager (add/edit/delete), Reviews manager (with demo toggle), Service + Location page editor (override generated copy), and Contact/Settings.

**Design & UX**
- Blue + orange brand system, custom inline icon set (no icon-library dependency), sticky header with services mega-menu and locations dropdown, click-to-call, mobile menu, accessible FAQ accordions, scroll reveals (respecting `prefers-reduced-motion`), loading states, and a 404.

**Performance**
- Route-level code splitting via `React.lazy` + `Suspense`, manual vendor chunking, and lean CSS. The production build emits small per-route chunks.

---

## Architecture & the backend seam

The UI never imports raw data directly where live editing matters — it goes through **`src/utils/store.js`**, the single seam between the app and your data source.

- **Today:** `store.js` reads the seed files in `src/data/` and applies an optional `localStorage` "overlay" so the admin dashboard can edit content live in the demo.
- **Production:** replace the function bodies in `store.js` with calls to your backend. The component layer doesn't change.

```
src/
  components/   reusable UI (Header, Footer, SEOHead, cards, etc.)
  pages/        public pages
  admin/        dashboard, auth, layout, managers
  data/         seed content (company, services, locations, reviews, caseStudies)
  utils/        store (backend seam), schema, validation, slugify,
                serviceContent + serviceLocation (page generators)
  App.jsx       routes & layouts
  main.jsx      entry
```

### Connecting a backend (Supabase / Strapi / Sanity / custom API)

1. Implement the reads in `store.js` (`getServices`, `getLocations`, `getReviews`, `getCaseStudies`, `getCompany`, `getServiceLocationPage`) against your API.
2. Implement the writes (`saveCollection`, `saveServiceLocationPage`) to persist server-side.
3. Keep all secrets/keys server-side. Only `VITE_`-prefixed env vars are exposed to the browser — never put private keys there.

---

## ⚠️ Security & the admin dashboard — read this

The admin login and route guard in `src/admin/auth.js` and `RequireAuth.jsx` are a **client-side demo only**. They are **not secure**: the credential check runs in the browser and the "session" is a `localStorage` flag. This exists so you can explore the dashboard UI.

**Before launch you must replace it with real, server-side authentication:**
- Verify credentials on a backend (Supabase Auth, Firebase Auth, Auth0, or your own API with hashed passwords).
- Use secure, http-only session cookies or short-lived tokens.
- Enforce role-based access, rate limiting, and input validation **on the server**.
- Add CSRF protection for server-side forms and a Content-Security-Policy header at your host/CDN.

Demo login (shown on the login screen on purpose): **`admin` / `demo1234`**.

The contact form (`src/pages/Contact.jsx`) is also demo-only — it validates input client-side but does not transmit anything. Wire it to your backend/email service with server-side validation, spam/CAPTCHA checks, and rate limiting before going live.

---

## Honesty about demo content

Per the brief, demo content is clearly labeled and contains **no invented metrics**:
- Reviews carry an `isDemo` flag and render a visible "Demo" badge.
- Case studies use safe, qualitative result phrasing (e.g. "improved visibility, better lead quality").
- Images are obviously-marked placeholder components (`DemoImage`) — swap them for real `<img loading="lazy">` assets when ready.
- Privacy and Terms pages are starter templates and should be reviewed by legal counsel.

---

## Editing the site

- **Brand, contact info, hours:** `src/data/company.js` (or the admin Settings panel).
- **Services:** `src/data/services.js`. Featured services have hand-written rich content; the rest auto-generate category-aware content via `src/utils/serviceContent.js`.
- **Locations:** `src/data/locations.js` — add a location object and every service instantly gains a page for it.
- **Service + location copy:** auto-generated by `src/utils/serviceLocation.js`; fine-tune individual pages in the admin Service + Location panel.

---

## Production checklist

- [ ] Replace demo auth with real server-side authentication.
- [ ] Connect `store.js` to your CMS/database.
- [ ] Wire the contact form to a backend with validation, rate limiting, and spam protection.
- [ ] Generate and host a real `sitemap.xml` (enumerate static routes + every service×location URL) and reference it in `robots.txt`.
- [ ] Replace `DemoImage` placeholders with optimized real images and add `og-default.png`.
- [ ] Add live Google Map embed on the contact page.
- [ ] Review Privacy & Terms with counsel.
- [ ] Set security headers (CSP, HSTS) at your host/CDN; serve over HTTPS.

---

Built for Fivo LLC · Sterling Heights, MI.
