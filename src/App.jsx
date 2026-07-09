import { Suspense, lazy, useEffect } from 'react'
import { useLocation, Outlet } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import RequireAuth from './admin/RequireAuth.jsx'

// Public pages are imported STATICALLY (not via route `lazy`). With SSR, a lazy
// route makes the client show a Suspense fallback while the module loads, which
// doesn't match the fully-rendered server HTML → hydration mismatch that can
// duplicate the page. Static imports keep SSR and client render identical.
// Admin pages stay React.lazy — they're client-only (never server-rendered).
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Services from './pages/Services.jsx'
import ServiceDetail from './pages/ServiceDetail.jsx'
import ServiceLocationPage from './pages/ServiceLocationPage.jsx'
import LocationDetail from './pages/LocationDetail.jsx'
import CaseStudies from './pages/CaseStudies.jsx'
import Contact from './pages/Contact.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import NotFound from './pages/NotFound.jsx'

const AdminLayout = lazy(() => import('./admin/AdminLayout.jsx'))
const Login = lazy(() => import('./admin/Login.jsx'))
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

// Public site shell (header + footer). No Suspense needed — pages are static.
function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main id="main">
        <Outlet />
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
export const routes = [
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, Component: Home },
      { path: 'about', Component: About },
      { path: 'services', Component: Services },
      { path: 'services/:serviceSlug', Component: ServiceDetail },
      { path: 'services/:serviceSlug/:locationSlug', Component: ServiceLocationPage },
      { path: 'locations/:locationSlug', Component: LocationDetail },
      { path: 'case-studies', Component: CaseStudies },
      { path: 'contact', Component: Contact },
      { path: 'privacy', Component: Privacy },
      { path: 'terms', Component: Terms },
      { path: '*', Component: NotFound },
    ],
  },

  // Admin (no public chrome, client-only).
  { path: '/admin/login', element: adminPage(Login) },
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
