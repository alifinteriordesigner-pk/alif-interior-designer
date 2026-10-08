import { Link } from 'react-router'
import { business } from '../config/business'

/** Text logo by default; uses business.logo.src when an image is configured. */
const [firstWord, ...otherWords] = business.name.split(' ')

export function Logo({ tone = 'dark', onNavigate }: { tone?: 'dark' | 'light'; onNavigate?: () => void }) {
  const light = tone === 'light'
  return (
    <Link to="/" onClick={onNavigate} className="inline-flex shrink-0 items-center" aria-label={`${business.name} — Home`}>
      {business.logo.src ? (
        <img
          src={business.logo.src}
          alt=""
          width={business.logo.width}
          height={business.logo.height}
          className="h-10 w-auto"
        />
      ) : (
        <span className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className={`flex h-10 w-10 items-center justify-center border font-serif text-2xl leading-none ${
              light ? 'border-bronze text-bronze' : 'border-bronze-dark text-bronze-dark'
            }`}
          >
            {firstWord.charAt(0)}
          </span>
          <span className="flex flex-col leading-none">
            <span className={`font-serif text-[1.45rem] font-semibold tracking-wide ${light ? 'text-ivory' : 'text-ink'}`}>
              {firstWord}
            </span>
            <span
              className={`mt-1 text-[0.62rem] font-medium tracking-[0.32em] uppercase ${
                light ? 'text-ivory/70' : 'text-taupe'
              }`}
            >
              {otherWords.join(' ')}
            </span>
          </span>
        </span>
      )}
    </Link>
  )
}
