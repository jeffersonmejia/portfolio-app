import { useState } from 'react'
import { contact } from '../data/site'

const emptyForm = { entity: '', name: '', email: '', position: '', message: '' }

export function ContactForm({ onSuccess }) {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  const update = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.value }))

  const submit = async (event) => {
    event.preventDefault()
    setSending(true)
    setStatus('Enviando solicitud')
    const title = `Hola, soy ${form.name}. Represento a ${form.entity}. Solicito tu currículum para la vacante ${form.position}. Mi correo es ${form.email}. ${form.message}`

    try {
      const emailjs = await import('@emailjs/browser')
      await emailjs.send(
        contact.emailService,
        contact.emailTemplate,
        { name: form.name, title, email: form.email },
        { publicKey: contact.emailKey },
      )
      setStatus('Solicitud enviada. Pronto me pondré en contacto.')
      setForm(emptyForm)
      onSuccess?.()
    } catch {
      setStatus('No pude enviar la solicitud. Intenta más tarde.')
    } finally {
      setSending(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <label>Entidad<input name="entity" value={form.entity} onChange={update} required /></label>
      <label>Nombre<input name="name" value={form.name} onChange={update} required autoComplete="name" /></label>
      <label>Correo<input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" /></label>
      <label>Vacante<input name="position" value={form.position} onChange={update} required /></label>
      <label className="form-wide">Mensaje<textarea name="message" value={form.message} onChange={update} maxLength="200" rows="4" /></label>
      <label className="consent form-wide">
        <input type="checkbox" required />
        <span>Acepto que mis datos se usen únicamente para responder esta solicitud. Puedo pedir su eliminación.</span>
      </label>
      <button className="button button-primary form-wide" type="submit" disabled={sending}>
        {sending ? 'Enviando' : 'Enviar solicitud'}
      </button>
      <p className="form-status form-wide" role="status">{status}</p>
    </form>
  )
}
