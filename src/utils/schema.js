// Schema.org JSON-LD builders. Rendered via <SEOHead> as <script type="application/ld+json">.
// Reads live company data from the store (DB-backed) so structured data stays in
// sync with admin edits.
//
// Entity model: stable @id nodes for the Organization, LocalBusiness storefront,
// and WebSite, cross-referenced so Google consolidates one knowledge-graph entity.

import { getCompany } from './store.js'

function ctx() {
  const company = getCompany()
  const SITE = company.website
  const a = company.address
  return {
    company,
    SITE,
    fullAddress: `${a.street}, ${a.city}, ${a.state} ${a.zip}`,
    ORG_ID: `${SITE}/#organization`,
    LOCALBUSINESS_ID: `${SITE}/#localbusiness`,
    WEBSITE_ID: `${SITE}/#website`,
    LOGO: `${SITE}/og-default.png`,
    sameAs: Object.values(company.social || {}).filter(Boolean),
    postalAddress: {
      '@type': 'PostalAddress',
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.zip,
      addressCountry: a.countryCode,
    },
  }
}

export function organizationSchema() {
  const { company, SITE, ORG_ID, LOGO, sameAs, postalAddress } = ctx()
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: company.name,
    legalName: company.legalName,
    url: SITE,
    logo: { '@type': 'ImageObject', url: LOGO, width: 1200, height: 630 },
    image: LOGO,
    email: company.email,
    telephone: company.phone,
    address: postalAddress,
    description: `${company.name} — ${company.tagline}`,
    sameAs,
  }
}

export function websiteSchema() {
  const { company, SITE, WEBSITE_ID, ORG_ID } = ctx()
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
  const { company, SITE, LOCALBUSINESS_ID, ORG_ID, LOGO, sameAs, postalAddress, fullAddress } = ctx()
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
    openingHoursSpecification: (company.hours || []).map((h) => ({
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
  const { company, SITE, LOCALBUSINESS_ID } = ctx()
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
  const { SITE } = ctx()
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
