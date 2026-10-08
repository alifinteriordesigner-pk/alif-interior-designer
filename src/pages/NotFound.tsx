import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '../components/Button'
import { projects } from '../data/projects'

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="bg-cream">
      <div className="container-site grid gap-14 py-24 lg:grid-cols-12 lg:py-36">
        <div className="lg:col-span-7">
          <p className="eyebrow">Error 404</p>
          <h1 id="not-found-title" className="mt-5 text-5xl sm:text-6xl lg:text-7xl">
            This page could not be found.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-taupe">
            The link may be out of date, or the page may have moved. Here are a few places to continue.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink to="/">Back to Home</ButtonLink>
            <ButtonLink to="/projects" variant="secondary">
              View Projects
            </ButtonLink>
          </div>
        </div>
        <nav aria-label="Projects" className="lg:col-span-4 lg:col-start-9">
          <h2 className="font-sans text-xs font-medium tracking-[0.2em] text-ink uppercase">Browse projects</h2>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link to={`/projects/${p.slug}`} className="group flex items-center justify-between py-4 font-serif text-xl hover:text-bronze-dark">
                  {p.title}
                  <ArrowRight aria-hidden="true" size={16} className="text-taupe transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  )
}
