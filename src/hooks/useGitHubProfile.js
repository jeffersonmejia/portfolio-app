import { useEffect, useState } from 'react'
import { featuredRepositories, githubUser } from '../data/github'

const cacheKey = `portfolio-github-api-v5-${githubUser}`
const freshCacheLifetime = 6 * 60 * 60 * 1000
const initialState = { profile: null, repositories: [], metrics: null, loading: true, error: false }

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey))
    if (!cached?.responses?.profile || !Array.isArray(cached.responses.repositories)) return null
    return cached
  } catch {
    return null
  }
}

function selectFeatured(repositories) {
  const byName = new Map(repositories.map((repository) => [repository.name.toLowerCase(), repository]))
  return featuredRepositories.map((name) => byName.get(name.toLowerCase())).filter(Boolean)
}

function selectRecentContributions(contributions) {
  if (!contributions?.length) return []
  const end = new Date(`${contributions.at(-1).date}T00:00:00Z`)
  const start = new Date(end)
  start.setUTCMonth(start.getUTCMonth() - 6)
  start.setUTCDate(start.getUTCDate() - start.getUTCDay())
  return contributions.filter((day) => new Date(`${day.date}T00:00:00Z`) >= start)
}

function createMetrics(repositories, calendar) {
  const contributionDays = selectRecentContributions(calendar?.contributions)
  return {
    totalStars: repositories.reduce((total, repository) => total + repository.stargazers_count, 0),
    contributionsRecent: contributionDays.reduce((total, day) => total + day.count, 0),
    contributionDays,
  }
}

function createViewData({ profile, repositories, calendar }) {
  return {
    profile,
    repositories: selectFeatured(repositories),
    metrics: createMetrics(repositories, calendar),
    loading: false,
    error: false,
  }
}

export function useGitHubProfile(active) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (!active) return undefined
    const cached = readCache()
    if (cached) setState(createViewData(cached.responses))
    if (cached && Date.now() - cached.savedAt < freshCacheLifetime) return undefined

    const controller = new AbortController()
    const request = (url) => fetch(url, {
      cache: 'default',
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    }).then((response) => {
      if (!response.ok) throw new Error(`GitHub API: ${response.status}`)
      return response.json()
    })

    const calendarRequest = fetch(`https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(`Contributions API: ${response.status}`)))
      .catch(() => cached?.responses.calendar ?? null)

    Promise.all([
      request(`https://api.github.com/users/${githubUser}`),
      request(`https://api.github.com/users/${githubUser}/repos?sort=updated&direction=desc&per_page=100`),
      calendarRequest,
    ]).then(([profile, repositories, calendar]) => {
      const responses = { profile, repositories, calendar }
      setState(createViewData(responses))
      try { localStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), responses })) } catch { /* optional cache */ }
    }).catch((error) => {
      if (error.name !== 'AbortError' && !cached) setState({ ...initialState, loading: false, error: true })
    })

    return () => controller.abort()
  }, [active])

  return state
}
