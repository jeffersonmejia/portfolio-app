import { projects } from '../data/projects'
import { useProgressiveRoadmap } from '../hooks/useProgressiveRoadmap'
import { ProjectCard } from './ProjectCard'
import { SectionIntro } from './SectionIntro'

export function Projects() {
  const roadmapRef = useProgressiveRoadmap()

  return (
    <section className="content-section page-shell roadmap-page" id="proyectos" aria-labelledby="projects-title">
      <SectionIntro
        eyebrow="Proyectos"
        title="Backend es mi especialidad."
        description="Sistemas centrados en arquitectura backend, seguridad, datos, rendimiento e integraciones de negocio."
        titleId="projects-title"
        src="assets/img/vectors/projects.svg"
        alt="Ilustración sobre desarrollo y organización de proyectos"
      />
      <div className="project-roadmap roadmap-list" ref={roadmapRef}>
        {projects.map((project) => (
          <div
            className="roadmap-entry"
            key={project.id}
            style={{ '--project-light-accent': project.accent, '--project-dark-accent': project.darkAccent }}
          >
            <span className="roadmap-step" aria-hidden="true" />
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  )
}
