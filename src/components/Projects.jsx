import { useState } from 'react'
import { projectCategories, projects } from '../data/projects'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from './SectionHeading'

export function Projects() {
  const [category, setCategory] = useState('Todos')
  const visible = category === 'Todos'
    ? projects
    : projects.filter((project) => project.category === category)

  return (
    <section className="content-section page-shell" id="proyectos" aria-labelledby="projects-title">
      <SectionHeading
        eyebrow="Proyectos"
        title="Backend es mi especialidad."
        description="Mis proyectos backend estarán disponibles pronto. También conservo los trabajos realizados durante mi formación."
        titleId="projects-title"
      />
      <div className="filter-list" aria-label="Filtrar proyectos">
        {projectCategories.map((item) => (
          <button
            className={category === item ? 'is-active' : ''}
            key={item}
            type="button"
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="project-grid" aria-live="polite">
        {visible.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  )
}
