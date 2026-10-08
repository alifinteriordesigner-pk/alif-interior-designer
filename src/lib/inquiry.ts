import { getService } from '../data/services'

/**
 * Inquiry helpers kept free of React so they can be unit-tested and reused
 * by a future server endpoint (e.g. a Vercel function that sends email).
 */

export interface InquiryData {
  name: string
  email: string
  phone: string
  service: string
  location: string
  description: string
}

export type InquiryErrors = Partial<Record<keyof InquiryData, string>>

export const emptyInquiry: InquiryData = {
  name: '',
  email: '',
  phone: '',
  service: '',
  location: '',
  description: '',
}

/** Select value for visitors who are unsure which service they need. */
export const NOT_SURE = 'not-sure'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
export const DESCRIPTION_MIN = 20
export const DESCRIPTION_MAX = 2000

export function validateInquiry(data: InquiryData): InquiryErrors {
  const errors: InquiryErrors = {}
  const name = data.name.trim()
  const email = data.email.trim()
  const phone = data.phone.trim()
  const description = data.description.trim()

  if (!name) errors.name = 'Please enter your name.'
  else if (name.length < 2) errors.name = 'Please enter at least 2 characters.'

  if (!email) errors.email = 'Please enter your email address.'
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address, e.g. name@example.com.'

  if (phone) {
    const digits = phone.replace(/\D/g, '')
    if (!/^[+\d\s()-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
      errors.phone = 'Please enter a valid phone number, including country code if outside your area.'
    }
  }

  if (!data.service) errors.service = 'Please choose a service, or select “Not sure yet”.'

  if (!description) errors.description = 'Please tell us a little about your project.'
  else if (description.length < DESCRIPTION_MIN)
    errors.description = `Please add a little more detail (at least ${DESCRIPTION_MIN} characters).`
  else if (description.length > DESCRIPTION_MAX)
    errors.description = `Please keep the description under ${DESCRIPTION_MAX} characters.`

  return errors
}

export function serviceLabel(slug: string) {
  if (slug === NOT_SURE) return 'Not sure yet'
  return getService(slug)?.title ?? slug
}

/** Builds a readable plain-text message for WhatsApp or email. */
export function formatInquiryMessage(data: InquiryData, businessName: string) {
  const lines = [
    `Hello ${businessName}, I would like to request a consultation.`,
    '',
    `Name: ${data.name.trim()}`,
    `Email: ${data.email.trim()}`,
  ]
  if (data.phone.trim()) lines.push(`Phone: ${data.phone.trim()}`)
  lines.push(`Service: ${serviceLabel(data.service)}`)
  if (data.location.trim()) lines.push(`Project location: ${data.location.trim()}`)
  lines.push('', 'Project details:', data.description.trim())
  return lines.join('\n')
}

/** `number` must be digits only in international format (e.g. 923001234567). */
export function buildWhatsAppUrl(number: string, message: string) {
  const digits = number.replace(/\D/g, '')
  if (!/^\d{8,15}$/.test(digits)) return null
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}

export function buildMailtoUrl(email: string, subject: string, body: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
