import { useState } from 'react'
import { timeline } from '../data/timeline'
import { Icon } from './Icon'
import { TimelineItem } from './TimelineItem'

export function HorizontalTimeline() {
  const itemsPerPage = 3
  const pageCount = Math.ceil(timeline.length / itemsPerPage)
  const [activePage, setActivePage] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState(null)
  const start = activePage * itemsPerPage
  const pageItems = timeline.slice(start, start + itemsPerPage).map((item, offset) => ({ item, index: start + offset }))
  const visibleItems = expandedIndex === null ? pageItems : pageItems.filter(({ index }) => index === expandedIndex)
  const changePage = (page) => {
    setExpandedIndex(null)
    setActivePage(page)
  }
  const goBack = () => changePage(Math.max(0, activePage - 1))
  const goForward = () => changePage(Math.min(pageCount - 1, activePage + 1))

  return (
    <section className="home-timeline" aria-labelledby="home-timeline-title">
      <header>
        <div className="timeline-heading">
          <span className="eyebrow" id="home-timeline-title">Trayectoria</span>
          <small>Usa las flechas izquierda y derecha para cambiar de página</small>
        </div>
        <div className="timeline-controls">
          <small>Página {activePage + 1} de {pageCount}</small>
          <button type="button" onClick={goBack} disabled={activePage === 0} aria-label="Ver página anterior">
            <Icon name="left" size={18} />
          </button>
          <button type="button" onClick={goForward} disabled={activePage === pageCount - 1} aria-label="Ver siguiente página">
            <Icon name="right" size={18} />
          </button>
        </div>
      </header>
      <div className="timeline-stage" key={activePage} aria-live="polite">
        {visibleItems.map(({ item, index }) => (
          <TimelineItem
            expanded={expandedIndex === index}
            item={item}
            key={`${item.year}-${item.title}`}
            onToggle={() => setExpandedIndex((current) => current === index ? null : index)}
          />
        ))}
      </div>
      <nav className="timeline-pages" aria-label="Páginas de la trayectoria">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            className={activePage === index ? 'is-active' : ''}
            key={index}
            type="button"
            onClick={() => changePage(index)}
            aria-label={`Ver página ${index + 1}`}
            aria-current={activePage === index ? 'step' : undefined}
          />
        ))}
      </nav>
    </section>
  )
}
