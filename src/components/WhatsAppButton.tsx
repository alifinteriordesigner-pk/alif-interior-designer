import { useLocation } from 'react-router'
import { business, hasWhatsApp } from '../config/business'

/**
 * Floating WhatsApp shortcut. Renders nothing until a valid number is set in
 * business.ts, and is hidden on the contact page where the form handles it.
 * The footer has extra bottom padding so this button never covers its links.
 */
export function WhatsAppButton() {
  const { pathname } = useLocation()
  if (!hasWhatsApp || pathname.startsWith('/contact')) return null

  const text = encodeURIComponent(`Hello ${business.name}, I would like to ask about an interior design consultation.`)
  return (
    <a
      href={`https://wa.me/${business.whatsapp}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens in a new tab)"
      className="fixed right-4 bottom-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#1f7a4d] text-white shadow-lg shadow-ink/20 transition-transform hover:scale-105 sm:right-6 sm:bottom-6"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.5h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.48.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35ZM12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.57.93.95-3.48-.22-.36a9.38 9.38 0 0 1-1.44-5c0-5.19 4.23-9.42 9.43-9.42a9.37 9.37 0 0 1 9.42 9.43c0 5.2-4.23 9.42-9.42 9.42Zm8.02-17.44A11.27 11.27 0 0 0 12.05.75C5.8.75.7 5.84.7 12.1c0 2 .52 3.95 1.52 5.67L.6 23.62l5.99-1.57a11.32 11.32 0 0 0 5.45 1.39h.01c6.25 0 11.35-5.09 11.35-11.35 0-3.03-1.18-5.88-3.33-8.03Z" />
      </svg>
    </a>
  )
}
