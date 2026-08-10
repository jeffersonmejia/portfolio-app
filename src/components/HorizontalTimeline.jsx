import { useEffect, useRef, useState } from 'react'
import { timeline } from '../data/timeline'
import { Icon } from './Icon'
import { TimelineItem } from './TimelineItem'

export function HorizontalTimeline() {
  const itemsPerPage = 3
  const pageCount = Math.ceil(timeline.length / itemsPerPage)
  const [activePage, setActivePage] = useState(0)
  const [expandedIndex, setExpandedIndex] = useState(null)
  const [loading, setLoading] = useState(false)
  const transitionTimer = useRef(null)
  const start = activePage * itemsPerPage
  const pageItems = timeline.slice(start, start + itemsPerPage).map((item, offset) => ({ item, index: start + offset }))
  const visibleItems = expandedIndex === null ? pageItems : pageItems.filter(({ index }) => index === expandedIndex)
  useEffect(() => () => clearTimeout(transitionTimer.current), [])
  const changePage = (page) => {
    if (page === activePage || loading) return
    setExpandedIndex(null)
    setLoading(true)
    transitionTimer.current = setTimeout(() => {
      setActivePage(page)
      setLoading(false)
    }, 320)
  }
  const goBack = () => changePage(Math.max(0, activePage - 1))
  const goForward = () => changePage(Math.min(pageCount - 1, activePage + 1))

  return (
    <section className="home-timeline" aria-labelledby="home-timeline-title">
      <header>
        <span className="eyebrow" id="home-timeline-title">Trayectoria</span>
        <div className="timeline-controls">
          <small>Página {activePage + 1} de {pageCount}</small>
          <button type="button" onClick={goBack} disabled={activePage === 0 || loading} aria-label="Ver página anterior">
            <Icon name="left" size={18} />
          </button>
          <button type="button" onClick={goForward} disabled={activePage === pageCount - 1 || loading} aria-label="Ver siguiente página">
            <Icon name="right" size={18} />
          </button>
        </div>
      </header>
      <div className={`timeline-stage ${loading ? 'is-loading' : ''}`} aria-busy={loading} aria-live="polite">
        {loading ? Array.from({ length: itemsPerPage }, (_, index) => (
          <article className="timeline-skeleton" key={index} aria-hidden="true">
            <span className="timeline-skeleton-icon" />
            <span className="timeline-skeleton-copy"><i /><i /><i /></span>
          </article>
        )) : visibleItems.map(({ item, index }) => (
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
            disabled={loading}
            aria-label={`Ver página ${index + 1}`}
            aria-current={activePage === index ? 'step' : undefined}
          />
        ))}
      </nav>
    </section>
  )
}
