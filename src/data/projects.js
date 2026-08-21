export const projects = [
  {
    id: "coop-azure",
    title: "Coop Azure Microservices",
    category: "Full Stack",
    icon: "cloud",
    description:
      "Aplicación financiera cooperativa construida con Angular, microservicios Spring native, servicios cloud-native de Microsoft Azure y terraform.",
    technologies: ["Angular", "Spring Boot", "Spring Native", "Azure", "Terraform"],
    image: "assets/img/projects/coop-azure-cover.webp",
    accent: "#0078d4",
    darkAccent: "#72c7ff",
    href: "https://github.com/jeffersonmejia/coop-azure-microservices",
  },
  {
    id: "airport-booking",
    title: "Airport Booking Platform",
    category: "Backend",
    icon: "route",
    description:
      "Reservas aéreas en .NET 10 y PostgreSQL con AirportDB de 59.5 millones de registros, PayPal, OAuth, MFA, JWT, arquitectura hexagonal, caché, índices, pruebas unitarias y de arquitectura, pagos transaccionales, búsqueda de vuelos, emisión de boletos y optimización de consultas.",
    technologies: ["ASP.NET Core", "PostgreSQL", "JWT", "PayPal"],
    image: "assets/img/projects/aiport_app.png",
    accent: "#b83268",
    darkAccent: "#ff8fb7",
    href: "https://github.com/jeffersonmejia/airport-app",
  },
  {
    id: "orbi-commerce",
    title: "Orbi Commerce Platform",
    category: "Backend",
    icon: "server",
    description:
      "Plataforma de pedidos y entregas en .NET 10 y PostgreSQL con más de 1 millón de registros, Identity, MFA, Code First, pagos, paginación backend, caché, índices, Docker Swarm, backups y Ollama como asistente contextual y motor de sugerencias de precios.",
    technologies: ["ASP.NET Core", "PostgreSQL", "Docker Swarm", "Ollama"],
    image: "assets/img/projects/orbi_app.png",
    accent: "#b8465f",
    darkAccent: "#ff9bad",
    href: "https://github.com/jeffersonmejia/ollama-orbi-app",
  },
];
