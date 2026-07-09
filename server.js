// Express server: serves the API (/api) and server-renders the React app,
// reading content live from MariaDB (or seed fallback). Dev uses Vite in
// middleware mode; production serves the built client + SSR bundle.

import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import compression from 'compression'
import { createApiRouter } from './server/api.js'
import { getSnapshot } from './server/repo.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const isProd = process.env.NODE_ENV === 'production'
// Passenger (cPanel) may pass a Unix socket PATH via PORT — pass it through as-is
// rather than coercing to a number. Falls back to a numeric port elsewhere.
const PORT = process.env.PORT || 5173

// Safe JSON for embedding in a <script>: escape "<" and the JS line separators
// U+2028 / U+2029 (valid in JSON but break an inline script if left raw).
const SEP_LS = String.fromCharCode(0x2028)
const SEP_PS = String.fromCharCode(0x2029)
function serialize(data) {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .split(SEP_LS)
    .join('\\u2028')
    .split(SEP_PS)
    .join('\\u2029')
}

const app = express()
app.disable('x-powered-by')
app.use(compression())
app.use(express.json({ limit: '1mb' }))

// API first, so it isn't swallowed by the SSR catch-all.
app.use('/api', createApiRouter())

let vite
let prodTemplate
let prodRender

if (!isProd) {
  const { createServer } = await import('vite')
  vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
  app.use(vite.middlewares)
} else {
  const clientDir = path.resolve(__dirname, 'dist/client')
  prodTemplate = fs.readFileSync(path.resolve(clientDir, 'index.html'), 'utf8')
  prodRender = (await import('./dist/server/entry-server.js')).render
  // Static assets (hashed → long cache); index.html is handled by SSR below.
  app.use(express.static(clientDir, { index: false, maxAge: '1d' }))
}

// Catch-all (Express 5: a path-less middleware matches every request). Runs
// after /api and static assets, so only page requests reach SSR.
app.use(async (req, res) => {
  const url = req.originalUrl
  try {
    let template
    let render
    if (!isProd) {
      template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf8')
      template = await vite.transformIndexHtml(url, template)
      render = (await vite.ssrLoadModule('/src/entry-server.jsx')).render
    } else {
      template = prodTemplate
      render = prodRender
    }

    const snapshot = await getSnapshot()
    const result = await render(url, snapshot)

    if (result.redirect) return res.redirect(result.status || 302, result.redirect)

    const contentScript = `<script>window.__CONTENT__=${serialize(snapshot)}</script>`
    const html = template
      .replace('<!--app-head-->', `${result.head}\n${contentScript}`)
      .replace('<!--app-html-->', result.html)

    res.status(result.status || 200).set({ 'Content-Type': 'text/html' }).end(html)
  } catch (err) {
    vite?.ssrFixStacktrace(err)
    console.error(err)
    res.status(500).end('Internal Server Error')
  }
})

app.listen(PORT, () => {
  console.log(`Fivo server (${isProd ? 'production' : 'dev'}) → http://localhost:${PORT}`)
})
