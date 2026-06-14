import { Link } from 'react-router-dom'

// Visible breadcrumb trail. Pair with breadcrumbSchema() in SEOHead for SEO.
// crumbs: [{ name, path }] — last item is the current page (not linked).
export default function Breadcrumbs({ crumbs = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-ink-muted">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span className="font-medium text-ink-soft" aria-current="page">{c.name}</span>
              ) : (
                <>
                  <Link to={c.path} className="hover:text-brand-700">{c.name}</Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
