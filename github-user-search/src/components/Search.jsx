import { useId, useState } from 'react'
import { fetchUserData, searchUsers } from '../services/githubService.js'

export default function Search({
  initialQuery = '',
  disabled = false,
}) {
  const queryId = useId()
  const locationId = useId()
  const minReposId = useId()

  const [query, setQuery] = useState(initialQuery)
  const [location, setLocation] = useState('')
  const [minRepos, setMinRepos] = useState('')

  const [loading, setLoading] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')

  const [results, setResults] = useState([])
  const [page, setPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)

  async function enrichUsers(items) {
    // /search/users doesn't include location or public_repos.
    // Enrich by fetching each user's profile.
    const concurrency = 5
    const queue = items.map((u) => u?.login).filter(Boolean)
    const enriched = []

    async function worker() {
      while (queue.length) {
        const login = queue.shift()
        try {
          const full = await fetchUserData(login)
          enriched.push(full)
        } catch {
          // Fallback to minimal shape when profile fetch fails.
          const minimal = items.find((u) => u?.login === login)
          if (minimal) enriched.push(minimal)
        }
      }
    }

    const workers = Array.from({ length: Math.min(concurrency, queue.length) }, () => worker())
    await Promise.all(workers)

    // Preserve original ordering.
    const byLogin = new Map(enriched.map((u) => [u?.login, u]))
    return items.map((u) => byLogin.get(u?.login) ?? u)
  }

  async function runSearch({ nextPage, append }) {
    const trimmedQuery = query.trim()
    const trimmedLocation = location.trim()
    const trimmedMinRepos = minRepos.trim()

    if (!trimmedQuery && !trimmedLocation && !trimmedMinRepos) {
      setError('Please enter at least one search filter')
      return
    }

    try {
      const perPage = 10
      const data = await searchUsers({
        query: trimmedQuery,
        location: trimmedLocation,
        minRepos: trimmedMinRepos ? Number(trimmedMinRepos) : undefined,
        perPage,
        page: nextPage,
      })

      const items = Array.isArray(data?.items) ? data.items : []
      const detailed = await enrichUsers(items)

      setTotalCount(Number(data?.total_count) || 0)
      setPage(nextPage)
      setResults((prev) => (append ? [...prev, ...detailed] : detailed))
      setError('')
    } catch (err) {
      setResults([])
      setTotalCount(0)
      setError(err instanceof Error ? err.message : 'Failed to search users')
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()

    setLoading(true)
    setError('')
    setResults([])
    setTotalCount(0)
    setPage(1)

    await runSearch({ nextPage: 1, append: false })
    setLoading(false)
  }

  const canLoadMore = results.length > 0 && results.length < totalCount

  async function handleLoadMore() {
    if (!canLoadMore || loading || loadingMore) return
    setLoadingMore(true)
    await runSearch({ nextPage: page + 1, append: true })
    setLoadingMore(false)
  }

  return (
    <div className="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-grid">
          <div className="field">
            <label className="search-label" htmlFor={queryId}>
              Query
            </label>
            <input
              id={queryId}
              className="search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. react"
              autoComplete="off"
              disabled={disabled || loading || loadingMore}
            />
          </div>

          <div className="field">
            <label className="search-label" htmlFor={locationId}>
              Location
            </label>
            <input
              id={locationId}
              className="search-input"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Lagos"
              autoComplete="off"
              disabled={disabled || loading || loadingMore}
            />
          </div>

          <div className="field">
            <label className="search-label" htmlFor={minReposId}>
              Min repos
            </label>
            <input
              id={minReposId}
              className="search-input"
              type="number"
              min="0"
              inputMode="numeric"
              value={minRepos}
              onChange={(e) => setMinRepos(e.target.value)}
              placeholder="e.g. 10"
              disabled={disabled || loading || loadingMore}
            />
          </div>
        </div>

        <div className="search-actions">
          <button className="search-button" type="submit" disabled={disabled || loading || loadingMore}>
            Search
          </button>
        </div>
      </form>

      <div className="search-results">
        {loading ? <p className="status">Loading...</p> : null}

        {!loading && error ? <p className="status error">Looks like we cant find the user</p> : null}

        {!loading && !error && results.length ? (
          <>
            <p className="status">Showing {results.length} of {totalCount.toLocaleString()} results</p>

            <ul className="results-list">
              {results.map((u) => (
                <li key={u.id ?? u.login} className="result-item">
                  <img
                    className="avatar"
                    src={u.avatar_url}
                    alt={`${u.login} avatar`}
                    loading="lazy"
                    decoding="async"
                    width="36"
                    height="36"
                  />
                  <div className="result-main">
                    <div className="result-title">
                      <span className="result-name">{u.name || u.login}</span>
                      <a href={u.html_url} target="_blank" rel="noreferrer">
                        View profile
                      </a>
                    </div>

                    <div className="result-meta">
                      <span>Location: {u.location || '—'}</span>
                      <span>Repos: {Number.isFinite(u.public_repos) ? u.public_repos : '—'}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="load-more">
              <button className="search-button" type="button" onClick={handleLoadMore} disabled={!canLoadMore || loadingMore}>
                {loadingMore ? 'Loading...' : canLoadMore ? 'Load more' : 'No more results'}
              </button>
            </div>
          </>
        ) : null}

        {!loading && !error && !results.length ? (
          <p className="status">Search using the filters above.</p>
        ) : null}
      </div>
    </div>
  )
}
