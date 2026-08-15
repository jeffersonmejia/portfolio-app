import { useEffect, useState } from 'react'
import { backendLanguages, featuredRepositories, githubUser } from '../data/github'

const cacheKey = `portfolio-github-${githubUser}-${featuredRepositories.join('-')}`
const cacheLifetime = 15 * 60 * 1000
const initialState = { profile: null, repositories: [], metrics: null, loading: true, error: false }

function readCache() {
  try {
    const cached = JSON.parse(localStorage.getItem(cacheKey))
    return cached && Date.now() - cached.savedAt < cacheLifetime ? cached.data : null
  } catch {
    return null
  }
}

function selectFeatured(repositories) {
  const byName = new Map(repositories.map((repository) => [repository.name.toLowerCase(), repository]))
  return featuredRepositories
    .map((name) => byName.get(name.toLowerCase()))
    .filter(Boolean)
}

function createMetrics(repositories, commitsLastYear) {
  const usedLanguages = new Set(repositories.map(({ language }) => language).filter(Boolean))
  return {
    backendLanguages: backendLanguages.filter((language) => usedLanguages.has(language)),
    totalStars: repositories.reduce((total, repository) => total + repository.stargazers_count, 0),
    commitsLastYear,
  }
}

export function useGitHubProfile(active) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    if (!active) return undefined
    const cached = readCache()
    if (cached) {
      setState(cached)
      return undefined
    }

    const controller = new AbortController()
    const request = (url) => fetch(url, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    }).then((response) => {
      if (!response.ok) throw new Error(`GitHub API: ${response.status}`)
      return response.json()
    })

    const since = new Date()
    since.setUTCFullYear(since.getUTCFullYear() - 1)
    const commitQuery = encodeURIComponent(`author:${githubUser} committer-date:>=${since.toISOString().slice(0, 10)}`)
    const commitsRequest = request(`https://api.github.com/search/commits?q=${commitQuery}&per_page=1`)
      .then((result) => result.incomplete_results ? null : result.total_count)
      .catch(() => null)

    Promise.all([
      request(`https://api.github.com/users/${githubUser}`),
      request(`https://api.github.com/users/${githubUser}/repos?sort=updated&direction=desc&per_page=100`),
      commitsRequest,
    ]).then(([profile, repositories, commitsLastYear]) => {
      const data = {
        profile,
        repositories: selectFeatured(repositories),
        metrics: createMetrics(repositories, commitsLastYear),
        loading: false,
        error: false,
      }
      setState(data)
      try { localStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), data })) } catch { /* optional cache */ }
    }).catch((error) => {
      if (error.name !== 'AbortError') setState({ ...initialState, loading: false, error: true })
    })

    return () => controller.abort()
  }, [active])

  return state
}
