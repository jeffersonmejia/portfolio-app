export const projects = [
  {
    id: 'airport-booking',
    title: 'Airport Booking Platform',
    category: 'Backend',
    icon: 'route',
    description:
      'Plataforma de reservas con API REST y arquitectura hexagonal por features. Procesa 56 millones de registros con consultas optimizadas, caché e índices; integra JWT, OAuth, MFA, pagos PayPal transaccionales y pruebas unitarias y de arquitectura.',
    technologies: ['ASP.NET Core', 'PostgreSQL', 'JWT', 'PayPal'],
    image: 'assets/img/projects/airport-booking-cover.webp',
    href: 'https://github.com/jeffersonmejia/airport-app',
  },
  {
    id: 'orbi-commerce',
    title: 'Orbi Commerce Platform',
    category: 'Backend',
    icon: 'server',
    description:
      'Backend de comercio y entregas para más de un millón de registros, con autorización por roles, pagos, inventario y paginación optimizada. Usa caché, índices, Docker Swarm, secrets, backups e IA contextual con acceso restringido por usuario.',
    technologies: ['ASP.NET Core', 'PostgreSQL', 'Docker Swarm', 'Ollama'],
    image: 'assets/img/projects/orbi-commerce-cover.webp',
    href: 'https://github.com/jeffersonmejia/ollama-orbi-app',
  },
  {
    id: 'stay-app',
    title: 'Stay App',
    category: 'Backend',
    icon: 'database',
    description:
      'Aplicación de notas con autenticación por sesiones, persistencia en MySQL y archivos adjuntos mediante SFTP. La arquitectura separa los servicios web, base de datos y almacenamiento seguro con Docker Compose.',
    technologies: ['Docker', 'MySQL', 'Apache', 'PHP'],
    image: 'assets/img/projects/stay-cover.webp',
    href: 'https://github.com/jeffersonmejia/stay-app',
  },
]
