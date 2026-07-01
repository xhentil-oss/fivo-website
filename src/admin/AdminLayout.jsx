import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { logout, getSession } from './auth.js'
import Icon from '../components/Icon.jsx'

const NAV = [
  { to: '/admin', end: true, label: 'Dashboard', icon: 'layout' },
  { to: '/admin/services', label: 'Services', icon: 'briefcase' },
  { to: '/admin/reviews', label: 'Reviews', icon: 'star' },
  { to: '/admin/service-locations', label: 'Service + Location', icon: 'pin' },
  { to: '/admin/settings', label: 'Settings', icon: 'gear' },
]

export default function AdminLayout() {
  const navigate = useNavigate()
  const session = getSession()
  const [open, setOpen] = useState(false)

  function handleLogout() {
    logout()
    navigate('/admin/login', { replace: true })
  }

  const linkBase = 'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition'
  const linkCls = ({ isActive }) =>
    `${linkBase} ${isActive ? 'bg-brand-50 text-brand-700' : 'text-ink-soft hover:bg-slate-50'}`

  return (
    <>
      <Helmet><title>Admin | Fivo LLC</title><meta name="robots" content="noindex,nofollow" /></Helmet>
      <div className="min-h-screen bg-slate-50">
        {/* Top bar (mobile) */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
          <Link to="/admin" className="flex items-center gap-2 font-display font-extrabold text-ink">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-white">F</span> Admin
          </Link>
          <button onClick={() => setOpen((o) => !o)} className="rounded-lg border border-slate-200 p-2" aria-label="Toggle menu">
            <Icon name="layout" className="h-5 w-5 text-ink-soft" />
          </button>
        </div>

        <div className="mx-auto flex max-w-7xl">
          {/* Sidebar */}
          <aside className={`${open ? 'block' : 'hidden'} w-full border-b border-slate-200 bg-white lg:block lg:w-64 lg:shrink-0 lg:border-b-0 lg:border-r lg:min-h-screen`}>
            <div className="hidden items-center gap-2 px-5 py-5 font-display text-lg font-extrabold text-ink lg:flex">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-gradient text-white">F</span>
              Fivo Admin
            </div>
            <nav className="space-y-1 p-3" onClick={() => setOpen(false)}>
              {NAV.map((n) => (
                <NavLink key={n.to} to={n.to} end={n.end} className={linkCls}>
                  <Icon name={n.icon} className="h-5 w-5" /> {n.label}
                </NavLink>
              ))}
            </nav>
            <div className="border-t border-slate-100 p-3">
              <Link to="/" className={`${linkBase} text-ink-soft hover:bg-slate-50`}>
                <Icon name="arrow" className="h-5 w-5 rotate-180" /> View site
              </Link>
              <button onClick={handleLogout} className={`${linkBase} w-full text-left text-ink-soft hover:bg-slate-50`}>
                <Icon name="shield" className="h-5 w-5" /> Log out
              </button>
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 p-5 lg:p-8">
            <div className="mb-6 rounded-xl border border-brand-100 bg-brand-50/60 px-4 py-3 text-sm text-ink-soft">
              Signed in as <span className="font-semibold">{session?.user}</span>. Changes save to the MariaDB database and go live for all visitors.
            </div>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}
