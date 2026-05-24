import { Link } from 'react-router-dom'
import { getChapters } from '../lib/chapters'

export function Component() {
  const chapters = getChapters()

  return (
    <div className="book-index">
      <header className="book-header">
        <h1>Organized, Not Forced</h1>
        <p className="book-subtitle">
          A year-long journey to master five calisthenics skills through understanding how the body organizes force.
        </p>
      </header>

      <nav className="chapter-list">
        {chapters.map((chapter) => (
          <Link 
            key={chapter.slug} 
            to={`/read/${chapter.slug}`}
            className="chapter-card"
          >
            <span className="chapter-number">
              {chapter.number === 0 ? 'Prologue' : `Chapter ${chapter.number}`}
            </span>
            <h2 className="chapter-title">{chapter.title}</h2>
            <p className="chapter-excerpt">{chapter.excerpt}</p>
          </Link>
        ))}
      </nav>
    </div>
  )
}
