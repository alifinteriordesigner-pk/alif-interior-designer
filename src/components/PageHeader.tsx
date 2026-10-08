import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow: string
  title: ReactNode
  intro?: ReactNode
  children?: ReactNode
}

/** Title band at the top of inner pages. */
export function PageHeader({ eyebrow, title, intro, children }: PageHeaderProps) {
  return (
    <section className="border-b border-line bg-cream">
      <div className="container-site pt-16 pb-14 sm:pt-24 sm:pb-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-4xl text-[2.9rem] leading-[1.05] sm:text-6xl lg:text-7xl">{title}</h1>
        {intro && <p className="mt-6 max-w-2xl text-lg text-taupe sm:text-xl">{intro}</p>}
        {children}
      </div>
    </section>
  )
}
