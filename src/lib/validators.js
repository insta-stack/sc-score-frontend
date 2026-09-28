/**
 * Client-side validation & normalization utilities
 */

export function normalizePhone(phone) {
  if (!phone) return ''
  let cleaned = String(phone)
    .replace(/\+91/g, '')
    .replace(/[\s-]/g, '')
    .trim()

  if (cleaned.startsWith('91') && cleaned.length === 12) {
    cleaned = cleaned.slice(2)
  }
  return cleaned
}

export function isValidPhone(phone) {
  const cleaned = normalizePhone(phone)
  return /^[6-9]\d{9}$/.test(cleaned)
}

export function isValidPan(pan) {
  if (!pan) return false
  const trimmed = pan.trim().toUpperCase()
  // 10 chars: 5 uppercase letters, 4 digits, 1 uppercase letter
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(trimmed)
}

export function isValidGstin(gstin) {
  if (!gstin) return false
  const trimmed = gstin.trim().toUpperCase()
  // 15 chars: 2 digits (state code), 5 letters, 4 digits, 1 letter, 1 alphanumeric/entity, 'Z', 1 checksum char
  return /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(trimmed)
}

export function isValidEmail(email) {
  if (!email) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}
