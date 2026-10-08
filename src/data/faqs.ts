/**
 * FAQs — shown on the home page. Edit, reorder, add or remove entries.
 * Keep answers accurate for how you actually work.
 */
export interface Faq {
  question: string
  answer: string
}

export const faqs: Faq[] = [
  {
    question: 'How does a project with you usually start?',
    answer:
      'Every project starts with a consultation. We talk through your space, how you use it, your style and your budget, then recommend the most suitable scope of work before anything else is agreed.',
  },
  {
    question: 'Do you design both homes and commercial spaces?',
    answer:
      'Yes. We work on residential interiors as well as commercial spaces such as offices, retail and hospitality, adapting the process to the needs of each type of project.',
  },
  {
    question: 'Can you work with my existing furniture?',
    answer:
      'Absolutely. We can plan around pieces you love and suggest what to keep, re-upholster, reposition or replace so that old and new work together.',
  },
  {
    question: 'Will I see the design before work begins?',
    answer:
      'Yes. Depending on the scope, we share layouts, mood and material boards and, where included, 3D visualisations, and refine them with your feedback before execution.',
  },
  {
    question: 'How are fees decided?',
    answer:
      'Fees depend on the size, complexity and scope of the project. After the initial consultation we will explain the options and provide a clear proposal before any work starts.',
  },
  {
    question: 'What happens once the design is approved?',
    answer:
      'We support the execution stage with the drawings, specifications and coordination agreed in your proposal. If your project involves building or civil work, mention it during the consultation and we will explain how we can help.',
  },
]
