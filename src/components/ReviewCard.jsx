import Icon from './Icon.jsx'

// Review card. Demo reviews are clearly labeled per the brief's honesty rule.
export default function ReviewCard({ review }) {
  return (
    <figure className="card flex h-full flex-col">
      <div className="flex items-center gap-1 text-accent-500" aria-label={`${review.rating} out of 5 stars`}>
        {Array.from({ length: review.rating }).map((_, i) => (
          <Icon key={i} name="star" className="h-4 w-4" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-ink-soft">“{review.text}”</blockquote>
      <figcaption className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
        <div>
          <p className="text-sm font-bold text-ink">{review.clientName}</p>
          <p className="text-xs text-ink-muted">{review.clientType}</p>
        </div>
        {review.isDemo && (
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">Demo</span>
        )}
      </figcaption>
    </figure>
  )
}
