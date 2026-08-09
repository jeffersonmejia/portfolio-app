import { routeHref } from '../routes'

export function Footer() {
  return (
    <footer className="site-footer page-shell">
      <span>© {new Date().getFullYear()} Jefferson Mejía</span>
      <a href={routeHref('/')}>Volver al inicio</a>
    </footer>
  )
}
