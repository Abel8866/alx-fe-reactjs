import axios from 'axios'

const API_BASE_URL =
  import.meta.env.VITE_APP_GITHUB_API_BASE_URL ?? 'https://api.github.com'

const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY

export const githubClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/vnd.github+json',
  },
})

// If a token is provided, authenticate requests to increase rate limits.
if (GITHUB_TOKEN) {
  githubClient.defaults.headers.common.Authorization = `Bearer ${GITHUB_TOKEN}`
}

/**
 * Fetch a single GitHub user profile by username.
 * Endpoint: https://api.github.com/users/{username}
 */
export async function fetchUserData(username) {
  const trimmed = String(username ?? '').trim()
  if (!trimmed) {
    throw new Error('Username is required')
  }

  try {
    const response = await githubClient.get(`/users/${encodeURIComponent(trimmed)}`)
    return response.data
  } catch (error) {
    const status = error?.response?.status
    const message = error?.response?.data?.message

    if (status === 404) {
      throw new Error('User not found')
    }

    if (status) {
      throw new Error(`GitHub API error ${status}${message ? `: ${message}` : ''}`)
    }

    throw error
  }
}

function quoteIfNeeded(value) {
  const text = String(value ?? '').trim()
  if (!text) return ''
  return /\s/.test(text) ? `"${text.replaceAll('"', '\\"')}"` : text
}

/**
 * Advanced user search using GitHub Search API.
 * Endpoint: https://api.github.com/search/users?q={query}
 *
 * Supports qualifiers like:
 *  - location:{location}
 *  - repos:>{n}
 */
export async function searchUsers({ query = '', location = '', minRepos, perPage = 20, page = 1 } = {}) {
  const terms = []

  const trimmedQuery = String(query ?? '').trim()
  if (trimmedQuery) terms.push(trimmedQuery)

  const trimmedLocation = String(location ?? '').trim()
  if (trimmedLocation) terms.push(`location:${quoteIfNeeded(trimmedLocation)}`)

  const minReposNumber = Number(minRepos)
  if (Number.isFinite(minReposNumber) && minReposNumber > 0) {
    // GitHub supports `repos:>n` for user search.
    terms.push(`repos:>${Math.floor(minReposNumber) - 1}`)
  }

  if (!terms.length) {
    throw new Error('At least one search criterion is required')
  }

  const q = terms.join(' ')

  try {
    const response = await githubClient.get('/search/users', {
      params: {
        q,
        per_page: perPage,
        page,
      },
    })

    return response.data
  } catch (error) {
    const status = error?.response?.status
    const message = error?.response?.data?.message

    if (status) {
      throw new Error(`GitHub API error ${status}${message ? `: ${message}` : ''}`)
    }

    throw error
  }
}
