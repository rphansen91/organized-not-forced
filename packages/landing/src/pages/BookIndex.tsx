import { Link } from 'react-router-dom'
import { getChapters, BOOK_PURCHASE_URL } from '../lib/chapters'

export function Component() {
  const chapters = getChapters()

  return (
    <div className="book-index">
      <header className="book-header">
        <h1>Organized, Not Forced</h1>
        <p className="book-subtitle">
          A year-long journey to master five calisthenics skills through understanding how the body organizes force.
        </p>
        <a href={BOOK_PURCHASE_URL} className="cta-button book-cta">
          Get the Full Book →
        </a>
      </header>

      <nav className="chapter-grid">
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
            <p className="chapter-teaser">{chapter.teaser}</p>
          </Link>
        ))}
      </nav>

      <footer className="book-footer">
        <p>Preview each chapter, then get the full book.</p>
        <a href={BOOK_PURCHASE_URL} className="cta-button">
          Get the Full Book →
        </a>
      </footer>
    </div>
  )
}
