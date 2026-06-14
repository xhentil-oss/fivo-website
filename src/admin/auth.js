// ⚠️ DEMO AUTH ONLY — NOT SECURE. ⚠️
//
// This is a CLIENT-SIDE MOCK so you can explore the admin UI. It does NOT
// provide real security: the "password" check happens in the browser and the
// session is just a localStorage flag. Anyone can bypass it with dev tools.
//
// FOR PRODUCTION you MUST replace this with real, server-side authentication:
//   - Verify credentials on a backend (Supabase Auth, Firebase Auth, Auth0,
//     or your own Node API with hashed passwords).
//   - Issue secure, http-only session cookies or short-lived JWTs.
//   - Enforce role-based access and rate limiting on the server.
//   - Never ship admin credentials or secrets in frontend code / env that is
//     bundled to the client (only VITE_-prefixed vars reach the browser).
// See README → "Security & the admin dashboard".

const SESSION_KEY = 'fivo_admin_session_v1'

// Demo credentials (visible on the login screen on purpose — this is a demo).
const DEMO_USER = 'admin'
const DEMO_PASS = 'demo1234'

export function login(username, password) {
  // In production: POST to your auth endpoint and let the SERVER decide.
  if (username === DEMO_USER && password === DEMO_PASS) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ user: username, role: 'admin', at: Date.now() }))
    } catch { /* ignore */ }
    return { ok: true }
  }
  return { ok: false, error: 'Invalid credentials. Try the demo login shown below.' }
}

export function logout() {
  try { localStorage.removeItem(SESSION_KEY) } catch { /* ignore */ }
}

export function getSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null') } catch { return null }
}

export function isAuthenticated() {
  return !!getSession()
}

export const DEMO_CREDENTIALS = { user: DEMO_USER, pass: DEMO_PASS }
