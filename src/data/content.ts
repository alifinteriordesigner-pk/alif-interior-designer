/**
 * GENERAL PAGE CONTENT — design process, studio principles and
 * optional team members. Edit freely to match how you actually work.
 */

export interface ProcessStep {
  title: string
  description: string
}

/** The design process shown on the home page. Add, remove or rename stages. */
export const processSteps: ProcessStep[] = [
  {
    title: 'Consultation',
    description:
      'We listen first — understanding your space, routines, preferences, timeline and budget before suggesting anything.',
  },
  {
    title: 'Concept Design',
    description:
      'We develop the overall direction: layout options, mood, colour and material palette, so you can see where the design is heading.',
  },
  {
    title: 'Design Development',
    description:
      'The chosen concept is refined into detailed layouts, finishes, furniture, lighting and, where included, 3D visuals.',
  },
  {
    title: 'Execution Support',
    description:
      'We support the delivery stage with drawings, specifications and coordination so the finished space matches the design.',
  },
]

export interface Principle {
  title: string
  description: string
}

/** "Why choose our approach" — describe how you work, not unverifiable claims. */
export const principles: Principle[] = [
  {
    title: 'Listening comes first',
    description:
      'Your routines, preferences and priorities shape every decision, so the result feels like yours rather than a showroom.',
  },
  {
    title: 'Function before flourish',
    description:
      'Circulation, storage and light are planned before finishes, so the space is beautiful and genuinely easy to live or work in.',
  },
  {
    title: 'Clear, honest communication',
    description:
      'You see the design before work begins and are kept informed about choices, scope and next steps throughout.',
  },
  {
    title: 'Materials chosen with care',
    description:
      'We recommend furniture and finishes for comfort, durability and maintenance, not only for how they look on day one.',
  },
]

export interface TeamMember {
  name: string
  role: string
  bio: string
  /** Optional: path to a portrait in /public/images, e.g. '/images/team-name.webp' */
  photo?: string
}

/**
 * FOUNDER / TEAM — the About page only shows this section when at least
 * one real person is listed here. Do not add placeholder people.
 */
export const team: TeamMember[] = []
