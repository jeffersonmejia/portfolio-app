import { timeline } from '../data/timeline'
import { routeHref } from '../routes'
import { Icon } from './Icon'
import { SectionHeading } from './SectionHeading'

export function Timeline() {
  return (
    <section className="content-section page-shell" id="trayectoria" aria-labelledby="timeline-title">
      <SectionHeading
        eyebrow="Trayectoria"
        title="Un recorrido breve. Todo está aquí."
        description="Abre cada etapa para conocer el contexto sin llenar la pantalla de información."
        titleId="timeline-title"
      />
      <div className="timeline">
        {timeline.map((item, index) => (
          <details className="timeline-item" key={`${item.year}-${item.title}`} open={index === 0}>
            <summary>
              <span className="timeline-icon"><Icon name={item.icon} /></span>
              <span className="timeline-main">
                <time>{item.year}</time>
                <strong>{item.title}</strong>
                <small>{item.organization}</small>
              </span>
              <Icon className="timeline-chevron" name="chevron" />
            </summary>
            <div className="timeline-detail">
              <p>{item.description}</p>
              {(item.href || item.target) && (
                <a href={item.href ?? routeHref('/certificados/')} target={item.href ? '_blank' : undefined} rel="noreferrer">
                  {item.linkLabel}<Icon name="external" size={16} />
                </a>
              )}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
