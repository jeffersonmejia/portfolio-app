import { useEffect, useState } from 'react'
import { profile } from '../data/site'
import { routeHref } from '../routes'
import { asset } from '../utils/asset'
import { HorizontalTimeline } from './HorizontalTimeline'
import { Icon } from './Icon'
import { ProgressiveImage } from './ProgressiveImage'

let homeMountedInThisSession = false

export function Hero({ collapseOnFullLoad = false }) {
  const [showMore, setShowMore] = useState(() => !collapseOnFullLoad || homeMountedInThisSession)

  useEffect(() => { homeMountedInThisSession = true }, [])

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
            {!showMore && (
              <button
                className="button button-primary hero-more-toggle"
                type="button"
                aria-controls="home-more-content"
                aria-expanded="false"
                onClick={() => setShowMore(true)}
              >
                <Icon name="chevron" size={16} />
                Conocer más
              </button>
            )}
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
