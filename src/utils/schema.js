// Schema.org JSON-LD builders. Rendered via <SEOHead> as <script type="application/ld+json">.
// Keeps structured data consistent and centralized so it is easy to audit.
//
// Entity model: we mint stable @id nodes for the Organization, the
// LocalBusiness storefront, and the WebSite, then cross-reference them so
// Google consolidates them into one knowledge-graph entity instead of treating
// each page's blob as a separate, disconnected thing.

import { company, fullAddress } from '../data/company.js'

const SITE = company.website

// Stable node identifiers (URL + fragment) reused across pages.
export const ORG_ID = `${SITE}/#organization`
export const LOCALBUSINESS_ID = `${SITE}/#localbusiness`
export const WEBSITE_ID = `${SITE}/#website`

const LOGO = `${SITE}/og-default.png`
const sameAs = Object.values(company.social).filter(Boolean)

const postalAddress = {
  '@type': 'PostalAddress',
  streetAddress: company.address.street,
  addressLocality: company.address.city,
  addressRegion: company.address.state,
  postalCode: company.address.zip,
  addressCountry: company.address.countryCode,
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: company.name,
    legalName: company.legalName,
    url: SITE,
    logo: {
      '@type': 'ImageObject',
      url: LOGO,
      width: 1200,
      height: 630,
    },
    image: LOGO,
    email: company.email,
    telephone: company.phone,
    address: postalAddress,
    description: `${company.name} — ${company.tagline}`,
    sameAs,
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE,
    name: company.name,
    description: company.tagline,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
  }
}

export function localBusinessSchema({ name, areaServed } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': LOCALBUSINESS_ID,
    name: name || company.name,
    image: LOGO,
    logo: LOGO,
    url: SITE,
    telephone: company.phone,
    email: company.email,
    priceRange: company.priceRange,
    parentOrganization: { '@id': ORG_ID },
    address: postalAddress,
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
    areaServed: areaServed ? { '@type': 'Place', name: areaServed } : undefined,
    sameAs,
    description: `${company.name} — ${company.tagline} Located at ${fullAddress}.`,
  }
}

export function serviceSchema({ name, description, areaServed } = {}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: name,
    name,
    provider: { '@id': LOCALBUSINESS_ID },
    areaServed: areaServed
      ? { '@type': 'Place', name: areaServed }
      : `${company.address.stateName}, ${company.address.country}`,
    description,
    url: SITE,
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
