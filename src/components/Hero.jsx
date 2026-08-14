import { useState } from 'react'
import { profile } from '../data/site'
import { routeHref } from '../routes'
import { asset } from '../utils/asset'
import { HorizontalTimeline } from './HorizontalTimeline'
import { Icon } from './Icon'
import { ProgressiveImage } from './ProgressiveImage'

export function Hero() {
  const [showMore, setShowMore] = useState(false)

  return (
    <section className="hero page-shell" id="inicio" aria-labelledby="hero-title">
      <article className={`hero-card ${showMore ? 'is-expanded' : ''}`}>
        <section className="hero-profile">
          <section className="profile-card">
            <header className="hero-heading">
              <ProgressiveImage
                shellClassName="profile-image"
                src={asset('assets/img/profile-large.webp')}
                alt="Jefferson Mejía"
                width="500"
                height="500"
                fetchPriority="high"
              />
              <div>
                <span className="eyebrow">{profile.eyebrow}</span>
                <h1 id="hero-title">{profile.name}</h1>
                <p className="hero-career">{profile.career}</p>
                <p className="hero-study">{profile.university}</p>
              </div>
            </header>
            <section className="hero-objective" aria-labelledby="objective-title">
              <h2 id="objective-title">
                <span className="hero-objective-icon"><Icon name="route" size={17} /></span>
                Objetivo profesional
              </h2>
              <p>{profile.objective}</p>
            </section>
          </section>
          <div className="hero-actions">
            <button
              className="button button-primary hero-more-toggle"
              type="button"
              aria-controls="home-more-content"
              aria-expanded={showMore}
              onClick={() => setShowMore((current) => !current)}
            >
              <Icon name={showMore ? 'up' : 'chevron'} size={16} />
              {showMore ? 'Mostrar menos' : 'Conocer más'}
            </button>
            <nav
              className="hero-destination-actions"
              aria-label="Enlaces destacados"
              aria-hidden={!showMore}
              inert={!showMore}
            >
              <a className="button button-quiet" href={routeHref('/certificados/')}><Icon name="award" size={16} /> Capacitaciones</a>
              <a className="button button-quiet" href={routeHref('/proyectos/')}><Icon name="folder" size={16} /> Proyectos</a>
            </nav>
          </div>
        </section>
        <div
          className="hero-more-panel"
          id="home-more-content"
          aria-hidden={!showMore}
          inert={!showMore}
        >
          <div><HorizontalTimeline /></div>
        </div>
      </article>
    </section>
  )
}
