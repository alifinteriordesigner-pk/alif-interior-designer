import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { imageSrc, type SiteImage as SiteImageData } from '../data/images'
import { SiteImage } from './SiteImage'

interface ProjectGalleryProps {
  images: SiteImageData[]
  title: string
}

/**
 * Image grid with an accessible lightbox built on the native <dialog>
 * element (focus is contained, Escape closes, focus returns to the
 * thumbnail that opened it). Arrow keys move between images.
 */
export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  const [index, setIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([])
  const lastOpened = useRef(0)

  const open = (i: number) => {
    lastOpened.current = i
    setIndex(i)
    dialogRef.current?.showModal()
  }

  const close = () => dialogRef.current?.close()

  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  )

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onClose = () => {
      setIndex(null)
      triggerRefs.current[lastOpened.current]?.focus()
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        step(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        step(-1)
      }
    }
    dialog.addEventListener('close', onClose)
    dialog.addEventListener('keydown', onKeyDown)
    return () => {
      dialog.removeEventListener('close', onClose)
      dialog.removeEventListener('keydown', onKeyDown)
    }
  }, [step])

  const current = index === null ? null : images[index]

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:gap-6">
        {images.map((image, i) => (
          <li key={image.name} className={images.length % 2 === 1 && i === 0 ? 'sm:col-span-2' : ''}>
            <button
              ref={(el) => {
                triggerRefs.current[i] = el
              }}
              type="button"
              onClick={() => open(i)}
              className="group relative block w-full cursor-zoom-in text-left"
              aria-label={`Open image ${i + 1} of ${images.length} in full screen: ${image.alt}`}
            >
              <SiteImage
                image={image}
                alt=""
                sizes={images.length % 2 === 1 && i === 0 ? '(min-width: 1280px) 1200px, 100vw' : '(min-width: 640px) 50vw, 100vw'}
                frameClassName="aspect-[3/2]"
                className="img-zoom"
              />
              <span className="absolute right-4 bottom-4 flex h-10 w-10 items-center justify-center bg-ivory/90 text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Expand aria-hidden="true" size={18} strokeWidth={1.5} />
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label={`${title} — image gallery`}
        className="on-dark m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-ivory backdrop:bg-ink/90"
        onClick={(e) => {
          if (e.target === e.currentTarget) close()
        }}
      >
        {current && index !== null && (
          <div className="flex h-full flex-col" onClick={(e) => e.target === e.currentTarget && close()}>
            <div className="flex items-center justify-between px-4 py-3 sm:px-6">
              <p className="text-sm tracking-[0.16em] text-ivory/80 uppercase" aria-live="polite">
                {index + 1} / {images.length}
              </p>
              <button
                type="button"
                onClick={close}
                className="flex h-12 w-12 items-center justify-center text-ivory hover:text-bronze"
                aria-label="Close gallery"
                autoFocus
              >
                <X aria-hidden="true" size={28} strokeWidth={1.5} />
              </button>
            </div>
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20"
              onClick={(e) => e.target === e.currentTarget && close()}
            >
              <figure className="flex max-h-full flex-col items-center">
                <img
                  src={imageSrc(current.name, 1600)}
                  alt={current.alt}
                  width={1600}
                  height={1067}
                  className="max-h-[calc(100svh-9rem)] w-auto max-w-full object-contain"
                />
                <figcaption className="mt-3 max-w-2xl px-4 text-center text-sm text-ivory/75">{current.alt}</figcaption>
              </figure>
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="absolute top-1/2 left-1 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-ink/60 text-ivory hover:text-bronze sm:left-4"
                    aria-label="Previous image"
                  >
                    <ChevronLeft aria-hidden="true" size={28} strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="absolute top-1/2 right-1 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-ink/60 text-ivory hover:text-bronze sm:right-4"
                    aria-label="Next image"
                  >
                    <ChevronRight aria-hidden="true" size={28} strokeWidth={1.5} />
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}
