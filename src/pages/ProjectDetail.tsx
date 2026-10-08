import { Link, useParams } from 'react-router'
import { ArrowLeft, Check } from 'lucide-react'
import { getProject, getRelatedProjects } from '../data/projects'
import { SiteImage } from '../components/SiteImage'
import { ProjectGallery } from '../components/ProjectGallery'
import { ProjectCard, SampleLabel } from '../components/ProjectCard'
import { ConsultationCTA } from '../components/ConsultationCTA'
import NotFound from './NotFound'

export default function ProjectDetail() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  if (!project) return <NotFound />

  const facts = [
    ['Category', project.category],
    ['Location', project.location],
    ['Area', project.area],
    ['Year', project.year],
  ].filter((fact): fact is [string, string] => Boolean(fact[1]))
  const related = getRelatedProjects(project)

  return (
    <>
      <article>
        <header className="bg-cream">
          <div className="container-site pt-10 pb-12 sm:pt-14 sm:pb-16">
            <Link to="/projects" className="link-underline text-sm">
              <ArrowLeft aria-hidden="true" size={15} /> All projects
            </Link>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <p className="eyebrow">{project.category}</p>
              {project.isSample && <SampleLabel className="border border-line" />}
            </div>
            <h1 className="mt-5 max-w-4xl text-[2.9rem] leading-[1.05] sm:text-6xl lg:text-7xl">{project.title}</h1>
            <p className="mt-6 max-w-2xl text-lg text-taupe sm:text-xl">{project.summary}</p>
          </div>
        </header>

        <SiteImage
          image={project.cover}
          sizes="100vw"
          priority
          frameClassName="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
        />

        <div className="container-site py-20 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="space-y-14 lg:col-span-7">
              <section aria-labelledby="brief-title">
                <h2 id="brief-title" className="text-4xl">
                  Project brief
                </h2>
                <p className="mt-5 text-lg text-taupe">{project.brief}</p>
              </section>
              <section aria-labelledby="concept-title">
                <h2 id="concept-title" className="text-4xl">
                  Design concept
                </h2>
                <p className="mt-5 text-lg text-taupe">{project.concept}</p>
              </section>
            </div>
            <aside className="lg:col-span-4 lg:col-start-9">
              <div className="border-t border-line pt-8">
                <h2 className="font-sans text-xs font-medium tracking-[0.2em] text-ink uppercase">Key features</h2>
                <ul className="mt-5 space-y-4">
                  {project.features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <Check aria-hidden="true" size={18} strokeWidth={1.5} className="mt-1.5 shrink-0 text-bronze-dark" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8">
                {facts.map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs font-medium tracking-[0.2em] text-taupe uppercase">{label}</dt>
                    <dd className="mt-1 font-serif text-2xl text-ink">{value}</dd>
                  </div>
                ))}
              </dl>
              {project.isSample && (
                <p className="mt-8 text-sm text-taupe">
                  This is a concept project illustrated with licensed sample photography, not completed client work.
                </p>
              )}
            </aside>
          </div>

          {project.gallery.length > 0 && (
            <section aria-labelledby="gallery-title" className="mt-24">
              <h2 id="gallery-title" className="text-4xl">
                Gallery
              </h2>
              <p className="mt-3 text-taupe">Select an image to view it in full screen.</p>
              <div className="mt-10">
                <ProjectGallery images={project.gallery} title={project.title} />
              </div>
            </section>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="border-t border-line bg-cream py-24">
          <div className="container-site">
            <h2 id="related-title" className="text-4xl sm:text-5xl">
              Related projects
            </h2>
            <ul className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} aspect="landscape" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ConsultationCTA title="Imagining something similar for your space?" />
    </>
  )
}
