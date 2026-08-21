import { projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { SectionIntro } from './SectionIntro'

export function Projects() {
  return (
    <section className="content-section page-shell roadmap-page" id="proyectos" aria-labelledby="projects-title">
      <SectionIntro
        eyebrow="Proyectos"
        title="Backend es mi especialidad."
        description="He trabajado en frontend y backend, aunque mi especialidad está en arquitectura backend, seguridad, datos, rendimiento e integraciones de negocio."
        titleId="projects-title"
        src="assets/img/vectors/projects.svg"
        alt="Ilustración sobre desarrollo y organización de proyectos"
      />
      <div className="project-grid">
        {projects.map((project) => (
          <div
            className="project-grid-entry"
            key={project.id}
            style={{ '--project-light-accent': project.accent, '--project-dark-accent': project.darkAccent }}
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  )
}
