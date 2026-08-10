import { useState } from 'react'
import { projectCategories, projects } from '../data/projects'
import { CategoryFilter } from './CategoryFilter'
import { ProjectCard } from './ProjectCard'
import { SectionIntro } from './SectionIntro'

export function Projects() {
  const [category, setCategory] = useState('Todos')
  const visible = category === 'Todos'
    ? projects
    : projects.filter((project) => project.category === category)

  return (
    <section className="content-section page-shell" id="proyectos" aria-labelledby="projects-title">
      <SectionIntro
        eyebrow="Proyectos"
        title="Backend es mi especialidad."
        description="Mis proyectos backend estarán disponibles pronto. También conservo los trabajos realizados durante mi formación."
        titleId="projects-title"
        src="assets/img/vectors/projects.svg"
        alt="Ilustración sobre desarrollo y organización de proyectos"
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
