/**
 * BUSINESS CONFIGURATION — edit this file to update contact details,
 * social links, and default SEO text across the whole website.
 *
 * Leave a value as an empty string ('') if you don't have it yet.
 * Empty values are hidden on the website; nothing fake is shown.
 */

export interface BusinessHours {
  /** e.g. 'Monday – Friday' */
  days: string
  /** e.g. '10:00 am – 6:00 pm' */
  hours: string
}

export const business = {
  name: 'Alif Interior Designer',

  /** Short line shown under the logo text. */
  tagline: 'Interior Design Studio',

  /**
   * Optional logo image. Put the file in /public/images and set the path,
   * e.g. '/images/logo.svg'. When empty, a text logo is shown.
   */
  logo: {
    src: '',
    width: 180,
    height: 48,
  },

  /** Public contact email shown to visitors, e.g. 'hello@alifinteriordesigner.pk' */
  email: 'alifinteriordesigner@gmail.com',

  /** Phone number as visitors should read it, e.g. '+92 300 1234567' */
  phone: '+92 314 6875567',

  /**
   * WhatsApp business number in international format, DIGITS ONLY:
   * country code + number, no '+', spaces, dashes or leading zero.
   * Example format: '923001234567'. Until this is set, the WhatsApp
   * button and the inquiry form's WhatsApp hand-off stay disabled.
   */
  whatsapp: '923115076758',

  address: {
    street: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
  },

  /** Where you take projects, e.g. 'Lahore and surrounding areas' */
  serviceArea: '',

  /** Leave the list empty to hide business hours. */
  hours: [] as BusinessHours[],

  /** Full profile URLs. Empty links are hidden. */
  social: {
    instagram: 'https://www.instagram.com/?hl=en',
    facebook: 'https://www.facebook.com/',
    linkedin: 'https://www.linkedin.com/',
    pinterest: 'https://www.pinterest.com/',
    youtube: 'https://www.youtube.com/',
  },

  /**
   * Google Maps "Embed a map" src URL (only the URL inside src="...").
   * Only add this when you have a real studio location to show.
   */
  mapEmbedUrl: '',

  /**
   * The live website address without a trailing slash, e.g.
   * 'https://alifinteriordesigner.pk' or 'https://your-project.vercel.app'.
   * Used for canonical URLs, social previews and the sitemap.
   */
  siteUrl: '',

  seo: {
    title: 'Alif Interior Designer — Interior Design Studio',
    description:
      'Alif Interior Designer creates functional, comfortable and personalised interiors for homes and commercial spaces — from first consultation to execution support.',
    /** Default social-share image (1200×630) inside /public. */
    image: '/images/og-image.jpg',
  },
}

/* ---------- helpers (no need to edit below) ---------- */

export const hasWhatsApp = /^\d{8,15}$/.test(business.whatsapp)

export const formattedAddress = [
  business.address.street,
  business.address.city,
  business.address.region,
  business.address.postalCode,
  business.address.country,
]
  .filter(Boolean)
  .join(', ')

export const socialLinks = (
  [
    ['Instagram', business.social.instagram],
    ['Facebook', business.social.facebook],
    ['LinkedIn', business.social.linkedin],
    ['Pinterest', business.social.pinterest],
    ['YouTube', business.social.youtube],
  ] as const
)
  .filter(([, url]) => url)
  .map(([label, url]) => ({ label, url }))

export function phoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}
