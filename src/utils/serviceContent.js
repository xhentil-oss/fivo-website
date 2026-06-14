// Content engine for service pages.
// Featured services carry hand-written content in data/services.js. Every other
// service gets professional, category-aware content here so no page is thin or
// identical. This is the scalable pattern the brief asks for: data in, content out.

const CATEGORY_FRAME = {
  seo: {
    promise: 'get found by the people already searching for what you offer',
    pain: ['Low visibility in search results', 'Competitors outranking you', 'Traffic that never turns into leads'],
  },
  ads: {
    promise: 'reach ready-to-buy customers and protect every dollar of ad spend',
    pain: ['Ad budget leaking on the wrong clicks', 'No clear cost per lead', 'Campaigns that started strong then stalled'],
  },
  social: {
    promise: 'stay top of mind with a consistent, professional presence',
    pain: ['Inconsistent posting', 'A feed that looks dated', 'Social effort that never ties back to sales'],
  },
  brand: {
    promise: 'look established and trustworthy the moment someone finds you',
    pain: ['A brand that looks smaller than you are', 'Inconsistent visuals across platforms', 'Trouble standing out from competitors'],
  },
  web: {
    promise: 'turn more of your visitors into leads and customers',
    pain: ['A slow or dated website', 'Visitors who leave without acting', 'A site that does not show up in search'],
  },
  growth: {
    promise: 'build a predictable system that supports real, sustainable growth',
    pain: ['Unpredictable lead flow', 'No clear view of what is working', 'Marketing that feels like guesswork'],
  },
}

function defaultBenefits(service, frame) {
  return [
    { title: 'Clear strategy', text: `A focused ${service.title.toLowerCase()} plan built around your goals, not a generic checklist.` },
    { title: 'Real execution', text: 'We do the work and keep it moving in clear, accountable steps.' },
    { title: 'Honest reporting', text: 'Transparent reporting so you always know what your investment is doing.' },
  ]
}

function defaultProcess() {
  return [
    { title: 'Audit', text: 'We start by understanding your business, your market, and where the real opportunities are.' },
    { title: 'Strategy', text: 'We build a prioritized plan focused on the work that will actually move revenue.' },
    { title: 'Execution', text: 'We ship the work in clear sprints, keeping you informed at every step.' },
    { title: 'Reporting', text: 'We report on outcomes tied to leads and growth — no vanity metrics.' },
  ]
}

function defaultFaqs(service) {
  return [
    { q: `How quickly will I see results from ${service.title.toLowerCase()}?`, a: 'It depends on your market and starting point. We set realistic expectations up front and report on progress throughout, so you are never guessing.' },
    { q: 'Do I need a long-term contract?', a: 'We earn the relationship month to month. We are transparent about scope and pricing so you stay because it is working.' },
    { q: `Is ${service.title.toLowerCase()} right for my business?`, a: 'Book a free audit and we will tell you honestly whether this is the right priority — or whether something else would move the needle faster.' },
  ]
}

export function getServiceContent(service) {
  const frame = CATEGORY_FRAME[service.category] || CATEGORY_FRAME.growth
  return {
    tagline: service.tagline || `${service.title} that helps your business ${frame.promise}.`,
    fullDescription:
      service.fullDescription || [
        `${service.title} should do one thing above all: help your business ${frame.promise}. Too often it is treated as a checkbox instead of a system tied to real outcomes.`,
        `At Fivo LLC, we approach ${service.title.toLowerCase()} with a clear strategy, disciplined execution, and reporting you can actually read — so the work stays accountable to growth.`,
      ],
    benefits: service.benefits || defaultBenefits(service, frame),
    process: service.process || defaultProcess(),
    problemsSolved: service.problemsSolved || frame.pain,
    faqs: service.faqs || defaultFaqs(service),
    seoTitle: service.seoTitle || `${service.title} Services | Fivo LLC`,
    metaDescription:
      service.metaDescription ||
      `${service.title} from Fivo LLC. We help businesses ${frame.promise} with a transparent, data-driven approach. Get a free marketing audit.`,
  }
}
