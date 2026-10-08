import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '../components/Button'
import { SectionHeading } from '../components/SectionHeading'
import { SiteImage } from '../components/SiteImage'
import { ProjectCard } from '../components/ProjectCard'
import { FaqList } from '../components/FaqList'
import { ConsultationCTA } from '../components/ConsultationCTA'
import { services } from '../data/services'
import { projects } from '../data/projects'
import { faqs } from '../data/faqs'
import { principles, processSteps } from '../data/content'

const featuredProjects = (() => {
  const featured = projects.filter((p) => p.featured)
  return (featured.length >= 3 ? featured : projects).slice(0, 3)
})()

export default function Home() {
  return (
    <>
      <Hero />

      {/* Studio introduction */}
      <section aria-labelledby="intro-title" className="py-24 lg:py-36">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6 xl:col-span-5">
            <SectionHeading
              id="intro-title"
              eyebrow="The studio"
              title={
                <>
                  Interiors shaped around <em className="text-bronze-dark">the way you live</em> and work.
                </>
              }
            />
            <div className="prose-site mt-8 max-w-xl text-lg text-taupe">
              <p>
                Alif Interior Designer is an interior design studio creating homes and commercial spaces that feel
                calm, comfortable and considered. We believe a well-designed room should look beautiful and make
                everyday life easier.
              </p>
              <p>
                Every project begins by understanding you — your routines, your taste and your priorities — so the
                finished space is personal, practical and built to last.
              </p>
            </div>
            <Link to="/about" className="link-underline mt-9">
              About the studio <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <div className="relative lg:col-span-6 lg:col-start-7 xl:col-span-6 xl:col-start-7">
            <div aria-hidden="true" className="absolute -top-5 -right-5 hidden h-full w-full border border-bronze/50 sm:block" />
            <SiteImage
              image={{
                name: 'studio-detail',
                alt: 'Grey wall with a round mirror, rattan pendant, wooden sideboard and a black leather chair',
              }}
              sizes="(min-width: 1024px) 50vw, 100vw"
              frameClassName="relative aspect-[4/5] sm:aspect-[5/4]"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="services-title" className="bg-cream py-24 lg:py-32">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              id="services-title"
              eyebrow="What we do"
              title="Design services for every stage of your space."
            />
            <Link to="/services" className="link-underline shrink-0">
              All services <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <ul className="mt-16 grid border-t border-line md:grid-cols-2">
            {services.map((service, i) => (
              <li key={service.slug} className="border-b border-line md:odd:border-r md:odd:pr-10 md:even:pl-10">
                <Link to={`/services#${service.slug}`} className="group flex gap-6 py-8 sm:gap-8">
                  <span aria-hidden="true" className="pt-1 font-serif text-xl text-bronze-dark">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="flex-1">
                    <span className="block font-serif text-[1.7rem] leading-tight text-ink transition-colors group-hover:text-bronze-dark">
                      {service.title}
                    </span>
                    <span className="mt-2 block text-taupe">{service.summary}</span>
                  </span>
                  <ArrowRight
                    aria-hidden="true"
                    size={20}
                    strokeWidth={1.25}
                    className="mt-2 shrink-0 text-taupe transition-transform duration-300 group-hover:translate-x-1 group-hover:text-bronze-dark"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Selected projects */}
      <section aria-labelledby="projects-title" className="py-24 lg:py-36">
        <div className="container-site">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              id="projects-title"
              eyebrow="Selected projects"
              title="A portfolio of considered interiors."
              intro="Concept projects that show how we approach different spaces. Illustrated with licensed sample photography."
            />
            <Link to="/projects" className="link-underline shrink-0">
              View all projects <ArrowRight aria-hidden="true" size={16} />
            </Link>
          </div>
          <ul className="mt-16 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <li key={project.slug} className={i === 1 ? 'lg:mt-24' : ''}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-title" className="on-dark bg-charcoal py-24 text-ivory lg:py-32">
        <div className="container-site">
          <SectionHeading
            id="process-title"
            eyebrow="Our design process"
            title="A clear path from first conversation to finished space."
            tone="light"
          />
          <ol className="mt-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, i) => (
              <li key={step.title} className="border-t border-ivory/20 pt-8">
                <span aria-hidden="true" className="font-serif text-5xl text-bronze">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-5 text-[1.75rem] text-ivory">{step.title}</h3>
                <p className="mt-3 text-ivory/70">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Approach */}
      <section aria-labelledby="approach-title" className="py-24 lg:py-36">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                id="approach-title"
                eyebrow="Why our approach"
                title="Beauty that works hard every day."
                intro="We design with care for how a space looks, how it functions and how it feels to be in it."
              />
            </div>
          </div>
          <ul className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7">
            {principles.map((p) => (
              <li key={p.title}>
                <span aria-hidden="true" className="block h-px w-12 bg-bronze" />
                <h3 className="mt-6 text-[1.75rem]">{p.title}</h3>
                <p className="mt-3 text-taupe">{p.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section aria-labelledby="faq-title" className="bg-cream py-24 lg:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="faq-title" eyebrow="FAQs" title="Questions, answered." />
            <p className="mt-6 text-taupe">
              Can’t find what you’re looking for?{' '}
              <Link to="/contact" className="font-medium text-ink underline underline-offset-4 hover:text-bronze-dark">
                Get in touch
              </Link>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>

      <ConsultationCTA />
    </>
  )
}

function Hero() {
  return (
    <section aria-labelledby="hero-title" className="on-dark relative isolate flex min-h-[calc(100svh-5rem)] items-end overflow-hidden bg-charcoal lg:h-[calc(100svh-5rem)] lg:max-h-[56rem] lg:min-h-[40rem] lg:items-center">
      <picture>
        <source media="(max-width: 767px)" srcSet="/images/hero-mobile.webp" width={800} height={1100} />
        <source media="(min-width: 768px)" srcSet="/images/hero-1280.webp 1280w, /images/hero-1920.webp 1920w" sizes="100vw" width={1920} height={1200} />
        <img
          src="/images/hero-1920.webp"
          alt="Warm living room with a long linen sofa, timber coffee table, leather armchairs and soft daylight"
          width={1920}
          height={1200}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      </picture>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/10 lg:bg-gradient-to-r lg:from-ink/80 lg:via-ink/45 lg:to-ink/0"
      />
      <div className="container-site pt-32 pb-16 sm:pb-20 lg:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow text-sand! before:bg-sand!">Interior Design Studio</p>
          <h1 id="hero-title" className="mt-6 text-[2.9rem] leading-[1.02] text-ivory sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            Beautiful Spaces. <span className="block italic">Thoughtfully Designed.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ivory/85 sm:text-xl">
            We create functional, comfortable and personalised interiors — homes and workplaces designed around the
            people who use them.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <ButtonLink to="/projects" variant="light">
              Explore Projects
            </ButtonLink>
            <ButtonLink to="/contact" variant="outline-light">
              Book a Consultation
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
