// Thin client for the server API (same origin by default; override with
// VITE_API_BASE if the API is hosted separately). Admin auth uses a JWT bearer
// token stored in localStorage — bearer (not a cookie) so writes can't be
// triggered via CSRF.

const BASE = import.meta.env.VITE_API_BASE || '/api'
const TOKEN_KEY = 'fivo_token'

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}
export function setToken(t) {
  try {
    if (t) localStorage.setItem(TOKEN_KEY, t)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* ignore */
  }
}

async function request(path, { method = 'GET', body } = {}) {
  const token = getToken()
  const res = await fetch(BASE + path, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const msg = await res.json().catch(() => ({}))
    throw new Error(msg.error || `Request failed (${res.status})`)
  }
  return res.json().catch(() => ({}))
}

export const apiGet = (path) => request(path)
export const apiPost = (path, body) => request(path, { method: 'POST', body })

// ---- Auth ----
export async function apiLogin(username, password) {
  const { token, user } = await request('/auth/login', {
    method: 'POST',
    body: { username, password },
  })
  setToken(token)
  return user
}
