import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  as?: 'h1' | 'h2'
  id?: string
  tone?: 'dark' | 'light'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  as: Tag = 'h2',
  id,
  tone = 'dark',
  className = '',
}: SectionHeadingProps) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      {eyebrow && (
        <p className={`eyebrow ${centered ? 'justify-center' : ''} ${tone === 'light' ? 'text-bronze!' : ''}`}>
          {eyebrow}
        </p>
      )}
      <Tag
        id={id}
        className={`mt-4 text-[2.4rem] sm:text-5xl lg:text-[3.4rem] ${tone === 'light' ? 'text-ivory' : ''}`}
      >
        {title}
      </Tag>
      {intro && (
        <p className={`mt-5 text-lg ${tone === 'light' ? 'text-ivory/80' : 'text-taupe'}`}>{intro}</p>
      )}
    </div>
  )
}
