// Server-side admin auth: bcrypt password check + JWT bearer tokens.
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { getUserByUsername, touchLogin } from './repo.js'

const SECRET = process.env.JWT_SECRET
const EXPIRES = process.env.JWT_EXPIRES || '12h'

if (!SECRET && process.env.NODE_ENV === 'production') {
  // Fail fast in prod rather than signing with a weak/undefined secret.
  throw new Error('JWT_SECRET is required in production')
}

export function signToken(user) {
  return jwt.sign({ sub: user.id, username: user.username, role: user.role }, SECRET || 'dev-secret', {
    expiresIn: EXPIRES,
  })
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET || 'dev-secret')
  } catch {
    return null
  }
}

// Validate credentials against the DB. Returns { token, user } or null.
export async function authenticate(username, password) {
  const row = await getUserByUsername(username)
  if (!row) return null
  const ok = await bcrypt.compare(password, row.password_hash)
  if (!ok) return null
  await touchLogin(row.id).catch(() => {})
  const user = { id: row.id, username: row.username, role: row.role }
  return { token: signToken(user), user }
}

// Express middleware — requires a valid Bearer token. Bearer (not cookie)
// means write requests aren't auto-sent by the browser, so CSRF isn't a vector.
export function requireAuth(req, res, next) {
  const header = req.headers.authorization || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : null
  const payload = token && verifyToken(token)
  if (!payload) return res.status(401).json({ error: 'Unauthorized' })
  req.user = payload
  next()
}
