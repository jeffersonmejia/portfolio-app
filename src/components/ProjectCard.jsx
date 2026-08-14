import { asset } from '../utils/asset'
import { Icon } from './Icon'
import { ProgressiveImage } from './ProgressiveImage'
import { TechnologyIcon } from './TechnologyIcon'

export function ProjectCard({ project }) {
  if (project.upcoming) {
    return (
      <article className="project-card project-card-upcoming">
        <div className="project-placeholder"><Icon name="server" size={42} /></div>
        <div className="project-copy">
          <span className="project-meta"><Icon name={project.icon} size={15} /> {project.date}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="tag-list"><TechnologyIcon name="Backend" /></div>
        </div>
      </article>
    )
  }

  return (
    <article className="project-card" itemScope itemType="https://schema.org/SoftwareApplication">
      <a className="project-image" href={project.href} target="_blank" rel="noreferrer" tabIndex="-1">
        <ProgressiveImage
          shellClassName="project-image-media"
          src={asset(project.image)}
          alt={`Vista de ${project.title}`}
          width="720"
          height="480"
          loading="lazy"
          itemProp="image"
        />
      </a>
      <div className="project-copy">
        <div className="project-meta">
          <time dateTime={project.isoDate} itemProp="datePublished">{project.date}</time>
          <span><Icon name={project.icon} size={15} /> {project.category}</span>
        </div>
        <h3 itemProp="name">{project.title}</h3>
        <p itemProp="description">{project.description}</p>
        <div className="tag-list">
          {project.technologies.map((technology) => <TechnologyIcon key={technology} name={technology} />)}
        </div>
        <a className="text-link" href={project.href} target="_blank" rel="noreferrer" itemProp="url">
          Ver proyecto <Icon name="external" size={16} />
        </a>
      </div>
    </article>
  )
}
