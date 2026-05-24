export interface Chapter {
  slug: string
  number: number
  title: string
  teaser: string      // First 2-3 paragraphs for teaser page
  excerpt: string     // Short excerpt for cards
  imageUrl: string    // Chapter opener image
}

// Import all chapter markdown files at build time
// Path from packages/landing/src/lib/ -> ../../../../chapters/
const chapterModules = import.meta.glob<string>(
  '../../../../chapters/*.md',
  { eager: true, query: '?raw', import: 'default' }
)

// Parse chapter number from filename (e.g., "00-prologue.md" -> 0)
function parseChapterNumber(filename: string): number {
  const match = filename.match(/(\d+)-/)
  return match ? parseInt(match[1], 10) : 0
}

// Extract title from markdown (first H1)
function extractTitle(content: string): string {
  const match = content.match(/^#\s+(.+)$/m)
  return match ? match[1].trim() : 'Untitled'
}

// Extract teaser (first 2-3 paragraphs after title, stopping at first ---)
function extractTeaser(content: string): string {
  // Remove the title line
  const withoutTitle = content.replace(/^#\s+.+$/m, '').trim()
  
  // Split by horizontal rule (---) and take first section
  const beforeHr = withoutTitle.split(/\n---\n/)[0].trim()
  
  // Get first 3 paragraphs
  const paragraphs = beforeHr.split(/\n\n/).slice(0, 3)
  
  return paragraphs.join('\n\n')
}

// Extract short excerpt for cards
function extractExcerpt(content: string, maxLength = 150): string {
  // Remove the title line
  const withoutTitle = content.replace(/^#\s+.+$/m, '').trim()
  // Get first paragraph (text before double newline)
  const firstPara = withoutTitle.split(/\n\n/)[0].trim()
  // Clean up markdown formatting
  const cleaned = firstPara
    .replace(/\*\*(.+?)\*\*/g, '$1')  // Remove bold
    .replace(/\*(.+?)\*/g, '$1')      // Remove italic
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links
  
  if (cleaned.length <= maxLength) return cleaned
  return cleaned.slice(0, maxLength).trim() + '...'
}

// Get chapter opener image URL
function getChapterImageUrl(chapterNumber: number): string {
  return `/chapter-openers/chapter-${chapterNumber}-opener.png`
}

// Parse all chapters
function parseChapters(): Chapter[] {
  const chapters: Chapter[] = []
  
  for (const [path, content] of Object.entries(chapterModules)) {
    const match = path.match(/chapters\/(.+)\.md$/)
    if (!match) continue
    
    const slug = match[1]
    const number = parseChapterNumber(slug)
    const title = extractTitle(content)
    const teaser = extractTeaser(content)
    const excerpt = extractExcerpt(content)
    const imageUrl = getChapterImageUrl(number)
    
    chapters.push({
      slug,
      number,
      title,
      teaser,
      excerpt,
      imageUrl,
    })
  }
  
  // Sort by chapter number
  return chapters.sort((a, b) => a.number - b.number)
}

// Memoized chapters list
let _chapters: Chapter[] | null = null

export function getChapters(): Chapter[] {
  if (!_chapters) {
    _chapters = parseChapters()
  }
  return _chapters
}

export function getChapter(slug: string): Chapter | undefined {
  return getChapters().find(ch => ch.slug === slug)
}

export function getAdjacentChapters(slug: string): { prev?: Chapter; next?: Chapter } {
  const chapters = getChapters()
  const index = chapters.findIndex(ch => ch.slug === slug)
  
  return {
    prev: index > 0 ? chapters[index - 1] : undefined,
    next: index < chapters.length - 1 ? chapters[index + 1] : undefined,
  }
}

// Link to GitHub Release with EPUB/PDF downloads
export const BOOK_PURCHASE_URL = 'https://github.com/rphansen91/organized-not-forced/releases/tag/v1.0.0'
