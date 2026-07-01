// Content store — the single seam between the UI and the data source.
//
// Reads are synchronous and come from a "snapshot" of all site content:
//   • On the server (SSR), the Express server loads it from MariaDB and calls
//     __setSnapshot() right before rendering.
//   • On the client, it is serialized into window.__CONTENT__ during SSR.
//   • As a fallback (e.g. first paint before hydration, or dev without a DB),
//     it uses the bundled seed data.
//
// Writes (admin) go through the API (see utils/api.js) to MariaDB, server-side.

import { services as seedServices } from '../data/services.js'
import { locations as seedLocations } from '../data/locations.js'
import { reviews as seedReviews } from '../data/reviews.js'
import { caseStudies as seedCaseStudies } from '../data/caseStudies.js'
import { company as seedCompany } from '../data/company.js'
import { apiPost } from './api.js'

const SEED = {
  services: seedServices,
  locations: seedLocations,
  reviews: seedReviews,
  caseStudies: seedCaseStudies,
  company: seedCompany,
  serviceLocationPages: {},
}

// Server sets this per request; null on the client.
let serverSnapshot = null
export function __setSnapshot(s) {
  serverSnapshot = s
}

function snap() {
  if (serverSnapshot) return serverSnapshot
  if (typeof window !== 'undefined' && window.__CONTENT__) return window.__CONTENT__
  return SEED
}

// ---- Reads ----
export const getServices = () => snap().services || SEED.services
export const getLocations = () => snap().locations || SEED.locations
export const getReviews = () => snap().reviews || SEED.reviews
export const getCaseStudies = () => snap().caseStudies || SEED.caseStudies
export const getCompany = () => snap().company || SEED.company
export const getServiceLocationPage = (serviceSlug, locationSlug) =>
  snap().serviceLocationPages?.[`${serviceSlug}/${locationSlug}`] || null

// ---- Writes (admin, async → MariaDB via API) ----
// `company` is a singleton setting; everything else is a collection.
export async function saveCollection(key, value) {
  if (key === 'company') {
    await apiPost('/settings/company', value)
  } else {
    await apiPost(`/collections/${key}`, value)
  }
  if (typeof window !== 'undefined' && window.__CONTENT__) window.__CONTENT__[key] = value
}

export async function saveServiceLocationPage(serviceSlug, locationSlug, data) {
  await apiPost(`/service-location/${serviceSlug}/${locationSlug}`, data)
  if (typeof window !== 'undefined' && window.__CONTENT__) {
    window.__CONTENT__.serviceLocationPages ||= {}
    window.__CONTENT__.serviceLocationPages[`${serviceSlug}/${locationSlug}`] = data
  }
}
