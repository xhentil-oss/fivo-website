import { Suspense, lazy, useEffect } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import RequireAuth from './admin/RequireAuth.jsx'
import { services } from './data/services.js'
import { locations } from './data/locations.js'

// Route-level code splitting. We use the React Router data-router `lazy` form
// (`() => ({ Component })`) for public routes so the SSR server (createStaticHandler)
// can resolve and render each page. Admin routes use React.lazy (client-only).
const page = (loader) => async () => ({ Component: (await loader()).default })

const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'))
const DashboardHome = lazy(() => import('./admin/DashboardHome.jsx'))
const ManageServices = lazy(() => import('./admin/ManageServices.jsx'))
const ManageReviews = lazy(() => import('./admin/ManageReviews.jsx'))
const ManageServiceLocations = lazy(() => import('./admin/ManageServiceLocations.jsx'))
const ManageSettings = lazy(() => import('./admin/ManageSettings.jsx'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function PageLoader() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center" role="status" aria-label="Loading">
      <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-brand-100 border-t-brand-600" />
    </div>
  )
}

// Public site shell (header + footer).
function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

// Admin shell: client-side auth guard + lazy-loaded dashboard layout.
function AdminShell() {
  return (
    <RequireAuth>
      <Suspense fallback={<PageLoader />}>
        <AdminLayout />
      </Suspense>
    </RequireAuth>
  )
}
const adminPage = (Component) => (
  <Suspense fallback={<PageLoader />}><Component /></Suspense>
)

// Route tree as a data-router array (used by entry-client.jsx + entry-server.jsx).
// `getStaticPaths` enumerates the concrete URLs to pre-render for each dynamic
// route. Paths are relative to the parent ('/') prefix.
export const routes = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, lazy: page(() => import('./pages/Home.jsx')) },
      { path: 'about', lazy: page(() => import('./pages/About.jsx')) },
      { path: 'services', lazy: page(() => import('./pages/Services.jsx')) },
      {
        path: 'services/:serviceSlug',
        lazy: page(() => import('./pages/ServiceDetail.jsx')),
        getStaticPaths: () => services.map((s) => `services/${s.slug}`),
      },
      {
        path: 'services/:serviceSlug/:locationSlug',
        lazy: page(() => import('./pages/ServiceLocationPage.jsx')),
        getStaticPaths: () =>
          services.flatMap((s) => locations.map((l) => `services/${s.slug}/${l.slug}`)),
      },
      {
        path: 'locations/:locationSlug',
        lazy: page(() => import('./pages/LocationDetail.jsx')),
        getStaticPaths: () => locations.map((l) => `locations/${l.slug}`),
      },
      { path: 'case-studies', lazy: page(() => import('./pages/CaseStudies.jsx')) },
      { path: 'contact', lazy: page(() => import('./pages/Contact.jsx')) },
      { path: 'privacy', lazy: page(() => import('./pages/Privacy.jsx')) },
      { path: 'terms', lazy: page(() => import('./pages/Terms.jsx')) },
      { path: '*', lazy: page(() => import('./pages/NotFound.jsx')) },
    ],
  },

  // Admin (no public chrome). Excluded from SSG via includedRoutes in vite.config.js.
  { path: '/admin/login', lazy: page(() => import('./admin/Login.jsx')) },
  {
    path: '/admin',
    element: <AdminShell />,
    children: [
      { index: true, element: adminPage(DashboardHome) },
      { path: 'services', element: adminPage(ManageServices) },
      { path: 'reviews', element: adminPage(ManageReviews) },
      { path: 'service-locations', element: adminPage(ManageServiceLocations) },
      { path: 'settings', element: adminPage(ManageSettings) },
    ],
  },
]

export default routes
