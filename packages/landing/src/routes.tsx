import type { RouteRecord } from 'vite-react-ssg'
import { Layout } from './components/Layout'

// Get all chapter slugs for static path generation
// Path from packages/landing/src/ -> ../../../chapters/
const chapterFiles = import.meta.glob('../../../chapters/*.md', { eager: true, query: '?raw', import: 'default' })

const chapterSlugs = Object.keys(chapterFiles).map(path => {
  const match = path.match(/chapters\/(.+)\.md$/)
  return match ? match[1] : ''
}).filter(Boolean)

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () => import('./pages/Home'),
      },
      {
        path: 'read',
        lazy: () => import('./pages/BookIndex'),
      },
      {
        path: 'read/:slug',
        lazy: () => import('./pages/Chapter'),
        getStaticPaths: () => chapterSlugs.map(slug => `read/${slug}`),
      },
      {
        path: 'mantra',
        lazy: () => import('./pages/MantraCard'),
      },
      {
        path: 'flashcards',
        lazy: () => import('./pages/FlashCards'),
      },
    ],
  },
]
