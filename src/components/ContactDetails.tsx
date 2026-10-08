import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { business, formattedAddress, hasWhatsApp, phoneHref } from '../config/business'

/** Lists only the contact details that are configured in business.ts. */
export function ContactDetails({ tone = 'dark', showHours = true }: { tone?: 'dark' | 'light'; showHours?: boolean }) {
  const light = tone === 'light'
  const iconClass = light ? 'text-bronze' : 'text-bronze-dark'
  const linkClass = `${light ? 'text-ivory hover:text-bronze' : 'text-ink hover:text-bronze-dark'} transition-colors`
  const muted = light ? 'text-ivory/70' : 'text-taupe'

  const rows = [
    business.phone && {
      icon: Phone,
      label: 'Phone',
      content: (
        <a className={linkClass} href={phoneHref(business.phone)}>
          {business.phone}
        </a>
      ),
    },
    hasWhatsApp && {
      icon: MessageCircle,
      label: 'WhatsApp',
      content: (
        <a className={linkClass} href={`https://wa.me/${business.whatsapp}`} target="_blank" rel="noopener noreferrer">
          Chat on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
        </a>
      ),
    },
    business.email && {
      icon: Mail,
      label: 'Email',
      content: (
        <a className={`${linkClass} break-all`} href={`mailto:${business.email}`}>
          {business.email}
        </a>
      ),
    },
    formattedAddress && { icon: MapPin, label: 'Studio', content: <span>{formattedAddress}</span> },
    business.serviceArea && { icon: MapPin, label: 'Service area', content: <span>{business.serviceArea}</span> },
    showHours &&
      business.hours.length > 0 && {
        icon: Clock,
        label: 'Hours',
        content: (
          <ul>
            {business.hours.map((h) => (
              <li key={h.days}>
                {h.days}: {h.hours}
              </li>
            ))}
          </ul>
        ),
      },
  ].filter((row) => !!row)

  if (rows.length === 0) {
    return (
      <p className={muted}>
        Contact details will be published here soon. In the meantime, please use the consultation form.
      </p>
    )
  }

  return (
    <dl className="space-y-5">
      {rows.map(({ icon: Icon, label, content }) => (
        <div key={label} className="flex gap-4">
          <Icon aria-hidden="true" size={20} strokeWidth={1.5} className={`mt-1 shrink-0 ${iconClass}`} />
          <div>
            <dt className={`text-xs font-medium tracking-[0.18em] uppercase ${muted}`}>{label}</dt>
            <dd className={`mt-1 ${light ? 'text-ivory' : 'text-ink'}`}>{content}</dd>
          </div>
        </div>
      ))}
    </dl>
  )
}
