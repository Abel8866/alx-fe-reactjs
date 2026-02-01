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

			<Search
				onSearch={handleSearch}
				disabled={loading}
				loading={loading}
				error={error}
				user={user}
			/>
		</div>
	)
}

export default App
