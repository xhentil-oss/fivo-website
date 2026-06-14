import { useState } from 'react'
import Icon from './Icon.jsx'

// Accessible FAQ accordion. Keyboard operable; one panel open at a time.
export default function FAQAccordion({ faqs = [] }) {
  const [openIdx, setOpenIdx] = useState(0)
  if (!faqs.length) return null
  return (
    <div className="divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-100 bg-white">
      {faqs.map((f, i) => {
        const isOpen = openIdx === i
        return (
          <div key={i}>
            <button
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              onClick={() => setOpenIdx(isOpen ? -1 : i)}
              aria-expanded={isOpen}
            >
              <span className="font-semibold text-ink">{f.q}</span>
              <Icon name="arrow" className={`h-5 w-5 shrink-0 text-brand-600 transition-transform ${isOpen ? '-rotate-90' : 'rotate-90'}`} />
            </button>
            <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="px-5 pb-5 prose-body">{f.a}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
