import { Link } from 'react-router-dom'
import Icon from './Icon.jsx'

// Benefit-driven service card used on Home and the Services index.
export default function ServiceCard({ service }) {
  return (
    <Link
      to={`/services/${service.slug}`}
      className="card card-hover group flex flex-col"
    >
      <span className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
        <Icon name={service.icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-lg font-bold text-ink">{service.title}</h3>
      <p className="mt-2 flex-1 text-sm prose-body">{service.shortDescription}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700">
        Learn more <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
