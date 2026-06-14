import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, useLocation, Outlet } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import RequireAuth from './admin/RequireAuth.jsx'

// Lazy-load route components for code splitting / faster first load.
const Home = lazy(() => import('./pages/Home.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail.jsx'))
const ServiceLocationPage = lazy(() => import('./pages/ServiceLocationPage.jsx'))
const LocationDetail = lazy(() => import('./pages/LocationDetail.jsx'))
const CaseStudies = lazy(() => import('./pages/CaseStudies.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))
const Terms = lazy(() => import('./pages/Terms.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

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

// Public site shell (header + footer).
function PublicLayout() {
  return (
    <>
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

export default function App() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <Routes>
        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
          <Route path="/services/:serviceSlug/:locationSlug" element={<ServiceLocationPage />} />
          <Route path="/locations/:locationSlug" element={<LocationDetail />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin (no public chrome) */}
        <Route path="/admin/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Suspense fallback={<PageLoader />}><AdminLayout /></Suspense>
            </RequireAuth>
          }
        >
          <Route index element={<Suspense fallback={<PageLoader />}><DashboardHome /></Suspense>} />
          <Route path="services" element={<Suspense fallback={<PageLoader />}><ManageServices /></Suspense>} />
          <Route path="reviews" element={<Suspense fallback={<PageLoader />}><ManageReviews /></Suspense>} />
          <Route path="service-locations" element={<Suspense fallback={<PageLoader />}><ManageServiceLocations /></Suspense>} />
          <Route path="settings" element={<Suspense fallback={<PageLoader />}><ManageSettings /></Suspense>} />
        </Route>
      </Routes>
    </HelmetProvider>
  )
}
