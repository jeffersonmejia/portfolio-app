export const siteUrl = 'https://jeffersonmejia.github.io/portfolio-app'

export const routeDefinitions = [
  {
    key: 'inicio',
    path: '/',
    title: 'Jefferson Mejía | Backend Developer',
    description: 'Portafolio de Jefferson Mejía, Backend Developer y estudiante de Ingeniería en Tecnologías de Información y Comunicación en la ESPE.',
  },
  {
    key: 'proyectos',
    path: '/proyectos/',
    title: 'Proyectos backend y software | Jefferson Mejía',
    description: 'Proyectos de backend, ciberseguridad, aplicaciones móviles y frontend desarrollados por Jefferson Mejía.',
  },
  {
    key: 'certificados',
    path: '/certificados/',
    title: 'Capacitaciones | Jefferson Mejía',
    description: 'Capacitaciones en bases de datos, JavaScript, inglés y ciberseguridad realizadas por Jefferson Mejía.',
  },
]

export function routeFromPath(pathname) {
  const normalized = pathname.replace(/\/portfolio-app/, '').replace(/\/+$/, '')
  const segment = normalized.split('/').filter(Boolean).at(-1)
  return routeDefinitions.find(({ key }) => key === segment) ?? routeDefinitions[0]
}

export function pageFromPath(pathname) { return routeFromPath(pathname).key }

export function routeHref(path) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return path === '/' ? `${base}/` : `${base}${path}`
}
