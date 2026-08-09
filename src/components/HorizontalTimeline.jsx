import { useState } from 'react'
import { timeline } from '../data/timeline'
import { Icon } from './Icon'

export function HorizontalTimeline() {
  const itemsPerPage = 3
  const pageCount = Math.ceil(timeline.length / itemsPerPage)
  const [activePage, setActivePage] = useState(0)
  const start = activePage * itemsPerPage
  const visibleItems = timeline.slice(start, start + itemsPerPage)
  const goBack = () => setActivePage((page) => Math.max(0, page - 1))
  const goForward = () => setActivePage((page) => Math.min(pageCount - 1, page + 1))

  return (
    <section className="home-timeline" aria-labelledby="home-timeline-title">
      <header>
        <span className="eyebrow" id="home-timeline-title">Trayectoria</span>
        <div className="timeline-controls">
          <small>Etapa {activePage + 1} de {pageCount}</small>
          <button type="button" onClick={goBack} disabled={activePage === 0} aria-label="Ver etapa anterior">
            <Icon name="left" size={18} />
          </button>
          <button type="button" onClick={goForward} disabled={activePage === pageCount - 1} aria-label="Ver siguiente etapa">
            <Icon name="right" size={18} />
          </button>
        </div>
      </header>
      <div className="timeline-stage" key={activePage} aria-live="polite">
        {visibleItems.map((item) => (
          <article className="timeline-item" key={`${item.year}-${item.title}`}>
            <span className="timeline-icon"><Icon name={item.icon} size={19} /></span>
            <div>
              <time>{item.year}</time>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
      <nav className="timeline-pages" aria-label="Etapas de la trayectoria">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            className={activePage === index ? 'is-active' : ''}
            key={index}
            type="button"
            onClick={() => setActivePage(index)}
            aria-label={`Ver etapa ${index + 1}`}
            aria-current={activePage === index ? 'step' : undefined}
          />
        ))}
      </nav>
    </section>
  )
}
