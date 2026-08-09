export const routeDefinitions = [
  {
    key: 'inicio',
    path: '/',
    title: 'Jefferson Mejía | Backend Developer',
    description: 'Portafolio de Jefferson Mejía, Backend Developer y estudiante de Ingeniería en Tecnologías de Información y Comunicación en la ESPE.',
  },
  {
    key: 'trayectoria',
    path: '/trayectoria/',
    title: 'Trayectoria | Jefferson Mejía',
    description: 'Experiencia académica, educación, proyectos y formación técnica de Jefferson Mejía desde 2022.',
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
    title: 'Certificados | Jefferson Mejía',
    description: 'Certificados de bases de datos, JavaScript, inglés y ciberseguridad obtenidos por Jefferson Mejía.',
  },
  {
    key: 'contacto',
    path: '/contacto/',
    title: 'Contacto | Jefferson Mejía',
    description: 'Contacto profesional con Jefferson Mejía y formulario para solicitar su currículum.',
  },
]

export function pageFromPath(pathname) {
  const normalized = pathname.replace(/\/portfolio-app/, '').replace(/\/+$/, '')
  const segment = normalized.split('/').filter(Boolean).at(-1)
  return routeDefinitions.find(({ key }) => key === segment)?.key ?? 'inicio'
}

export function routeHref(path) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return path === '/' ? `${base}/` : `${base}${path}`
}
