import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import CTASection from '../components/CTASection.jsx'
import DemoImage from '../components/DemoImage.jsx'
import Reveal from '../components/Reveal.jsx'
import Icon from '../components/Icon.jsx'
import { company } from '../data/company.js'
import { breadcrumbSchema, organizationSchema } from '../utils/schema.js'

const VALUES = [
  { icon: 'chart', title: 'Data over guesswork', text: 'Every recommendation is tied to a metric. If we can’t measure it, we don’t claim it.' },
  { icon: 'target', title: 'Strategy first', text: 'We start with your goals and market, then choose the channels \u2014 not the other way around.' },
  { icon: 'shield', title: 'Transparent reporting', text: 'You always know what we’re doing, what it costs, and what it’s producing.' },
  { icon: 'sparkle', title: 'Quality craft', text: 'Clean design, sharp copy, and campaigns built to last \u2014 not disposable busywork.' },
]

const STEPS = [
  { n: '01', title: 'Audit & strategy', text: 'We review your current marketing, market, and competitors, then build a clear plan.' },
  { n: '02', title: 'Build & launch', text: 'We set up campaigns, pages, and creative \u2014 everything tracked from day one.' },
  { n: '03', title: 'Optimize', text: 'We test, refine, and double down on what’s working to lower cost per lead.' },
  { n: '04', title: 'Scale & report', text: 'As results compound, we scale the winners and report transparently every month.' },
]

export default function About() {
  const crumbs = [{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]
  return (
    <>
      <SEOHead
        title="About Fivo LLC — A Conversion-Focused Marketing Agency"
        description="Fivo LLC is a marketing agency helping businesses grow with SEO, paid ads, social media, branding, and conversion-focused strategy. Learn how we work."
        path="/about"
        schemas={[breadcrumbSchema(crumbs), organizationSchema()]}
      />

      <section className="bg-mesh">
        <div className="container-x py-14">
          <Breadcrumbs crumbs={crumbs} />
          <div className="mt-4 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
            <div>
              <span className="eyebrow">About Fivo LLC</span>
              <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">Marketing built around results, not vanity metrics</h1>
              <p className="mt-4 text-lg prose-body">
                Fivo LLC is a marketing agency for businesses that are tired of guesswork. We combine SEO, paid advertising,
                social media, branding, and web design into one system with a single goal: turn attention into real,
                trackable business growth.
              </p>
              <p className="mt-4 prose-body">
                Based in Sterling Heights, Michigan, we work with local and national businesses that want a partner who treats
                their budget like it’s our own — measuring everything and reporting honestly.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link to="/contact" className="btn btn-primary">Get a Free Marketing Audit <Icon name="arrow" className="h-4 w-4" /></Link>
                <Link to="/services" className="btn btn-secondary">View Our Services</Link>
              </div>
            </div>
            <DemoImage label="Marketing team at work" aspect="aspect-[4/3]" icon={<Icon name="briefcase" className="h-7 w-7 text-brand-600" />} />
          </div>
        </div>
      </section>

      {/* Values */}
      <div className="container-x section">
        <div className="max-w-2xl">
          <span className="eyebrow">What we believe</span>
          <h2 className="mt-3 text-3xl font-extrabold">Principles that guide every campaign</h2>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 60}>
              <div className="card h-full">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={v.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm prose-body">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Process */}
      <section className="bg-mesh">
        <div className="container-x section">
          <div className="max-w-2xl">
            <span className="eyebrow">How we work</span>
            <h2 className="mt-3 text-3xl font-extrabold">A simple, repeatable growth process</h2>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 60}>
                <div className="card h-full">
                  <span className="text-3xl font-extrabold text-brand-200">{s.n}</span>
                  <h3 className="mt-2 font-bold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm prose-body">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company facts */}
      <div className="container-x section">
        <div className="card grid gap-6 sm:grid-cols-3">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Headquarters</span>
            <p className="mt-1 font-semibold text-ink">{company.address.city}, {company.address.state}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Hours</span>
            <p className="mt-1 font-semibold text-ink">{company.hoursLabel}</p>
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Get in touch</span>
            <p className="mt-1 font-semibold text-ink">
              <a href={company.phoneHref} className="text-brand-700">{company.phone}</a>
            </p>
          </div>
        </div>
      </div>

      <CTASection />
    </>
  )
}
