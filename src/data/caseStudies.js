// Demo case studies. Results use safe, qualitative phrasing — no invented metrics.
// Flagged isDemo so the UI labels them and the admin can manage them.

export const caseStudies = [
  {
    id: 'cs1',
    title: 'Local Service Business Growth Campaign',
    slug: 'local-service-business-growth',
    clientType: 'Local service business',
    location: 'Metro Detroit, MI',
    servicesUsed: ['SEO', 'Google Ads', 'Landing Page Optimization', 'Review Strategy'],
    challenge: 'Low online visibility and inconsistent leads made it hard to plan and grow.',
    solution: 'We combined local SEO, a focused Google Ads campaign, an optimized landing page, and a steady review strategy into one system.',
    result: 'Demo result: improved search visibility, better lead quality, and a stronger, more trustworthy online presence.',
    image: '',
    isDemo: true,
  },
  {
    id: 'cs2',
    title: 'Brand Refresh & Social Presence',
    slug: 'brand-refresh-social-presence',
    clientType: 'Retail business',
    location: 'Sterling Heights, MI',
    servicesUsed: ['Branding', 'Social Media Marketing', 'Creative Design'],
    challenge: 'An inconsistent brand and sporadic social posting made the business look smaller than it was.',
    solution: 'We built a cohesive identity and a consistent, on-brand social content system.',
    result: 'Demo result: a more professional, consistent brand presence and stronger customer trust across platforms.',
    image: '',
    isDemo: true,
  },
  {
    id: 'cs3',
    title: 'Lead Generation System Build',
    slug: 'lead-generation-system-build',
    clientType: 'B2B service company',
    location: 'New York, NY',
    servicesUsed: ['Lead Generation', 'Funnel Design', 'Facebook Ads'],
    challenge: 'Leads arrived in unpredictable bursts with no reliable system behind them.',
    solution: 'We built a complete lead system: a clear offer, paid traffic, a converting landing page, and automated follow-up.',
    result: 'Demo result: a more predictable lead flow and a clearer view of cost per qualified lead.',
    image: '',
    isDemo: true,
  },
]

export const getCaseStudyBySlug = (slug) => caseStudies.find((c) => c.slug === slug)
