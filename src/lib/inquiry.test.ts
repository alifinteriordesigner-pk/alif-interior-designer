import { describe, expect, it } from 'vitest'
import {
  buildMailtoUrl,
  buildWhatsAppUrl,
  emptyInquiry,
  formatInquiryMessage,
  validateInquiry,
  type InquiryData,
} from './inquiry'

const valid: InquiryData = {
  name: 'Sara Khan',
  email: 'sara@example.com',
  phone: '+92 300 1234567',
  service: 'space-planning',
  location: 'DHA, Lahore',
  description: 'Two-bedroom apartment needs a new layout & storage — about 1,200 sq ft?',
}

describe('validateInquiry', () => {
  it('accepts a complete inquiry', () => {
    expect(validateInquiry(valid)).toEqual({})
  })

  it('requires name, email, service and description', () => {
    const errors = validateInquiry(emptyInquiry)
    expect(Object.keys(errors).sort()).toEqual(['description', 'email', 'name', 'service'])
  })

  it('treats phone and location as optional', () => {
    expect(validateInquiry({ ...valid, phone: '', location: '' })).toEqual({})
  })

  it('rejects malformed email and phone values', () => {
    const errors = validateInquiry({ ...valid, email: 'sara@', phone: '12ab' })
    expect(errors.email).toBeDefined()
    expect(errors.phone).toBeDefined()
  })

  it('rejects descriptions that are too short', () => {
    expect(validateInquiry({ ...valid, description: 'Hi' }).description).toBeDefined()
  })
})

describe('formatInquiryMessage', () => {
  it('includes provided fields and the service title', () => {
    const message = formatInquiryMessage(valid, 'Alif Interior Designer')
    expect(message).toContain('Name: Sara Khan')
    expect(message).toContain('Service: Space Planning')
    expect(message).toContain('Project location: DHA, Lahore')
  })

  it('omits empty optional fields', () => {
    const message = formatInquiryMessage({ ...valid, phone: '', location: '' }, 'Alif')
    expect(message).not.toContain('Phone:')
    expect(message).not.toContain('Project location:')
  })
})

describe('buildWhatsAppUrl', () => {
  it('builds a wa.me link with a correctly encoded message', () => {
    const message = formatInquiryMessage(valid, 'Alif Interior Designer')
    const url = buildWhatsAppUrl('923001234567', message)
    expect(url).not.toBeNull()
    const parsed = new URL(url!)
    expect(parsed.origin + parsed.pathname).toBe('https://wa.me/923001234567')
    expect(parsed.searchParams.get('text')).toBe(message)
    expect(url).toContain('%0A')
    expect(url).toContain('%26')
  })

  it('returns null for a missing or invalid number', () => {
    expect(buildWhatsAppUrl('', 'hi')).toBeNull()
    expect(buildWhatsAppUrl('123', 'hi')).toBeNull()
  })
})

describe('buildMailtoUrl', () => {
  it('encodes subject and body', () => {
    const url = buildMailtoUrl('hello@example.com', 'New inquiry', 'Line 1\nLine & 2')
    expect(url).toBe('mailto:hello@example.com?subject=New%20inquiry&body=Line%201%0ALine%20%26%202')
  })
})
