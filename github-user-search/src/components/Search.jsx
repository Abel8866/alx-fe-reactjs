import { useId, useState } from 'react'

export default function Search({
  onSearch,
  initialQuery = '',
  disabled = false,
  loading = false,
  error = '',
  user = null,
}) {
  const inputId = useId()
  const [query, setQuery] = useState(initialQuery)

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    onSearch?.(trimmed)
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
            disabled={disabled}
          />
          <button className="search-button" type="submit" disabled={disabled}>
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
