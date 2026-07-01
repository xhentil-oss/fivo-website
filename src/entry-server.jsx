import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { routes } from './App.jsx'
import { __setSnapshot } from './utils/store.js'

// Render a URL to HTML for SSR. `snapshot` is the site content (from MariaDB or
// seed) that utils/store.js reads synchronously during render.
export async function render(url, snapshot) {
  // `dataRoutes` has lazy routes resolved/patched by the handler — use it (not
  // the original `routes`) for createStaticRouter, or nothing renders.
  const { query, dataRoutes } = createStaticHandler(routes)
  const request = new Request(`http://ssr.local${url}`, { method: 'GET' })

  // Resolves lazy routes + any loaders (async). Do this BEFORE setting the
  // snapshot so nothing awaits between set and the synchronous render.
  const context = await query(request)

  // A Response here means a redirect (e.g. <Navigate>) or an error response.
  if (context instanceof Response) {
    return { redirect: context.headers.get('Location') || '/', status: context.status }
  }

  const router = createStaticRouter(dataRoutes, context)
  const helmetContext = {}

  __setSnapshot(snapshot)
  let html
  try {
    html = renderToString(
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouterProvider router={router} context={context} />
        </HelmetProvider>
      </StrictMode>,
    )
  } finally {
    __setSnapshot(null)
  }

  const { helmet } = helmetContext
  const head = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ].join('')
    : ''

  return { html, head, status: context.statusCode || 200 }
}
