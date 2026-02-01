import { githubClient } from './githubApi.js'

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
