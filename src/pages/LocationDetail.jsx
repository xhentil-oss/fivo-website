import { useParams, Link, Navigate } from 'react-router-dom'
import SEOHead from '../components/SEOHead.jsx'
import Icon from '../components/Icon.jsx'
import CTASection from '../components/CTASection.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import DemoImage from '../components/DemoImage.jsx'
import LocationLinks from '../components/LocationLinks.jsx'
import { getLocationBySlug } from '../data/locations.js'
import { serviceCategories, getServicesByCategory } from '../data/services.js'
import { localBusinessSchema, breadcrumbSchema } from '../utils/schema.js'

export default function LocationDetail() {
  const { locationSlug } = useParams()
  const loc = getLocationBySlug(locationSlug)
  if (!loc) return <Navigate to="/" replace />

  const place = loc.type === 'state' ? loc.stateName : `${loc.city}, ${loc.state}`
  const name = loc.type === 'state' ? loc.stateName : loc.city

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Locations', path: `/locations/${loc.slug}` },
    { name: place, path: `/locations/${loc.slug}` },
  ]

  return (
    <>
      <SEOHead
        title={`Marketing Services in ${place} | Fivo LLC`}
        description={`Fivo LLC provides SEO, paid ads, social media, branding, and web design for ${name} businesses. Get a free marketing audit for ${place}.`}
        path={`/locations/${loc.slug}`}
        schemas={[breadcrumbSchema(crumbs), localBusinessSchema({ areaServed: place })]}
      />

      <section className="bg-mesh">
        <div className="container-x grid items-center gap-10 py-14 lg:grid-cols-2">
          <div>
            <Breadcrumbs crumbs={crumbs} />
            <p className="eyebrow mt-4">Serving {place}</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">Marketing services in {place}</h1>
            <p className="mt-4 max-w-xl text-lg prose-body">
              Fivo LLC helps {name} businesses get found, build trust, and turn marketing into measurable growth — from SEO and paid ads to branding and web design.
            </p>
            <Link to="/contact" className="btn-primary mt-7">Get a Free {name} Audit <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
          <DemoImage label={`${name} local business growth`} aspect="aspect-[5/4]" icon={<Icon name="pin" className="h-10 w-10 text-brand-500" />} />
        </div>
      </section>

      <div className="container-x section space-y-12">
        {serviceCategories.map((cat) => {
          const items = getServicesByCategory(cat.id)
          if (!items.length) return null
          return (
            <section key={cat.id}>
              <h2 className="text-2xl font-extrabold">{cat.label} in {place}</h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <Link
                    key={s.id}
                    to={`/services/${s.slug}/${loc.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-white px-4 py-3 transition-colors hover:border-brand-200 hover:bg-brand-50"
                  >
                    <span className="flex items-center gap-3">
                      <Icon name={s.icon} className="h-5 w-5 text-brand-600" />
                      <span className="text-sm font-semibold text-ink">{s.title} in {name}</span>
                    </span>
                    <Icon name="arrow" className="h-4 w-4 text-brand-600 transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </section>
          )
        })}

        <LocationLinks slugs={loc.nearby || []} title="Nearby areas we serve" />
      </div>

      <CTASection
        title={`Grow your ${name} business`}
        text={`Book a free consultation and see how Fivo LLC can help your ${place} business attract more qualified customers.`}
      />
    </>
  )
}
