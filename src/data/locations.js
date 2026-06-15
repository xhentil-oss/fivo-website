// Location catalog powering /locations/:slug and /services/:service/:location.
// `type` distinguishes a state/county region from a city. `nearby` drives
// internal links between related locations (good for local SEO, no thin loops).
// `neighborhoods` and `economy` are real, location-specific details woven into
// the generated copy so each service×location page reads uniquely (not a
// templated mad-lib) — important for avoiding "scaled content" penalties.

export const locations = [
  // ----- Michigan -----
  { id: 'michigan', city: 'Michigan', state: 'MI', stateName: 'Michigan', slug: 'michigan', region: 'Michigan', type: 'state', nearby: ['detroit', 'sterling-heights', 'warren', 'macomb-county', 'oakland-county'], neighborhoods: ['Metro Detroit', 'Grand Rapids', 'Ann Arbor', 'Lansing'], economy: 'a mix of advanced manufacturing, healthcare, and a fast-growing base of independent small businesses' },
  { id: 'sterling-heights', city: 'Sterling Heights', state: 'MI', stateName: 'Michigan', slug: 'sterling-heights', region: 'Metro Detroit', type: 'city', headquarters: true, nearby: ['warren', 'troy', 'shelby-township', 'detroit'], neighborhoods: ['the Lakeside area', 'the M-59 corridor', 'Dodge Park'], economy: 'advanced manufacturing, automotive suppliers, and family-owned service businesses' },
  { id: 'detroit', city: 'Detroit', state: 'MI', stateName: 'Michigan', slug: 'detroit', region: 'Metro Detroit', type: 'city', nearby: ['warren', 'sterling-heights', 'troy', 'michigan'], neighborhoods: ['Downtown', 'Midtown', 'Corktown', 'Eastern Market'], economy: 'a revitalizing downtown, mobility startups, and a wave of independent retail and restaurants' },
  { id: 'warren', city: 'Warren', state: 'MI', stateName: 'Michigan', slug: 'warren', region: 'Metro Detroit', type: 'city', nearby: ['sterling-heights', 'detroit', 'troy', 'macomb-county'], neighborhoods: ['the GM Tech Center area', 'the Van Dyke corridor', 'the Center Line border'], economy: 'automotive engineering, skilled trades, and industrial suppliers' },
  { id: 'troy', city: 'Troy', state: 'MI', stateName: 'Michigan', slug: 'troy', region: 'Metro Detroit', type: 'city', nearby: ['sterling-heights', 'rochester-hills', 'warren', 'oakland-county'], neighborhoods: ['the Big Beaver corridor', 'the Somerset area', 'downtown Troy'], economy: 'corporate offices, financial services, and upscale retail' },
  { id: 'shelby-township', city: 'Shelby Township', state: 'MI', stateName: 'Michigan', slug: 'shelby-township', region: 'Metro Detroit', type: 'city', nearby: ['sterling-heights', 'rochester-hills', 'macomb-county', 'troy'], neighborhoods: ['the Hall Road corridor', 'the Stony Creek area', 'the Utica border'], economy: 'suburban retail, the trades, and growing professional services' },
  { id: 'rochester-hills', city: 'Rochester Hills', state: 'MI', stateName: 'Michigan', slug: 'rochester-hills', region: 'Metro Detroit', type: 'city', nearby: ['troy', 'shelby-township', 'oakland-county', 'sterling-heights'], neighborhoods: ['downtown Rochester', 'the Oakland University area', 'the Adams Road corridor'], economy: 'professional services, healthcare, and technology firms' },
  { id: 'macomb-county', city: 'Macomb County', state: 'MI', stateName: 'Michigan', slug: 'macomb-county', region: 'Metro Detroit', type: 'county', nearby: ['sterling-heights', 'warren', 'shelby-township', 'michigan'], neighborhoods: ['Sterling Heights', 'Warren', 'Clinton Township', 'Shelby Township'], economy: 'manufacturing, defense contracting, and tight-knit small business communities' },
  { id: 'oakland-county', city: 'Oakland County', state: 'MI', stateName: 'Michigan', slug: 'oakland-county', region: 'Metro Detroit', type: 'county', nearby: ['troy', 'rochester-hills', 'detroit', 'michigan'], neighborhoods: ['Troy', 'Rochester Hills', 'Royal Oak', 'Birmingham'], economy: 'corporate headquarters, finance, and affluent retail districts' },

  // ----- New York -----
  { id: 'new-york', city: 'New York', state: 'NY', stateName: 'New York', slug: 'new-york', region: 'New York', type: 'state', nearby: ['new-york-city', 'brooklyn', 'queens', 'manhattan'], neighborhoods: ['New York City', 'Buffalo', 'Albany', 'Rochester'], economy: 'finance, media, tourism, and one of the densest small-business markets in the country' },
  { id: 'new-york-city', city: 'New York City', state: 'NY', stateName: 'New York', slug: 'new-york-city', region: 'New York City', type: 'city', nearby: ['manhattan', 'brooklyn', 'queens', 'bronx'], neighborhoods: ['Manhattan', 'Brooklyn', 'Queens', 'the Bronx'], economy: 'one of the most competitive small-business markets in the world, across five very different boroughs' },
  { id: 'brooklyn', city: 'Brooklyn', state: 'NY', stateName: 'New York', slug: 'brooklyn', region: 'New York City', type: 'city', nearby: ['manhattan', 'queens', 'new-york-city', 'bronx'], neighborhoods: ['Williamsburg', 'Park Slope', 'DUMBO', 'Bushwick'], economy: 'independent retail, food and beverage, and a deep bench of creative studios' },
  { id: 'queens', city: 'Queens', state: 'NY', stateName: 'New York', slug: 'queens', region: 'New York City', type: 'city', nearby: ['brooklyn', 'manhattan', 'bronx', 'new-york-city'], neighborhoods: ['Astoria', 'Long Island City', 'Flushing', 'Jamaica'], economy: 'remarkably diverse neighborhoods, restaurants, and local service businesses' },
  { id: 'bronx', city: 'Bronx', state: 'NY', stateName: 'New York', slug: 'bronx', region: 'New York City', type: 'city', nearby: ['manhattan', 'queens', 'brooklyn', 'new-york-city'], neighborhoods: ['Riverdale', 'Fordham', 'the South Bronx'], economy: 'neighborhood retail, healthcare, and community-rooted businesses' },
  { id: 'manhattan', city: 'Manhattan', state: 'NY', stateName: 'New York', slug: 'manhattan', region: 'New York City', type: 'city', nearby: ['brooklyn', 'queens', 'bronx', 'new-york-city'], neighborhoods: ['Midtown', 'SoHo', 'the Financial District', 'the Upper East Side'], economy: 'professional services, hospitality, and premium retail competing for the same attention' },
]

export const getLocationBySlug = (slug) => locations.find((l) => l.slug === slug)
export const getLocationsByState = (stateName) => locations.filter((l) => l.stateName === stateName)

// Group locations by state for menus and footers.
export const locationsByState = locations.reduce((acc, loc) => {
  ;(acc[loc.stateName] ||= []).push(loc)
  return acc
}, {})
