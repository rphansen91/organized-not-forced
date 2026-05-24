import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getChapter, getAdjacentChapters, BOOK_PURCHASE_URL } from '../lib/chapters'

export function Component() {
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug) {
    return <div className="chapter-error">Chapter not found</div>
  }
  
  const chapter = getChapter(slug)
  const { prev, next } = getAdjacentChapters(slug)
  
  if (!chapter) {
    return (
      <div className="chapter-error">
        <h1>Chapter Not Found</h1>
        <p>The chapter "{slug}" doesn't exist.</p>
        <Link to="/read">← Back to Book Index</Link>
      </div>
    )
  }

  return (
    <article className="chapter-teaser">
      <header className="chapter-header">
        <Link to="/read" className="back-link">← All Chapters</Link>
        <span className="chapter-label">
          {chapter.number === 0 ? 'Prologue' : `Chapter ${chapter.number}`}
        </span>
        <h1 className="chapter-title">{chapter.title}</h1>
      </header>

      {/* Teaser content */}
      <div className="chapter-content prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {chapter.teaser}
        </ReactMarkdown>
      </div>

      {/* CTA */}
      <div className="chapter-fadeout">
        <div className="fadeout-gradient" />
        <div className="continue-reading">
          <p className="continue-text">Continue reading in the full book...</p>
          <a href={BOOK_PURCHASE_URL} className="cta-button large">
            Get the Full Book →
          </a>
        </div>
      </div>

      {/* Chapter navigation */}
      <nav className="chapter-nav">
        {prev ? (
          <Link to={`/read/${prev.slug}`} className="nav-prev">
            <span className="nav-label">← Previous</span>
            <span className="nav-title">{prev.title}</span>
          </Link>
        ) : (
          <span className="nav-placeholder" />
        )}
        
        <Link to="/read" className="nav-center">
          All Chapters
        </Link>
        
        {next ? (
          <Link to={`/read/${next.slug}`} className="nav-next">
            <span className="nav-label">Next →</span>
            <span className="nav-title">{next.title}</span>
          </Link>
        ) : (
          <span className="nav-placeholder" />
        )}
      </nav>
    </article>
  )
}
