import { useId, useState } from 'react'

export default function Search({ onSearch, initialQuery = '', disabled = false }) {
  const inputId = useId()
  const [query, setQuery] = useState(initialQuery)

  function handleSubmit(event) {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    onSearch?.(trimmed)
  }

  return (
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
  )
}
