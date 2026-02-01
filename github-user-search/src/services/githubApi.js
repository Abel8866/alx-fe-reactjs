import { githubClient } from './githubService.js'

/**
 * Minimal GitHub API request helper (Axios).
 *
 * Usage:
 *   const user = await githubRequest(`/users/${login}`)
 */
export async function githubRequest(path, config = {}) {
  try {
    const response = await githubClient.request({
      url: path,
      ...config,
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
