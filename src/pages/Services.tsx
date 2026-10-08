import { PageHeader } from '../components/PageHeader'
import { ServiceSection } from '../components/ServiceSection'
import { ConsultationCTA } from '../components/ConsultationCTA'
import { services } from '../data/services'

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Interior design, tailored to your space."
        intro="Choose a complete design service or the specific support you need. Every project begins with a consultation, and the exact scope is agreed with you before work starts."
      >
        <nav aria-label="Services on this page" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {services.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  className="inline-flex min-h-11 items-center border border-line px-4 text-sm text-taupe transition-colors hover:border-charcoal hover:text-ink"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <div className="container-site divide-y divide-line">
        {services.map((service, i) => (
          <ServiceSection key={service.slug} service={service} index={i} />
        ))}
      </div>

      <ConsultationCTA
        title="Not sure which service you need?"
        text="That’s completely normal. Share a few details about your space and we’ll recommend the right starting point."
      />
    </>
  )
}
