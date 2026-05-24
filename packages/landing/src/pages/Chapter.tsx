import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getChapter, getAdjacentChapters } from '../lib/chapters'

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
    <article className="chapter">
      <header className="chapter-header">
        <Link to="/read" className="back-link">← Book Index</Link>
        <span className="chapter-number">
          {chapter.number === 0 ? 'Prologue' : `Chapter ${chapter.number}`}
        </span>
      </header>

      <div className="chapter-content prose">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {chapter.content}
        </ReactMarkdown>
      </div>

      <nav className="chapter-nav">
        {prev ? (
          <Link to={`/read/${prev.slug}`} className="nav-prev">
            <span className="nav-label">Previous</span>
            <span className="nav-title">{prev.title}</span>
          </Link>
        ) : (
          <span className="nav-placeholder" />
        )}
        
        {next ? (
          <Link to={`/read/${next.slug}`} className="nav-next">
            <span className="nav-label">Next</span>
            <span className="nav-title">{next.title}</span>
          </Link>
        ) : (
          <span className="nav-placeholder" />
        )}
      </nav>
    </article>
  )
}
