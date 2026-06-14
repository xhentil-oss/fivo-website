// Location catalog powering /locations/:slug and /services/:service/:location.
// `type` distinguishes a state/county region from a city. `nearby` drives
// internal links between related locations (good for local SEO, no thin loops).

export const locations = [
  // ----- Michigan -----
  { id: 'michigan', city: 'Michigan', state: 'MI', stateName: 'Michigan', slug: 'michigan', region: 'Michigan', type: 'state', nearby: ['detroit', 'sterling-heights', 'warren', 'macomb-county', 'oakland-county'] },
  { id: 'sterling-heights', city: 'Sterling Heights', state: 'MI', stateName: 'Michigan', slug: 'sterling-heights', region: 'Metro Detroit', type: 'city', headquarters: true, nearby: ['warren', 'troy', 'shelby-township', 'detroit'] },
  { id: 'detroit', city: 'Detroit', state: 'MI', stateName: 'Michigan', slug: 'detroit', region: 'Metro Detroit', type: 'city', nearby: ['warren', 'sterling-heights', 'troy', 'michigan'] },
  { id: 'warren', city: 'Warren', state: 'MI', stateName: 'Michigan', slug: 'warren', region: 'Metro Detroit', type: 'city', nearby: ['sterling-heights', 'detroit', 'troy', 'macomb-county'] },
  { id: 'troy', city: 'Troy', state: 'MI', stateName: 'Michigan', slug: 'troy', region: 'Metro Detroit', type: 'city', nearby: ['sterling-heights', 'rochester-hills', 'warren', 'oakland-county'] },
  { id: 'shelby-township', city: 'Shelby Township', state: 'MI', stateName: 'Michigan', slug: 'shelby-township', region: 'Metro Detroit', type: 'city', nearby: ['sterling-heights', 'rochester-hills', 'macomb-county', 'troy'] },
  { id: 'rochester-hills', city: 'Rochester Hills', state: 'MI', stateName: 'Michigan', slug: 'rochester-hills', region: 'Metro Detroit', type: 'city', nearby: ['troy', 'shelby-township', 'oakland-county', 'sterling-heights'] },
  { id: 'macomb-county', city: 'Macomb County', state: 'MI', stateName: 'Michigan', slug: 'macomb-county', region: 'Metro Detroit', type: 'county', nearby: ['sterling-heights', 'warren', 'shelby-township', 'michigan'] },
  { id: 'oakland-county', city: 'Oakland County', state: 'MI', stateName: 'Michigan', slug: 'oakland-county', region: 'Metro Detroit', type: 'county', nearby: ['troy', 'rochester-hills', 'detroit', 'michigan'] },

  // ----- New York -----
  { id: 'new-york', city: 'New York', state: 'NY', stateName: 'New York', slug: 'new-york', region: 'New York', type: 'state', nearby: ['new-york-city', 'brooklyn', 'queens', 'manhattan'] },
  { id: 'new-york-city', city: 'New York City', state: 'NY', stateName: 'New York', slug: 'new-york-city', region: 'New York City', type: 'city', nearby: ['manhattan', 'brooklyn', 'queens', 'bronx'] },
  { id: 'brooklyn', city: 'Brooklyn', state: 'NY', stateName: 'New York', slug: 'brooklyn', region: 'New York City', type: 'city', nearby: ['manhattan', 'queens', 'new-york-city', 'bronx'] },
  { id: 'queens', city: 'Queens', state: 'NY', stateName: 'New York', slug: 'queens', region: 'New York City', type: 'city', nearby: ['brooklyn', 'manhattan', 'bronx', 'new-york-city'] },
  { id: 'bronx', city: 'Bronx', state: 'NY', stateName: 'New York', slug: 'bronx', region: 'New York City', type: 'city', nearby: ['manhattan', 'queens', 'brooklyn', 'new-york-city'] },
  { id: 'manhattan', city: 'Manhattan', state: 'NY', stateName: 'New York', slug: 'manhattan', region: 'New York City', type: 'city', nearby: ['brooklyn', 'queens', 'bronx', 'new-york-city'] },
]

export const getLocationBySlug = (slug) => locations.find((l) => l.slug === slug)
export const getLocationsByState = (stateName) => locations.filter((l) => l.stateName === stateName)

// Group locations by state for menus and footers.
export const locationsByState = locations.reduce((acc, loc) => {
  ;(acc[loc.stateName] ||= []).push(loc)
  return acc
}, {})
