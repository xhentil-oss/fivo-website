// Schema.org JSON-LD builders. Rendered via <SEOHead> as <script type="application/ld+json">.
// Keeps structured data consistent and centralized so it is easy to audit.

import { company, fullAddress } from '../data/company.js'

const SITE = company.website

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: SITE,
    logo: `${SITE}/favicon.svg`,
    email: company.email,
    telephone: company.phone,
    sameAs: Object.values(company.social).filter(Boolean),
  }
}

export function localBusinessSchema({ name, areaServed } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: name || company.name,
    image: `${SITE}/favicon.svg`,
    '@id': SITE,
    url: SITE,
    telephone: company.phone,
    email: company.email,
    priceRange: company.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: company.address.street,
      addressLocality: company.address.city,
      addressRegion: company.address.state,
      postalCode: company.address.zip,
      addressCountry: company.address.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: company.geo.lat,
      longitude: company.geo.lng,
    },
    openingHoursSpecification: company.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: h.open,
      closes: h.close,
    })),
    areaServed: areaServed || undefined,
    description: `${company.name} — ${company.tagline} Located at ${fullAddress}.`,
  }
}

export function serviceSchema({ name, description, areaServed } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    provider: {
      '@type': 'ProfessionalService',
      name: company.name,
      telephone: company.phone,
      url: SITE,
    },
    areaServed: areaServed || `${company.address.state}, ${company.address.country}`,
    description,
  }
}

export function faqSchema(faqs = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

// crumbs: [{ name, path }]
export function breadcrumbSchema(crumbs = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${SITE}${c.path}`,
    })),
  }
}
