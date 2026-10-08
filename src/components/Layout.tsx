import { useEffect, useLayoutEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router'
import { Header } from './Header'
import { Footer } from './Footer'
import { WhatsAppButton } from './WhatsAppButton'
import { applyHeadTags, buildHeadTags, getPageMeta } from '../lib/seo'

const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

export function Layout() {
  const { pathname, hash } = useLocation()
  const isFirstRender = useRef(true)

  // Keep <title>, description, canonical and social tags in sync on navigation.
  useEffect(() => {
    applyHeadTags(buildHeadTags(getPageMeta(pathname)))
  }, [pathname])

  // Scroll to the top on page change, or to the #section when one is given.
  // The first render is skipped so the browser's own restoration still works.
  useIsomorphicLayoutEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (hash) {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, hash])

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
