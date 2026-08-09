import { useState } from 'react'
import { projectCategories, projects } from '../data/projects'
import { CategoryFilter } from './CategoryFilter'
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
      <CategoryFilter
        label="Filtrar proyectos"
        items={projectCategories}
        selected={category}
        onSelect={setCategory}
      />
      <div className="project-grid" aria-live="polite">
        {visible.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  )
}
