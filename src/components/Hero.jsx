import { useState } from 'react'
import { profile } from '../data/site'
import { routeHref } from '../routes'
import { asset } from '../utils/asset'
import { Icon } from './Icon'
import { Modal } from './Modal'
import { Timeline } from './Timeline'

export function Hero() {
  const [timelineOpen, setTimelineOpen] = useState(false)
  const [objectiveOpen, setObjectiveOpen] = useState(false)

  return (
    <section className="hero page-shell" id="inicio" aria-labelledby="hero-title">
      <article className="hero-card">
        <div className="hero-visual">
          <img
            src={asset('assets/img/profile-large.webp')}
            alt="Jefferson Mejía"
            width="500"
            height="500"
            fetchPriority="high"
          />
        </div>
        <div className="hero-copy">
          <span className="eyebrow">{profile.eyebrow}</span>
          <h1 id="hero-title">{profile.name}</h1>
          <p className="hero-career">{profile.career}</p>
          <p className="hero-study">{profile.university} · {profile.semester}</p>
          <button className="hero-objective" type="button" onClick={() => setObjectiveOpen(true)}>
            Objetivo profesional <Icon name="external" size={17} />
          </button>
          <div className="hero-actions">
            <button className="button button-primary" type="button" onClick={() => setTimelineOpen(true)}>
              Ver trayectoria
            </button>
            <a className="button button-quiet" href={routeHref('/certificados/')}>Certificados</a>
            <a className="button button-quiet" href={routeHref('/proyectos/')}>Proyectos</a>
          </div>
        </div>
      </article>
      <Modal open={objectiveOpen} onClose={() => setObjectiveOpen(false)} label="Objetivo profesional">
        <div className="objective-modal">
          <span className="eyebrow">Objetivo profesional</span>
          <p>{profile.objective}</p>
        </div>
      </Modal>
      <Modal open={timelineOpen} onClose={() => setTimelineOpen(false)} label="Trayectoria">
        <div className="trajectory-modal"><Timeline /></div>
      </Modal>
    </section>
  )
}
