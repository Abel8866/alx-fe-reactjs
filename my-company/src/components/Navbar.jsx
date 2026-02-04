import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header>
      <nav aria-label="Primary">
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0, margin: '1rem 0' }}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
