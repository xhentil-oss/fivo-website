import { company } from '../data/company.js'

// Social-proof elements (Google + Trustpilot ratings) used across the site.
// Driven by company.socialProof — see that config to wire real numbers.
//
// Honesty: any platform with isDemo:true renders a subtle "Demo" tag and uses
// no review count unless one is provided. We intentionally do NOT emit
// aggregateRating JSON-LD for demo data (fake rich-result stars are penalized).

const platforms = () => Object.values(company.socialProof || {})

// ---- Brand marks ----
function GoogleG({ className = 'h-5 w-5' }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17Z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46Z" />
      <path fill="#FBBC05" d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7Z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07Z" />
    </svg>
  )
}

function StarIcon({ className = 'h-4 w-4', fill = '#FBBC05' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path fill={fill} d="m12 2 2.9 6.3 6.8.6-5.1 4.5 1.5 6.7L12 17l-6 3.6 1.5-6.7L2.4 9l6.8-.6Z" />
    </svg>
  )
}

// Trustpilot's signature: green star tiles.
function TrustpilotStars({ size = 'h-5 w-5' }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`grid place-items-center rounded-[3px] bg-[#00B67A] ${size}`}>
          <StarIcon className="h-3 w-3" fill="#ffffff" />
        </span>
      ))}
    </span>
  )
}

function GoldStars({ className = 'h-4 w-4' }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={className} />
      ))}
    </span>
  )
}

function DemoTag({ dark = false }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
        dark ? 'bg-white/10 text-white/60' : 'bg-slate-100 text-ink-muted'
      }`}
    >
      Demo
    </span>
  )
}

function ratingLabel(p) {
  const r = Number(p.rating).toFixed(1)
  if (p.count) return `${r} · ${p.count} reviews`
  return `Rated ${r}`
}

// ---------------------------------------------------------------------------
// 1) Compact inline row — for the hero.
// ---------------------------------------------------------------------------
export function SocialProofInline() {
  const list = platforms()
  if (!list.length) return null
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
      {list.map((p) => (
        <a
          key={p.platform}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 text-sm"
        >
          {p.platform === 'Google' ? <GoogleG className="h-5 w-5" /> : <TrustpilotStars size="h-4 w-4" />}
          {p.platform === 'Google' && <GoldStars className="h-4 w-4" />}
          <span className="font-semibold text-ink">{Number(p.rating).toFixed(1)}</span>
          <span className="text-ink-muted group-hover:text-ink-soft">
            on {p.platform}
          </span>
          {p.isDemo && <DemoTag />}
        </a>
      ))}
    </div>
  )
}

// ---------------------------------------------------------------------------
// 2) Body strip — a full-width band with two rating cards.
// ---------------------------------------------------------------------------
export function SocialProofStrip() {
  const list = platforms()
  if (!list.length) return null
  return (
    <section className="border-y border-slate-100 bg-white">
      <div className="container-x py-12">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Trusted by the businesses we serve</p>
          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            Real reviews, real reputation
          </h2>
          <p className="mt-3 prose-body">
            We earn trust the same way we earn rankings — transparently. See what clients say.
          </p>
        </div>

        <div className="mx-auto mt-8 grid max-w-3xl gap-5 sm:grid-cols-2">
          {list.map((p) => (
            <a
              key={p.platform}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card card-hover flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                {p.platform === 'Google' ? (
                  <GoogleG className="h-9 w-9" />
                ) : (
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#00B67A]">
                    <StarIcon className="h-5 w-5" fill="#ffffff" />
                  </span>
                )}
                <div>
                  <p className="flex items-center gap-2 font-bold text-ink">
                    {p.platform}
                    {p.isDemo && <DemoTag />}
                  </p>
                  <p className="text-xs text-ink-muted">{ratingLabel(p)}</p>
                </div>
              </div>
              <div className="text-right">
                {p.platform === 'Trustpilot' ? (
                  <TrustpilotStars size="h-5 w-5" />
                ) : (
                  <GoldStars className="h-5 w-5" />
                )}
                <p className="mt-1 text-2xl font-extrabold leading-none text-ink">
                  {Number(p.rating).toFixed(1)}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// 3) Footer row — compact, for the dark footer.
// ---------------------------------------------------------------------------
export function SocialProofFooter() {
  const list = platforms()
  if (!list.length) return null
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      {list.map((p) => (
        <a
          key={p.platform}
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-white/80 transition hover:bg-white/10"
        >
          {p.platform === 'Google' ? (
            <GoogleG className="h-5 w-5" />
          ) : (
            <span className="grid h-5 w-5 place-items-center rounded bg-[#00B67A]">
              <StarIcon className="h-3 w-3" fill="#ffffff" />
            </span>
          )}
          <span className="font-semibold text-white">{Number(p.rating).toFixed(1)}</span>
          <span className="text-white/55">{p.platform}</span>
          {p.isDemo && <DemoTag dark />}
        </a>
      ))}
    </div>
  )
}
