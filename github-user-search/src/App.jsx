import { useState } from 'react'
import './App.css'
import Search from './components/Search.jsx'
import { fetchUserData } from './services/githubService.js'

function App() {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState('')

	async function handleSearch(query) {
		setError('')
		setLoading(true)
		try {
			const data = await fetchUserData(query)
			setUser(data)
		} catch (err) {
			setUser(null)
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
				{user ? (
					<div className="user-card">
						<div className="user-header">
							<img
								className="avatar"
								src={user.avatar_url}
								alt={`${user.login} avatar`}
								loading="lazy"
							/>
							<div className="user-meta">
								<a href={user.html_url} target="_blank" rel="noreferrer">
									{user.login}
								</a>
								{user.name ? <div className="user-name">{user.name}</div> : null}
							</div>
						</div>

						<div className="user-stats">
							<div>
								<strong>Repos:</strong> {user.public_repos}
							</div>
							<div>
								<strong>Followers:</strong> {user.followers}
							</div>
							<div>
								<strong>Following:</strong> {user.following}
							</div>
						</div>

						{user.bio ? <p className="user-bio">{user.bio}</p> : null}
					</div>
				) : (
					<p className="status">No results yet. Search a username (exact match).</p>
				)}
			</div>
		</div>
	)
}

export default App
