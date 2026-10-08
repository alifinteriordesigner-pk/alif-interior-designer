import { Link } from 'react-router'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/projects'
import { SiteImage } from './SiteImage'

interface ProjectCardProps {
  project: Project
  sizes?: string
  /** Taller aspect for featured layouts. */
  aspect?: 'portrait' | 'landscape'
  headingLevel?: 'h2' | 'h3'
}

export function SampleLabel({ className = '' }: { className?: string }) {
  return (
    <span
      className={`inline-block bg-ivory/95 px-3 py-1 text-[0.68rem] font-medium tracking-[0.16em] text-taupe uppercase ${className}`}
    >
      Concept Project
    </span>
  )
}

export function ProjectCard({
  project,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  aspect = 'portrait',
  headingLevel: Heading = 'h3',
}: ProjectCardProps) {
  return (
    <article className="group relative">
      <div className="relative">
        <SiteImage
          image={project.cover}
          sizes={sizes}
          alt=""
          frameClassName={aspect === 'portrait' ? 'aspect-[4/5]' : 'aspect-[3/2]'}
          className="img-zoom"
        />
        {project.isSample && <SampleLabel className="absolute top-4 left-4" />}
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-bronze-dark uppercase">{project.category}</p>
          <Heading className="mt-2 text-[1.75rem] leading-tight">
            <Link
              to={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none group-hover:text-bronze-dark"
            >
              {project.title}
            </Link>
          </Heading>
        </div>
        <ArrowUpRight
          aria-hidden="true"
          size={22}
          strokeWidth={1.25}
          className="mt-7 shrink-0 text-taupe transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-bronze-dark"
        />
      </div>
      {/* Visible focus ring for the stretched link */}
      <span className="pointer-events-none absolute -inset-2 hidden outline-2 outline-bronze-dark group-has-[a:focus-visible]:block" />
    </article>
  )
}
