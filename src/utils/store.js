// Content store — the single seam between the UI and your data source.
//
// TODAY: reads from the static files in /data, with an optional localStorage
// "overlay" so the admin dashboard can edit content live in the demo.
//
// PRODUCTION: replace the function bodies with calls to your backend
// (Supabase / Strapi / Sanity / custom Node API). The component layer never
// changes because it only ever talks to these functions.

import { services as seedServices } from '../data/services.js'
import { locations as seedLocations } from '../data/locations.js'
import { reviews as seedReviews } from '../data/reviews.js'
import { caseStudies as seedCaseStudies } from '../data/caseStudies.js'
import { company as seedCompany } from '../data/company.js'

const OVERLAY_KEY = 'fivo_content_overlay_v1'

function readOverlay() {
  try {
    return JSON.parse(localStorage.getItem(OVERLAY_KEY) || '{}')
  } catch {
    return {}
  }
}

function writeOverlay(next) {
  try {
    localStorage.setItem(OVERLAY_KEY, JSON.stringify(next))
  } catch {
    /* storage unavailable — fail silently in demo */
  }
}

// ---- Reads ----
export function getServices() {
  const o = readOverlay()
  return o.services || seedServices
}
export function getLocations() {
  const o = readOverlay()
  return o.locations || seedLocations
}
export function getReviews() {
  const o = readOverlay()
  return o.reviews || seedReviews
}
export function getCaseStudies() {
  const o = readOverlay()
  return o.caseStudies || seedCaseStudies
}
export function getCompany() {
  const o = readOverlay()
  return o.company || seedCompany
}

// Admin-authored service+location overrides keyed by `${service}/${location}`.
// When present, the page uses these instead of generated content.
export function getServiceLocationPage(serviceSlug, locationSlug) {
  const o = readOverlay()
  return o.serviceLocationPages?.[`${serviceSlug}/${locationSlug}`] || null
}

// ---- Writes (admin) ----
export function saveCollection(key, value) {
  const o = readOverlay()
  o[key] = value
  writeOverlay(o)
}
export function saveServiceLocationPage(serviceSlug, locationSlug, data) {
  const o = readOverlay()
  o.serviceLocationPages ||= {}
  o.serviceLocationPages[`${serviceSlug}/${locationSlug}`] = data
  writeOverlay(o)
}
export function resetOverlay() {
  writeOverlay({})
}
