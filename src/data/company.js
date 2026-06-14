// Single source of truth for company NAP (Name, Address, Phone) data.
// Editable from the admin Settings panel; consumed by Footer, Contact, and schema utils.

export const company = {
  name: 'Fivo LLC',
  legalName: 'Fivo LLC',
  tagline: 'Marketing that turns attention into real business growth.',
  category: 'Marketing Agency',
  website: 'https://fivo.llc',
  phone: '(586) 212-6754',
  phoneHref: 'tel:+15862126754',
  email: 'hello@fivo.llc',
  address: {
    street: '8132 Constitution Blvd apt 5',
    city: 'Sterling Heights',
    state: 'MI',
    stateName: 'Michigan',
    zip: '48313',
    country: 'United States',
    countryCode: 'US',
  },
  // Approximate coordinates for Sterling Heights, MI (used in LocalBusiness schema).
  geo: { lat: 42.5803, lng: -83.0302 },
  // Business hours per the brief: 10:00 AM – 3:00 PM.
  hours: [
    { days: 'Monday – Friday', open: '10:00', close: '15:00' },
  ],
  hoursLabel: 'Mon–Fri, 10:00 AM – 3:00 PM',
  priceRange: '$$',
  social: {
    facebook: 'https://facebook.com/',
    instagram: 'https://instagram.com/',
    linkedin: 'https://linkedin.com/',
    youtube: 'https://youtube.com/',
  },
  // Trust indicators surfaced in the hero trust bar.
  trustBadges: [
    'Trusted by local businesses',
    'SEO + Ads + Branding experts',
    'Data-driven campaigns',
    'Transparent monthly reporting',
  ],
}

export const fullAddress = `${company.address.street}, ${company.address.city}, ${company.address.state} ${company.address.zip}`
