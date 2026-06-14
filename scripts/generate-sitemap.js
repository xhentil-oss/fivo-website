// Build-time sitemap generator.
// Enumerates every public route — static pages, each service, each location,
// and every service × location combination — into public/sitemap.xml.
// Runs automatically before `vite build` via the npm `prebuild` hook, so the
// sitemap referenced in robots.txt is always in sync with the seed data.
//
// /admin is intentionally excluded (disallowed in robots.txt).

import { writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

import { company } from '../src/data/company.js'
import { services } from '../src/data/services.js'
import { locations } from '../src/data/locations.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

const BASE = company.website.replace(/\/+$/, '')
const today = new Date().toISOString().slice(0, 10)

// Each entry: { path, priority, changefreq }
const urls = []
const add = (path, priority, changefreq) =>
  urls.push({ path, priority, changefreq })

// Static pages
add('/', '1.0', 'weekly')
add('/about', '0.7', 'monthly')
add('/services', '0.8', 'weekly')
add('/case-studies', '0.7', 'monthly')
add('/contact', '0.8', 'monthly')
add('/privacy', '0.3', 'yearly')
add('/terms', '0.3', 'yearly')

// Service hub pages
for (const s of services) add(`/services/${s.slug}`, '0.7', 'monthly')

// Location pages
for (const l of locations) add(`/locations/${l.slug}`, '0.6', 'monthly')

// Programmatic service × location landing pages
for (const s of services) {
  for (const l of locations) {
    add(`/services/${s.slug}/${l.slug}`, '0.5', 'monthly')
  }
}

const xmlEscape = (str) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const body = urls
  .map(
    ({ path, priority, changefreq }) =>
      `  <url>\n` +
      `    <loc>${xmlEscape(BASE + path)}</loc>\n` +
      `    <lastmod>${today}</lastmod>\n` +
      `    <changefreq>${changefreq}</changefreq>\n` +
      `    <priority>${priority}</priority>\n` +
      `  </url>`
  )
  .join('\n')

const xml =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  `${body}\n` +
  `</urlset>\n`

const outDir = resolve(ROOT, 'public')
mkdirSync(outDir, { recursive: true })
writeFileSync(resolve(outDir, 'sitemap.xml'), xml, 'utf8')

console.log(`✓ sitemap.xml — ${urls.length} URLs (${BASE})`)
