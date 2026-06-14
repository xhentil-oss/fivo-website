// Lightweight client-side validation helpers for forms.
// NOTE: Client validation is for UX only. The connected backend MUST re-validate
// and sanitize every field — never trust the client.

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').trim())
export const isPhone = (v) => /^[+]?[\d\s().-]{7,}$/.test(String(v || '').trim())
export const isRequired = (v) => String(v || '').trim().length > 0
export const maxLen = (v, n) => String(v || '').length <= n

export function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function validateContactForm(data) {
  const errors = {}
  if (!isRequired(data.fullName)) errors.fullName = 'Please enter your full name.'
  if (!isEmail(data.email)) errors.email = 'Enter a valid email address.'
  if (!isPhone(data.phone)) errors.phone = 'Enter a valid phone number.'
  if (!isRequired(data.message)) errors.message = 'Tell us a little about your goals.'
  if (!maxLen(data.message, 2000)) errors.message = 'Message is too long.'
  return { valid: Object.keys(errors).length === 0, errors }
}
