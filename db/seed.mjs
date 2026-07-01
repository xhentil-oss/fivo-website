// One-time database setup + seed. Run on the VPS after creating the database:
//   node db/seed.mjs
//
// It (1) applies db/schema.sql, (2) loads the current seed content into MariaDB,
// and (3) creates the initial admin user from ADMIN_USERNAME / ADMIN_PASSWORD.
// Content rows are upserted, so re-running refreshes the seed items without
// dropping admin-added ones. Reads DB config from environment (see .env.example).

import 'dotenv/config'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import mysql from 'mysql2/promise'
import bcrypt from 'bcryptjs'

import { services } from '../src/data/services.js'
import { locations } from '../src/data/locations.js'
import { reviews } from '../src/data/reviews.js'
import { caseStudies } from '../src/data/caseStudies.js'
import { company } from '../src/data/company.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = '3306',
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  ADMIN_USERNAME = 'admin',
  ADMIN_PASSWORD,
} = process.env

if (!DB_USER || !DB_NAME) {
  console.error('Missing DB_USER / DB_NAME. Set them in .env (see .env.example).')
  process.exit(1)
}

const conn = await mysql.createConnection({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  multipleStatements: true,
})

console.log(`Connected to ${DB_NAME}@${DB_HOST}:${DB_PORT}`)

// 1) Schema
const schema = readFileSync(resolve(__dirname, 'schema.sql'), 'utf8')
await conn.query(schema)
console.log('✓ schema applied')

// 2) Content
async function seedCollection(name, rows) {
  const sql =
    'INSERT INTO content (collection, item_id, slug, position, data) VALUES ? ' +
    'ON DUPLICATE KEY UPDATE slug=VALUES(slug), position=VALUES(position), data=VALUES(data)'
  const values = rows.map((r, i) => [name, String(r.id), r.slug || null, i, JSON.stringify(r)])
  await conn.query(sql, [values])
  console.log(`✓ ${name}: ${rows.length}`)
}

await seedCollection('services', services)
await seedCollection('locations', locations)
await seedCollection('reviews', reviews)
await seedCollection('caseStudies', caseStudies)

await conn.query(
  'INSERT INTO settings (skey, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data=VALUES(data)',
  ['company', JSON.stringify(company)],
)
console.log('✓ settings: company')

// 3) Admin user
if (ADMIN_PASSWORD) {
  const hash = await bcrypt.hash(ADMIN_PASSWORD, 12)
  await conn.query(
    'INSERT INTO users (username, password_hash, role) VALUES (?, ?, ?) ' +
      'ON DUPLICATE KEY UPDATE password_hash=VALUES(password_hash)',
    [ADMIN_USERNAME, hash, 'admin'],
  )
  console.log(`✓ admin user: ${ADMIN_USERNAME}`)
} else {
  console.warn('! ADMIN_PASSWORD not set — skipped creating the admin user.')
}

await conn.end()
console.log('Done.')
