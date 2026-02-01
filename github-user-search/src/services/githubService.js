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
