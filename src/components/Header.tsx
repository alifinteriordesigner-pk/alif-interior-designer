import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { ButtonLink } from './Button'
import { navItems } from '../config/navigation'

export function Header() {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ivory">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-charcoal focus:px-4 focus:py-2 focus:text-ivory"
      >
        Skip to content
      </a>
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Logo onNavigate={close} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `relative py-2 text-[0.82rem] font-medium tracking-[0.16em] uppercase transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-bronze after:transition-transform after:duration-300 hover:text-bronze-dark ${
                      isActive ? 'text-ink after:scale-x-100' : 'text-taupe after:scale-x-0 hover:after:scale-x-100'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink to="/contact" className="max-sm:hidden">
            Book a Consultation
          </ButtonLink>
          <button
            ref={toggleRef}
            type="button"
            className="-mr-2 inline-flex h-12 w-12 items-center justify-center text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X aria-hidden="true" size={26} strokeWidth={1.5} /> : <Menu aria-hidden="true" size={26} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="fixed inset-x-0 top-20 bottom-0 overflow-y-auto border-t border-line bg-ivory lg:hidden"
      >
        <nav aria-label="Mobile" className="container-site flex min-h-full flex-col py-8">
          <ul className="divide-y divide-line">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  onClick={close}
                  className={({ isActive }) =>
                    `flex items-center justify-between py-4 font-serif text-3xl ${isActive ? 'text-bronze-dark' : 'text-ink'}`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <ButtonLink to="/contact" className="w-full" onClick={close}>
              Book a Consultation
            </ButtonLink>
          </div>
        </nav>
      </div>
    </header>
  )
}
