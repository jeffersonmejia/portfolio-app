import { asset } from '../utils/asset'
import { Icon } from './Icon'
import { ProgressiveImage } from './ProgressiveImage'
import { TechnologyIcon } from './TechnologyIcon'

export function ProjectCard({ project }) {
  return (
    <article className="project-card" itemScope itemType="https://schema.org/SoftwareApplication">
      <a className="project-image" href={project.href} target="_blank" rel="noreferrer" aria-label={`Abrir ${project.title} en GitHub`}>
        <ProgressiveImage
          shellClassName="project-image-media"
          src={asset(project.image)}
          alt={`Vista de ${project.title}`}
          width="720"
          height="480"
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          itemProp="image"
        />
      </a>
      <div className="project-copy">
        <div className="project-meta">
          <span><Icon name={project.icon} size={15} /> {project.category}</span>
        </div>
        <h3 itemProp="name">{project.title}</h3>
        <p itemProp="description">{project.description}</p>
        <div className="tag-list">
          {project.technologies.map((technology) => <TechnologyIcon key={technology} name={technology} />)}
        </div>
        <meta content={project.href} itemProp="url" />
      </div>
    </article>
  )
}
