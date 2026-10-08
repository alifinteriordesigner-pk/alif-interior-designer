import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { business } from '../config/business'
import { PageHeader } from '../components/PageHeader'
import { InquiryForm } from '../components/InquiryForm'
import { ContactDetails } from '../components/ContactDetails'
import { getService } from '../data/services'

export default function Contact() {
  const [searchParams] = useSearchParams()
  const requested = searchParams.get('service') ?? ''
  const preselected = getService(requested) ? requested : ''

  // The page is prerendered without a query string, so the preselected
  // service is applied after hydration (remounting the form via `key`).
  const [hydrated, setHydrated] = useState(false)
  // eslint-disable-next-line react-hooks/set-state-in-effect -- one-off post-hydration flag
  useEffect(() => setHydrated(true), [])
  const initialService = hydrated ? preselected : ''

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Book a consultation."
        intro="Tell us about your space and what you’d like to achieve. We’ll review the details and suggest a sensible next step — there’s no obligation."
      />

      <section className="py-20 lg:py-28">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="text-3xl sm:text-4xl">Get in touch</h2>
            <p className="mt-4 text-taupe">
              Share a few details using the form, or reach us directly using the details below.
            </p>
            <div className="mt-10">
              <ContactDetails />
            </div>
            <div className="mt-12 border-t border-line pt-8">
              <h3 className="font-sans text-xs font-medium tracking-[0.2em] text-ink uppercase">What happens next</h3>
              <ol className="mt-5 space-y-4 text-taupe">
                <li className="flex gap-4">
                  <span className="font-serif text-xl text-bronze-dark">01</span>
                  <span>We read your message and ask any questions we need answered.</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-serif text-xl text-bronze-dark">02</span>
                  <span>We arrange a consultation to understand your space and goals.</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-serif text-xl text-bronze-dark">03</span>
                  <span>We recommend a scope and explain the options clearly.</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border border-line bg-cream/60 p-6 sm:p-10">
              <InquiryForm key={initialService} initialService={initialService} />
            </div>
          </div>
        </div>
      </section>

      {business.mapEmbedUrl && (
        <section aria-label="Studio location map" className="pb-24">
          <div className="container-site">
            <iframe
              src={business.mapEmbedUrl}
              title={`Map showing the location of ${business.name}`}
              className="aspect-[16/9] w-full border-0 bg-sand sm:aspect-[21/9]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </section>
      )}
    </>
  )
}
