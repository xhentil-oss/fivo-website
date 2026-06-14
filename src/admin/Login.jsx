import { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Head } from 'vite-react-ssg'
import { login, DEMO_CREDENTIALS } from './auth.js'
import Icon from '../components/Icon.jsx'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from || '/admin'

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const res = login(username.trim(), password)
    if (res.ok) navigate(from, { replace: true })
    else setError(res.error)
  }

  const field = 'mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-ink shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100'

  return (
    <>
      <Head><title>Admin Login | Fivo LLC</title><meta name="robots" content="noindex,nofollow" /></Head>
      <div className="flex min-h-screen items-center justify-center bg-mesh px-4">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-6 flex items-center justify-center gap-2 font-display text-xl font-extrabold text-ink">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white">F</span>
            Fivo LLC
          </Link>

          <form onSubmit={handleSubmit} className="card space-y-5">
            <div>
              <h1 className="text-2xl font-extrabold text-ink">Admin sign in</h1>
              <p className="mt-1 text-sm text-ink-muted">Manage services, reviews, and site content.</p>
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">{error}</div>
            )}

            <div>
              <label className="block text-sm font-semibold text-ink-soft" htmlFor="username">Username</label>
              <input id="username" className={field} value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-ink-soft" htmlFor="password">Password</label>
              <input id="password" type="password" className={field} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </div>

            <button type="submit" className="btn btn-primary w-full justify-center">
              Sign in <Icon name="arrow" className="h-4 w-4" />
            </button>

            <div className="rounded-xl border border-accent-100 bg-accent-50/60 p-4 text-sm text-ink-soft">
              <p className="font-semibold text-ink">Demo credentials</p>
              <p className="mt-1">Username: <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">{DEMO_CREDENTIALS.user}</code></p>
              <p>Password: <code className="rounded bg-white px-1.5 py-0.5 font-mono text-xs">{DEMO_CREDENTIALS.pass}</code></p>
              <p className="mt-2 text-xs text-ink-muted">
                This is client-side demo auth only. Replace with real server-side authentication before launch.
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
