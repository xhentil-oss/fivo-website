import SEOHead from '../components/SEOHead.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import CTASection from '../components/CTASection.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { serviceCategories, getServicesByCategory } from '../data/services.js'
import { breadcrumbSchema } from '../utils/schema.js'

export default function Services() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }]
  return (
    <>
      <SEOHead
        title="Marketing Services — SEO, Ads, Social & Branding | Fivo LLC"
        description="Explore Fivo LLC's full range of marketing services: SEO, Google & Facebook Ads, social media, branding, web design, and lead generation."
        path="/services"
        schemas={[breadcrumbSchema(crumbs)]}
      />
      <section className="bg-mesh">
        <div className="container-x py-14">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-4 max-w-2xl text-4xl font-extrabold sm:text-5xl">Marketing services built to grow your business</h1>
          <p className="mt-4 max-w-2xl text-lg prose-body">From getting found on Google to turning clicks into customers — every service connects into one system designed around results.</p>
        </div>
      </section>

      <div className="container-x section space-y-14">
        {serviceCategories.map((cat) => {
          const items = getServicesByCategory(cat.id)
          if (!items.length) return null
          return (
            <section key={cat.id}>
              <h2 className="text-2xl font-extrabold text-ink">{cat.label}</h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((s) => <ServiceCard key={s.id} service={s} />)}
              </div>
            </section>
          )
        })}
      </div>
      <CTASection />
    </>
  )
}
