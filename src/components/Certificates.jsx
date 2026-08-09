import { useState } from 'react'
import { certificateCategories, certificates } from '../data/certificates'
import { asset } from '../utils/asset'
import { CategoryFilter } from './CategoryFilter'
import { Icon } from './Icon'
import { Modal } from './Modal'
import { ProgressiveImage } from './ProgressiveImage'
import { SectionHeading } from './SectionHeading'

export function Certificates() {
  const [selected, setSelected] = useState(null)
  const [category, setCategory] = useState('Todos')
  const visible = category === 'Todos'
    ? certificates
    : certificates.filter((certificate) => certificate.category === category)

  return (
    <section className="content-section page-shell" id="certificados" aria-labelledby="certificates-title">
      <SectionHeading
        eyebrow="Formación"
        title="Capacitaciones profesionales que respaldan mi experiencia."
        description="Estas credenciales representan formación académica. No definen por sí solas mi especialidad profesional."
        titleId="certificates-title"
      />
      <CategoryFilter
        label="Filtrar capacitaciones profesionales"
        items={certificateCategories}
        selected={category}
        onSelect={setCategory}
      />
      <div className="certificate-grid" aria-live="polite">
        {visible.map((certificate) => (
          <article className="certificate-card" key={certificate.id} itemScope itemType="https://schema.org/EducationalOccupationalCredential">
            <div className="certificate-provider">
              <span className="provider-logo" aria-hidden="true">
                <ProgressiveImage src={asset(certificate.logo)} alt="" width="52" height="52" loading="lazy" />
              </span>
              <span itemProp="recognizedBy">{certificate.provider}</span>
              <time itemProp="dateCreated" dateTime={certificate.year}>{certificate.year}</time>
            </div>
            <h3 itemProp="name">{certificate.title}</h3>
            <p itemProp="description">{certificate.description}</p>
            <button className="text-link" type="button" onClick={() => setSelected(certificate)}>
              Ver certificado <Icon name="external" size={16} />
            </button>
          </article>
        ))}
      </div>
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} label={selected?.title}>
        {selected && (
          <figure className="certificate-modal">
            <ProgressiveImage
              shellClassName="certificate-preview"
              src={asset(selected.image)}
              alt={`Certificado ${selected.title}`}
            />
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
