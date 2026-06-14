import { useParams, Link, Navigate } from 'react-router-dom'
import SEOHead from '../components/SEOHead.jsx'
import Icon from '../components/Icon.jsx'
import FAQAccordion from '../components/FAQAccordion.jsx'
import CTASection from '../components/CTASection.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import DemoImage from '../components/DemoImage.jsx'
import LocationLinks from '../components/LocationLinks.jsx'
import { getServiceBySlug, getHomepageServices } from '../data/services.js'
import { getLocationBySlug } from '../data/locations.js'
import { generateServiceLocationPage } from '../utils/serviceLocation.js'
import { getServiceLocationPage } from '../utils/store.js'
import { serviceSchema, faqSchema, breadcrumbSchema, localBusinessSchema } from '../utils/schema.js'

export default function ServiceLocationPage() {
  const { serviceSlug, locationSlug } = useParams()
  const service = getServiceBySlug(serviceSlug)
  const location = getLocationBySlug(locationSlug)
  if (!service) return <Navigate to="/services" replace />
  if (!location) return <Navigate to={`/services/${serviceSlug}`} replace />

  // Admin-authored override wins; otherwise generate unique content.
  const generated = generateServiceLocationPage(service, location)
  const override = getServiceLocationPage(serviceSlug, locationSlug)
  const page = { ...generated, ...(override || {}) }

  const otherServices = getHomepageServices().filter((s) => s.slug !== service.slug).slice(0, 5)

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.title, path: `/services/${service.slug}` },
    { name: page.place, path: `/services/${service.slug}/${location.slug}` },
  ]

  return (
    <>
      <SEOHead
        title={page.seoTitle}
        description={page.metaDescription}
        path={`/services/${service.slug}/${location.slug}`}
        schemas={[
          breadcrumbSchema(crumbs),
          localBusinessSchema({ areaServed: page.place }),
          serviceSchema({ name: `${service.title} in ${page.place}`, description: page.metaDescription, areaServed: page.place }),
          faqSchema(page.faqs),
        ]}
      />

      {/* Hero */}
      <section className="bg-mesh">
        <div className="container-x grid items-center gap-10 py-14 lg:grid-cols-2">
          <div>
            <Breadcrumbs crumbs={crumbs} />
            <p className="eyebrow mt-4">{service.title} · {page.place}</p>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight sm:text-[2.9rem]">{page.h1}</h1>
            <p className="mt-4 max-w-xl text-lg prose-body">{page.intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary">Get a Free Audit <Icon name="arrow" className="h-4 w-4" /></Link>
              <Link to={`/services/${service.slug}`} className="btn-ghost">About {service.title}</Link>
            </div>
          </div>
          <DemoImage label={`${service.title} for ${page.name} businesses`} aspect="aspect-[5/4]" icon={<Icon name={service.icon} className="h-10 w-10 text-brand-500" />} />
        </div>
      </section>

      {/* Local context + pains */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-extrabold">{service.title} for {page.name} businesses</h2>
            <p className="prose-body">{page.localContext}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent-600">Local challenges we solve</h3>
            <ul className="mt-4 space-y-3">
              {page.localPains.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits + process */}
      <section className="section bg-slate-50">
        <div className="container-x">
          <h2 className="text-3xl font-extrabold">What you get</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {page.benefits.map((b) => (
              <div key={b.title} className="card h-full">
                <Icon name="check" className="h-6 w-6 text-brand-600" />
                <h3 className="mt-3 font-bold text-ink">{b.title}</h3>
                <p className="mt-1.5 text-sm prose-body">{b.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {page.process.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-slate-100 bg-white p-5">
                <span className="text-sm font-bold text-accent-600">0{i + 1}</span>
                <h3 className="mt-1 font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm prose-body">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-3xl font-extrabold">{service.title} in {page.place}: FAQs</h2>
            <p className="mt-3 prose-body">{page.cta}</p>
          </div>
          <FAQAccordion faqs={page.faqs} />
        </div>
      </section>

      {/* Internal links */}
      <section className="section bg-slate-50">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent-600">Other services in {page.place}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {otherServices.map((s) => (
                <Link key={s.id} to={`/services/${s.slug}/${location.slug}`} className="rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-sm text-ink-soft hover:border-brand-300 hover:text-brand-700">
                  {s.title}
                </Link>
              ))}
            </div>
            <Link to={`/locations/${location.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
              All services in {page.place} <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <LocationLinks
            slugs={location.nearby || []}
            servicePrefix={service.slug}
            title={`${service.title} in nearby areas`}
          />
        </div>
      </section>

      <CTASection
        title={page.cta}
        text={`Fivo LLC helps ${page.name} businesses turn marketing into measurable growth.`}
        primary={{ label: 'Book Free Consultation', to: '/contact' }}
      />
    </>
  )
}
