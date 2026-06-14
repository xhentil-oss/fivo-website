import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Manual chunking keeps the client bundle small and supports good
      // Lighthouse scores. Skipped for the SSR build, where React is
      // externalized and cannot be placed in a manual chunk.
      output: isSsrBuild
        ? {}
        : {
            manualChunks: {
              react: ['react', 'react-dom', 'react-router-dom'],
            },
          },
    },
  },
  // vite-react-ssg options.
  ssgOptions: {
    entry: 'src/main.jsx',
    // Emit /about/index.html (not /about.html) so clean URLs resolve on any
    // static host and play well with the SPA fallback rewrite in vercel.json.
    dirStyle: 'nested',
    script: 'async',
    // Decide which routes get pre-rendered to static HTML. We drop:
    //  - the raw dynamic templates (still containing ":") — only the concrete
    //    URLs from getStaticPaths should render,
    //  - the "*" catch-all,
    //  - the /admin area (client-only, gated by demo auth, noindex).
    includedRoutes(paths) {
      return paths.filter(
        (p) => !p.includes(':') && !p.includes('*') && !p.startsWith('/admin'),
      )
    },
  },
}))
