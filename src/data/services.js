// Service catalog. Every service renders a full page via /services/:slug.
// `featured` services carry hand-written rich content. All others get
// professional, varied content from utils/serviceContent.js so no page is "thin".
// In production this array is replaced by a CMS fetch (see utils/store.js).

export const serviceCategories = [
  { id: 'seo', label: 'SEO & Local Search' },
  { id: 'ads', label: 'Paid Advertising' },
  { id: 'social', label: 'Social Media' },
  { id: 'brand', label: 'Branding & Creative' },
  { id: 'web', label: 'Web & Conversion' },
  { id: 'growth', label: 'Growth & Strategy' },
]

export const services = [
  // ---------- SEO ----------
  {
    id: 'seo',
    title: 'SEO',
    slug: 'seo',
    category: 'seo',
    icon: 'search',
    featured: true,
    homepage: true,
    shortDescription: 'Rank higher on Google and turn organic traffic into qualified leads.',
    tagline: 'SEO services that help your business get found.',
    seoTitle: 'SEO Services That Drive Qualified Traffic | Fivo LLC',
    metaDescription:
      'Professional SEO services from Fivo LLC. We improve rankings, grow organic traffic, and turn searchers into customers with a transparent, data-driven approach.',
    fullDescription: [
      'Search is where most buying decisions begin. If your business is not visible when people search for what you offer, that demand goes to a competitor. Our SEO work is built to change that — methodically, and with reporting you can actually read.',
      'We combine technical health, on-page relevance, content that answers real questions, and authority-building so your site earns durable rankings instead of short-lived spikes.',
    ],
    benefits: [
      { title: 'Sustainable rankings', text: 'We build authority that compounds, so traffic keeps growing after the work is done.' },
      { title: 'Qualified traffic', text: 'We target the searches buyers actually use, not vanity keywords with no intent.' },
      { title: 'Transparent reporting', text: 'Clear monthly reports on rankings, traffic, and leads — no jargon, no smoke.' },
    ],
    process: [
      { title: 'Audit', text: 'We map your current visibility, technical issues, and the gaps between you and the competitors outranking you.' },
      { title: 'Strategy', text: 'We prioritize the keywords and pages that will move revenue, not just rankings.' },
      { title: 'Execution', text: 'Technical fixes, on-page optimization, content, and authority building, shipped in clear sprints.' },
      { title: 'Reporting', text: 'Monthly reporting tied to leads and traffic so you always know what your investment is doing.' },
    ],
    faqs: [
      { q: 'How long does SEO take to work?', a: 'Most businesses see meaningful movement within 3–6 months, with compounding gains after that. Timeline depends on competition and your starting point.' },
      { q: 'Do you guarantee #1 rankings?', a: 'No reputable agency can guarantee a specific position — Google controls the algorithm. We guarantee a sound, transparent process and measurable progress.' },
      { q: 'Is SEO better than paid ads?', a: 'They solve different problems. Ads give you instant visibility; SEO builds durable traffic you do not pay for per click. Most growing businesses use both.' },
    ],
    relatedServices: ['local-seo', 'technical-seo', 'content-marketing', 'google-ads'],
  },
  {
    id: 'local-seo',
    title: 'Local SEO',
    slug: 'local-seo',
    category: 'seo',
    icon: 'pin',
    featured: true,
    homepage: true,
    shortDescription: 'Own the map pack and local searches in the cities you serve.',
    tagline: 'Get found by customers in your service area.',
    seoTitle: 'Local SEO Services — Win the Map Pack | Fivo LLC',
    metaDescription:
      'Local SEO from Fivo LLC helps service businesses rank in the Google map pack, win "near me" searches, and turn local intent into booked jobs.',
    fullDescription: [
      'When someone searches for a service "near me," the businesses in the top three map results capture the majority of calls. Local SEO is how you get there and stay there.',
      'We optimize your Google Business Profile, build consistent local citations, earn reviews the right way, and create location pages that signal real relevance to each area you serve.',
    ],
    benefits: [
      { title: 'Map pack visibility', text: 'Show up in the top three local results where most calls and direction requests happen.' },
      { title: 'More phone calls', text: 'Local intent converts fast — we turn "near me" searches into ringing phones.' },
      { title: 'Review momentum', text: 'A steady review strategy that builds trust and feeds local rankings.' },
    ],
    process: [
      { title: 'Profile optimization', text: 'We fully optimize and clean up your Google Business Profile and core listings.' },
      { title: 'Citations', text: 'Consistent name, address, and phone across the directories Google trusts.' },
      { title: 'Local content', text: 'Service-area pages and content that prove relevance to each city you serve.' },
      { title: 'Reviews & reporting', text: 'A review engine plus monthly reporting on calls, directions, and rankings.' },
    ],
    faqs: [
      { q: 'What is the "map pack"?', a: 'The three local business listings Google shows on a map above the regular results. Most local clicks and calls come from these spots.' },
      { q: 'Do reviews really affect rankings?', a: 'Yes. Review quantity, quality, and recency are meaningful local ranking signals — and they strongly influence whether searchers choose you.' },
      { q: 'Can you help if I serve multiple cities?', a: 'Absolutely. We build distinct, genuinely useful pages for each service area rather than thin duplicate pages.' },
    ],
    relatedServices: ['seo', 'google-business-profile', 'review-management', 'reputation-management'],
  },
  { id: 'technical-seo', title: 'Technical SEO', slug: 'technical-seo', category: 'seo', icon: 'gear', shortDescription: 'Fix crawlability, speed, and structure so search engines can rank you.' },
  { id: 'on-page-seo', title: 'On-Page SEO', slug: 'on-page-seo', category: 'seo', icon: 'doc', shortDescription: 'Optimize titles, content, and structure for the searches that matter.' },
  { id: 'off-page-seo', title: 'Off-Page SEO', slug: 'off-page-seo', category: 'seo', icon: 'link', shortDescription: 'Build authority with quality links and brand mentions that move rankings.' },
  { id: 'google-business-profile', title: 'Google Business Profile Optimization', slug: 'google-business-profile', category: 'seo', icon: 'pin', shortDescription: 'Turn your free Google listing into a lead-generating asset.' },

  // ---------- Advertising ----------
  {
    id: 'google-ads',
    title: 'Google Ads',
    slug: 'google-ads',
    category: 'ads',
    icon: 'target',
    featured: true,
    homepage: true,
    shortDescription: 'Capture high-intent buyers the moment they search for what you sell.',
    tagline: 'Profitable Google Ads, managed with discipline.',
    seoTitle: 'Google Ads Management That Protects Your Budget | Fivo LLC',
    metaDescription:
      'Google Ads management from Fivo LLC. We structure campaigns to capture high-intent searches, cut wasted spend, and report on real cost per lead.',
    fullDescription: [
      'Google Ads puts you in front of people actively searching for your service. Done well, it is one of the fastest ways to generate qualified leads. Done poorly, it quietly drains budget on the wrong clicks.',
      'We build tightly themed campaigns, ruthless negative keyword lists, and conversion tracking that ties spend to actual leads — so every dollar is accountable.',
    ],
    benefits: [
      { title: 'High-intent reach', text: 'Show up exactly when someone is ready to buy or call.' },
      { title: 'Less wasted spend', text: 'Negative keywords and tight targeting stop budget leaking on bad clicks.' },
      { title: 'Cost-per-lead clarity', text: 'We track conversions properly so you see real cost per lead, not just clicks.' },
    ],
    process: [
      { title: 'Account audit', text: 'We review structure, tracking, and wasted spend before changing anything.' },
      { title: 'Build & track', text: 'Themed campaigns plus proper conversion tracking so results are measurable.' },
      { title: 'Optimize', text: 'Ongoing bid, keyword, and ad testing to push cost per lead down.' },
      { title: 'Report', text: 'Monthly reporting focused on leads and return, not vanity metrics.' },
    ],
    faqs: [
      { q: 'How much should I budget?', a: 'It depends on your market and goals. We help you start at a level that gathers real data, then scale what works. We are transparent about management fee vs. ad spend.' },
      { q: 'How fast will I see leads?', a: 'Ads can generate leads within days of launch. The first weeks are about gathering data; results then improve as we optimize.' },
      { q: 'Who owns the ad account?', a: 'You do, always. We work inside your account so you keep full ownership and history.' },
    ],
    relatedServices: ['ppc', 'facebook-ads', 'landing-page-design', 'conversion-rate-optimization'],
  },
  {
    id: 'facebook-ads',
    title: 'Facebook Ads',
    slug: 'facebook-ads',
    category: 'ads',
    icon: 'megaphone',
    featured: true,
    homepage: true,
    shortDescription: 'Reach the right audiences on Facebook and Instagram with creative that converts.',
    tagline: 'Meta ads built around offers and creative.',
    seoTitle: 'Facebook & Instagram Ads Management | Fivo LLC',
    metaDescription:
      'Facebook Ads management from Fivo LLC. We pair sharp audience targeting with scroll-stopping creative and clear tracking to generate leads and sales.',
    fullDescription: [
      'Facebook and Instagram are where you create demand — reaching people before they are actively searching. Success comes from the right offer, creative that stops the scroll, and disciplined testing.',
      'We handle audience strategy, creative direction, and the full testing loop, with tracking that connects ad spend to leads and sales.',
    ],
    benefits: [
      { title: 'Demand creation', text: 'Reach future customers before competitors do, while they scroll.' },
      { title: 'Creative that converts', text: 'We direct ad creative around a clear offer, not just pretty visuals.' },
      { title: 'Disciplined testing', text: 'Structured testing finds your winners and scales them confidently.' },
    ],
    faqs: [
      { q: 'Do Facebook ads work for service businesses?', a: 'Yes — with the right lead offer and follow-up. We design the offer and funnel, not just the ad.' },
      { q: 'What creative do you need from me?', a: 'We can work with what you have and direct new creative. Authentic photos and short video usually outperform polished stock.' },
    ],
    relatedServices: ['instagram-ads', 'social-media-marketing', 'funnel-design', 'lead-generation'],
  },
  { id: 'instagram-ads', title: 'Instagram Ads', slug: 'instagram-ads', category: 'ads', icon: 'camera', shortDescription: 'Reach and convert audiences with native, visual-first Instagram campaigns.' },
  { id: 'youtube-ads', title: 'YouTube Ads', slug: 'youtube-ads', category: 'ads', icon: 'play', shortDescription: 'Build awareness and demand with targeted video advertising.' },
  { id: 'tiktok-ads', title: 'TikTok Ads', slug: 'tiktok-ads', category: 'ads', icon: 'music', shortDescription: 'Tap into TikTok reach with creative built for the platform.' },
  { id: 'linkedin-ads', title: 'LinkedIn Ads', slug: 'linkedin-ads', category: 'ads', icon: 'briefcase', shortDescription: 'Reach decision-makers with precise B2B targeting.' },
  { id: 'ppc', title: 'PPC Campaigns', slug: 'ppc', category: 'ads', icon: 'cursor', shortDescription: 'Full-funnel pay-per-click management across search and social.' },

  // ---------- Social ----------
  {
    id: 'social-media-marketing',
    title: 'Social Media Marketing',
    slug: 'social-media-marketing',
    category: 'social',
    icon: 'share',
    featured: true,
    homepage: true,
    shortDescription: 'Stay top of mind with consistent, on-brand content that builds trust.',
    tagline: 'Consistent social presence that builds your brand.',
    seoTitle: 'Social Media Marketing & Management | Fivo LLC',
    metaDescription:
      'Social media marketing from Fivo LLC. Consistent, on-brand content and strategy that builds trust, grows your audience, and supports your sales pipeline.',
    fullDescription: [
      'Inconsistent posting and an outdated profile quietly cost you credibility. A steady, intentional social presence keeps your brand top of mind and builds the trust that makes every other marketing channel work better.',
      'We handle strategy, content, and consistency so your social feels like a real brand — not an afterthought.',
    ],
    benefits: [
      { title: 'Always-on presence', text: 'Consistent, planned content instead of sporadic posting.' },
      { title: 'On-brand every time', text: 'A cohesive look and voice across every platform.' },
      { title: 'Trust that compounds', text: 'An active, professional feed reassures buyers and supports conversions.' },
    ],
    faqs: [
      { q: 'Which platforms should my business be on?', a: 'The ones where your customers actually spend time. We help you focus rather than spreading thin across every network.' },
      { q: 'Do you create the content too?', a: 'Yes — strategy, content, scheduling, and reporting. We can also direct photo and video shoots.' },
    ],
    relatedServices: ['social-media-management', 'content-marketing', 'instagram-ads', 'branding'],
  },
  { id: 'social-media-management', title: 'Social Media Management', slug: 'social-media-management', category: 'social', icon: 'calendar', shortDescription: 'Done-for-you posting, engagement, and community management.' },
  { id: 'influencer-marketing', title: 'Influencer Marketing', slug: 'influencer-marketing', category: 'social', icon: 'star', shortDescription: 'Partner with creators your audience already trusts.' },

  // ---------- Branding & Creative ----------
  {
    id: 'branding',
    title: 'Branding',
    slug: 'branding',
    category: 'brand',
    icon: 'sparkle',
    featured: true,
    homepage: true,
    shortDescription: 'Look established and trustworthy with a brand that fits your ambitions.',
    tagline: 'A brand that earns trust on sight.',
    seoTitle: 'Branding & Brand Strategy Services | Fivo LLC',
    metaDescription:
      'Branding services from Fivo LLC. We craft identity, voice, and visuals that make your business look established, consistent, and worth choosing.',
    fullDescription: [
      'People judge your business in seconds. A weak or inconsistent brand makes even a great company look risky. Strong branding does the opposite — it signals competence before a word is read.',
      'We build the identity, voice, and visual system that makes your brand instantly recognizable and consistently applied everywhere.',
    ],
    benefits: [
      { title: 'Instant credibility', text: 'Look like the established choice, not the risky one.' },
      { title: 'Consistency everywhere', text: 'One coherent system across web, social, print, and ads.' },
      { title: 'Premium positioning', text: 'A brand that supports higher prices and better clients.' },
    ],
    faqs: [
      { q: 'Is branding just a logo?', a: 'No. A logo is one piece. Branding is the full system — colors, type, voice, and how it all comes together consistently.' },
      { q: 'Do I need a rebrand or a refresh?', a: 'We help you decide. Sometimes a refresh is enough; sometimes a deeper rebrand unlocks more. We are honest about which you need.' },
    ],
    relatedServices: ['logo-design', 'brand-strategy', 'website-design', 'creative-design'],
  },
  { id: 'logo-design', title: 'Logo Design', slug: 'logo-design', category: 'brand', icon: 'pen', shortDescription: 'A memorable, versatile mark that anchors your identity.' },
  { id: 'brand-strategy', title: 'Brand Strategy', slug: 'brand-strategy', category: 'brand', icon: 'compass', shortDescription: 'Positioning, voice, and messaging that set you apart.' },
  { id: 'creative-design', title: 'Creative Design', slug: 'creative-design', category: 'brand', icon: 'palette', shortDescription: 'On-brand graphics for ads, social, and print.' },
  { id: 'video-marketing', title: 'Video Marketing', slug: 'video-marketing', category: 'brand', icon: 'video', shortDescription: 'Short-form and brand video that earns attention.' },
  { id: 'copywriting', title: 'Copywriting', slug: 'copywriting', category: 'brand', icon: 'quote', shortDescription: 'Persuasive copy that turns readers into buyers.' },

  // ---------- Web & Conversion ----------
  {
    id: 'website-design',
    title: 'Website Design',
    slug: 'website-design',
    category: 'web',
    icon: 'monitor',
    featured: true,
    homepage: true,
    shortDescription: 'Fast, modern websites built to convert visitors into leads.',
    tagline: 'Websites that work as hard as you do.',
    seoTitle: 'Website Design Built to Convert | Fivo LLC',
    metaDescription:
      'Website design from Fivo LLC. Fast, modern, mobile-first sites engineered for SEO and built to turn visitors into leads — not just look good.',
    fullDescription: [
      'Your website is often the first real impression and the hub every campaign points to. A slow, dated, or confusing site quietly leaks the leads you worked to earn.',
      'We design fast, mobile-first websites with a clear path to action, built on a clean structure that search engines and customers both reward.',
    ],
    benefits: [
      { title: 'Built to convert', text: 'Clear structure and calls to action that guide visitors to contact you.' },
      { title: 'Fast and mobile-first', text: 'Speed and mobile experience that protect rankings and conversions.' },
      { title: 'SEO-ready foundation', text: 'Clean, semantic structure search engines can read and rank.' },
    ],
    faqs: [
      { q: 'Will my site be mobile-friendly?', a: 'Always. We design mobile-first, since that is where most visitors and Google start.' },
      { q: 'Can you redesign my existing site?', a: 'Yes. We can refresh what works and rebuild what does not, preserving your SEO equity.' },
    ],
    relatedServices: ['landing-page-design', 'conversion-rate-optimization', 'seo', 'funnel-design'],
  },
  { id: 'landing-page-design', title: 'Landing Page Design', slug: 'landing-page-design', category: 'web', icon: 'layout', shortDescription: 'Focused pages engineered to convert ad and email traffic.' },
  { id: 'funnel-design', title: 'Funnel Design', slug: 'funnel-design', category: 'web', icon: 'funnel', shortDescription: 'Map and build the path from first click to closed customer.' },
  { id: 'conversion-rate-optimization', title: 'Conversion Rate Optimization', slug: 'conversion-rate-optimization', category: 'web', icon: 'trending', shortDescription: 'Turn more of your existing traffic into leads and sales.' },
  { id: 'ecommerce-marketing', title: 'E-commerce Marketing', slug: 'ecommerce-marketing', category: 'web', icon: 'cart', shortDescription: 'Drive traffic and sales for your online store.' },

  // ---------- Growth & Strategy ----------
  {
    id: 'lead-generation',
    title: 'Lead Generation',
    slug: 'lead-generation',
    category: 'growth',
    icon: 'magnet',
    featured: true,
    homepage: true,
    shortDescription: 'A predictable system that fills your pipeline with qualified leads.',
    tagline: 'Predictable leads, not random spikes.',
    seoTitle: 'Lead Generation Systems for Local Business | Fivo LLC',
    metaDescription:
      'Lead generation from Fivo LLC. We build a repeatable system — offer, traffic, landing page, and follow-up — that turns marketing spend into qualified leads.',
    fullDescription: [
      'Most businesses do not have a lead problem in isolation — they have a system problem. Leads arrive in unpredictable bursts because the offer, traffic, and follow-up are not working together.',
      'We assemble the full system: a compelling offer, the right traffic source, a landing page that converts, and a follow-up flow that turns interest into booked work.',
    ],
    benefits: [
      { title: 'Predictability', text: 'A repeatable engine instead of feast-or-famine lead flow.' },
      { title: 'Qualified leads', text: 'We optimize for lead quality and fit, not just raw volume.' },
      { title: 'Full system', text: 'Offer, traffic, page, and follow-up working together — not in silos.' },
    ],
    faqs: [
      { q: 'How is this different from just running ads?', a: 'Ads are one input. We build the whole system around them — offer, page, and follow-up — which is usually where leads are won or lost.' },
      { q: 'What counts as a qualified lead?', a: 'We define it with you up front — by budget, location, service, or readiness — so we optimize for leads worth your time.' },
    ],
    relatedServices: ['google-ads', 'facebook-ads', 'funnel-design', 'landing-page-design'],
  },
  { id: 'marketing-strategy', title: 'Marketing Strategy', slug: 'marketing-strategy', category: 'growth', icon: 'map', shortDescription: 'A clear, prioritized plan to reach your growth goals.' },
  { id: 'email-marketing', title: 'Email Marketing', slug: 'email-marketing', category: 'growth', icon: 'mail', shortDescription: 'Nurture leads and drive repeat business with email that gets opened.' },
  { id: 'sms-marketing', title: 'SMS Marketing', slug: 'sms-marketing', category: 'growth', icon: 'chat', shortDescription: 'Reach customers instantly with permission-based text campaigns.' },
  { id: 'content-marketing', title: 'Content Marketing', slug: 'content-marketing', category: 'growth', icon: 'doc', shortDescription: 'Content that ranks, builds trust, and drives steady traffic.' },
  { id: 'reputation-management', title: 'Reputation Management', slug: 'reputation-management', category: 'growth', icon: 'shield', shortDescription: 'Protect and strengthen how your business looks online.' },
  { id: 'review-management', title: 'Review Management', slug: 'review-management', category: 'growth', icon: 'star', shortDescription: 'Earn more reviews and respond to them the right way.' },
  { id: 'marketing-automation', title: 'Marketing Automation', slug: 'marketing-automation', category: 'growth', icon: 'bolt', shortDescription: 'Automate follow-up and nurture so no lead slips through.' },
  { id: 'analytics-reporting', title: 'Analytics & Reporting', slug: 'analytics-reporting', category: 'growth', icon: 'chart', shortDescription: 'Clear dashboards that connect marketing to revenue.' },
  { id: 'consulting', title: 'Marketing Consulting', slug: 'consulting', category: 'growth', icon: 'lightbulb', shortDescription: 'Expert guidance to sharpen your strategy and team.' },
]

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug)
export const getServicesByCategory = (catId) => services.filter((s) => s.category === catId)
export const getHomepageServices = () => services.filter((s) => s.homepage)
