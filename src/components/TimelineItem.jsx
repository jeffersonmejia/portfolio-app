import { routeHref } from '../routes'
import { Icon } from './Icon'

export function TimelineItem({ expanded, item, onToggle, tone }) {
  const href = item.href || (item.target ? routeHref('/certificados/') : null)

  return (
    <article className={`timeline-item timeline-item-tone-${tone} ${expanded ? 'is-expanded' : ''}`}>
      <span className="timeline-icon"><Icon name={item.icon} size={19} /></span>
      <div>
        <time>{item.year}</time>
        <h3>{item.title}</h3>
        {expanded && <small className="timeline-organization">{item.organization}</small>}
        {expanded && <p>{item.description}</p>}
        <div className="timeline-item-actions">
          <button className={`timeline-action timeline-toggle ${expanded ? 'timeline-action-close' : 'timeline-action-details'}`} type="button" onClick={onToggle} aria-expanded={expanded}>
            <Icon name={expanded ? 'up' : 'plus'} size={15} />
            {expanded ? 'Cerrar' : 'Ver detalles'}
          </button>
          {expanded && href && (
            <a className="text-link timeline-action timeline-action-primary" href={href} target={item.href ? '_blank' : undefined} rel={item.href ? 'noreferrer' : undefined}>
              {item.linkLabel} <Icon name="external" size={15} />
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
