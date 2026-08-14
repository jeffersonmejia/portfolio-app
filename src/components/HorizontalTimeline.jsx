import { useCallback, useEffect, useState } from 'react'
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
  const changePage = useCallback((page) => {
    if (page === activePage) return
    setExpandedIndex(null)
    setActivePage(page)
  }, [activePage])
  useEffect(() => {
    const handleArrowKeys = (event) => {
      if (event.target.matches('input, textarea, select') || event.altKey || event.ctrlKey || event.metaKey) return
      if (event.key === 'ArrowLeft' && activePage > 0) {
        event.preventDefault()
        changePage(activePage - 1)
      }
      if (event.key === 'ArrowRight' && activePage < pageCount - 1) {
        event.preventDefault()
        changePage(activePage + 1)
      }
    }
    window.addEventListener('keydown', handleArrowKeys)
    return () => window.removeEventListener('keydown', handleArrowKeys)
  }, [activePage, changePage, pageCount])
  const goBack = () => changePage(Math.max(0, activePage - 1))
  const goForward = () => changePage(Math.min(pageCount - 1, activePage + 1))
  const toggleItem = (index) => setExpandedIndex((current) => current === index ? null : index)

  return (
    <section className="home-timeline" aria-labelledby="home-timeline-title">
      <header>
        <span className="eyebrow" id="home-timeline-title">Trayectoria</span>
        <div className="timeline-controls">
          <button type="button" onClick={goBack} disabled={activePage === 0} aria-label="Ver página anterior">
            <Icon name="left" size={18} />
          </button>
          <button type="button" onClick={goForward} disabled={activePage === pageCount - 1} aria-label="Ver siguiente página">
            <Icon name="right" size={18} />
          </button>
        </div>
      </header>
      <div className="timeline-stage" aria-live="polite">
        {visibleItems.map(({ item, index }) => (
          <TimelineItem
            expanded={expandedIndex === index}
            item={item}
            key={`${item.year}-${item.title}`}
            onToggle={() => toggleItem(index)}
            tone={(index % itemsPerPage) + 1}
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
