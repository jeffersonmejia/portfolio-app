export const certificateCategories = [
  { label: 'Todos', icon: 'award' },
  { label: 'Ciberseguridad', icon: 'shield' },
  { label: 'Desarrollo', icon: 'code' },
  { label: 'Bases de datos', icon: 'database' },
  { label: 'Idiomas', icon: 'languages' },
]

export const certificates = [
  {
    id: 'web-security',
    title: 'Hacking de aplicaciones web',
    provider: 'Platzi',
    category: 'Ciberseguridad',
    logo: 'assets/img/icons/platzi-logo.svg',
    image: 'assets/certificates/diploma-web-security.webp',
    description:
      'Auditoría server-side según OWASP Top 10 y Testing Guide. Incluye análisis HTTP, inyecciones y vulnerabilidades de archivos.',
  },
  {
    id: 'fullstack',
    title: 'JavaScript Full Stack',
    provider: 'Platzi',
    category: 'Desarrollo',
    logo: 'assets/img/icons/platzi-logo.svg',
    image: 'assets/certificates/diploma-fullstack.webp',
    description:
      'MERN, React, Redux, Node.js, Express, MongoDB, asincronía, Passport.js, renderizado en servidor y despliegue.',
  },
  {
    id: 'database',
    title: 'Fundamentos de bases de datos',
    provider: 'Platzi',
    category: 'Bases de datos',
    logo: 'assets/img/icons/platzi-logo.svg',
    image: 'assets/certificates/diploma-db.webp',
    description:
      'SQL, MySQL, modelado, normalización, claves, esquemas, consultas, operaciones CRUD, uniones y funciones agregadas.',
  },
  {
    id: 'ethical-hacking',
    title: 'Cisco Hacking Ético',
    provider: 'Cisco',
    category: 'Ciberseguridad',
    logo: 'assets/img/icons/cisco-logo.svg',
    image: 'assets/certificates/diploma-hacker.webp',
    description:
      'Reconocimiento, escaneo, explotación de redes y aplicaciones, seguridad cloud, móvil, IoT, ingeniería social y postexplotación.',
  },
]
