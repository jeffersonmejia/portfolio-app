import { routeHref } from '../routes'
import { Icon } from './Icon'

export function TimelineItem({ expanded, item, onToggle }) {
  const href = item.href || (item.target ? routeHref('/certificados/') : null)

  return (
    <article className={`timeline-item ${expanded ? 'is-expanded' : ''}`}>
      <span className="timeline-icon"><Icon name={item.icon} size={19} /></span>
      <div>
        <time>{item.year}</time>
        <h3>{item.title}</h3>
        {expanded && <small className="timeline-organization">{item.organization}</small>}
        {expanded && <p>{item.description}</p>}
        <div className="timeline-item-actions">
          <button className="timeline-toggle" type="button" onClick={onToggle} aria-expanded={expanded}>
            {expanded ? 'Cerrar' : 'Detalles'}
            <Icon name="chevron" size={16} />
          </button>
          {expanded && href && (
            <a className="text-link" href={href} target={item.href ? '_blank' : undefined} rel={item.href ? 'noreferrer' : undefined}>
              {item.linkLabel} <Icon name="external" size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
