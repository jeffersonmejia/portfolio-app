import { useState } from 'react'
import { certificates } from '../data/certificates'
import { useProgressiveRoadmap } from '../hooks/useProgressiveRoadmap'
import { asset } from '../utils/asset'
import { Icon } from './Icon'
import { ProgressiveImage } from './ProgressiveImage'
import { SectionIntro } from './SectionIntro'

export function Certificates() {
  const [selected, setSelected] = useState(null)
  const roadmapRef = useProgressiveRoadmap()

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
      <div className="certificate-roadmap roadmap-list" ref={roadmapRef}>
        {certificates.map((certificate) => {
          const expanded = selected?.id === certificate.id
          return (
            <article className={`certificate-card roadmap-entry ${expanded ? 'is-expanded' : ''}`} key={certificate.id} itemScope itemType="https://schema.org/EducationalOccupationalCredential">
              <span className="roadmap-step" aria-hidden="true" />
              <div className="certificate-copy">
                <div className="certificate-provider">
                  <span className="provider-logo" aria-hidden="true">
                    <ProgressiveImage src={asset(certificate.logo)} alt="" width="52" height="52" loading="lazy" decoding="async" fetchPriority="low" />
                  </span>
                  <span itemProp="recognizedBy">{certificate.provider}</span>
                  <time itemProp="dateCreated" dateTime={certificate.year}>{certificate.year}</time>
                </div>
                <h3 itemProp="name">{certificate.title}</h3>
                <p itemProp="description">{certificate.description}</p>
                {!expanded && (
                  <button className="text-link certificate-action" type="button" onClick={() => setSelected(certificate)} aria-expanded="false">
                    Ver certificado <Icon name="external" size={16} />
                  </button>
                )}
              </div>
              <div className="certificate-inline-preview" aria-hidden={!expanded} inert={!expanded}>
                {expanded && (
                  <>
                    <button className="certificate-inline-close" type="button" onClick={() => setSelected(null)}><Icon name="x" size={16} /> Cerrar</button>
                    <ProgressiveImage shellClassName="certificate-preview" src={asset(certificate.image)} alt={`Certificado ${certificate.title}`} />
                  </>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
