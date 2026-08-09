import { profile } from '../data/site'
import { Icon } from './Icon'

const areas = [
  {
    icon: 'server',
    title: 'Backend',
    description: 'Trabajo con servicios, autenticación, datos y lógica mantenible. Publicaré mis proyectos pronto.',
  },
  {
    icon: 'shield',
    title: 'Formación en seguridad',
    description: 'Mi carrera incluye seguridad web, análisis OWASP y reducción de riesgos.',
  },
  {
    icon: 'route',
    title: 'Formación en redes',
    description: 'He estudiado segmentación, firewalls, VPN, controles de acceso, IDS e IPS.',
  },
]

export function Focus() {
  return (
    <section className="focus page-shell" aria-labelledby="focus-title">
      <article className="focus-intro">
        <span className="eyebrow">Objetivo profesional</span>
        <h2 id="focus-title">Backend como especialidad.</h2>
        <p>{profile.focus}</p>
      </article>
      <div className="focus-grid">
        {areas.map(({ icon, title, description }) => (
          <article className="focus-card" key={title}>
            <Icon name={icon} />
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
