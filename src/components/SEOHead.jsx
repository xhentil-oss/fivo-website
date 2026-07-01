import { Helmet } from 'react-helmet-async'
import { getCompany } from '../utils/store.js'

// Central SEO component. Renders title, meta description, canonical, Open Graph,
// Twitter cards, and any JSON-LD schema objects passed in via `schemas`.
// Collected server-side by react-helmet-async during SSR and injected into the
// static HTML head, then managed on the client after hydration.
export default function SEOHead({
  title,
  description,
  path = '',
  image,
  type = 'website',
  schemas = [],
  noindex = false,
}) {
  const company = getCompany()
  const fullTitle = title ? `${title}` : `${company.name} — ${company.tagline}`
  const canonical = `${company.website}${path}`
  const ogImage = image || `${company.website}/og-default.png`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={company.name} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD structured data */}
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
