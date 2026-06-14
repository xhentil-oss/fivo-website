import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import { getReviews, saveCollection } from '../utils/store.js'

const blank = () => ({
  id: `rev-${Date.now()}`,
  clientName: '',
  clientType: '',
  rating: 5,
  text: '',
  image: '',
  isDemo: true,
})

export default function ManageReviews() {
  const [reviews, setReviews] = useState(() => getReviews())
  const [editing, setEditing] = useState(null)
  const [saved, setSaved] = useState(false)

  function persist(next) {
    setReviews(next)
    saveCollection('reviews', next)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function save() {
    if (!editing.text.trim() || !editing.clientName.trim()) return
    const exists = reviews.some((r) => r.id === editing.id)
    const next = exists ? reviews.map((r) => (r.id === editing.id ? editing : r)) : [...reviews, editing]
    persist(next)
    setEditing(null)
  }

  function remove(id) {
    if (confirm('Delete this review?')) persist(reviews.filter((r) => r.id !== id))
  }

  const field = 'mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100'
  const label = 'block text-xs font-semibold uppercase tracking-wider text-ink-muted'

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Reviews</h1>
          <p className="mt-1 text-ink-muted">Manage testimonials. Keep the demo flag on until you have real, permission-granted reviews.</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm font-medium text-brand-700">Saved ✓</span>}
          <button onClick={() => setEditing(blank())} className="btn btn-primary">Add review <Icon name="arrow" className="h-4 w-4" /></button>
        </div>
      </div>

      {editing && (
        <div className="card border-brand-100">
          <h2 className="font-extrabold text-ink">{reviews.some((r) => r.id === editing.id) ? 'Edit review' : 'New review'}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Client name</label>
              <input className={field} value={editing.clientName} onChange={(e) => setEditing({ ...editing, clientName: e.target.value })} />
            </div>
            <div>
              <label className={label}>Client type</label>
              <input className={field} value={editing.clientType} onChange={(e) => setEditing({ ...editing, clientType: e.target.value })} />
            </div>
            <div>
              <label className={label}>Rating</label>
              <select className={field} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })}>
                {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} stars</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm font-medium text-ink-soft">
                <input type="checkbox" checked={editing.isDemo} onChange={(e) => setEditing({ ...editing, isDemo: e.target.checked })} />
                Mark as demo content
              </label>
            </div>
            <div className="sm:col-span-2">
              <label className={label}>Review text</label>
              <textarea rows={3} className={field} value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} />
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button onClick={save} className="btn btn-primary">Save review</button>
            <button onClick={() => setEditing(null)} className="btn btn-ghost">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {reviews.map((r) => (
          <div key={r.id} className="card">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-accent-500">
                {Array.from({ length: r.rating }).map((_, i) => <Icon key={i} name="star" className="h-4 w-4" strokeWidth={0} />)}
              </div>
              {r.isDemo && <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Demo</span>}
            </div>
            <p className="mt-3 text-sm text-ink-soft">“{r.text}”</p>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <div>
                <p className="text-sm font-bold text-ink">{r.clientName}</p>
                <p className="text-xs text-ink-muted">{r.clientType}</p>
              </div>
              <div>
                <button onClick={() => setEditing({ ...r })} className="text-sm font-medium text-brand-700 hover:underline">Edit</button>
                <button onClick={() => remove(r.id)} className="ml-3 text-sm font-medium text-red-600 hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
