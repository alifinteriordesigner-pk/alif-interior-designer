/**
 * Every content image is stored in /public/images in two widths:
 *   <name>-800.webp   (800 × 533)
 *   <name>-1600.webp  (1600 × 1067)
 * Both share a 3:2 aspect ratio. To add a photo, export it at those sizes
 * with the same naming pattern and reference it by <name> in the data files.
 */
export interface SiteImage {
  /** Base file name inside /public/images, without the size suffix. */
  name: string
  /** Describe what is in the photo for screen-reader users. */
  alt: string
}

export const IMAGE_WIDTH = 1600
export const IMAGE_HEIGHT = 1067

export function imageSrc(name: string, width: 800 | 1600 = 1600) {
  return `/images/${name}-${width}.webp`
}

export function imageSrcSet(name: string) {
  return `${imageSrc(name, 800)} 800w, ${imageSrc(name, 1600)} 1600w`
}
