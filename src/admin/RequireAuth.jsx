import { Navigate, useLocation } from 'react-router-dom'
import { isAuthenticated } from './auth.js'

// Client-side guard for the demo. NOTE: real protection must happen on the
// server — a determined user can edit client state. This only gates the UI.
export default function RequireAuth({ children }) {
  const location = useLocation()
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />
  }
  return children
}
