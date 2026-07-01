// Content repository — all MariaDB reads/writes for the site (server-only).
// The public site reads a cached snapshot (refreshed on write / TTL); the admin
// API writes through the save* functions, which invalidate the cache.

import { getPool, parseJson } from './db.js'

// Seed fallback: when no DB is configured (local dev without MariaDB) or a query
// fails, the site still renders from the bundled seed content. On the VPS, set
// DB_NAME (+ creds) and run db/seed.mjs to switch to MariaDB.
import { services as seedServices } from '../src/data/services.js'
import { locations as seedLocations } from '../src/data/locations.js'
import { reviews as seedReviews } from '../src/data/reviews.js'
import { caseStudies as seedCaseStudies } from '../src/data/caseStudies.js'
import { company as seedCompany } from '../src/data/company.js'

const DB_ENABLED = Boolean(process.env.DB_NAME)
const seedSnapshot = () => ({
  services: seedServices,
  locations: seedLocations,
  reviews: seedReviews,
  caseStudies: seedCaseStudies,
  company: seedCompany,
  serviceLocationPages: {},
})

// ---- Low-level reads ----
async function readCollection(name) {
  const [rows] = await getPool().query(
    'SELECT data FROM content WHERE collection = ? ORDER BY position ASC, item_id ASC',
    [name],
  )
  return rows.map((r) => parseJson(r.data)).filter(Boolean)
}

async function readSettings(key) {
  const [rows] = await getPool().query('SELECT data FROM settings WHERE skey = ?', [key])
  return rows.length ? parseJson(rows[0].data) : null
}

async function readServiceLocationPages() {
  const [rows] = await getPool().query(
    'SELECT service_slug, location_slug, data FROM service_location_pages',
  )
  const map = {}
  for (const r of rows) map[`${r.service_slug}/${r.location_slug}`] = parseJson(r.data)
  return map
}

// ---- Snapshot (whole-site content) with a small in-memory cache ----
let cache = null
let cacheAt = 0
const TTL = Number(process.env.CONTENT_TTL_MS || 30000)

export function invalidateSnapshot() {
  cache = null
}

export async function getSnapshot() {
  if (!DB_ENABLED) return seedSnapshot()
  const now = Date.now()
  if (cache && now - cacheAt < TTL) return cache
  try {
    const [services, locations, reviews, caseStudies, company, serviceLocationPages] =
      await Promise.all([
        readCollection('services'),
        readCollection('locations'),
        readCollection('reviews'),
        readCollection('caseStudies'),
        readSettings('company'),
        readServiceLocationPages(),
      ])
    const seed = seedSnapshot()
    cache = {
      // Fall back to seed per-collection so a partially-seeded DB still renders.
      services: services.length ? services : seed.services,
      locations: locations.length ? locations : seed.locations,
      reviews: reviews.length ? reviews : seed.reviews,
      caseStudies: caseStudies.length ? caseStudies : seed.caseStudies,
      company: company || seed.company,
      serviceLocationPages,
    }
    cacheAt = now
    return cache
  } catch (err) {
    console.error('[repo] DB read failed, serving seed content:', err.message)
    return seedSnapshot()
  }
}

// ---- Writes (admin) ----
export async function saveCollection(name, items) {
  const conn = await getPool().getConnection()
  try {
    await conn.beginTransaction()
    await conn.query('DELETE FROM content WHERE collection = ?', [name])
    if (items.length) {
      const values = items.map((r, i) => [
        name,
        String(r.id),
        r.slug || null,
        i,
        JSON.stringify(r),
      ])
      await conn.query(
        'INSERT INTO content (collection, item_id, slug, position, data) VALUES ?',
        [values],
      )
    }
    await conn.commit()
  } catch (e) {
    await conn.rollback()
    throw e
  } finally {
    conn.release()
  }
  invalidateSnapshot()
}

export async function saveSettings(key, data) {
  await getPool().query(
    'INSERT INTO settings (skey, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)',
    [key, JSON.stringify(data)],
  )
  invalidateSnapshot()
}

export async function saveServiceLocationPage(serviceSlug, locationSlug, data) {
  await getPool().query(
    'INSERT INTO service_location_pages (service_slug, location_slug, data) VALUES (?, ?, ?) ' +
      'ON DUPLICATE KEY UPDATE data = VALUES(data)',
    [serviceSlug, locationSlug, JSON.stringify(data)],
  )
  invalidateSnapshot()
}

// ---- Auth ----
export async function getUserByUsername(username) {
  const [rows] = await getPool().query('SELECT * FROM users WHERE username = ? LIMIT 1', [username])
  return rows[0] || null
}

export async function touchLogin(id) {
  await getPool().query('UPDATE users SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?', [id])
}

// ---- Contact ----
export async function saveContactMessage(m) {
  await getPool().query(
    'INSERT INTO contact_messages (full_name, business, email, phone, website, service, location, budget, message, ip) ' +
      'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      m.fullName || '',
      m.businessName || null,
      m.email || '',
      m.phone || null,
      m.website || null,
      m.service || null,
      m.location || null,
      m.budget || null,
      m.message || '',
      m.ip || null,
    ],
  )
}
