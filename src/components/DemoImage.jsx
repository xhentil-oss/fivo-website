// Clearly-labeled demo image placeholder. The brief requires demo visuals to be
// obviously marked as placeholders rather than implying real photography.
// Swap for real <img loading="lazy"> elements when assets are ready.

export default function DemoImage({ label = 'Demo image', aspect = 'aspect-[4/3]', className = '', icon }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-brand-100 bg-mesh ${aspect} ${className}`}
      role="img"
      aria-label={`${label} (demo placeholder)`}
    >
      <div className="absolute inset-0 bg-brand-gradient opacity-[0.06]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
        {icon}
        <span className="text-sm font-semibold text-brand-700">{label}</span>
        <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-muted">
          Demo placeholder
        </span>
      </div>
    </div>
  )
}
