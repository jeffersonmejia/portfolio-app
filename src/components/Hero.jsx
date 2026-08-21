import { useEffect, useState } from 'react'
import { flushSync } from 'react-dom'
import { contact, profile } from '../data/site'
import { asset } from '../utils/asset'
import { ContactForm } from './ContactForm'
import { GitHubSection } from './GitHubSection'
import { Icon } from './Icon'
import { Modal } from './Modal'
import { ProgressiveImage } from './ProgressiveImage'

let homeMountedInThisSession = false

export function Hero({ collapseOnFullLoad = false }) {
  const [showMore, setShowMore] = useState(() => !collapseOnFullLoad || homeMountedInThisSession)
  const [formOpen, setFormOpen] = useState(false)

  useEffect(() => { homeMountedInThisSession = true }, [])

  const revealMore = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!document.startViewTransition || reducedMotion) {
      setShowMore(true)
      return
    }

    document.documentElement.classList.add('hero-reveal-transition')
    const transition = document.startViewTransition(() => flushSync(() => setShowMore(true)))
    transition.finished.finally(() => document.documentElement.classList.remove('hero-reveal-transition'))
  }

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
              <div className="hero-title-copy">
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
              aria-hidden={showMore}
              inert={showMore}
              onClick={revealMore}
            >
              <Icon name="discover" size={16} />
              Conocer más
            </button>
            <nav
              className="hero-destination-actions"
              aria-label="Enlaces destacados"
              aria-hidden={!showMore}
              inert={!showMore}
            >
              <button className="button button-quiet hero-cv-action" type="button" onClick={() => setFormOpen(true)}>
                <Icon name="mail" size={16} /> Solicitar currículum
              </button>
              <a className="button button-quiet hero-linkedin-action" href={contact.linkedin} target="_blank" rel="noreferrer">
                <Icon name="linkedin" size={16} /> LinkedIn
              </a>
            </nav>
          </div>
        </section>
        <div
          className="hero-more-panel"
          id="home-more-content"
          aria-hidden={!showMore}
          inert={!showMore}
        >
          <div><GitHubSection active={showMore} /></div>
        </div>
      </article>
      <Modal className="resume-modal" open={formOpen} onClose={() => setFormOpen(false)} label="Solicitar currículum" showClose={false}>
        <div className="form-modal">
          <span className="eyebrow">Contacto</span>
          <h2>Solicitar currículum</h2>
          <p>Usaré tus datos únicamente para responder. No los compartiré con terceros.</p>
          <ContactForm onCancel={() => setFormOpen(false)} />
        </div>
      </Modal>
    </section>
  )
}
