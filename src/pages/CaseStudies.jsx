import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import CTASection from '../components/CTASection.jsx'
import DemoImage from '../components/DemoImage.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { getCaseStudies } from '../utils/store.js'
import { breadcrumbSchema } from '../utils/schema.js'

export default function CaseStudies() {
  const caseStudies = getCaseStudies()
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Case Studies', path: '/case-studies' }]

  return (
    <>
      <SEOHead
        title="Marketing Case Studies — Real Strategy, Honest Results | Fivo LLC"
        description="See how Fivo LLC approaches growth for local and B2B businesses with SEO, paid ads, branding, and lead generation. Demo case studies shown for illustration."
        path="/case-studies"
        schemas={[breadcrumbSchema(crumbs)]}
      />

      <section className="bg-mesh">
        <div className="container-x py-14">
          <Breadcrumbs crumbs={crumbs} />
          <span className="eyebrow mt-4">Our work</span>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold sm:text-5xl">Case studies built on strategy, not guesswork</h1>
          <p className="mt-4 max-w-2xl text-lg prose-body">
            Every engagement starts with the same question: what is actually holding growth back? These examples show how we
            combine services into one system. They are demo case studies for illustration — your results depend on your market, offer, and budget.
          </p>
        </div>
      </section>

      <div className="container-x section space-y-8">
        {caseStudies.map((cs, i) => (
          <Reveal key={cs.id} delay={i * 60}>
            <article className="card-hover grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">{cs.clientType}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-ink-muted">{cs.location}</span>
                  {cs.isDemo && (
                    <span className="rounded-full bg-accent-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-700">Demo</span>
                  )}
                </div>
                <h2 className="mt-4 text-2xl font-extrabold text-ink">{cs.title}</h2>

                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Challenge</dt>
                    <dd className="mt-1 prose-body">{cs.challenge}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Solution</dt>
                    <dd className="mt-1 prose-body">{cs.solution}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Result</dt>
                    <dd className="mt-1 font-medium text-ink-soft">{cs.result}</dd>
                  </div>
                </dl>

                <div className="mt-5 flex flex-wrap gap-2">
                  {cs.servicesUsed.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1 rounded-lg border border-slate-100 bg-white px-2.5 py-1 text-xs text-ink-soft">
                      <Icon name="check" className="h-3.5 w-3.5 text-brand-600" /> {s}
                    </span>
                  ))}
                </div>
              </div>

              <DemoImage label={cs.title} aspect="aspect-[4/3]" />
            </article>
          </Reveal>
        ))}
      </div>

      <section className="container-x pb-4">
        <p className="rounded-2xl border border-slate-100 bg-slate-50 p-5 text-sm text-ink-muted">
          <strong className="text-ink-soft">A note on honesty:</strong> these are demonstration case studies that reflect our typical
          process and the kinds of outcomes we aim for. We don't publish invented numbers. When we run your campaigns, you'll get
          transparent reporting on the metrics that matter to your business.
        </p>
      </section>

      <CTASection
        title="Want results like these for your business?"
        text="Start with a free marketing audit. We'll show you exactly where the opportunities are."
        primary={{ label: 'Get a Free Marketing Audit', to: '/contact' }}
      />
    </>
  )
}
