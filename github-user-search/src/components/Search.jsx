import { useId, useState } from 'react'
import { fetchUserData } from '../services/githubService.js'

export default function Search({
  initialQuery = '',
  disabled = false,
}) {
  const inputId = useId()
  const [query, setQuery] = useState(initialQuery)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [user, setUser] = useState(null)

  async function handleSubmit(event) {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return

    setLoading(true)
    setError('')
    setUser(null)

    try {
      const data = await fetchUserData(trimmed)
      setUser(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch user')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="search">
      <form className="search-form" onSubmit={handleSubmit}>
        <label className="search-label" htmlFor={inputId}>
          GitHub username
        </label>
        <div className="search-row">
          <input
            id={inputId}
            className="search-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. torvalds"
            autoComplete="off"
            disabled={disabled || loading}
          />
          <button className="search-button" type="submit" disabled={disabled || loading}>
            Search
          </button>
        </div>
      </form>

      <div className="search-results">
        {loading ? <p className="status">Loading...</p> : null}
        {!loading && error ? (
          <p className="status error">Looks like we cant find the user</p>
        ) : null}

        {!loading && !error && user ? (
          <div className="user-card">
            <div className="user-header">
              <img
                className="avatar"
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                loading="lazy"
              />
              <div className="user-meta">
                <div className="user-name">{user.name || user.login}</div>
                <a href={user.html_url} target="_blank" rel="noreferrer">
                  View GitHub Profile
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
