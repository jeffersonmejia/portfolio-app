import { useState } from 'react'
import { timeline } from '../data/timeline'
import { Icon } from './Icon'

export function HorizontalTimeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = timeline[activeIndex]
  const goBack = () => setActiveIndex((index) => Math.max(0, index - 1))
  const goForward = () => setActiveIndex((index) => Math.min(timeline.length - 1, index + 1))

  return (
    <section className="home-timeline" aria-labelledby="home-timeline-title">
      <header>
        <span className="eyebrow" id="home-timeline-title">Trayectoria</span>
        <div className="timeline-controls">
          <small>{activeIndex + 1} de {timeline.length}</small>
          <button type="button" onClick={goBack} disabled={activeIndex === 0} aria-label="Ver hito anterior">
            <Icon name="left" size={18} />
          </button>
          <button type="button" onClick={goForward} disabled={activeIndex === timeline.length - 1} aria-label="Ver siguiente hito">
            <Icon name="right" size={18} />
          </button>
        </div>
      </header>
      <div className="timeline-stage" aria-live="polite">
        <span className="timeline-icon"><Icon name={activeItem.icon} size={20} /></span>
        <div>
          <time>{activeItem.year}</time>
          <h3>{activeItem.title}</h3>
          <p>{activeItem.description}</p>
        </div>
      </div>
    </section>
  )
}
