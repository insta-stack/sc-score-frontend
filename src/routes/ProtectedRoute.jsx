import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ allowedRoles = [], loginPath = '/sellers/login', children }) {
  const { isAuthenticated, role, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="tech-shell flex min-h-screen items-center justify-center" role="status" aria-label="Checking secure session">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-violet-200 border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated || (allowedRoles.length > 0 && !allowedRoles.includes(role))) {
    return <Navigate to={loginPath} state={{ from: location }} replace />
  }

  return children
}

export default ProtectedRoute
