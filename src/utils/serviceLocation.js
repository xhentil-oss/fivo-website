// Generates UNIQUE content for every /services/:service/:location page.
// The brief's hard rule is "no duplicate thin content," so each page gets a
// distinct H1, title, meta, intro, local pain points, benefits, and FAQs derived
// from BOTH the service and the location. Admin-authored overrides (from the CMS)
// always win over generated content — see utils/store.js getServiceLocationPage().

import { getServiceContent } from './serviceContent.js'

// Region-aware framing so a Detroit page reads differently from a Brooklyn one.
const REGION_VOICE = {
  'Metro Detroit': 'competitive Metro Detroit market',
  Michigan: 'Michigan market',
  'New York City': 'fast-moving New York City market',
  'New York': 'New York market',
}

function placeLabel(loc) {
  if (loc.type === 'state') return loc.stateName
  if (loc.type === 'county') return `${loc.city}, ${loc.state}`
  return `${loc.city}, ${loc.state}`
}

function placeName(loc) {
  return loc.type === 'state' ? loc.stateName : loc.city
}

export function generateServiceLocationPage(service, loc) {
  const base = getServiceContent(service)
  const place = placeLabel(loc)
  const name = placeName(loc)
  const regionVoice = REGION_VOICE[loc.region] || `${name} area`

  const h1 = `${service.title} Services in ${place}`
  const seoTitle = `${service.title} Services in ${place} | Fivo LLC`
  const metaDescription = `Looking for ${service.title.toLowerCase()} in ${place}? Fivo LLC helps ${name} businesses grow with a transparent, data-driven approach. Get a free marketing audit.`

  const intro = `Fivo LLC helps ${name} businesses get more out of ${service.title.toLowerCase()}. In the ${regionVoice}, standing out takes more than activity — it takes a clear strategy, consistent execution, and reporting that ties your investment to real results. That is exactly how we work with ${name} businesses.`

  const localContext = `${name} businesses face a crowded landscape where customers compare options quickly and trust their own research. Whether you serve a single neighborhood or the wider ${loc.region} area, your marketing has to earn attention and then convert it. We tailor ${service.title.toLowerCase()} to how buyers in ${place} actually search, choose, and decide.`

  // Localized pain points blend the service category's pains with the place.
  const localPains = [
    `${name} customers choosing competitors who are easier to find online`,
    ...base.problemsSolved.slice(0, 2),
    `Marketing spend that is hard to tie back to ${name} leads`,
  ]

  const localFaqs = [
    {
      q: `Do you work with businesses in ${place}?`,
      a: `Yes. Fivo LLC works with businesses across ${loc.stateName}, including ${place}. We are based in Sterling Heights, MI and serve clients locally and remotely.`,
    },
    {
      q: `How is ${service.title.toLowerCase()} different for a ${name} business?`,
      a: `We account for local competition, how ${name} customers search, and the channels that perform in the ${loc.region} area — instead of running a one-size-fits-all playbook.`,
    },
    ...base.faqs.slice(0, 2),
  ]

  const cta = `Ready to grow your ${name} business with ${service.title.toLowerCase()}? Book a free marketing audit and we will show you exactly where the opportunities are.`

  return {
    serviceSlug: service.slug,
    locationSlug: loc.slug,
    h1,
    seoTitle,
    metaDescription,
    intro,
    localContext,
    benefits: base.benefits,
    process: base.process,
    localPains,
    faqs: localFaqs,
    cta,
    place,
    name,
  }
}
