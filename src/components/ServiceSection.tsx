import { Check } from 'lucide-react'
import type { Service } from '../data/services'
import { ButtonLink } from './Button'
import { SiteImage } from './SiteImage'

interface ServiceSectionProps {
  service: Service
  index: number
}

/** One service on the Services page; alternates image side on large screens. */
export function ServiceSection({ service, index }: ServiceSectionProps) {
  const reversed = index % 2 === 1
  const headingId = `${service.slug}-title`
  return (
    <section id={service.slug} aria-labelledby={headingId} className="scroll-mt-24 py-16 lg:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <div className={reversed ? 'lg:order-2' : ''}>
          <SiteImage image={service.image} sizes="(min-width: 1024px) 50vw, 100vw" frameClassName="aspect-[4/3]" />
        </div>
        <div className={reversed ? 'lg:order-1' : ''}>
          <p className="font-serif text-2xl text-bronze-dark" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h2 id={headingId} className="mt-3 text-4xl sm:text-[2.75rem]">
            {service.title}
          </h2>
          <p className="mt-5 text-lg text-taupe">{service.description}</p>
          <h3 className="mt-8 font-sans text-xs font-medium tracking-[0.2em] text-ink uppercase">Typical scope</h3>
          <ul className="mt-4 space-y-3">
            {service.scope.map((item) => (
              <li key={item} className="flex gap-3">
                <Check aria-hidden="true" size={18} strokeWidth={1.5} className="mt-1.5 shrink-0 text-bronze-dark" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <ButtonLink to={`/contact?service=${service.slug}`} variant="secondary" className="mt-9">
            Discuss this service
            <span className="sr-only">: {service.title}</span>
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}
