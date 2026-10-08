import { Plus } from 'lucide-react'
import type { Faq } from '../data/faqs'

/** Native <details> accordion: keyboard and screen-reader friendly by default. */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((faq) => (
        <details key={faq.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="font-serif text-[1.45rem] leading-snug sm:text-2xl">{faq.question}</h3>
            <Plus
              aria-hidden="true"
              size={22}
              strokeWidth={1.25}
              className="shrink-0 text-bronze-dark transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p className="max-w-3xl pb-7 text-taupe">{faq.answer}</p>
        </details>
      ))}
    </div>
  )
}
