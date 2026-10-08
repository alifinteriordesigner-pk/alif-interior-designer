import { PageHeader } from '../components/PageHeader'
import { SectionHeading } from '../components/SectionHeading'
import { SiteImage } from '../components/SiteImage'
import { ConsultationCTA } from '../components/ConsultationCTA'
import { team } from '../data/content'

const pillars = [
  {
    title: 'Aesthetics',
    text: 'Proportion, light, colour and texture are balanced so a room feels composed and quietly beautiful — never overdone.',
  },
  {
    title: 'Functionality',
    text: 'Layouts, storage and circulation are planned around real routines, so the space is easy to use every single day.',
  },
  {
    title: 'Comfort',
    text: 'Materials, furniture and lighting are chosen for how they feel to live and work with, not only how they photograph.',
  },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow="About the studio"
        title={
          <>
            Thoughtful interiors, <em className="text-bronze-dark">designed around people.</em>
          </>
        }
        intro="Alif Interior Designer is an interior design studio for homes and commercial spaces, focused on rooms that are as comfortable and practical as they are beautiful."
      />

      <section aria-labelledby="philosophy-title" className="py-24 lg:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <SiteImage
            image={{
              name: 'about-living',
              alt: 'Sunlit living room with a cognac leather sofa, plants and a gallery wall of framed prints',
            }}
            sizes="(min-width: 1024px) 50vw, 100vw"
            frameClassName="aspect-[4/5]"
          />
          <div>
            <SectionHeading id="philosophy-title" eyebrow="Our philosophy" title="Good design should make life easier." />
            <div className="prose-site mt-8 text-lg text-taupe">
              <p>
                We believe the best interiors are personal. They reflect the people who use them, respond to the way a
                space is lived in or worked in, and feel calm rather than crowded.
              </p>
              <p>
                That is why we pay as much attention to layouts, storage and lighting as we do to colour, texture and
                furniture. A room has to work well before it can truly feel good.
              </p>
              <p>
                Our aim is simple: interiors that feel welcoming on the first day and still feel right years later.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="bg-cream py-24 lg:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="approach-title" eyebrow="Our approach" title="We start by understanding you." />
          </div>
          <div className="prose-site text-lg text-taupe lg:col-span-7">
            <p>
              Before we suggest a single colour or piece of furniture, we take time to understand your needs. We ask how
              you use each space, what frustrates you about it today, what you love, and what you would like it to feel
              like in the future.
            </p>
            <p>
              For commercial projects we look at the people who will use the space — staff, customers and visitors —
              and how the interior can support the work that happens there.
            </p>
            <p>
              From there, we develop a concept, refine it together with you, and support the design through to
              execution, keeping you informed at each step.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="pillars-title" className="py-24 lg:py-32">
        <div className="container-site">
          <SectionHeading
            id="pillars-title"
            eyebrow="What guides every project"
            title="Aesthetics, functionality and comfort — in balance."
            align="center"
          />
          <ul className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            {pillars.map((p, i) => (
              <li key={p.title} className="border-t border-line pt-8 text-center md:text-left">
                <span aria-hidden="true" className="font-serif text-xl text-bronze-dark">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-[2rem]">{p.title}</h3>
                <p className="mt-3 text-taupe">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Only shown once real team information is added in src/data/content.ts */}
      {team.length > 0 && (
        <section aria-labelledby="team-title" className="bg-cream py-24 lg:py-32">
          <div className="container-site">
            <SectionHeading id="team-title" eyebrow="The people" title={team.length === 1 ? 'Meet the founder' : 'Meet the team'} />
            <ul className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((member) => (
                <li key={member.name}>
                  {member.photo && (
                    <img
                      src={member.photo}
                      alt={`Portrait of ${member.name}`}
                      width={800}
                      height={1000}
                      loading="lazy"
                      className="aspect-[4/5] w-full bg-sand object-cover"
                    />
                  )}
                  <h3 className="mt-6 text-3xl">{member.name}</h3>
                  <p className="mt-1 text-sm font-medium tracking-[0.16em] text-bronze-dark uppercase">{member.role}</p>
                  <p className="mt-4 text-taupe">{member.bio}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <ConsultationCTA title="Have a space in mind? Let’s talk it through." />
    </>
  )
}
