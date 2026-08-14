import { useEffect, useState } from 'react'
import { routeFromPath, siteUrl } from '../routes'

function setMeta(selector, content) {
  document.querySelector(selector)?.setAttribute('content', content)
}

function syncMetadata(pathname) {
  const route = routeFromPath(pathname)
  const canonical = `${siteUrl}${route.path}`
  document.title = route.title
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
  setMeta('meta[name="description"]', route.description)
  setMeta('meta[property="og:title"]', route.title)
  setMeta('meta[property="og:description"]', route.description)
  setMeta('meta[property="og:url"]', canonical)
  setMeta('meta[name="twitter:title"]', route.title)
  setMeta('meta[name="twitter:description"]', route.description)
}

function isModifiedClick(event) {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
}

export function useNavigation(initialPathname) {
  const [pathname, setPathname] = useState(initialPathname)

  useEffect(() => syncMetadata(pathname), [pathname])

  useEffect(() => {
    const basePath = import.meta.env.BASE_URL
    const handleClick = (event) => {
      if (event.defaultPrevented || isModifiedClick(event)) return
      const anchor = event.target.closest('a[href]')
      if (!anchor || anchor.target || anchor.hasAttribute('download')) return
      const url = new URL(anchor.href, window.location.href)
      if (url.origin !== window.location.origin || !url.pathname.startsWith(basePath)) return
      if (url.pathname === window.location.pathname && url.search === window.location.search) return
      event.preventDefault()
      window.history.pushState({}, '', `${url.pathname}${url.search}${url.hash}`)
      setPathname(url.pathname)
      window.scrollTo(0, 0)
    }
    const handlePopState = () => setPathname(window.location.pathname)
    document.addEventListener('click', handleClick)
    window.addEventListener('popstate', handlePopState)
    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  return pathname
}
