import { useState } from 'react'
import { contact } from '../data/site'
import { ContactForm } from './ContactForm'
import { Icon } from './Icon'
import { Modal } from './Modal'

export function Contact() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <section className="contact page-shell" id="contacto" aria-labelledby="contact-title">
      <div className="contact-copy">
        <span className="eyebrow">Contacto</span>
        <h2 id="contact-title">Conversemos sobre el siguiente reto.</h2>
        <p>Puedes revisar mi trabajo, conectar conmigo y solicitar mi currículum.</p>
      </div>
      <div className="contact-actions">
        <a className="contact-link" href={contact.linkedin} target="_blank" rel="noreferrer">
          <Icon name="linkedin" /><span><strong>LinkedIn</strong><small>Perfil profesional</small></span>
        </a>
        <a className="contact-link" href={contact.github} target="_blank" rel="noreferrer">
          <Icon name="github" /><span><strong>GitHub</strong><small>Repositorios</small></span>
        </a>
        <button className="contact-link" type="button" onClick={() => setFormOpen(true)}>
          <Icon name="mail" /><span><strong>Solicitar currículum</strong><small>Formulario privado</small></span>
        </button>
      </div>
      <Modal open={formOpen} onClose={() => setFormOpen(false)} label="Solicitar currículum">
        <div className="form-modal">
          <span className="eyebrow">Contacto directo</span>
          <h2>Solicitar currículum</h2>
          <p>Usaré tus datos únicamente para responder. No los compartiré con terceros.</p>
          <ContactForm />
        </div>
      </Modal>
    </section>
  )
}
