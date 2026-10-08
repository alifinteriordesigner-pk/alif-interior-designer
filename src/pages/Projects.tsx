import { useState } from 'react'
import { Info } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { ProjectCard } from '../components/ProjectCard'
import { ConsultationCTA } from '../components/ConsultationCTA'
import { projectCategories, projects, type ProjectCategory } from '../data/projects'

type Filter = 'All' | ProjectCategory
const filters: Filter[] = ['All', ...projectCategories]

export default function Projects() {
  const [active, setActive] = useState<Filter>('All')
  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active)
  const hasSamples = projects.some((p) => p.isSample)

  return (
    <>
      <PageHeader
        eyebrow="Projects"
        title="Spaces with a sense of place."
        intro="Browse residential, commercial and renovation work to see how we bring together layout, light, materials and comfort."
      />

      <section aria-labelledby="portfolio-title" className="py-16 lg:py-24">
        <div className="container-site">
          <h2 id="portfolio-title" className="sr-only">
            Portfolio
          </h2>

          {hasSamples && (
            <aside className="mb-12 flex gap-4 border-l-2 border-bronze bg-cream p-5 sm:items-center">
              <Info aria-hidden="true" size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-bronze-dark sm:mt-0" />
              <p className="text-taupe">
                <strong className="font-medium text-ink">Sample Portfolio.</strong> Projects marked “Concept Project” are
                design concepts illustrated with licensed stock photography. They are not completed client work.
              </p>
            </aside>
          )}

          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-x-2 gap-y-3 border-b border-line pb-6">
            {filters.map((f) => {
              const isActive = active === f
              return (
                <button
                  key={f}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActive(f)}
                  className={`min-h-11 px-5 text-[0.8rem] font-medium tracking-[0.16em] uppercase transition-colors ${
                    isActive ? 'bg-charcoal text-ivory' : 'text-taupe hover:bg-sand hover:text-ink'
                  }`}
                >
                  {f}
                </button>
              )
            })}
          </div>

          <p aria-live="polite" className="mt-6 text-sm text-taupe">
            Showing {visible.length} {visible.length === 1 ? 'project' : 'projects'}
            {active !== 'All' && ` in ${active}`}
          </p>

          {visible.length > 0 ? (
            <ul className="mt-10 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 text-lg text-taupe">No projects in this category yet.</p>
          )}
        </div>
      </section>

      <ConsultationCTA />
    </>
  )
}
