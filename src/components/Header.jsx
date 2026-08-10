import { navigation } from '../data/site'
import { routeHref } from '../routes'
import { Icon } from './Icon'

export function Header({ currentPage, onThemeToggle }) {
  return (
    <header className="site-header">
      <nav className="site-nav" aria-label="Navegación principal">
        {navigation.map(({ path, key, label, icon }) => (
          <a
            className={`nav-link nav-link-${key} ${currentPage === key ? 'is-active' : ''}`}
            href={routeHref(path)}
            key={key}
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
