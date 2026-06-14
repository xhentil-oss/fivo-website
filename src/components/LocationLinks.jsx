import { Link } from 'react-router-dom'
import { getLocationBySlug } from '../data/locations.js'

// Internal linking block for related locations (and optional service prefix).
// Strengthens local SEO without creating thin duplicate loops.
export default function LocationLinks({ slugs = [], servicePrefix = null, title = 'Nearby areas we serve' }) {
  const locs = slugs.map(getLocationBySlug).filter(Boolean)
  if (!locs.length) return null
  return (
    <div>
      <h3 className="text-sm font-bold uppercase tracking-wider text-accent-600">{title}</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {locs.map((l) => (
          <Link
            key={l.id}
            to={servicePrefix ? `/services/${servicePrefix}/${l.slug}` : `/locations/${l.slug}`}
            className="rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:border-brand-300 hover:text-brand-700"
          >
            {servicePrefix ? `${l.city}` : l.city}
          </Link>
        ))}
      </div>
    </div>
  )
}
