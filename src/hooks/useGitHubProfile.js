import { useEffect, useState } from 'react'
import { backendLanguages, featuredRepositories, githubUser } from '../data/github'

const cacheKey = `portfolio-github-api-v2-${githubUser}`
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
  return featuredRepositories
    .map((name) => byName.get(name.toLowerCase()))
    .filter(Boolean)
}

function createMetrics(repositories, commits) {
  const usedLanguages = new Set(repositories.map(({ language }) => language).filter(Boolean))
  return {
    backendLanguages: backendLanguages.filter((language) => usedLanguages.has(language)),
    totalStars: repositories.reduce((total, repository) => total + repository.stargazers_count, 0),
    commitsLastYear: commits && !commits.incomplete_results ? commits.total_count : null,
  }
}

function createViewData({ profile, repositories, commits }) {
  return {
    profile,
    repositories: selectFeatured(repositories),
    metrics: createMetrics(repositories, commits),
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

    const since = new Date()
    since.setUTCFullYear(since.getUTCFullYear() - 1)
    const commitQuery = encodeURIComponent(`author:${githubUser} committer-date:>=${since.toISOString().slice(0, 10)}`)
    const commitsRequest = request(`https://api.github.com/search/commits?q=${commitQuery}&per_page=1`)
      .catch(() => cached?.responses.commits ?? null)

    Promise.all([
      request(`https://api.github.com/users/${githubUser}`),
      request(`https://api.github.com/users/${githubUser}/repos?sort=updated&direction=desc&per_page=100`),
      commitsRequest,
    ]).then(([profile, repositories, commits]) => {
      const responses = { profile, repositories, commits }
      setState(createViewData(responses))
      try { localStorage.setItem(cacheKey, JSON.stringify({ savedAt: Date.now(), responses })) } catch { /* optional cache */ }
    }).catch((error) => {
      if (error.name !== 'AbortError' && !cached) setState({ ...initialState, loading: false, error: true })
    })

    return () => controller.abort()
  }, [active])

  return state
}
