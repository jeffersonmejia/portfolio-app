export const projectCategories = [
  'Todos',
  'Backend',
  'Ciberseguridad',
  'Aplicaciones móviles',
  'Aplicaciones web',
  'Frontend',
]

export const projects = [
  {
    id: 'backend-next',
    title: 'Próximo proyecto backend',
    date: 'Próximamente',
    category: 'Backend',
    description: 'Mis proyectos backend están en desarrollo. Los publicaré aquí pronto.',
    technologies: ['Backend'],
    icon: 'server',
    upcoming: true,
  },
  {
    id: 'metasploitable',
    title: 'Metasploitable Pentest',
    date: 'Enero de 2026',
    isoDate: '2026-01-01',
    category: 'Ciberseguridad',
    description:
      'Pentesting con explotación de RCE, autenticación débil, FTP anónimo, escalación de privilegios y valoración CVSS.',
    technologies: ['Samba', 'PostgreSQL', 'Linux', 'CVSS'],
    image: 'assets/img/projects/sec-project-metasploitable.webp',
    href: 'https://drive.google.com/file/d/1ttY5Q5RANMx7u68WMcUWlzdjGtqpcrWM/view?usp=sharing',
  },
  {
    id: 'scholar-security',
    title: 'Scholar Security',
    date: 'Enero de 2026',
    isoDate: '2026-01-13',
    category: 'Aplicaciones móviles',
    description:
      'Aplicación comunitaria de alertas para Luz de América, El Esfuerzo y Puerto Limón. Proyecto de Vinculación con la Sociedad.',
    technologies: ['Flutter', 'Firebase', 'Python'],
    image: 'assets/img/projects/scholar-security.webp',
    href: 'https://play.google.com/store/apps/details?id=com.scholar.security',
  },
  {
    id: 'stay-app',
    title: 'Stay App',
    date: 'Septiembre de 2025',
    isoDate: '2025-09-01',
    category: 'Aplicaciones web',
    description:
      'Aplicación web con autenticación y panel para crear, consultar, actualizar y eliminar notas en una arquitectura con contenedores.',
    technologies: ['Docker', 'MySQL', 'Apache', 'PHP'],
    image: 'assets/img/projects/stay-cover.webp',
    href: 'https://github.com/jeffersonmejia/stay-app',
  },
  {
    id: 'weather-app',
    title: 'Weather App',
    date: 'Enero de 2023',
    isoDate: '2023-01-01',
    category: 'Frontend',
    description:
      'Consulta del clima, sensación térmica, humedad y presión mediante JavaScript y OpenWeather API.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'API'],
    image: 'assets/img/projects/weather-cover.webp',
    href: 'https://jeffersonmejia.github.io/weather/',
  },
]
