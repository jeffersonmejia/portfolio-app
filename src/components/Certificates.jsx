import { useState } from 'react'
import { certificates } from '../data/certificates'
import { asset } from '../utils/asset'
import { Icon } from './Icon'
import { Modal } from './Modal'
import { SectionHeading } from './SectionHeading'

export function Certificates() {
  const [selected, setSelected] = useState(null)

  return (
    <section className="content-section page-shell" id="certificados" aria-labelledby="certificates-title">
      <SectionHeading
        eyebrow="Formación"
        title="Certificados que respaldan mi experiencia."
        description="Estas credenciales representan formación académica. No definen por sí solas mi especialidad profesional."
        titleId="certificates-title"
      />
      <div className="certificate-grid">
        {certificates.map((certificate) => (
          <article className="certificate-card" key={certificate.id} itemScope itemType="https://schema.org/EducationalOccupationalCredential">
            <div className="certificate-provider">
              <img src={asset(certificate.logo)} alt="" width="36" height="36" loading="lazy" />
              <span itemProp="recognizedBy">{certificate.provider}</span>
              <time itemProp="dateCreated" dateTime={certificate.year}>{certificate.year}</time>
            </div>
            <h3 itemProp="name">{certificate.title}</h3>
            <p itemProp="description">{certificate.description}</p>
            {certificate.audio && (
              <audio controls preload="none" src={asset(certificate.audio)}>
                Tu navegador no puede reproducir este audio.
              </audio>
            )}
            <button className="text-link" type="button" onClick={() => setSelected(certificate)}>
              Ver certificado <Icon name="external" size={16} />
            </button>
          </article>
        ))}
      </div>
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} label={selected?.title}>
        {selected && (
          <figure className="certificate-modal">
            <img src={asset(selected.image)} alt={`Certificado ${selected.title}`} />
            <figcaption>
              <strong>{selected.title}</strong>
              <span>{selected.provider} · {selected.year}</span>
            </figcaption>
          </figure>
        )}
      </Modal>
    </section>
  )
}
