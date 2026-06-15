import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead.jsx'
import Icon from '../components/Icon.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import ReviewCard from '../components/ReviewCard.jsx'
import CTASection from '../components/CTASection.jsx'
import DemoImage from '../components/DemoImage.jsx'
import Reveal from '../components/Reveal.jsx'
import { company } from '../data/company.js'
import { getHomepageServices } from '../data/services.js'
import { getReviews } from '../utils/store.js'
import { caseStudies } from '../data/caseStudies.js'
import { organizationSchema, websiteSchema, localBusinessSchema } from '../utils/schema.js'

const problems = [
  { icon: 'magnet', title: 'Not enough leads', text: 'Your phone is quiet and the pipeline feels unpredictable month to month.' },
  { icon: 'search', title: 'Poor Google ranking', text: 'Customers search for what you offer — and find your competitors instead.' },
  { icon: 'target', title: 'Ads wasting money', text: 'You are spending on ads but cannot tell what is actually working.' },
  { icon: 'sparkle', title: 'Weak brand identity', text: 'Your brand looks smaller and less trustworthy than your work deserves.' },
  { icon: 'monitor', title: 'Low website conversion', text: 'Visitors land on your site and leave without ever reaching out.' },
  { icon: 'chart', title: 'No tracking or reporting', text: 'You are flying blind, with no clear view of what your marketing returns.' },
]

const solutionSteps = [
  { title: 'Strategy', text: 'A clear, prioritized plan built around your goals and your market.' },
  { title: 'Execution', text: 'We do the work — SEO, ads, content, and creative — in focused sprints.' },
  { title: 'Optimization', text: 'We test and refine continuously to improve cost per lead and results.' },
  { title: 'Reporting', text: 'Transparent monthly reporting tied to leads and growth, not vanity metrics.' },
  { title: 'Scaling', text: 'Once it works, we scale what is profitable with confidence.' },
]

const funnel = [
  { stage: 'Awareness', text: 'SEO, ads, and social get the right people to notice you.' },
  { stage: 'Interest', text: 'Content and creative turn a glance into genuine attention.' },
  { stage: 'Trust', text: 'Reviews, branding, and a strong site make you the safe choice.' },
  { stage: 'Conversion', text: 'Clear offers and landing pages turn interest into leads.' },
  { stage: 'Retention', text: 'Email, SMS, and reputation work keep customers coming back.' },
]

export default function Home() {
  const services = getHomepageServices()
  const reviews = getReviews().slice(0, 3)
  const featuredCase = caseStudies[0]

  return (
    <>
      <SEOHead
        path="/"
        description="Fivo LLC helps businesses grow with SEO, paid ads, social media marketing, branding, and conversion-focused digital strategies. Get a free marketing audit."
        schemas={[organizationSchema(), websiteSchema(), localBusinessSchema()]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-mesh">
        <div className="container-x grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">{company.category} · Sterling Heights, MI</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Marketing that turns attention into{' '}
              <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">real business growth</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg prose-body">
              Fivo LLC helps businesses grow with SEO, paid ads, social media marketing, branding, websites, and
              conversion-focused digital strategies — backed by transparent reporting.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link to="/contact" className="btn-primary">
                Get a Free Marketing Audit <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link to="/services" className="btn-ghost">View Our Services</Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {company.trustBadges.map((b) => (
                <li key={b} className="flex items-center gap-1.5 text-sm font-medium text-ink-soft">
                  <Icon name="check" className="h-4 w-4 text-brand-600" /> {b}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative">
              <img
                src="/hero-home.webp"
                alt="Marketing results dashboard and client project highlights from Fivo LLC"
                width={1023}
                height={852}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full rounded-2xl shadow-card"
              />
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-card sm:block">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">Qualified leads</p>
                <p className="mt-1 flex items-center gap-2 text-2xl font-extrabold text-ink">
                  <Icon name="trending" className="h-5 w-5 text-accent-500" /> Trending up
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-y border-slate-100 bg-white">
        <div className="container-x grid grid-cols-2 gap-6 py-6 text-center sm:grid-cols-4">
          {company.trustBadges.map((b) => (
            <p key={b} className="text-sm font-semibold text-ink-soft">{b}</p>
          ))}
        </div>
      </section>

      {/* Problem */}
      <section className="section">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Sound familiar?</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">The real reasons growth stalls</h2>
            <p className="mt-4 prose-body">Most marketing problems are not effort problems — they are system problems. Here is where it usually breaks down.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((p, i) => (
              <Reveal key={p.title} delay={i * 60}>
                <div className="card h-full">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-50 text-accent-600">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-bold text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm prose-body">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section bg-brand-950 text-white">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-400">The Fivo approach</p>
            <h2 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">One system, built to grow your business</h2>
            <p className="mt-4 text-white/70">We connect every channel into a single system — so your marketing compounds instead of competing with itself.</p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {solutionSteps.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="text-sm font-bold text-accent-400">0{i + 1}</span>
                <h3 className="mt-2 font-bold text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm text-white/65">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-xl">
              <p className="eyebrow">What we do</p>
              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Full-service marketing, under one roof</h2>
            </div>
            <Link to="/services" className="btn-ghost shrink-0">All services <Icon name="arrow" className="h-4 w-4" /></Link>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={(i % 4) * 60}><ServiceCard service={s} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Funnel */}
      <section className="section bg-slate-50">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How growth actually happens</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">We work the whole funnel</h2>
            <p className="mt-4 prose-body">Awareness → Interest → Trust → Conversion → Retention. We help at every stage, not just the top.</p>
          </div>
          <div className="mt-12 grid gap-3 md:grid-cols-5">
            {funnel.map((f, i) => (
              <div key={f.stage} className="relative rounded-2xl bg-white p-5 shadow-card">
                <span className="text-xs font-bold uppercase tracking-wider text-accent-600">Stage {i + 1}</span>
                <h3 className="mt-1 font-bold text-ink">{f.stage}</h3>
                <p className="mt-1.5 text-sm prose-body">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="section">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">What clients say</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">Trusted to deliver real results</h2>
            <p className="mt-3 text-sm text-ink-muted">Reviews below are demo content shown as placeholders.</p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {reviews.map((r) => <ReviewCard key={r.id} review={r} />)}
          </div>
        </div>
      </section>

      {/* Case study */}
      {featuredCase && (
        <section className="section bg-slate-50">
          <div className="container-x grid items-center gap-10 lg:grid-cols-2">
            <DemoImage label="Local business growth" aspect="aspect-[4/3]" icon={<Icon name="trending" className="h-10 w-10 text-brand-500" />} />
            <div>
              <p className="eyebrow">Case study · Demo</p>
              <h2 className="mt-3 text-3xl font-extrabold">{featuredCase.title}</h2>
              <dl className="mt-6 space-y-4">
                <div><dt className="text-sm font-bold text-accent-600">Challenge</dt><dd className="mt-1 prose-body">{featuredCase.challenge}</dd></div>
                <div><dt className="text-sm font-bold text-accent-600">Solution</dt><dd className="mt-1 prose-body">{featuredCase.solution}</dd></div>
                <div><dt className="text-sm font-bold text-accent-600">Result</dt><dd className="mt-1 prose-body">{featuredCase.result}</dd></div>
              </dl>
              <Link to="/case-studies" className="btn-secondary mt-6">See all case studies <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  )
}
