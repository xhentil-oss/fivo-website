import { Link } from 'react-router-dom'
import { company, fullAddress } from '../data/company.js'
import { getHomepageServices } from '../data/services.js'
import { locations } from '../data/locations.js'
import Icon from './Icon.jsx'
import { SocialProofFooter } from './SocialProof.jsx'

export default function Footer() {
  const year = new Date().getFullYear()
  const topServices = getHomepageServices()
  const topLocations = locations.filter((l) => l.type === 'city').slice(0, 8)

  return (
    <>
      <footer className="mt-20 bg-ink text-white/80">
        <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand + NAP */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-gradient font-display text-lg font-extrabold text-white">F</span>
              <span className="font-display text-xl font-extrabold text-white">Fivo<span className="text-accent-500">.</span></span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">{company.tagline}</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-start gap-2.5"><Icon name="pin" className="mt-0.5 h-4 w-4 text-accent-400" /> {fullAddress}</li>
              <li className="flex items-center gap-2.5"><Icon name="phone" className="h-4 w-4 text-accent-400" /> <a href={company.phoneHref} className="hover:text-white">{company.phone}</a></li>
              <li className="flex items-center gap-2.5"><Icon name="mail" className="h-4 w-4 text-accent-400" /> <a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a></li>
              <li className="flex items-center gap-2.5"><Icon name="calendar" className="h-4 w-4 text-accent-400" /> {company.hoursLabel}</li>
            </ul>
            <div className="mt-6">
              <SocialProofFooter />
            </div>
          </div>

          <FooterCol title="Services">
            {topServices.map((s) => (
              <FooterLink key={s.id} to={`/services/${s.slug}`}>{s.title}</FooterLink>
            ))}
            <FooterLink to="/services">All services →</FooterLink>
          </FooterCol>

          <FooterCol title="Locations">
            {topLocations.map((l) => (
              <FooterLink key={l.id} to={`/locations/${l.slug}`}>{l.city}</FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink to="/about">About</FooterLink>
            <FooterLink to="/case-studies">Case Studies</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
            <FooterLink to="/admin">Admin</FooterLink>
          </FooterCol>
        </div>

        <div className="border-t border-white/10">
          <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-sm text-white/50 sm:flex-row">
            <p>© {year} {company.name}. All rights reserved.</p>
            <div className="flex items-center gap-4">
              {Object.entries(company.social).map(([k, url]) => (
                <a key={k} href={url} className="capitalize hover:text-white" target="_blank" rel="noopener noreferrer">{k}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating click-to-call on mobile */}
      <a
        href={company.phoneHref}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-accent-500 px-5 py-3 text-sm font-semibold text-white shadow-lift lg:hidden"
        aria-label={`Call ${company.name}`}
      >
        <Icon name="phone" className="h-4 w-4" /> Call now
      </a>
    </>
  )
}

function FooterCol({ title, children }) {
  return (
    <div>
      <p className="mb-3 text-sm font-bold text-white">{title}</p>
      <ul className="space-y-2 text-sm">{children}</ul>
    </div>
  )
}
function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="text-white/60 hover:text-white">{children}</Link>
    </li>
  )
}
