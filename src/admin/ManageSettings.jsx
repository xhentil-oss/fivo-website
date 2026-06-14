import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { getCompany, saveCollection } from '../utils/store.js'

export default function ManageSettings() {
  const [company, setCompany] = useState(() => getCompany())
  const [saved, setSaved] = useState(false)

  function update(path, value) {
    setCompany((c) => {
      const next = structuredClone(c)
      const keys = path.split('.')
      let node = next
      for (let i = 0; i < keys.length - 1; i++) node = node[keys[i]]
      node[keys[keys.length - 1]] = value
      return next
    })
  }

  function save() {
    saveCollection('company', company)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const field = 'mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100'
  const label = 'block text-xs font-semibold uppercase tracking-wider text-ink-muted'

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Contact & settings</h1>
          <p className="mt-1 text-ink-muted">Business details used in the header, footer, contact page, and structured data.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm font-medium text-brand-700">Saved ✓</span>}
          <button onClick={save} className="btn btn-primary">Save settings <Icon name="check" className="h-4 w-4" /></button>
        </div>
      </div>

      <div className="card space-y-4">
        <h2 className="font-extrabold text-ink">Business details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Company name</label>
            <input className={field} value={company.name} onChange={(e) => update('name', e.target.value)} />
          </div>
          <div>
            <label className={label}>Tagline</label>
            <input className={field} value={company.tagline} onChange={(e) => update('tagline', e.target.value)} />
          </div>
          <div>
            <label className={label}>Phone (display)</label>
            <input className={field} value={company.phone} onChange={(e) => update('phone', e.target.value)} />
          </div>
          <div>
            <label className={label}>Phone (tel: href)</label>
            <input className={field} value={company.phoneHref} onChange={(e) => update('phoneHref', e.target.value)} />
          </div>
          <div>
            <label className={label}>Email</label>
            <input className={field} value={company.email} onChange={(e) => update('email', e.target.value)} />
          </div>
          <div>
            <label className={label}>Hours label</label>
            <input className={field} value={company.hoursLabel} onChange={(e) => update('hoursLabel', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card space-y-4">
        <h2 className="font-extrabold text-ink">Address</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Street</label>
            <input className={field} value={company.address.street} onChange={(e) => update('address.street', e.target.value)} />
          </div>
          <div>
            <label className={label}>City</label>
            <input className={field} value={company.address.city} onChange={(e) => update('address.city', e.target.value)} />
          </div>
          <div>
            <label className={label}>State</label>
            <input className={field} value={company.address.state} onChange={(e) => update('address.state', e.target.value)} />
          </div>
          <div>
            <label className={label}>ZIP</label>
            <input className={field} value={company.address.zip} onChange={(e) => update('address.zip', e.target.value)} />
          </div>
          <div>
            <label className={label}>Country</label>
            <input className={field} value={company.address.country} onChange={(e) => update('address.country', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card space-y-4">
        <h2 className="font-extrabold text-ink">Social links</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.keys(company.social).map((key) => (
            <div key={key}>
              <label className={`${label} capitalize`}>{key}</label>
              <input className={field} value={company.social[key]} onChange={(e) => update(`social.${key}`, e.target.value)} />
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-ink-soft">
        <h3 className="font-bold text-ink">Map embed & secrets</h3>
        <p className="mt-2">
          The contact page shows a labeled map placeholder. To embed a live Google Map, add your embed in production and keep any
          API keys in server-side environment variables — never commit keys to the frontend bundle.
        </p>
      </div>
    </div>
  )
}
