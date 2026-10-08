import type { SiteImage } from './images'

/**
 * SERVICES — edit titles, descriptions and scope lists here.
 * The `slug` is used in links (/services#slug and /contact?service=slug);
 * keep it lowercase with hyphens, and avoid changing it once the site is live.
 */
export interface Service {
  slug: string
  title: string
  /** One line used on the home page and in the footer. */
  summary: string
  /** A short paragraph for the Services page. */
  description: string
  /** Typical scope or deliverables. */
  scope: string[]
  image: SiteImage
}

export const services: Service[] = [
  {
    slug: 'residential-interior-design',
    title: 'Residential Interior Design',
    summary: 'Homes designed around your routines, your family and your taste.',
    description:
      'From a single room to a complete home, we shape layouts, finishes and furnishings into an interior that feels personal and works for everyday life. We begin with how you actually live, then refine the details until the space feels calm, practical and unmistakably yours.',
    scope: [
      'Room-by-room design brief and mood direction',
      'Layout and furniture planning',
      'Colour, finish and lighting scheme',
      'Joinery and built-in storage concepts',
      'Styling and accessory recommendations',
    ],
    image: {
      name: 'service-residential',
      alt: 'Living room with a grey sofa, rattan pendant lights, framed artwork and indoor plants',
    },
  },
  {
    slug: 'commercial-interior-design',
    title: 'Commercial Interior Design',
    summary: 'Workplaces, retail and hospitality spaces that support how people use them.',
    description:
      'Commercial interiors need to look right and work hard. We plan offices, shops, cafés and clinics around staff workflow, customer movement and brand character, so the space supports the business every day.',
    scope: [
      'Needs assessment and space requirements',
      'Zoning for staff, clients and circulation',
      'Brand-aligned material and colour palette',
      'Lighting and furniture specification',
      'Design documentation for contractors',
    ],
    image: {
      name: 'service-commercial',
      alt: 'Open-plan office with polished concrete floor, long windows and an industrial ceiling',
    },
  },
  {
    slug: 'space-planning',
    title: 'Space Planning',
    summary: 'Clear, efficient layouts before a single finish is chosen.',
    description:
      'Good interiors start with a good plan. We study circulation, light, storage and the way each area is used, then test layout options so that every square foot earns its place — whether you are moving in, extending or reorganising.',
    scope: [
      'Measured review of the existing layout',
      'Two or more layout options for comparison',
      'Furniture placement and clearances',
      'Storage and circulation planning',
      'Final annotated floor plan',
    ],
    image: {
      name: 'service-space-planning',
      alt: 'Designer sketching on architectural drawings with a ruler at a desk',
    },
  },
  {
    slug: 'renovation-and-remodeling',
    title: 'Renovation and Remodeling',
    summary: 'Fresh life for existing rooms, planned carefully from the start.',
    description:
      'Renovation is the chance to fix what never worked. We help you decide what to keep, what to change and in which order, and prepare the design information your builder or contractor needs to carry out the work.',
    scope: [
      'Assessment of the existing space',
      'Renovation priorities and phasing ideas',
      'Kitchen, bathroom and living-area redesign',
      'Finish and fixture selection',
      'Design drawings for your contractor',
    ],
    image: {
      name: 'service-renovation',
      alt: 'Bright empty room with wooden floor and a glass door, ready for renovation',
    },
  },
  {
    slug: 'furniture-and-material-selection',
    title: 'Furniture and Material Selection',
    summary: 'Pieces and surfaces chosen for comfort, durability and harmony.',
    description:
      'The right sofa, stone or fabric makes a room. We curate furniture, flooring, wall finishes, fabrics and lighting that suit your budget and the way the space is used, and bring them together into one coherent palette.',
    scope: [
      'Furniture shortlists with alternatives',
      'Material and finish samples board',
      'Fabric, rug and window-treatment selection',
      'Decorative and functional lighting choices',
      'Coordinated specification list',
    ],
    image: {
      name: 'service-furniture',
      alt: 'Mustard armchair beside a brass floor lamp on a warm wooden floor',
    },
  },
  {
    slug: '3d-visualization-and-design-consultation',
    title: '3D Visualization and Design Consultation',
    summary: 'See the design before it is built, and get expert direction when you need it.',
    description:
      'Visualisations help you make confident decisions before spending on site. We also offer focused consultations for clients who want professional guidance on a layout, colour scheme or furniture plan without a full design package.',
    scope: [
      '3D views of key rooms or areas',
      'Material and lighting studies',
      'Revisions based on your feedback',
      'One-to-one design consultation sessions',
      'Written summary of recommendations',
    ],
    image: {
      name: 'service-visualization',
      alt: 'Minimal interior with a sculptural stone staircase and soft leaf shadows on a white wall',
    },
  },
]

export function getService(slug: string) {
  return services.find((service) => service.slug === slug)
}
