import { profile } from '../data/site'
import { routeHref } from '../routes'
import { asset } from '../utils/asset'
import { HorizontalTimeline } from './HorizontalTimeline'
import { Icon } from './Icon'
import { ProgressiveImage } from './ProgressiveImage'

export function Hero() {
  return (
    <section className="hero page-shell" id="inicio" aria-labelledby="hero-title">
      <article className="hero-card">
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
              <h2 id="objective-title"><Icon name="route" size={18} /> Objetivo profesional</h2>
              <p>{profile.objective}</p>
            </section>
          </section>
          <nav className="hero-actions" aria-label="Enlaces destacados">
            <a className="button button-primary" href={routeHref('/certificados/')}><Icon name="award" size={16} /> Capacitaciones profesionales</a>
            <a className="button button-quiet" href={routeHref('/proyectos/')}><Icon name="folder" size={16} /> Proyectos</a>
          </nav>
        </section>
        <HorizontalTimeline />
      </article>
    </section>
  )
}
