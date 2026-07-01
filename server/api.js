// Express API router (mounted at /api by the server). Public reads + auth'd writes.
import { Router } from 'express'
import {
  getSnapshot,
  saveCollection,
  saveSettings,
  saveServiceLocationPage,
  saveContactMessage,
} from './repo.js'
import { authenticate, requireAuth } from './auth.js'

// Tiny in-memory rate limiter (per IP + bucket). Good enough for a single node;
// use nginx limit_req or a shared store if you scale horizontally.
const hits = new Map()
function rateLimit(bucket, max, windowMs) {
  return (req, res, next) => {
    const key = `${bucket}:${req.ip}`
    const now = Date.now()
    const rec = hits.get(key)
    if (!rec || now > rec.reset) {
      hits.set(key, { count: 1, reset: now + windowMs })
      return next()
    }
    if (rec.count >= max) return res.status(429).json({ error: 'Too many requests' })
    rec.count++
    next()
  }
}

const COLLECTIONS = new Set(['services', 'locations', 'reviews', 'caseStudies'])

export function createApiRouter() {
  const api = Router()

  // ---- Auth ----
  api.post('/auth/login', rateLimit('login', 10, 15 * 60 * 1000), async (req, res) => {
    const { username, password } = req.body || {}
    if (!username || !password) return res.status(400).json({ error: 'Missing credentials' })
    let result
    try {
      result = await authenticate(String(username), String(password))
    } catch (e) {
      console.error('[auth] login failed:', e.message)
      return res.status(503).json({ error: 'Authentication service unavailable' })
    }
    if (!result) return res.status(401).json({ error: 'Invalid username or password' })
    res.json(result)
  })

  api.get('/auth/me', requireAuth, (req, res) => res.json({ user: req.user }))

  // ---- Content (public read for hydration / admin editing) ----
  api.get('/content', async (_req, res) => {
    res.json(await getSnapshot())
  })

  // ---- Writes (admin only) ----
  api.post('/collections/:name', requireAuth, async (req, res) => {
    const { name } = req.params
    if (!COLLECTIONS.has(name)) return res.status(400).json({ error: 'Unknown collection' })
    if (!Array.isArray(req.body)) return res.status(400).json({ error: 'Expected an array' })
    await saveCollection(name, req.body)
    res.json({ ok: true })
  })

  api.post('/settings/:key', requireAuth, async (req, res) => {
    await saveSettings(req.params.key, req.body || {})
    res.json({ ok: true })
  })

  api.post('/service-location/:service/:location', requireAuth, async (req, res) => {
    await saveServiceLocationPage(req.params.service, req.params.location, req.body || {})
    res.json({ ok: true })
  })

  // ---- Contact (public, rate-limited) ----
  api.post('/contact', rateLimit('contact', 5, 10 * 60 * 1000), async (req, res) => {
    const b = req.body || {}
    if (b.company_url) return res.json({ ok: true }) // honeypot tripped
    if (!b.fullName || !b.email || !b.message) {
      return res.status(400).json({ error: 'Missing required fields' })
    }
    await saveContactMessage({ ...b, ip: req.ip })
    res.json({ ok: true })
  })

  return api
}
