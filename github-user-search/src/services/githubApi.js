const API_BASE_URL =
  import.meta.env.VITE_APP_GITHUB_API_BASE_URL ?? 'https://api.github.com'

const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_API_KEY

function buildHeaders(extraHeaders = {}) {
  const headers = {
    Accept: 'application/vnd.github+json',
    ...extraHeaders,
  }

  // If a token is provided, authenticate requests to increase rate limits.
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`
  }

  return headers
}

/**
 * Minimal GitHub API request helper.
 *
 * Usage:
 *   const user = await githubRequest(`/users/${login}`)
 */
export async function githubRequest(path, options = {}) {
  const url = `${API_BASE_URL}${path}`

  const response = await fetch(url, {
    ...options,
    headers: buildHeaders(options.headers),
  })

  if (!response.ok) {
    let details = ''
    try {
      const body = await response.json()
      details = body?.message ? `: ${body.message}` : ''
    } catch {
      // ignore JSON parse errors
    }

    throw new Error(`GitHub API error ${response.status}${details}`)
  }

  // GitHub returns JSON for most endpoints; callers can override as needed.
  return response.json()
}
