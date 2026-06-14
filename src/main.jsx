import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './App.jsx'
import './index.css'

// vite-react-ssg owns the root: it pre-renders each route to static HTML at
// build time and hydrates the same tree on the client. <Head> (in SEOHead and
// the admin pages) injects per-page title/meta/JSON-LD into the static HTML.
export const createRoot = ViteReactSSG({ routes })
