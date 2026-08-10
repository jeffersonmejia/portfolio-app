import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { SectionIntro } from './SectionIntro'

export function Projects() {
  return (
    <section className="content-section page-shell roadmap-page" id="proyectos" aria-labelledby="projects-title">
      <SectionIntro
        eyebrow="Proyectos"
        title="Backend es mi especialidad."
        description="Mis proyectos backend estarán disponibles pronto. También conservo los trabajos realizados durante mi formación."
        titleId="projects-title"
        src="assets/img/vectors/projects.svg"
        alt="Ilustración sobre desarrollo y organización de proyectos"
      />
      <div className="project-roadmap roadmap-list" aria-live="polite">
        {projects.map((project) => (
          <div className="roadmap-entry" key={project.id}>
            <span className="roadmap-step" aria-hidden="true" />
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  )
}
