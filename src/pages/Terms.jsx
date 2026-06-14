import SEOHead from '../components/SEOHead.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import { company } from '../data/company.js'
import { breadcrumbSchema } from '../utils/schema.js'

export default function Terms() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Terms of Service', path: '/terms' }]
  return (
    <>
      <SEOHead
        title="Terms of Service | Fivo LLC"
        description="The terms that govern your use of the Fivo LLC website and services."
        path="/terms"
        schemas={[breadcrumbSchema(crumbs)]}
        noindex
      />
      <section className="bg-mesh">
        <div className="container-x py-14">
          <Breadcrumbs crumbs={crumbs} />
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Terms of Service</h1>
          <p className="mt-3 text-ink-muted">Last updated: January 2026</p>
        </div>
      </section>

      <div className="container-x section max-w-3xl">
        <div className="rounded-2xl border border-accent-100 bg-accent-50/60 p-5 text-sm text-ink-soft">
          <strong>Template notice:</strong> This is starter terms content for the demo build. Have it reviewed by legal counsel
          and adapted to your actual service agreements before launch.
        </div>

        <div className="prose-body mt-8 space-y-8">
          <section>
            <h2 className="text-xl font-extrabold text-ink">Acceptance of terms</h2>
            <p className="mt-2">
              By accessing or using the {company.name} website, you agree to these Terms of Service. If you do not agree, please
              do not use the site.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-ink">Use of the website</h2>
            <p className="mt-2">
              You agree to use this website lawfully and not to interfere with its operation, attempt unauthorized access, or use
              it to transmit harmful or unlawful content.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-ink">Services & quotes</h2>
            <p className="mt-2">
              Information on this site is for general purposes and does not constitute a binding offer. Specific services, scope,
              pricing, and deliverables are governed by a separate written agreement.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-ink">Intellectual property</h2>
            <p className="mt-2">
              All content on this site, including text, graphics, logos, and design, is the property of {company.name} or its
              licensors and may not be reproduced without permission.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-ink">Disclaimers</h2>
            <p className="mt-2">
              The website is provided on an &ldquo;as is&rdquo; basis. Marketing results vary by business, market, and budget, and
              past or demonstrative examples are not guarantees of future results.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-ink">Limitation of liability</h2>
            <p className="mt-2">
              To the fullest extent permitted by law, {company.name} is not liable for indirect or consequential damages arising
              from your use of the website.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-extrabold text-ink">Changes to these terms</h2>
            <p className="mt-2">
              We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the
              revised terms.
            </p>
          </section>
        </div>
      </div>
    </>
  )
}
