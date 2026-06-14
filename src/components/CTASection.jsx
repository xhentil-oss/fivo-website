import { Link } from 'react-router-dom'
import { company } from '../data/company.js'
import Icon from './Icon.jsx'

// Conversion CTA band, reused across service / location / home pages.
export default function CTASection({
  title = 'Ready to grow your business?',
  text = 'Book a free consultation with Fivo LLC and discover what is holding your marketing back.',
  primary = { label: 'Book Free Consultation', to: '/contact' },
}) {
  return (
    <section className="section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-brand-gradient px-6 py-14 text-center text-white sm:px-12">
          <div className="absolute inset-0 bg-mesh opacity-60" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-extrabold sm:text-4xl">{title}</h2>
            <p className="mt-4 text-white/85">{text}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to={primary.to} className="btn bg-white text-brand-700 hover:bg-brand-50">
                {primary.label} <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <a href={company.phoneHref} className="btn border border-white/40 text-white hover:bg-white/10">
                <Icon name="phone" className="h-4 w-4" /> {company.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
