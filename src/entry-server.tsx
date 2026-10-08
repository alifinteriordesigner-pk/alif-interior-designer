import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { buildHeadTags, getPageMeta, publicRoutes, renderHeadTags } from './lib/seo'
import { business } from './config/business'

/** Used only at build time by scripts/prerender.mjs. */
export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  )
  const head = renderHeadTags(buildHeadTags(getPageMeta(url)))
  return { html, head }
}

export { publicRoutes }
export const siteUrl = business.siteUrl.replace(/\/$/, '')
