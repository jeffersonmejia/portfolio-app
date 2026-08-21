import { useState } from 'react'
import { githubUser } from '../data/github'
import { softSkillGroups, technicalSkillGroups } from '../data/skills'
import { useGitHubProfile } from '../hooks/useGitHubProfile'
import { GitHubRepositoryCard } from './GitHubRepositoryCard'
import { Icon } from './Icon'
import { SkillsPanel } from './SkillsPanel'

const githubUrl = `https://github.com/${githubUser}`
const pages = ['GitHub', 'Habilidades técnicas', 'Habilidades blandas']
const monthFormatter = new Intl.DateTimeFormat('es-EC', { month: 'short', timeZone: 'UTC' })
const contributionWeekdays = [null, 'lun', null, 'mié', null, 'vie', null]

function getContributionMonths(days) {
  const months = days.reduce((items, day, index) => {
    const date = new Date(`${day.date}T00:00:00Z`)
    const month = date.getUTCMonth()
    const previous = index ? new Date(`${days[index - 1].date}T00:00:00Z`).getUTCMonth() : null
    if (month !== previous) items.push({ label: monthFormatter.format(date).replace('.', ''), week: Math.floor(index / 7) + 1 })
    return items
  }, [])
  return months
}

export function GitHubSection({ active }) {
  const [activePage, setActivePage] = useState(0)
  const { profile, repositories, metrics, loading, error } = useGitHubProfile(active)

  return (
    <section className="home-github" aria-label="Perfil y habilidades" aria-busy={active && activePage === 0 && loading}>
      <header className="github-section-header">
        <nav className="github-tabs" aria-label="Secciones del perfil" role="tablist" style={{ '--github-active-page': activePage }}>
          {pages.map((page, index) => (
            <button aria-controls={`github-page-${index}`} aria-selected={activePage === index} id={`github-tab-${index}`} key={page} onClick={() => setActivePage(index)} role="tab" type="button">{page}</button>
          ))}
        </nav>
      </header>
      <div className="github-page-content" hidden={activePage !== 0} id="github-page-0" role="tabpanel" aria-labelledby="github-tab-0">
      {active && loading && (
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
          <div className="github-summary">
            <article className="github-profile-card">
              <span className="github-avatar" aria-hidden="true"><Icon name="github" size={25} /></span>
              <div className="github-profile-copy">
                <h2>{profile.name || githubUser}</h2>
                <span>@{profile.login}</span>
                <div className="github-stats">
                  <span><strong>{profile.public_repos}</strong> repositorios</span>
                  <span><strong>{profile.followers}</strong> seguidores</span>
                  {metrics && <span><Icon name="star" size={12} /> <strong>{metrics.totalStars}</strong> stars</span>}
                </div>
              </div>
              <a className="github-profile-action" href={profile.html_url} target="_blank" rel="noreferrer" aria-label="Abrir perfil de GitHub">
                <Icon name="contact" size={17} /> Ir a GitHub
              </a>
            </article>
            {metrics && (
              <div className="github-overview" aria-label="Métricas generales de GitHub">
                <span className="github-activity">
                  <small>Contribuciones · últimos 6 meses</small>
                  <strong><Icon name="commit" size={13} /> {metrics.contributionsRecent}</strong>
                  <span className="github-contribution-calendar" style={{ '--contribution-weeks': Math.ceil(metrics.contributionDays.length / 7) }}>
                    <span className="github-contribution-months" aria-hidden="true">
                      {getContributionMonths(metrics.contributionDays).map((month) => <small key={`${month.label}-${month.week}`} style={{ gridColumnStart: month.week }}>{month.label}</small>)}
                    </span>
                    <span className="github-contribution-weekdays" aria-hidden="true">
                      {contributionWeekdays.map((day, index) => <small key={index}>{day}</small>)}
                    </span>
                    <span className="github-contribution-grid" aria-label={`${metrics.contributionsRecent} contribuciones durante los últimos seis meses`}>
                      {metrics.contributionDays.map((day) => <i data-level={day.level} key={day.date} title={`${day.count} contribuciones · ${day.date}`} />)}
                    </span>
                  </span>
                </span>
              </div>
            )}
          </div>
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
