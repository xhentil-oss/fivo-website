import { useParams, Link, Navigate } from 'react-router-dom'
import SEOHead from '../components/SEOHead.jsx'
import Icon from '../components/Icon.jsx'
import FAQAccordion from '../components/FAQAccordion.jsx'
import CTASection from '../components/CTASection.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import DemoImage from '../components/DemoImage.jsx'
import LocationLinks from '../components/LocationLinks.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import { getServiceBySlug } from '../data/services.js'
import { getServiceContent } from '../utils/serviceContent.js'
import { getReviews } from '../utils/store.js'
import { locations } from '../data/locations.js'
import { serviceSchema, faqSchema, breadcrumbSchema } from '../utils/schema.js'

export default function ServiceDetail() {
  const { serviceSlug } = useParams()
  const service = getServiceBySlug(serviceSlug)
  if (!service) return <Navigate to="/services" replace />

  const c = getServiceContent(service)
  const reviews = getReviews().slice(0, 2)
  const topCities = locations.filter((l) => l.type === 'city').slice(0, 8)
  const related = (service.relatedServices || []).map(getServiceBySlug).filter(Boolean)

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: service.title, path: `/services/${service.slug}` },
  ]

  return (
    <>
      <SEOHead
        title={c.seoTitle}
        description={c.metaDescription}
        path={`/services/${service.slug}`}
        schemas={[
          breadcrumbSchema(crumbs),
          serviceSchema({ name: service.title, description: c.metaDescription }),
          faqSchema(c.faqs),
        ]}
      />

      {/* Hero */}
      <section className="bg-mesh">
        <div className="container-x grid items-center gap-10 py-14 lg:grid-cols-2">
          <div>
            <Breadcrumbs crumbs={crumbs} />
            <span className="mt-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-white shadow-lift">
              <Icon name={service.icon} className="h-7 w-7" />
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">{c.tagline}</h1>
            <p className="mt-4 max-w-xl text-lg prose-body">{c.fullDescription[0]}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary">Get a Free Audit <Icon name="arrow" className="h-4 w-4" /></Link>
              <Link to="/case-studies" className="btn-ghost">See results</Link>
            </div>
          </div>
          <DemoImage label={`${service.title} in action`} aspect="aspect-[5/4]" icon={<Icon name={service.icon} className="h-10 w-10 text-brand-500" />} />
        </div>
      </section>

      {/* Overview + problems */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-2xl font-extrabold">Why {service.title.toLowerCase()} matters</h2>
            {c.fullDescription.map((p, i) => <p key={i} className="prose-body">{p}</p>)}
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-accent-600">Problems we solve</h3>
            <ul className="mt-4 space-y-3">
              {c.problemsSolved.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-ink-soft">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section bg-slate-50">
        <div className="container-x">
          <h2 className="text-center text-3xl font-extrabold">What you get with Fivo LLC</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {c.benefits.map((b) => (
              <div key={b.title} className="card h-full">
                <Icon name="check" className="h-6 w-6 text-brand-600" />
                <h3 className="mt-3 font-bold text-ink">{b.title}</h3>
                <p className="mt-1.5 text-sm prose-body">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section">
        <div className="container-x">
          <h2 className="text-3xl font-extrabold">Our process</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.process.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-slate-100 p-5">
                <span className="text-sm font-bold text-accent-600">0{i + 1}</span>
                <h3 className="mt-1 font-bold text-ink">{step.title}</h3>
                <p className="mt-1.5 text-sm prose-body">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="section bg-slate-50">
        <div className="container-x">
          <h2 className="text-3xl font-extrabold">What clients say</h2>
          <p className="mt-2 text-sm text-ink-muted">Demo reviews shown as placeholders.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-x grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-3xl font-extrabold">Frequently asked questions</h2>
            <p className="mt-3 prose-body">Still have a question? <Link to="/contact" className="font-semibold text-brand-700">Get in touch</Link> and we will answer honestly.</p>
          </div>
          <FAQAccordion faqs={c.faqs} />
        </div>
      </section>

      {/* Related services + locations */}
      <section className="section bg-slate-50">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          {related.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-accent-600">Related services</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {related.map((r) => (
                  <Link key={r.id} to={`/services/${r.slug}`} className="rounded-full border border-brand-100 bg-white px-3.5 py-1.5 text-sm text-ink-soft hover:border-brand-300 hover:text-brand-700">
                    {r.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <LocationLinks
            slugs={topCities.map((l) => l.slug)}
            servicePrefix={service.slug}
            title={`${service.title} by location`}
          />
        </div>
      </section>

      <CTASection
        title={`Ready to grow with ${service.title.toLowerCase()}?`}
        text="Book a free marketing audit and we'll show you exactly where the opportunities are."
        primary={{ label: 'Get a Free Marketing Audit', to: '/contact' }}
      />
    </>
  )
}
