import { useState } from 'react'
import SEOHead from '../components/SEOHead.jsx'
import Breadcrumbs from '../components/Breadcrumbs.jsx'
import DemoImage from '../components/DemoImage.jsx'
import Icon from '../components/Icon.jsx'
import { company, fullAddress } from '../data/company.js'
import { services } from '../data/services.js'
import { locations } from '../data/locations.js'
import { validateContactForm } from '../utils/validation.js'
import { breadcrumbSchema, localBusinessSchema } from '../utils/schema.js'

const BUDGETS = [
  'Under $1,000 / month',
  '$1,000 – $2,500 / month',
  '$2,500 – $5,000 / month',
  '$5,000 – $10,000 / month',
  '$10,000+ / month',
  'Not sure yet',
]

const EMPTY = {
  fullName: '', businessName: '', email: '', phone: '',
  website: '', service: '', location: '', budget: '', message: '',
}

// Optional submission endpoint. When set (e.g. a Formspree/Web3Forms URL or
// your own /api/contact serverless function), the form POSTs real JSON. When
// unset, the form stays in clearly-labeled demo mode (no data leaves the
// browser). Only VITE_-prefixed vars reach the client, and an endpoint URL is
// safe to expose — keep any API keys server-side behind your own function.
const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || ''
const IS_LIVE = Boolean(CONTACT_ENDPOINT)

export default function Contact() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  // Honeypot: hidden from humans; bots that fill it are silently dropped.
  const [trap, setTrap] = useState('')

  const crumbs = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    const { valid, errors } = validateContactForm(form)
    setErrors(errors)
    if (!valid) return

    setStatus('submitting')

    // Spam trap tripped — pretend success without sending anything.
    if (trap) {
      setStatus('success')
      setForm(EMPTY)
      return
    }

    // Demo mode: no endpoint configured, so nothing is transmitted.
    if (!IS_LIVE) {
      setTimeout(() => {
        setStatus('success')
        setForm(EMPTY)
      }, 600)
      return
    }

    // Live mode: POST the form as JSON. The backend MUST re-validate every
    // field and apply rate limiting / spam checks server-side.
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, source: 'website-contact-form' }),
      })
      if (!res.ok) throw new Error(`Request failed with ${res.status}`)
      setStatus('success')
      setForm(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const field = 'mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-ink shadow-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100'
  const labelCls = 'block text-sm font-semibold text-ink-soft'
  const errCls = 'mt-1 text-xs font-medium text-red-600'

  return (
    <>
      <SEOHead
        title="Contact Fivo LLC — Book a Free Marketing Consultation"
        description="Get in touch with Fivo LLC for a free marketing audit. Tell us about your business and goals, and we'll show you where the opportunities are."
        path="/contact"
        schemas={[breadcrumbSchema(crumbs), localBusinessSchema({})]}
      />

      <section className="bg-mesh">
        <div className="container-x py-14">
          <Breadcrumbs crumbs={crumbs} />
          <span className="eyebrow mt-4">Let's talk</span>
          <h1 className="mt-3 max-w-2xl text-4xl font-extrabold sm:text-5xl">Get your free marketing audit</h1>
          <p className="mt-4 max-w-2xl text-lg prose-body">
            Tell us a little about your business and what you're trying to grow. We'll review your current marketing and show you
            the fastest path to more qualified leads — no pressure, no obligation.
          </p>
        </div>
      </section>

      <div className="container-x section grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        {/* Form */}
        <div>
          {status === 'success' ? (
            <div className="card border-brand-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                <Icon name="check" className="h-6 w-6" />
              </div>
              <h2 className="mt-4 text-2xl font-extrabold text-ink">Thanks — we've got it.</h2>
              <p className="mt-2 prose-body">
                {IS_LIVE
                  ? <>Your request is on its way to the Fivo team, who'll follow up within one business day. In the meantime, feel free to call us at </>
                  : <>This is a demo confirmation. In the live site this request would be securely sent to the Fivo team, who'd follow up within one business day. In the meantime, feel free to call us at </>}
                <a href={company.phoneHref} className="font-semibold text-brand-700">{company.phone}</a>.
              </p>
              <button onClick={() => setStatus('idle')} className="btn btn-ghost mt-6">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="card space-y-5">
              {status === 'error' && (
                <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  Something went wrong sending your message. Please try again, or call us at{' '}
                  <a href={company.phoneHref} className="font-semibold underline">{company.phone}</a>.
                </div>
              )}
              {/* Honeypot — visually hidden, off-screen, excluded from tab order. */}
              <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="company_url">Leave this field empty</label>
                <input id="company_url" name="company_url" tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={labelCls} htmlFor="fullName">Full name *</label>
                  <input id="fullName" className={field} value={form.fullName} onChange={set('fullName')} autoComplete="name" />
                  {errors.fullName && <p className={errCls}>{errors.fullName}</p>}
                </div>
                <div>
                  <label className={labelCls} htmlFor="businessName">Business name</label>
                  <input id="businessName" className={field} value={form.businessName} onChange={set('businessName')} autoComplete="organization" />
                </div>
                <div>
                  <label className={labelCls} htmlFor="email">Email *</label>
                  <input id="email" type="email" className={field} value={form.email} onChange={set('email')} autoComplete="email" />
                  {errors.email && <p className={errCls}>{errors.email}</p>}
                </div>
                <div>
                  <label className={labelCls} htmlFor="phone">Phone *</label>
                  <input id="phone" type="tel" className={field} value={form.phone} onChange={set('phone')} autoComplete="tel" />
                  {errors.phone && <p className={errCls}>{errors.phone}</p>}
                </div>
                <div>
                  <label className={labelCls} htmlFor="website">Website</label>
                  <input id="website" className={field} value={form.website} onChange={set('website')} placeholder="https://" autoComplete="url" />
                </div>
                <div>
                  <label className={labelCls} htmlFor="budget">Monthly marketing budget</label>
                  <select id="budget" className={field} value={form.budget} onChange={set('budget')}>
                    <option value="">Select a range</option>
                    {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls} htmlFor="service">Service needed</label>
                  <select id="service" className={field} value={form.service} onChange={set('service')}>
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s.id} value={s.slug}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label className={labelCls} htmlFor="location">Location</label>
                  <select id="location" className={field} value={form.location} onChange={set('location')}>
                    <option value="">Select a location</option>
                    {locations.map((l) => <option key={l.id} value={l.slug}>{l.city}, {l.state}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelCls} htmlFor="message">What are you trying to grow? *</label>
                <textarea id="message" rows={4} className={field} value={form.message} onChange={set('message')} />
                {errors.message && <p className={errCls}>{errors.message}</p>}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" className="btn btn-primary" disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Sending…' : 'Request my free audit'}
                  {status !== 'submitting' && <Icon name="arrow" className="h-4 w-4" />}
                </button>
                <p className="text-xs text-ink-muted">
                  We'll never share your details.{!IS_LIVE && ' Demo form — no data is stored.'}
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="card">
            <h2 className="text-lg font-extrabold text-ink">Contact details</h2>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex gap-3">
                <Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <span><span className="block font-semibold text-ink-soft">Phone</span><a href={company.phoneHref} className="text-brand-700">{company.phone}</a></span>
              </li>
              <li className="flex gap-3">
                <Icon name="mail" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <span><span className="block font-semibold text-ink-soft">Email</span><a href={`mailto:${company.email}`} className="text-brand-700">{company.email}</a></span>
              </li>
              <li className="flex gap-3">
                <Icon name="pin" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <span><span className="block font-semibold text-ink-soft">Address</span>{fullAddress}</span>
              </li>
              <li className="flex gap-3">
                <Icon name="clock" className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <span><span className="block font-semibold text-ink-soft">Hours</span>{company.hoursLabel}</span>
              </li>
            </ul>
          </div>
          <DemoImage label="Google Map embed" aspect="aspect-[4/3]" icon={<Icon name="pin" className="h-7 w-7 text-brand-600" />} />
        </aside>
      </div>
    </>
  )
}
