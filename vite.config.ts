/// <reference types="vitest/config" />
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * Makes `vite preview` behave like Vercel with "cleanUrls": /about serves
 * about.html, and unknown URLs get dist/404.html with a 404 status
 * (instead of the default single-page-app fallback to index.html).
 */
function staticNotFound(): Plugin {
  return {
    name: 'static-not-found',
    configurePreviewServer(server) {
      const outDir = server.config.build.outDir
      server.middlewares.use((req, res, next) => {
        const [rawPath, query] = (req.url ?? '/').split('?')
        const path = decodeURIComponent(rawPath).replace(/\/+$/, '')
        if (path === '') return next()
        if (existsSync(join(outDir, `${path}.html`))) {
          req.url = `${path}.html${query ? `?${query}` : ''}`
          return next()
        }
        if (existsSync(join(outDir, path))) return next()
        const notFound = join(outDir, '404.html')
        if (!existsSync(notFound)) return next()
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html; charset=utf-8')
        res.end(readFileSync(notFound))
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), staticNotFound()],
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
})
