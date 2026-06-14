import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead.jsx'
import Icon from '../components/Icon.jsx'

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="Page Not Found | Fivo LLC"
        description="The page you're looking for couldn't be found."
        path="/404"
        noindex
      />
      <section className="container-x flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <span className="text-7xl font-extrabold text-brand-200">404</span>
        <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">We couldn't find that page</h1>
        <p className="mt-3 max-w-md prose-body">
          The link may be broken or the page may have moved. Let's get you back on track.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link to="/" className="btn btn-primary">Back to home <Icon name="arrow" className="h-4 w-4" /></Link>
          <Link to="/services" className="btn btn-secondary">Browse services</Link>
        </div>
      </section>
    </>
  )
}
