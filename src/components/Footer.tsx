import { Link } from 'react-router'
import { business, socialLinks } from '../config/business'
import { services } from '../data/services'
import { Logo } from './Logo'
import { ContactDetails } from './ContactDetails'
import { navItems } from '../config/navigation'

export function Footer() {
  const year = new Date().getFullYear()
  const linkClass = 'text-ivory/75 transition-colors hover:text-bronze'

  return (
    <footer className="on-dark bg-ink pt-20 pb-28 text-ivory sm:pb-24">
      <div className="container-site">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1.2fr_1.2fr] lg:gap-10">
          <div>
            <Logo tone="light" />
            <p className="mt-6 max-w-xs text-ivory/70">
              Functional, comfortable and personalised interiors for homes and commercial spaces.
            </p>
            {socialLinks.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2" aria-label="Social media">
                {socialLinks.map((s) => (
                  <li key={s.label}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {s.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label="Footer">
            <h2 className="font-sans text-xs font-medium tracking-[0.2em] text-bronze uppercase">Explore</h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-xs font-medium tracking-[0.2em] text-bronze uppercase">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services#${s.slug}`} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-sans text-xs font-medium tracking-[0.2em] text-bronze uppercase">Contact</h2>
            <div className="mt-5">
              <ContactDetails tone="light" />
            </div>
            <Link
              to="/contact"
              className="mt-7 inline-flex min-h-12 items-center border border-bronze px-6 text-[0.8rem] font-medium tracking-[0.16em] text-ivory uppercase transition-colors hover:bg-bronze hover:text-ink"
            >
              Book a Consultation
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/15 pt-8 text-sm text-ivory/60 md:flex-row md:justify-between">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <p>
            Portfolio shows concept projects with licensed sample photography from{' '}
            <a href="https://unsplash.com" className="underline underline-offset-2 hover:text-bronze" rel="noopener noreferrer" target="_blank">
              Unsplash
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
