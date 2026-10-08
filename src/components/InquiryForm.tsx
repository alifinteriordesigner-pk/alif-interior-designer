import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, ExternalLink, MessageCircle } from 'lucide-react'
import { business, hasWhatsApp } from '../config/business'
import { services } from '../data/services'
import {
  DESCRIPTION_MAX,
  NOT_SURE,
  buildMailtoUrl,
  buildWhatsAppUrl,
  emptyInquiry,
  formatInquiryMessage,
  validateInquiry,
  type InquiryData,
  type InquiryErrors,
} from '../lib/inquiry'
import { Button } from './Button'

const fieldOrder: (keyof InquiryData)[] = ['name', 'email', 'phone', 'service', 'location', 'description']

interface InquiryFormProps {
  /** Service slug to preselect (e.g. from /contact?service=space-planning). */
  initialService?: string
}

/**
 * Consultation form. Version 1 hands the message to WhatsApp — the visitor
 * still has to press Send there. To add a real email endpoint later, replace
 * the body of `handOff` with a fetch() to an API route; the fields,
 * validation and layout can stay the same.
 */
export function InquiryForm({ initialService = '' }: InquiryFormProps) {
  const [data, setData] = useState<InquiryData>({ ...emptyInquiry, service: initialService })
  const [errors, setErrors] = useState<InquiryErrors>({})
  const [handOffUrl, setHandOffUrl] = useState<string | null>(null)
  const summaryRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const id = useId()

  const update = (field: keyof InquiryData) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = e.target.value
    setData((d) => ({ ...d, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    setHandOffUrl(null)
  }

  const handOff = (inquiry: InquiryData) => {
    const message = formatInquiryMessage(inquiry, business.name)
    const url = buildWhatsAppUrl(business.whatsapp, message)
    if (!url) return
    window.open(url, '_blank', 'noopener,noreferrer')
    setHandOffUrl(url)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const found = validateInquiry(data)
    setErrors(found)
    const firstInvalid = fieldOrder.find((f) => found[f])
    if (firstInvalid) {
      setHandOffUrl(null)
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    handOff(data)
  }

  const errorCount = Object.values(errors).filter(Boolean).length
  const emailFallback = business.email
    ? buildMailtoUrl(business.email, `Consultation inquiry — ${business.name}`, formatInquiryMessage(data, business.name))
    : null

  const fieldProps = (field: keyof InquiryData) => ({
    id: `${id}-${field}`,
    name: field,
    value: data[field],
    onChange: update(field),
    'aria-invalid': errors[field] ? (true as const) : undefined,
    'aria-describedby': errors[field] ? `${id}-${field}-error` : undefined,
    className: `mt-2 block w-full border bg-white/70 px-4 py-3 text-ink placeholder:text-taupe/70 transition-colors focus:border-charcoal focus:bg-white focus:outline-none ${
      errors[field] ? 'border-[#a3341f]' : 'border-line'
    }`,
  })

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby={`${id}-title`} className="space-y-6">
      <h2 id={`${id}-title`} className="text-3xl sm:text-4xl">
        Request a consultation
      </h2>
      <p className="text-taupe">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">as required</span> are required.
      </p>

      {errorCount > 0 && (
        <div ref={summaryRef} role="alert" className="flex gap-3 border border-[#a3341f]/40 bg-[#a3341f]/5 p-4 text-[#8a2c1a]">
          <AlertCircle aria-hidden="true" size={20} className="mt-0.5 shrink-0" />
          <p>
            Please correct {errorCount === 1 ? 'the highlighted field' : `the ${errorCount} highlighted fields`} below.
          </p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Name" required error={errors.name} htmlFor={`${id}-name`} errorId={`${id}-name-error`}>
          <input type="text" autoComplete="name" required {...fieldProps('name')} />
        </Field>
        <Field label="Email" required error={errors.email} htmlFor={`${id}-email`} errorId={`${id}-email-error`}>
          <input type="email" autoComplete="email" inputMode="email" required {...fieldProps('email')} />
        </Field>
        <Field label="Phone" hint="Optional" error={errors.phone} htmlFor={`${id}-phone`} errorId={`${id}-phone-error`}>
          <input type="tel" autoComplete="tel" inputMode="tel" {...fieldProps('phone')} />
        </Field>
        <Field label="Service of interest" required error={errors.service} htmlFor={`${id}-service`} errorId={`${id}-service-error`}>
          <select required {...fieldProps('service')}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.title}
              </option>
            ))}
            <option value={NOT_SURE}>Not sure yet</option>
          </select>
        </Field>
      </div>

      <Field label="Project location" hint="Optional — area or city" error={errors.location} htmlFor={`${id}-location`} errorId={`${id}-location-error`}>
        <input type="text" autoComplete="address-level2" {...fieldProps('location')} />
      </Field>

      <Field
        label="Project description"
        required
        hint="The space, what you’d like to change, and any timing or budget notes"
        error={errors.description}
        htmlFor={`${id}-description`}
        errorId={`${id}-description-error`}
      >
        <textarea rows={6} required maxLength={DESCRIPTION_MAX} {...fieldProps('description')} />
      </Field>

      {hasWhatsApp ? (
        <div className="space-y-4">
          <Button type="submit" className="w-full sm:w-auto">
            <MessageCircle aria-hidden="true" size={18} strokeWidth={1.5} />
            Continue in WhatsApp
          </Button>
          <p className="text-sm text-taupe">
            This opens WhatsApp with your message ready to send. Your inquiry is only sent once you press{' '}
            <strong className="font-medium text-ink">Send</strong> in WhatsApp.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div role="note" className="border-l-2 border-bronze bg-cream p-5">
            <p className="font-medium text-ink">WhatsApp inquiries are not available yet.</p>
            <p className="mt-1 text-taupe">
              {business.email || business.phone
                ? 'Please use the email or phone details on this page to get in touch for now.'
                : 'Our contact details are being set up. Please check back soon.'}
            </p>
          </div>
          <Button type="submit" disabled className="w-full sm:w-auto">
            <MessageCircle aria-hidden="true" size={18} strokeWidth={1.5} />
            Continue in WhatsApp
          </Button>
        </div>
      )}

      <div aria-live="polite">
        {handOffUrl && (
          <div className="border border-line bg-cream p-5">
            <p className="font-medium text-ink">Almost done — please finish in WhatsApp.</p>
            <p className="mt-2 text-taupe">
              WhatsApp should have opened with your message. Review it and press <strong className="text-ink">Send</strong>{' '}
              to deliver your inquiry. If nothing opened, use the link below.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
              <a href={handOffUrl} target="_blank" rel="noopener noreferrer" className="link-underline">
                Open WhatsApp again <ExternalLink aria-hidden="true" size={15} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              {emailFallback && (
                <a href={emailFallback} className="link-underline">
                  Send by email instead
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  )
}

interface FieldProps {
  label: string
  htmlFor: string
  errorId: string
  required?: boolean
  hint?: string
  error?: string
  children: ReactNode
}

function Field({ label, htmlFor, errorId, required, hint, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium tracking-wide text-ink">
        {label}
        {required && (
          <span aria-hidden="true" className="text-bronze-dark">
            {' '}
            *
          </span>
        )}
        {hint && <span className="ml-2 font-normal text-taupe">({hint})</span>}
      </label>
      {children}
      {error && (
        <p id={errorId} className="mt-2 flex items-center gap-2 text-sm text-[#8a2c1a]">
          <AlertCircle aria-hidden="true" size={15} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
