/**
 * Build-time prerendering: renders every public route to static HTML,
 * plus 404.html, robots.txt and (when siteUrl is set) sitemap.xml.
 * Runs after `vite build` and `vite build --ssr` (see package.json).
 */
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dist = join(root, 'dist')
const serverDir = join(root, 'dist-server')

const { render, publicRoutes, siteUrl } = await import(pathToFileURL(join(serverDir, 'entry-server.js')).href)
const template = await readFile(join(dist, 'index.html'), 'utf8')

function page(url, { hydrate }) {
  const { html, head } = render(url)
  return template
    .replace('<!--app-head-->', head)
    .replace('<div id="root"><!--app-html--></div>', `<div id="root"${hydrate ? ' data-prerendered="true"' : ''}>${html}</div>`)
}

for (const url of publicRoutes) {
  // /about -> about.html (served at /about by Vercel's "cleanUrls")
  const file = url === '/' ? join(dist, 'index.html') : join(dist, `${url}.html`)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, page(url, { hydrate: true }))
  console.log(`  prerendered ${url}`)
}

// Served by Vercel (and most static hosts) for unknown URLs with a 404 status.
await writeFile(join(dist, '404.html'), page('/404', { hydrate: false }))
console.log('  prerendered 404.html')

const robots = ['User-agent: *', 'Allow: /']
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = publicRoutes
    .map((u) => `  <url><loc>${siteUrl}${u === '/' ? '/' : u}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')
  await writeFile(
    join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
  )
  robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`)
  console.log('  wrote sitemap.xml')
} else {
  console.warn('  ! business.siteUrl is empty: skipped sitemap.xml and canonical URLs. Set it in src/config/business.ts.')
}
await writeFile(join(dist, 'robots.txt'), robots.join('\n') + '\n')
console.log('  wrote robots.txt')

await rm(serverDir, { recursive: true, force: true })
