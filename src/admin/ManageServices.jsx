import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { getServices, saveCollection } from '../utils/store.js'
import { serviceCategories } from '../data/services.js'
import { slugify } from '../utils/slugify.js'

const blank = () => ({
  id: `svc-${Date.now()}`,
  title: '',
  slug: '',
  category: serviceCategories[0]?.id || 'seo',
  icon: 'sparkle',
  shortDescription: '',
})

export default function ManageServices() {
  const [services, setServices] = useState(() => getServices())
  const [editing, setEditing] = useState(null) // service object being edited
  const [saved, setSaved] = useState(false)

  function persist(next) {
    setServices(next)
    saveCollection('services', next)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function startAdd() { setEditing(blank()) }
  function startEdit(s) { setEditing({ ...s }) }

  function save() {
    if (!editing.title.trim()) return
    const slug = editing.slug?.trim() || slugify(editing.title)
    const record = { ...editing, slug }
    const exists = services.some((s) => s.id === record.id)
    const next = exists ? services.map((s) => (s.id === record.id ? record : s)) : [...services, record]
    persist(next)
    setEditing(null)
  }

  function remove(id) {
    if (confirm('Delete this service? Its generated pages will no longer appear.')) {
      persist(services.filter((s) => s.id !== id))
    }
  }

  const field = 'mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100'
  const label = 'block text-xs font-semibold uppercase tracking-wider text-ink-muted'

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Services</h1>
          <p className="mt-1 text-ink-muted">{services.length} services. Each one generates its own pages across every location.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm font-medium text-brand-700">Saved ✓</span>}
          <button onClick={startAdd} className="btn btn-primary">Add service <Icon name="arrow" className="h-4 w-4" /></button>
        </div>
      </div>

      {editing && (
        <div className="card border-brand-100">
          <h2 className="font-extrabold text-ink">{services.some((s) => s.id === editing.id) ? 'Edit service' : 'New service'}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Title</label>
              <input className={field} value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />
            </div>
            <div>
              <label className={label}>Slug</label>
              <input className={field} value={editing.slug} placeholder={slugify(editing.title || '')} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} />
            </div>
            <div>
              <label className={label}>Category</label>
              <select className={field} value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>
                {serviceCategories.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
              </select>
            </div>
            <div>
              <label className={label}>Icon key</label>
              <input className={field} value={editing.icon} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <label className={label}>Short description</label>
              <textarea rows={2} className={field} value={editing.shortDescription} onChange={(e) => setEditing({ ...editing, shortDescription: e.target.value })} />
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={save} className="btn btn-primary">Save service</button>
            <button onClick={() => setEditing(null)} className="btn btn-ghost">Cancel</button>
          </div>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-4 py-3">Service</th>
              <th className="hidden px-4 py-3 sm:table-cell">Slug</th>
              <th className="hidden px-4 py-3 md:table-cell">Category</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {services.map((s) => (
              <tr key={s.id}>
                <td className="px-4 py-3">
                  <span className="flex items-center gap-2 font-medium text-ink">
                    <Icon name={s.icon} className="h-4 w-4 text-brand-600" /> {s.title}
                  </span>
                </td>
                <td className="hidden px-4 py-3 font-mono text-xs text-ink-muted sm:table-cell">/{s.slug}</td>
                <td className="hidden px-4 py-3 text-ink-muted md:table-cell">{serviceCategories.find((c) => c.id === s.category)?.label || s.category}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => startEdit(s)} className="text-sm font-medium text-brand-700 hover:underline">Edit</button>
                  <button onClick={() => remove(s.id)} className="ml-4 text-sm font-medium text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
