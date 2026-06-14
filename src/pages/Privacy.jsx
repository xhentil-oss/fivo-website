import SEOHead from '../components/SEOHead.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { company, fullAddress } from '../data/company.js'
import { breadcrumbSchema } from '../utils/schema.js'

export default function Privacy() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy' }]
  return (
    <>
      <SEOHead
        title="Privacy Policy | Fivo LLC"
        description="How Fivo LLC collects, uses, and protects the information you share with us."
        path="/privacy"
        schemas={[breadcrumbSchema(crumbs)]}
        noindex
      />
      <section className="bg-mesh">
        <div className="container-x py-14">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Privacy Policy</h1>
          <p className="mt-3 text-ink-muted">Last updated: January 2026</p>
        </div>
      </section>

      <div className="container-x section max-w-3xl">
        <div className="rounded-2xl border border-accent-100 bg-accent-50/60 p-5 text-sm text-ink-soft">
          <strong>Template notice:</strong> This is starter policy content for the demo build. Before launch, have it reviewed by
          legal counsel and tailored to your actual data practices and the jurisdictions you operate in.
        </div>

        <div className="prose-body mt-8 space-y-8">
          <section>
            <h2 className="text-xl font-extrabold text-ink">Introduction</h2>
            <p className="mt-2">
              {company.name} (“we,” “us,” or “our”) respects your privacy. This policy explains what information we collect
              when you use our website and contact us, how we use it, and the choices you have.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-ink">Information we collect</h2>
            <p className="mt-2">
              When you submit a form, we collect the details you provide — such as your name, business name, email, phone number,
              website, and message. We may also collect standard analytics data (pages visited, device and browser type) to
              improve the site.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-ink">How we use your information</h2>
            <p className="mt-2">
              We use your information to respond to inquiries, provide our services, send relevant updates you’ve requested, and
              improve our website. We do not sell your personal information.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-ink">Cookies & analytics</h2>
            <p className="mt-2">
              We may use cookies and similar technologies to understand how visitors use the site. You can control cookies
              through your browser settings.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-ink">Data retention & security</h2>
            <p className="mt-2">
              We retain personal information only as long as necessary for the purposes described here, and we take reasonable
              measures to protect it. No method of transmission over the internet is completely secure.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-ink">Your rights</h2>
            <p className="mt-2">
              Depending on your location, you may have the right to access, correct, or delete your personal information. To make
              a request, contact us using the details below.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-ink">Contact us</h2>
            <p className="mt-2">
              {company.name}<br />
              {fullAddress}<br />
              <a href={company.phoneHref} className="text-brand-700">{company.phone}</a> ·{' '}
              <a href={`mailto:${company.email}`} className="text-brand-700">{company.email}</a>
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
