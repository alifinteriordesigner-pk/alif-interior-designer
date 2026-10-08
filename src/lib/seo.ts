import { business, formattedAddress, socialLinks } from '../config/business'
import { getProject, projects } from '../data/projects'
import { imageSrc } from '../data/images'

/**
 * Page metadata used both at build time (prerendered into each HTML file)
 * and in the browser (updated on client-side navigation).
 */
export interface PageMeta {
  title: string
  description: string
  path: string
  image: string
  type: 'website' | 'article'
  noindex?: boolean
  jsonLd?: object
  preloadHero?: boolean
}

export type HeadTag =
  | { tag: 'title'; text: string }
  | { tag: 'meta' | 'link'; attrs: Record<string, string> }
  | { tag: 'script'; attrs: Record<string, string>; text: string }

const STATIC_PAGES: Record<string, Omit<PageMeta, 'path' | 'image' | 'type'>> = {
  '/': {
    title: business.seo.title,
    description: business.seo.description,
    preloadHero: true,
  },
  '/about': {
    title: `About the Studio | ${business.name}`,
    description: `Learn about ${business.name}'s design philosophy and how we create interiors that balance beauty, function and comfort.`,
  },
  '/services': {
    title: `Interior Design Services | ${business.name}`,
    description:
      'Residential and commercial interior design, space planning, renovation, furniture and material selection, and 3D visualisation.',
  },
  '/projects': {
    title: `Projects & Portfolio | ${business.name}`,
    description: `Explore residential, commercial and renovation interior concepts from ${business.name}.`,
  },
  '/contact': {
    title: `Book a Consultation | ${business.name}`,
    description: `Tell us about your space and book an interior design consultation with ${business.name}.`,
  },
}

/** Every public URL that should be prerendered and listed in the sitemap. */
export const publicRoutes = [...Object.keys(STATIC_PAGES), ...projects.map((p) => `/projects/${p.slug}`)]

export function normalizePath(pathname: string) {
  const trimmed = pathname.replace(/\/+$/, '')
  return trimmed === '' ? '/' : trimmed
}

export function absoluteUrl(path: string) {
  return business.siteUrl ? `${business.siteUrl.replace(/\/$/, '')}${path}` : path
}

export function getPageMeta(pathname: string): PageMeta {
  const path = normalizePath(pathname)
  const base = { path, image: business.seo.image, type: 'website' as const }

  const page = STATIC_PAGES[path]
  if (page) {
    return { ...base, ...page, jsonLd: path === '/' ? businessJsonLd() : undefined }
  }

  const match = path.match(/^\/projects\/([^/]+)$/)
  const project = match ? getProject(match[1]) : undefined
  if (project) {
    return {
      ...base,
      type: 'article',
      title: `${project.title}${project.isSample ? ' (Concept Project)' : ''} | ${business.name}`,
      description: project.summary,
      image: imageSrc(project.cover.name, 1600),
    }
  }

  return {
    ...base,
    title: `Page Not Found | ${business.name}`,
    description: 'The page you are looking for could not be found.',
    noindex: true,
  }
}

/** Structured data built only from values filled in src/config/business.ts. */
function businessJsonLd() {
  const hasLocalDetails = Boolean(formattedAddress || business.phone)
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': hasLocalDetails ? 'LocalBusiness' : 'Organization',
    name: business.name,
    description: business.seo.description,
  }
  if (business.siteUrl) data.url = business.siteUrl
  if (business.logo.src) data.logo = absoluteUrl(business.logo.src)
  if (business.email) data.email = business.email
  if (business.phone) data.telephone = business.phone
  if (business.serviceArea) data.areaServed = business.serviceArea
  if (formattedAddress) {
    const { street, city, region, postalCode, country } = business.address
    data.address = Object.fromEntries(
      Object.entries({
        '@type': 'PostalAddress',
        streetAddress: street,
        addressLocality: city,
        addressRegion: region,
        postalCode,
        addressCountry: country,
      }).filter(([, v]) => v),
    )
  }
  if (socialLinks.length) data.sameAs = socialLinks.map((s) => s.url)
  return data
}

export function buildHeadTags(meta: PageMeta): HeadTag[] {
  const tags: HeadTag[] = [
    { tag: 'title', text: meta.title },
    { tag: 'meta', attrs: { name: 'description', content: meta.description } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: business.name } },
    { tag: 'meta', attrs: { property: 'og:type', content: meta.type } },
    { tag: 'meta', attrs: { property: 'og:title', content: meta.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: meta.description } },
    { tag: 'meta', attrs: { property: 'og:image', content: absoluteUrl(meta.image) } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
  ]
  if (business.siteUrl) {
    tags.push({ tag: 'link', attrs: { rel: 'canonical', href: absoluteUrl(meta.path) } })
    tags.push({ tag: 'meta', attrs: { property: 'og:url', content: absoluteUrl(meta.path) } })
  }
  if (meta.noindex) tags.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex' } })
  if (meta.preloadHero) {
    tags.push({
      tag: 'link',
      attrs: {
        rel: 'preload',
        as: 'image',
        type: 'image/webp',
        href: '/images/hero-mobile.webp',
        media: '(max-width: 767px)',
        fetchpriority: 'high',
      },
    })
    tags.push({
      tag: 'link',
      attrs: {
        rel: 'preload',
        as: 'image',
        type: 'image/webp',
        href: '/images/hero-1920.webp',
        imagesrcset: '/images/hero-1280.webp 1280w, /images/hero-1920.webp 1920w',
        imagesizes: '100vw',
        media: '(min-width: 768px)',
        fetchpriority: 'high',
      },
    })
  }
  if (meta.jsonLd) {
    tags.push({
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      text: JSON.stringify(meta.jsonLd).replace(/</g, '\\u003c'),
    })
  }
  return tags
}

const escapeHtml = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Serialises head tags for the prerendered HTML. */
export function renderHeadTags(tags: HeadTag[]) {
  return tags
    .map((t) => {
      if (t.tag === 'title') return `<title data-seo>${escapeHtml(t.text)}</title>`
      const attrs = Object.entries(t.attrs)
        .map(([k, v]) => ` ${k}="${escapeHtml(v)}"`)
        .join('')
      if (t.tag === 'script') return `<script data-seo${attrs}>${t.text}</script>`
      return `<${t.tag} data-seo${attrs} />`
    })
    .join('\n    ')
}

/** Replaces the managed head tags in the browser after navigation. */
export function applyHeadTags(tags: HeadTag[]) {
  document.head.querySelectorAll('[data-seo]').forEach((el) => {
    if (!(el instanceof HTMLLinkElement && el.rel === 'preload')) el.remove()
  })
  for (const t of tags) {
    if (t.tag === 'title') {
      document.title = t.text
      continue
    }
    if (t.tag === 'link' && t.attrs.rel === 'preload') continue
    const el = document.createElement(t.tag)
    el.setAttribute('data-seo', '')
    for (const [k, v] of Object.entries(t.attrs)) el.setAttribute(k, v)
    if (t.tag === 'script') el.textContent = t.text
    document.head.appendChild(el)
  }
}
