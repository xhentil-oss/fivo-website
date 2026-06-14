import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { serviceCategories, getServicesByCategory } from '../data/services.js'
import { locationsByState } from '../data/locations.js'
import { company } from '../data/company.js'
import Icon from './Icon.jsx'

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Fivo LLC home">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient text-white shadow-[0_8px_20px_-8px_rgba(27,78,245,0.8)]">
        <span className="font-display text-lg font-extrabold">F</span>
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-ink">
        Fivo<span className="text-accent-500">.</span>
      </span>
    </Link>
  )
}

export default function Header() {
  const [open, setOpen] = useState(false) // mobile menu
  const [menu, setMenu] = useState(null) // 'services' | 'locations' | null
  const { pathname } = useLocation()
  const navRef = useRef(null)

  // Close menus on route change.
  useEffect(() => {
    setOpen(false)
    setMenu(null)
  }, [pathname])

  // Close desktop dropdowns on outside click / Escape.
  useEffect(() => {
    const onClick = (e) => navRef.current && !navRef.current.contains(e.target) && setMenu(null)
    const onKey = (e) => e.key === 'Escape' && setMenu(null)
    document.addEventListener('mousedown', onClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const navLink = ({ isActive }) =>
    `text-sm font-semibold transition-colors ${isActive ? 'text-brand-700' : 'text-ink-soft hover:text-brand-700'}`

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur-md">
      <div className="container-x flex h-16 items-center justify-between gap-4" ref={navRef}>
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {/* Services mega menu */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-sm font-semibold text-ink-soft hover:text-brand-700"
              aria-expanded={menu === 'services'}
              onClick={() => setMenu(menu === 'services' ? null : 'services')}
            >
              Services
              <Icon name="arrow" className={`h-4 w-4 rotate-90 transition-transform ${menu === 'services' ? '-rotate-90' : ''}`} />
            </button>
            {menu === 'services' && (
              <div className="absolute left-1/2 top-full mt-3 w-[760px] max-w-[90vw] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-6 shadow-lift">
                <div className="grid grid-cols-3 gap-x-6 gap-y-5">
                  {serviceCategories.map((cat) => (
                    <div key={cat.id}>
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-accent-600">{cat.label}</p>
                      <ul className="space-y-1.5">
                        {getServicesByCategory(cat.id).slice(0, 6).map((s) => (
                          <li key={s.id}>
                            <Link to={`/services/${s.slug}`} className="text-sm text-ink-soft hover:text-brand-700">
                              {s.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-sm text-ink-muted">Every service is available across our service areas.</span>
                  <Link to="/services" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
                    View all services →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Locations dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-sm font-semibold text-ink-soft hover:text-brand-700"
              aria-expanded={menu === 'locations'}
              onClick={() => setMenu(menu === 'locations' ? null : 'locations')}
            >
              Locations
              <Icon name="arrow" className={`h-4 w-4 rotate-90 transition-transform ${menu === 'locations' ? '-rotate-90' : ''}`} />
            </button>
            {menu === 'locations' && (
              <div className="absolute left-1/2 top-full mt-3 w-[480px] max-w-[90vw] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-6 shadow-lift">
                <div className="grid grid-cols-2 gap-x-6 gap-y-5">
                  {Object.entries(locationsByState).map(([state, locs]) => (
                    <div key={state}>
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider text-accent-600">{state}</p>
                      <ul className="space-y-1.5">
                        {locs.slice(0, 7).map((l) => (
                          <li key={l.id}>
                            <Link to={`/locations/${l.slug}`} className="text-sm text-ink-soft hover:text-brand-700">
                              {l.city}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <NavLink to="/case-studies" className={navLink}>Case Studies</NavLink>
          <NavLink to="/about" className={navLink}>About</NavLink>
          <NavLink to="/contact" className={navLink}>Contact</NavLink>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <a href={company.phoneHref} className="btn-ghost" aria-label={`Call ${company.name}`}>
            <Icon name="phone" className="h-4 w-4" />
            {company.phone}
          </a>
          <Link to="/contact" className="btn-primary">Free Audit</Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
            <Link to="/services" className="rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-brand-50">Services</Link>
            <Link to="/locations/michigan" className="rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-brand-50">Locations</Link>
            <Link to="/case-studies" className="rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-brand-50">Case Studies</Link>
            <Link to="/about" className="rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-brand-50">About</Link>
            <Link to="/contact" className="rounded-lg px-3 py-2.5 font-semibold text-ink hover:bg-brand-50">Contact</Link>
            <div className="mt-3 flex flex-col gap-2">
              <a href={company.phoneHref} className="btn-ghost w-full">
                <Icon name="phone" className="h-4 w-4" /> Call {company.phone}
              </a>
              <Link to="/contact" className="btn-primary w-full">Get a Free Marketing Audit</Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
