import { useState } from 'react'
import './App.css'
import Search from './components/Search.jsx'
import { githubRequest } from './services/githubApi.js'

function App() {
	const [results, setResults] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function handleSearch(query) {
		setError('')
		setLoading(true)
		try {
			const data = await githubRequest(`/search/users?q=${encodeURIComponent(query)}&per_page=20`)
			setResults(Array.isArray(data?.items) ? data.items : [])
		} catch (err) {
			setResults([])
			setError(err instanceof Error ? err.message : 'Failed to search users')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="app">
			<h1>GitHub User Search</h1>

			<Search onSearch={handleSearch} disabled={loading} />

			{loading ? <p className="status">Searching…</p> : null}
			{error ? <p className="status error">{error}</p> : null}

			<div className="results">
				{results.length ? (
					<ul className="results-list">
						{results.map((user) => (
							<li key={user.id} className="result-item">
								<img
									className="avatar"
									src={user.avatar_url}
									alt={`${user.login} avatar`}
									loading="lazy"
								/>
								<a href={user.html_url} target="_blank" rel="noreferrer">
									{user.login}
								</a>
							</li>
						))}
					</ul>
				) : (
					<p className="status">No results yet. Try a username.</p>
				)}
			</div>
		</div>
	)
}

export default App
