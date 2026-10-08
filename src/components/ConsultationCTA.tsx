import { ButtonLink } from './Button'

interface ConsultationCTAProps {
  title?: string
  text?: string
}

export function ConsultationCTA({
  title = 'Let’s design a space that feels like yours.',
  text = 'Tell us about your home or workplace. We’ll listen, ask the right questions and suggest a sensible next step.',
}: ConsultationCTAProps) {
  return (
    <section aria-labelledby="cta-title" className="on-dark relative overflow-hidden bg-charcoal py-24 lg:py-32">
      <div aria-hidden="true" className="absolute inset-y-0 right-0 hidden w-1/3 border-l border-ivory/10 lg:block" />
      <div aria-hidden="true" className="absolute top-0 left-[8%] h-24 w-px bg-bronze/60" />
      <div className="container-site relative">
        <div className="max-w-3xl">
          <p className="eyebrow text-bronze!">Book a consultation</p>
          <h2 id="cta-title" className="mt-5 text-4xl text-ivory sm:text-5xl lg:text-6xl">
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-lg text-ivory/75">{text}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink to="/contact" variant="light">
              Book a Consultation
            </ButtonLink>
            <ButtonLink to="/projects" variant="outline-light">
              View Projects
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
