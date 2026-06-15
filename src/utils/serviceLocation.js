// Generates UNIQUE content for every /services/:service/:location page.
// The brief's hard rule is "no duplicate thin content," so each page gets a
// distinct H1, title, meta, intro, local pain points, benefits, and FAQs derived
// from BOTH the service and the location. Admin-authored overrides (from the CMS)
// always win over generated content — see utils/store.js getServiceLocationPage().
//
// To avoid "scaled content" / doorway-page patterns, copy is NOT a single
// template with the nouns swapped. We:
//   1) weave in real, location-specific detail (neighborhoods + local economy
//      from data/locations.js), and
//   2) pick from several phrasings per field using a stable hash of the
//      service+location pair — so different combos read differently, but a given
//      URL always renders the same text (stable for SSG + crawlers).

import { getServiceContent } from './serviceContent.js'

// Region-aware framing so a Detroit page reads differently from a Brooklyn one.
const REGION_VOICE = {
  'Metro Detroit': 'the competitive Metro Detroit market',
  Michigan: 'the Michigan market',
  'New York City': 'the fast-moving New York City market',
  'New York': 'the New York market',
}

// Tiny deterministic string hash (FNV-1a-ish). Same input → same number, so
// pre-rendered HTML is stable across builds.
function hashString(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

// Format a list as "a, b, and c".
function listOf(items = []) {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} and ${items[1]}`
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

function placeLabel(loc) {
  return loc.type === 'state' ? loc.stateName : `${loc.city}, ${loc.state}`
}

function placeName(loc) {
  return loc.type === 'state' ? loc.stateName : loc.city
}

export function generateServiceLocationPage(service, loc) {
  const base = getServiceContent(service)
  const place = placeLabel(loc)
  const name = placeName(loc)
  const svc = service.title.toLowerCase()
  const regionVoice = REGION_VOICE[loc.region] || `the ${name} area`
  const economy = loc.economy || 'a competitive mix of local businesses'
  const hoods = loc.neighborhoods || []
  const someHoods = listOf(hoods.slice(0, 3))
  const twoHoods = hoods.length >= 2 ? `${hoods[0]} and ${hoods[1]}` : someHoods

  // Decorrelated picks: each field uses a different offset off the same seed.
  const seed = hashString(`${service.slug}|${loc.slug}`)
  const pick = (arr, offset) => arr[(seed + offset) % arr.length]

  const h1 = pick(
    [
      `${service.title} Services in ${place}`,
      `${service.title} in ${place} That Drives Growth`,
      `${service.title} for ${name} Businesses`,
      `Expert ${service.title} in ${place}`,
    ],
    1,
  )

  const seoTitle = pick(
    [
      `${service.title} Services in ${place} | Fivo LLC`,
      `${service.title} in ${place} — Fivo LLC`,
      `${name} ${service.title} Company | Fivo LLC`,
    ],
    2,
  )

  const metaDescription = pick(
    [
      `Looking for ${svc} in ${place}? Fivo LLC helps ${name} businesses grow with a transparent, data-driven approach. Get a free marketing audit.`,
      `Fivo LLC delivers ${svc} for ${name} businesses — clear strategy, real execution, and reporting tied to leads. Book a free audit.`,
      `Grow your ${name} business with ${svc} from Fivo LLC, built around how local customers actually search and buy. Request a free audit.`,
      `${service.title} in ${place} that turns attention into qualified leads. Fivo LLC — transparent, data-driven, and local-minded. Free audit.`,
    ],
    3,
  )

  const intro = pick(
    [
      `Fivo LLC helps ${name} businesses get more out of ${svc}. ${someHoods ? `From ${someHoods}, ` : ''}standing out in ${regionVoice} takes more than activity — it takes a clear strategy, consistent execution, and reporting that ties your investment to real results.`,
      `${name} runs on ${economy}, and that shapes how ${svc} has to work here. We build ${svc} around the way ${name} customers actually search, compare, and decide — not a generic, one-size-fits-all playbook.`,
      `Strong ${svc} in ${place} starts with understanding the local market. ${twoHoods ? `Whether your customers are near ${twoHoods}, ` : ''}Fivo LLC focuses on the work that turns attention into qualified leads — and reports on it in plain language.`,
    ],
    5,
  )

  const localContext = pick(
    [
      `${name} businesses compete in ${economy}. Customers compare options quickly and trust their own research, so your marketing has to earn attention and then convert it. We tailor ${svc} to how buyers across ${place} actually search and choose.`,
      `The ${place} market rewards businesses that show up clearly and consistently. ${someHoods ? `From ${someHoods}, ` : ''}we make sure your ${svc} reaches the right people and gives them a concrete reason to pick you over the next option.`,
      `In ${place}, ${svc} is less about volume and more about relevance. With ${economy}, buyers have plenty of choices — so we position your business to be the obvious one when they are ready to act.`,
    ],
    7,
  )

  // Localized pain points blend the service category's pains with the place.
  const localPains = [
    pick(
      [
        `${name} customers choosing competitors who are easier to find online`,
        `Being invisible when ${name} customers search for what you offer`,
        `Losing ${name} leads to competitors with a stronger online presence`,
      ],
      11,
    ),
    ...base.problemsSolved.slice(0, 2),
    `Marketing spend that is hard to tie back to real ${name} leads`,
  ]

  const localFaqs = [
    {
      q: `Do you work with businesses in ${place}?`,
      a: `Yes. Fivo LLC works with businesses across ${loc.stateName}, including ${place}${someHoods ? ` and areas like ${someHoods}` : ''}. We are based in Sterling Heights, MI and serve clients locally and remotely.`,
    },
    {
      q: pick(
        [
          `How is ${svc} different for a ${name} business?`,
          `What makes your ${svc} work in ${place}?`,
          `Why hire a ${svc} partner that knows ${place}?`,
        ],
        13,
      ),
      a: `We account for local competition, how ${name} customers search, and the channels that perform in ${regionVoice} — instead of running the same playbook everywhere. ${name}'s market (${economy}) needs ${svc} built for it.`,
    },
    ...base.faqs.slice(0, 2),
  ]

  const cta = pick(
    [
      `Ready to grow your ${name} business with ${svc}? Book a free marketing audit and we will show you exactly where the opportunities are.`,
      `Let's make your ${name} business easier to find and easier to choose. Book a free ${svc} audit with Fivo LLC.`,
      `See what ${svc} could do for your ${name} business. Get a free, no-pressure marketing audit from a team that knows ${place}.`,
    ],
    17,
  )

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
