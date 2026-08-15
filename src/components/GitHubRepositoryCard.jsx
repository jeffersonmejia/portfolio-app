import { repositoryTitles } from '../data/github'
import { Icon } from './Icon'
import { TechnologyIcon } from './TechnologyIcon'

const dateFormatter = new Intl.DateTimeFormat('es-EC', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

export function GitHubRepositoryCard({ repository }) {
  const topics = repository.topics?.slice(0, 3) ?? []

  return (
    <article className="github-repository-card">
      <div className="github-repository-heading">
        {repository.language && <TechnologyIcon name={repository.language} />}
        <span className="github-repository-metrics">
          <span title="Estrellas"><Icon name="star" size={13} /> {repository.stargazers_count}</span>
          <span title="Forks"><Icon name="fork" size={13} /> {repository.forks_count}</span>
        </span>
      </div>
      <div className="github-repository-copy">
        <h3>{repositoryTitles[repository.name] || repository.name}</h3>
        {repository.description && <p>{repository.description}</p>}
      </div>
      {topics.length > 0 && (
        <div className="github-topics" aria-label="Temas">
          {topics.map((topic) => <span key={topic}>{topic}</span>)}
        </div>
      )}
      <footer>
        <time dateTime={repository.updated_at}>Actualizado {dateFormatter.format(new Date(repository.updated_at))}</time>
        <a href={repository.html_url} target="_blank" rel="noreferrer" aria-label={`Abrir ${repository.name} en GitHub`}>
          Ver repo <Icon name="external" size={14} />
        </a>
      </footer>
    </article>
  )
}
