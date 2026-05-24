import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes.js'
import './styles/global.css'

export const createRoot = ViteReactSSG({ routes })
