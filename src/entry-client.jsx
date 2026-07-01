import { StrictMode } from 'react'
import { hydrateRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { routes } from './App.jsx'
import './index.css'

// Hydrate the server-rendered markup. Route content came from window.__CONTENT__
// (read by utils/store.js); router hydration data was serialized by the server.
const router = createBrowserRouter(routes, {
  hydrationData: window.__staticRouterHydrationData,
})

hydrateRoot(
  document.getElementById('root'),
  <StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </StrictMode>,
)
