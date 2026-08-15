import { githubUser } from '../data/github'
import { useGitHubProfile } from '../hooks/useGitHubProfile'
import { GitHubRepositoryCard } from './GitHubRepositoryCard'
import { Icon } from './Icon'
import { ProgressiveImage } from './ProgressiveImage'

const githubUrl = `https://github.com/${githubUser}`

export function GitHubSection({ active }) {
  const { profile, repositories, metrics, loading, error } = useGitHubProfile(active)

  return (
    <section className="home-github" aria-labelledby="home-github-title" aria-busy={loading}>
      <header><span className="eyebrow" id="home-github-title">GitHub</span></header>
      {loading && (
        <div className="github-loading" role="status" aria-label="Cargando perfil de GitHub">
          <span className="github-loading-profile" />
          <span /><span />
        </div>
      )}
      {error && (
        <div className="github-error" role="status">
          <Icon name="github" size={25} />
          <div><strong>GitHub no respondió por ahora.</strong><small>El resto del portafolio sigue disponible.</small></div>
          <a href={githubUrl} target="_blank" rel="noreferrer">Abrir GitHub <Icon name="external" size={14} /></a>
        </div>
      )}
      {profile && (
        <>
          <article className="github-profile-card">
            <ProgressiveImage shellClassName="github-avatar" src={profile.avatar_url} alt={profile.name || githubUser} width="80" height="80" loading="lazy" />
            <div className="github-profile-copy">
              <h2>{profile.name || githubUser}</h2>
              <span>@{profile.login}</span>
              <div className="github-stats">
                <span><strong>{profile.public_repos}</strong> repositorios</span>
                <span><strong>{profile.followers}</strong> seguidores</span>
              </div>
            </div>
            <a className="github-profile-action" href={profile.html_url} target="_blank" rel="noreferrer">
              <Icon name="github" size={17} /> Abrir GitHub
            </a>
          </article>
          {metrics && (
            <div className={`github-overview ${metrics.commitsLastYear === null ? 'is-partial' : ''}`} aria-label="Métricas generales de GitHub">
              <span><small>Backend</small><strong>{metrics.backendLanguages.join(' · ') || '—'}</strong></span>
              <span><small>Stars</small><strong>{metrics.totalStars}</strong></span>
              {metrics.commitsLastYear !== null && <span><small>Contribuciones · últimos 12 meses</small><strong>{metrics.commitsLastYear}</strong></span>}
            </div>
          )}
          <div className="github-repositories">
            {repositories.map((repository) => <GitHubRepositoryCard key={repository.id} repository={repository} />)}
          </div>
        </>
      )}
    </section>
  )
}
