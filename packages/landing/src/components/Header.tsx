import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <img src="/logo.svg" alt="Organized, Not Forced" className="logo-icon" />
          <span className="logo-text">Organized, Not Forced</span>
        </Link>
        <nav className="nav">
          <Link to="/read" className="nav-link">Read</Link>
        </nav>
      </div>
    </header>
  )
}
