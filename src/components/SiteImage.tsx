import { useState } from 'react'
import { IMAGE_HEIGHT, IMAGE_WIDTH, imageSrc, imageSrcSet, type SiteImage as SiteImageData } from '../data/images'

interface SiteImageProps {
  image: SiteImageData
  /** CSS sizes hint, e.g. '(min-width: 1024px) 50vw, 100vw' */
  sizes: string
  /** Set for above-the-fold images. */
  priority?: boolean
  className?: string
  /** Classes for the wrapper that reserves the image's space. */
  frameClassName?: string
  /** Use '' when the image is purely decorative or described nearby. */
  alt?: string
}

/**
 * Responsive image with fixed intrinsic dimensions (prevents layout shift),
 * lazy loading by default and a quiet fallback if the file fails to load.
 */
export function SiteImage({ image, sizes, priority, className = '', frameClassName = '', alt }: SiteImageProps) {
  const [failed, setFailed] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-sand ${frameClassName}`}>
      {failed ? (
        <div
          role="img"
          aria-label={alt ?? image.alt}
          className="absolute inset-0 flex items-center justify-center p-6 text-center font-serif text-lg text-taupe"
        >
          Image unavailable
        </div>
      ) : (
        <img
          src={imageSrc(image.name, 1600)}
          srcSet={imageSrcSet(image.name)}
          sizes={sizes}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
          alt={alt ?? image.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          fetchPriority={priority ? 'high' : undefined}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover ${className}`}
        />
      )}
    </div>
  )
}
