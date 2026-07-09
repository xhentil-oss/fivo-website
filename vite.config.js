import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Client build:  vite build --outDir dist/client
// Server build:  vite build --ssr src/entry-server.jsx --outDir dist/server
export default defineConfig(({ command, isSsrBuild }) => {
  // Force production for builds regardless of the shell's NODE_ENV (some hosts,
  // e.g. cPanel/CloudLinux venvs, set NODE_ENV=development, which makes
  // @vitejs/plugin-react emit the dev JSX runtime → "jsxDEV is not a function"
  // when the SSR bundle runs in Node).
  if (command === 'build') process.env.NODE_ENV = 'production'
  return {
    plugins: [react()],
  // Bundle CommonJS-only deps into the SSR build so Node ESM can load them
  // (react-helmet-async has no proper ESM named exports).
  ssr: {
    noExternal: ['react-helmet-async'],
  },
  build: {
    rollupOptions: {
      // Manual vendor chunk for the client only. In the SSR build React is
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
  }
})
