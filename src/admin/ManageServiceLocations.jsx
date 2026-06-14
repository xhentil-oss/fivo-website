import { useMemo, useState } from 'react'
import Icon from '../components/Icon.jsx'
import { getServices, getServiceLocationPage, saveServiceLocationPage } from '../utils/store.js'
import { locations } from '../data/locations.js'
import { generateServiceLocationPage } from '../utils/serviceLocation.js'

export default function ManageServiceLocations() {
  const services = useMemo(() => getServices(), [])
  const [serviceSlug, setServiceSlug] = useState(services[0]?.slug || '')
  const [locationSlug, setLocationSlug] = useState(locations[0]?.slug || '')
  const [draft, setDraft] = useState(null)
  const [overridden, setOverridden] = useState(false)
  const [saved, setSaved] = useState(false)

  function load() {
    const service = services.find((s) => s.slug === serviceSlug)
    const loc = locations.find((l) => l.slug === locationSlug)
    if (!service || !loc) return
    const override = getServiceLocationPage(serviceSlug, locationSlug)
    const generated = generateServiceLocationPage(service, loc)
    setDraft(override || generated)
    setOverridden(!!override)
    setSaved(false)
  }

  function save() {
    saveServiceLocationPage(serviceSlug, locationSlug, draft)
    setOverridden(true)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function regenerate() {
    const service = services.find((s) => s.slug === serviceSlug)
    const loc = locations.find((l) => l.slug === locationSlug)
    setDraft(generateServiceLocationPage(service, loc))
    setOverridden(false)
  }

  const field = 'mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100'
  const label = 'block text-xs font-semibold uppercase tracking-wider text-ink-muted'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Service + Location pages</h1>
        <p className="mt-1 text-ink-muted">
          Every service × location combination has an auto-generated page. Load one to fine-tune its copy. Saved edits override
          the generated version on the live page.
        </p>
      </div>

      <div className="card">
        <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
          <div>
            <label className={label}>Service</label>
            <select className={field} value={serviceSlug} onChange={(e) => setServiceSlug(e.target.value)}>
              {services.map((s) => <option key={s.id} value={s.slug}>{s.title}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Location</label>
            <select className={field} value={locationSlug} onChange={(e) => setLocationSlug(e.target.value)}>
              {locations.map((l) => <option key={l.id} value={l.slug}>{l.city}, {l.state}</option>)}
            </select>
          </div>
          <button onClick={load} className="btn btn-primary">Load page</button>
        </div>
        <p className="mt-3 text-xs text-ink-muted">
          Live URL: <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono">/services/{serviceSlug}/{locationSlug}</code>
        </p>
      </div>

      {draft && (
        <div className="card border-brand-100 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-extrabold text-ink">Editing page content</h2>
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${overridden ? 'bg-brand-50 text-brand-700' : 'bg-slate-100 text-ink-muted'}`}>
              {overridden ? 'Custom (overrides generated)' : 'Auto-generated'}
            </span>
          </div>

          <div>
            <label className={label}>H1 heading</label>
            <input className={field} value={draft.h1} onChange={(e) => setDraft({ ...draft, h1: e.target.value })} />
          </div>
          <div>
            <label className={label}>SEO title</label>
            <input className={field} value={draft.seoTitle} onChange={(e) => setDraft({ ...draft, seoTitle: e.target.value })} />
          </div>
          <div>
            <label className={label}>Meta description</label>
            <textarea rows={2} className={field} value={draft.metaDescription} onChange={(e) => setDraft({ ...draft, metaDescription: e.target.value })} />
          </div>
          <div>
            <label className={label}>Intro paragraph</label>
            <textarea rows={3} className={field} value={draft.intro} onChange={(e) => setDraft({ ...draft, intro: e.target.value })} />
          </div>
          <div>
            <label className={label}>CTA line</label>
            <input className={field} value={draft.cta} onChange={(e) => setDraft({ ...draft, cta: e.target.value })} />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button onClick={save} className="btn btn-primary">Save overrides</button>
            <button onClick={regenerate} className="btn btn-ghost">Reset to generated</button>
            {saved && <span className="text-sm font-medium text-brand-700">Saved ✓</span>}
          </div>
        </div>
      )}
    </div>
  )
}
