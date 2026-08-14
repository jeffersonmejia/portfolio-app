import { useEffect, useRef } from 'react'
import { navigation } from '../data/site'
import { routeHref } from '../routes'
import { Icon } from './Icon'

export function Header({ currentPage, onThemeToggle }) {
  const navRef = useRef(null)
  const linkRefs = useRef({})

  useEffect(() => {
    const nav = navRef.current
    const updateIndicator = () => {
      const active = linkRefs.current[currentPage]
      const visible = active?.getClientRects().length
      if (!nav || !visible) return nav?.style.setProperty('--nav-active-opacity', '0')
      const navBox = nav.getBoundingClientRect()
      const activeBox = active.getBoundingClientRect()
      const insetX = Math.min(6, activeBox.width * .06)
      const insetY = Math.min(5, activeBox.height * .1)
      nav.style.setProperty('--nav-active-x', `${activeBox.left - navBox.left + insetX}px`)
      nav.style.setProperty('--nav-active-y', `${activeBox.top - navBox.top + insetY}px`)
      nav.style.setProperty('--nav-active-width', `${activeBox.width - insetX * 2}px`)
      nav.style.setProperty('--nav-active-height', `${activeBox.height - insetY * 2}px`)
      nav.style.setProperty('--nav-active-opacity', '1')
    }
    const frame = requestAnimationFrame(updateIndicator)
    const observer = new ResizeObserver(updateIndicator)
    if (nav) observer.observe(nav)
    return () => { cancelAnimationFrame(frame); observer.disconnect() }
  }, [currentPage])

  return (
    <header className="site-header">
      <nav className="site-nav" ref={navRef} aria-label="Navegación principal">
        {navigation.map(({ path, key, label, icon }) => (
          <a
            className={`nav-link nav-link-${key} ${currentPage === key ? 'is-active' : ''}`}
            href={routeHref(path)}
            key={key}
            ref={(node) => { linkRefs.current[key] = node }}
            aria-label={label}
            aria-current={currentPage === key ? 'page' : undefined}
          >
            <Icon name={icon} size={17} />
            <span>{label}</span>
          </a>
        ))}
        <button
          className="icon-button"
          type="button"
          onClick={onThemeToggle}
          aria-label="Cambiar tema"
          title="Cambiar tema"
        >
          <span className="theme-icon theme-icon-light"><Icon name="moon" /></span>
          <span className="theme-icon theme-icon-dark"><Icon name="sun" /></span>
          <span className="theme-label">Tema</span>
        </button>
      </nav>
    </header>
  )
}
