// Admin auth — real, server-side. Credentials are verified by the API against
// bcrypt-hashed passwords in MariaDB; the API returns a JWT that we send as a
// Bearer token on write requests (see utils/api.js). The client only holds the
// token + a display copy of the user; it can no longer self-authorize.

import { apiLogin, setToken, getToken } from '../utils/api.js'

const SESSION_KEY = 'fivo_admin_user_v1'

export async function login(username, password) {
  try {
    const user = await apiLogin(username, password)
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ user: user.username, role: user.role }))
    } catch {
      /* ignore */
    }
    return { ok: true }
  } catch (e) {
    return { ok: false, error: e.message || 'Invalid username or password.' }
  }
}

export function logout() {
  setToken(null)
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

// A present token gates the UI; the server independently enforces auth on every
// write, so a tampered client can't actually change data.
export function isAuthenticated() {
  return !!getToken()
}
