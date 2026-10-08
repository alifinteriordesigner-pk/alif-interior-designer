import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import { Link } from 'react-router'

type Variant = 'primary' | 'secondary' | 'light' | 'outline-light'

const base =
  'inline-flex min-h-12 items-center justify-center gap-2 px-7 py-3 text-[0.82rem] font-medium tracking-[0.16em] uppercase transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-charcoal text-ivory hover:bg-bronze-dark',
  secondary: 'border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory',
  light: 'bg-ivory text-ink hover:bg-sand',
  'outline-light': 'border border-ivory/80 text-ivory hover:bg-ivory hover:text-ink',
}

function buttonClasses(variant: Variant = 'primary', extra = '') {
  return `${base} ${variants[variant]} ${extra}`.trim()
}

interface ButtonLinkProps {
  to: string
  variant?: Variant
  className?: string
  onClick?: () => void
  children: ReactNode
}

/** Internal navigation styled as a button. */
export function ButtonLink({ to, variant = 'primary', className = '', onClick, children }: ButtonLinkProps) {
  return (
    <Link to={to} onClick={onClick} className={buttonClasses(variant, className)}>
      {children}
    </Link>
  )
}

type ButtonProps = ComponentPropsWithoutRef<'button'> & { variant?: Variant }

export function Button({ variant = 'primary', className = '', type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...props} />
}
