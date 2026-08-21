import { useState } from 'react'
import { certificates } from '../data/certificates'
import { asset } from '../utils/asset'
import { Icon } from './Icon'
import { Modal } from './Modal'
import { ProgressiveImage } from './ProgressiveImage'
import { SectionIntro } from './SectionIntro'

export function Certificates() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="content-section page-shell roadmap-page" id="certificados" aria-labelledby="certificates-title">
      <SectionIntro
        eyebrow="Formación"
        title="Capacitaciones."
        description="Estas credenciales representan formación académica. No definen por sí solas mi especialidad profesional."
        titleId="certificates-title"
        src="assets/img/vectors/skills.svg"
        alt="Ilustración sobre capacitación profesional y habilidades técnicas"
      />
      <div className="certificate-grid">
        {certificates.map((certificate) => (
            <article className="certificate-card" key={certificate.id} itemScope itemType="https://schema.org/EducationalOccupationalCredential">
              <button className="certificate-thumbnail" type="button" onClick={() => setSelected(certificate)} aria-haspopup="dialog" aria-label={`Ver certificado completo: ${certificate.title}`}>
                <ProgressiveImage src={asset(certificate.image)} alt={`Certificado ${certificate.title}`} loading="lazy" decoding="async" fetchPriority="low" itemProp="image" />
              </button>
              <div className="certificate-copy">
                <div className="certificate-provider">
                  <span className="provider-logo" aria-hidden="true">
                    <ProgressiveImage src={asset(certificate.logo)} alt="" width="52" height="52" loading="lazy" decoding="async" fetchPriority="low" />
                  </span>
                  <span itemProp="recognizedBy">{certificate.provider}</span>
                </div>
                <h3 itemProp="name">{certificate.title}</h3>
                <p itemProp="description">{certificate.description}</p>
              </div>
            </article>
        ))}
      </div>
      <Modal className="certificate-preview-modal" open={Boolean(selected)} onClose={() => setSelected(null)} label={selected ? `Certificado: ${selected.title}` : 'Vista completa del certificado'} showClose={false}>
        {selected && (
          <div className="certificate-preview">
            <header>
              <div><span>{selected.provider}</span><h2>{selected.title}</h2></div>
              <button className="certificate-preview-close" type="button" onClick={() => setSelected(null)} aria-label="Cerrar certificado"><Icon name="x" size={18} /></button>
            </header>
            <ProgressiveImage src={asset(selected.image)} alt={`Certificado completo: ${selected.title}`} decoding="async" fetchPriority="high" />
          </div>
        )}
      </Modal>
    </section>
  )
}
