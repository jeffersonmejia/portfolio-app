import { profile } from '../data/site'
import { routeHref } from '../routes'
import { asset } from '../utils/asset'
import { Icon } from './Icon'

export function Hero() {
  return (
    <section className="hero page-shell" id="inicio" aria-labelledby="hero-title">
      <div className="hero-visual">
        <img
          src={asset('assets/img/profile-large.webp')}
          alt="Jefferson Mejía"
          width="500"
          height="500"
          fetchPriority="high"
        />
        <div className="hero-status"><span />Disponible para aprender y aportar</div>
      </div>
      <article className="hero-copy">
        <span className="eyebrow">{profile.eyebrow}</span>
        <h1 id="hero-title">{profile.headline}</h1>
        <p>{profile.summary}</p>
        <div className="hero-actions">
          <a className="button button-primary" href={routeHref('/proyectos/')}>Ver proyectos</a>
          <a className="button button-quiet" href={routeHref('/trayectoria/')}>Mi trayectoria</a>
        </div>
        <div className="highlight-grid" aria-label="Áreas principales">
          {profile.highlights.map(({ icon, label, detail }) => (
            <div className="highlight" key={label}>
              <Icon name={icon} />
              <strong>{label}</strong>
              <small>{detail}</small>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}
