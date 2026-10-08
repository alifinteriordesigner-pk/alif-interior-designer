import type { SiteImage } from './images'

/**
 * PROJECTS — the portfolio shown on /projects and /projects/<slug>.
 *
 * The six entries below are SAMPLE / CONCEPT projects illustrated with
 * licensed stock photography. Replace them with your real work:
 *   1. Add photos to /public/images (see src/data/images.ts for sizes).
 *   2. Copy an entry, give it a unique `slug`, and fill in the text.
 *   3. Set `isSample: false` for genuine completed client work.
 *   4. Only fill `location`, `area` and `year` with real values; empty
 *      values are hidden automatically.
 * New projects get their own page and sitemap entry at the next build.
 */
export type ProjectCategory = 'Residential' | 'Commercial' | 'Renovation'

export const projectCategories: ProjectCategory[] = ['Residential', 'Commercial', 'Renovation']

export interface Project {
  slug: string
  title: string
  category: ProjectCategory
  /** true = labelled "Concept Project" on the site. */
  isSample: boolean
  /** Shown on the home page "Selected projects" section. */
  featured?: boolean
  /** One or two sentences for cards and page descriptions. */
  summary: string
  brief: string
  concept: string
  features: string[]
  cover: SiteImage
  gallery: SiteImage[]
  location?: string
  area?: string
  year?: string
}

export const projects: Project[] = [
  {
    slug: 'ivory-arch-living',
    title: 'Ivory Arch Living',
    category: 'Residential',
    isSample: true,
    featured: true,
    summary: 'A light-filled family living room built around arched windows, soft whites and natural textures.',
    brief:
      'This concept explores a family living area that needs to feel calm and generous while handling daily life — guests, children and quiet evenings alike.',
    concept:
      'Arched openings and exposed timber beams set the architectural tone. A restrained palette of ivory, oatmeal and pale oak lets daylight do the work, while layered textiles and rounded furniture keep the room soft and welcoming.',
    features: [
      'Symmetrical seating arranged around a central fireplace',
      'Warm white walls paired with natural timber beams',
      'Layered linen, bouclé and wool textures',
      'Mixed ambient, task and accent lighting',
    ],
    cover: {
      name: 'ivory-arch-1',
      alt: 'White living room with arched windows, timber ceiling beams, a fireplace and cream sofas',
    },
    gallery: [
      { name: 'ivory-arch-2', alt: 'Neutral lounge with a cream sectional sofa, round coffee table and woven wall decor' },
      { name: 'ivory-arch-3', alt: 'Soft beige seating area with round rattan mirrors and a bouclé armchair' },
      { name: 'ivory-arch-4', alt: 'Cosy corner with a grey sofa, knitted throw, wooden side table and plants' },
    ],
  },
  {
    slug: 'quiet-earth-bedroom',
    title: 'Quiet Earth Bedroom Suite',
    category: 'Residential',
    isSample: true,
    featured: true,
    summary: 'A restful bedroom concept in earthy tones, with layered bedding and gentle lighting.',
    brief:
      'A main bedroom concept for a client who wants a retreat from a busy household: restful colours, good storage and lighting that can be dimmed for evening.',
    concept:
      'Sage, terracotta and natural fibres create a grounded, quiet mood. Bedside lighting, woven pendants and textured bedding keep the room warm without visual clutter.',
    features: [
      'Upholstered headboard with layered bedding',
      'Woven pendant and bedside reading lights',
      'Earth-toned accents against soft neutral walls',
      'Concealed storage to keep surfaces clear',
    ],
    cover: {
      name: 'quiet-earth-1',
      alt: 'Bedroom with layered neutral bedding, orange cushions, a woven pendant and botanical prints',
    },
    gallery: [
      { name: 'quiet-earth-2', alt: 'Hotel-style bedroom with a grey headboard, wooden bedside table and lamp' },
      { name: 'quiet-earth-3', alt: 'Bright bedroom with white bedding, a black lounge chair and large windows' },
      { name: 'quiet-earth-4', alt: 'Dark-walled bedroom with a channel-tufted bed, gold chandelier and fur stools' },
    ],
  },
  {
    slug: 'collaborative-studio-office',
    title: 'Collaborative Studio Office',
    category: 'Commercial',
    isSample: true,
    featured: true,
    summary: 'A flexible workplace concept balancing focused desks, informal meeting corners and daylight.',
    brief:
      'This concept imagines a small creative company that needs space for focused work, quick team discussions and the occasional client meeting.',
    concept:
      'The plan is divided into calm zones rather than closed rooms. Soft lounge seating, task lighting and glazed partitions keep the office open and bright while giving each activity its own place.',
    features: [
      'Zoned layout for focus, collaboration and meetings',
      'Lounge seating for informal discussion',
      'Task lighting at every workstation',
      'Durable, easy-to-maintain finishes',
    ],
    cover: {
      name: 'studio-office-1',
      alt: 'Light office lounge with grey armchairs, a black floor lamp and glazed meeting rooms',
    },
    gallery: [
      { name: 'studio-office-2', alt: 'Long office corridor with glass partitions, a kitchenette and dark accent walls' },
      { name: 'studio-office-3', alt: 'Home office with a deep green feature wall, wooden desk and large window' },
    ],
  },
  {
    slug: 'timber-cafe-dining',
    title: 'Timber Café & Dining',
    category: 'Commercial',
    isSample: true,
    summary: 'A warm hospitality concept using timber, low lighting and varied seating.',
    brief:
      'A concept for a neighbourhood café and dining space that should feel lively by day and intimate in the evening.',
    concept:
      'Dark timber, warm pendant lighting and a mix of banquette and loose seating create different moods across the room. Planting and textured surfaces soften the industrial shell.',
    features: [
      'Mix of banquette, table and counter seating',
      'Warm, dimmable pendant lighting',
      'Timber and metal finishes for durability',
      'Planting to soften the interior',
    ],
    cover: {
      name: 'timber-cafe-1',
      alt: 'Restaurant interior with dark timber walls, pendant lights and rows of dining chairs',
    },
    gallery: [
      { name: 'timber-cafe-2', alt: 'Busy café with a chalkboard wall, wire chairs and potted plants' },
      { name: 'timber-cafe-3', alt: 'Dining area with green velvet chairs, a round mirror and large plants' },
    ],
  },
  {
    slug: 'timber-kitchen-renewal',
    title: 'Timber Kitchen Renewal',
    category: 'Renovation',
    isSample: true,
    featured: false,
    summary: 'A kitchen renovation concept combining dark cabinetry, warm wood and better storage.',
    brief:
      'This concept looks at renewing a dated kitchen: more storage, a better work triangle and a room that feels connected to the rest of the home.',
    concept:
      'Deep charcoal cabinetry is balanced by warm timber panelling and a breakfast counter. Open shelving and glass-fronted units add display space without making the room feel heavy.',
    features: [
      'Breakfast counter with comfortable seating',
      'Tall storage and glass-fronted display units',
      'Contrast of charcoal cabinetry and warm wood',
      'Layered task and pendant lighting',
    ],
    cover: {
      name: 'kitchen-renewal-1',
      alt: 'Kitchen with dark cabinetry, timber wall panels, a glass display unit and teal bar stool',
    },
    gallery: [
      { name: 'kitchen-renewal-2', alt: 'Grey kitchen with open wooden shelves, white tiles and a pendant light' },
      { name: 'kitchen-renewal-3', alt: 'White kitchen with marble island, range cooker and glass-front cabinets' },
      { name: 'kitchen-renewal-4', alt: 'Bright white kitchen with an island, bar stools and globe pendants' },
    ],
  },
  {
    slug: 'open-plan-family-refresh',
    title: 'Open-Plan Family Refresh',
    category: 'Renovation',
    isSample: true,
    summary: 'A renovation concept that opens up living and dining areas around light and warm finishes.',
    brief:
      'A concept for reorganising a compartmentalised ground floor into one connected living, dining and garden-facing space.',
    concept:
      'A timber feature wall, a stone fireplace and continuous flooring tie the open plan together. Furniture groupings define each zone so the room stays practical without new walls.',
    features: [
      'Connected living, dining and outdoor views',
      'Timber feature wall and stone fireplace',
      'Furniture groupings to define each zone',
      'Large glazing to bring in natural light',
    ],
    cover: {
      name: 'family-refresh-1',
      alt: 'Open-plan living and dining room with a timber feature wall, stone fireplace and garden view',
    },
    gallery: [
      { name: 'family-refresh-2', alt: 'Living room with a wood-panelled wall, grey sofa and open kitchen behind' },
      { name: 'family-refresh-3', alt: 'Double-height living room with a timber staircase, blue sofas and large windows' },
      { name: 'family-refresh-4', alt: 'Bright living room with a fireplace, grey sofas and white shutters' },
    ],
  },
]

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug)
}

export function getRelatedProjects(project: Project, count = 3) {
  const others = projects.filter((p) => p.slug !== project.slug)
  const sameCategory = others.filter((p) => p.category === project.category)
  const rest = others.filter((p) => p.category !== project.category)
  return [...sameCategory, ...rest].slice(0, count)
}
