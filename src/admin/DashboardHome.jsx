import { Link } from 'react-router-dom'
import Icon from '../components/Icon.jsx'
import { getServices, getReviews, getCaseStudies } from '../utils/store.js'
import { locations } from '../data/locations.js'

export default function DashboardHome() {
  const services = getServices()
  const reviews = getReviews()
  const caseStudies = getCaseStudies()

  const stats = [
    { label: 'Services', value: services.length, to: '/admin/services', icon: 'briefcase' },
    { label: 'Locations', value: locations.length, to: '/admin/service-locations', icon: 'pin' },
    { label: 'Reviews', value: reviews.length, to: '/admin/reviews', icon: 'star' },
    { label: 'Case studies', value: caseStudies.length, to: '/admin/service-locations', icon: 'chart' },
  ]

  const combos = services.length * locations.length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Dashboard</h1>
        <p className="mt-1 text-ink-muted">Manage the content that powers your public site.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="card-hover">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name={s.icon} className="h-5 w-5" />
              </div>
              <Icon name="arrow" className="h-4 w-4 text-ink-muted" />
            </div>
            <p className="mt-4 text-3xl font-extrabold text-ink">{s.value}</p>
            <p className="text-sm text-ink-muted">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="card">
        <h2 className="font-extrabold text-ink">Programmatic SEO reach</h2>
        <p className="mt-2 prose-body">
          Your service catalog ({services.length}) combined with your locations ({locations.length}) automatically generates{' '}
          <strong className="text-ink">{combos.toLocaleString()} unique service + location landing pages</strong>, each with its
          own H1, meta, intro, local FAQs, and schema. Edit any individual page from the Service + Location panel.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link to="/admin/services" className="btn btn-secondary">Manage services</Link>
          <Link to="/admin/service-locations" className="btn btn-ghost">Edit a landing page</Link>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-ink-soft">
        <h3 className="font-bold text-ink">Connecting a real backend</h3>
        <p className="mt-2">
          This dashboard writes to your browser (localStorage) so you can preview live editing. To persist content for all
          visitors, wire the functions in <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs">src/utils/store.js</code> to
          your CMS or database (Supabase, Strapi, Sanity, or a custom API). The UI won't need to change. See the README.
        </p>
      </div>
    </div>
  )
}
