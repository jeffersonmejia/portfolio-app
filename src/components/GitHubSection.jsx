import { useState } from 'react'
import { githubUser } from '../data/github'
import { softSkillGroups, technicalSkillGroups } from '../data/skills'
import { useGitHubProfile } from '../hooks/useGitHubProfile'
import { GitHubRepositoryCard } from './GitHubRepositoryCard'
import { Icon } from './Icon'
import { ProgressiveImage } from './ProgressiveImage'
import { SkillsPanel } from './SkillsPanel'

const githubUrl = `https://github.com/${githubUser}`
const pages = ['GitHub', 'Habilidades técnicas', 'Habilidades blandas']

export function GitHubSection({ active }) {
  const [activePage, setActivePage] = useState(0)
  const { profile, repositories, metrics, loading, error } = useGitHubProfile(active)

  return (
    <section className="home-github" aria-label="Perfil y habilidades" aria-busy={activePage === 0 && loading}>
      <header className="github-section-header">
        <nav className="github-tabs" aria-label="Secciones del perfil" role="tablist" style={{ '--github-active-page': activePage }}>
          {pages.map((page, index) => (
            <button aria-controls={`github-page-${index}`} aria-selected={activePage === index} id={`github-tab-${index}`} key={page} onClick={() => setActivePage(index)} role="tab" type="button">{page}</button>
          ))}
        </nav>
      </header>
      <div className="github-page-content" hidden={activePage !== 0} id="github-page-0" role="tabpanel" aria-labelledby="github-tab-0">
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
      </div>
      <div className="github-page-content" hidden={activePage !== 1} id="github-page-1" role="tabpanel" aria-labelledby="github-tab-1">
        <SkillsPanel groups={technicalSkillGroups} technical />
      </div>
      <div className="github-page-content" hidden={activePage !== 2} id="github-page-2" role="tabpanel" aria-labelledby="github-tab-2">
        <SkillsPanel groups={softSkillGroups} />
      </div>
    </section>
  )
}
