import React from 'react'
import { Link } from 'react-router-dom'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export function NotFound() {
  return (
    <div className="tech-shell flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-300/25 bg-violet-300/10 text-violet-200 shadow-sm">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h1 className="font-display text-4xl font-semibold tracking-tight text-white">404</h1>
      <p className="mt-2 text-lg font-medium text-slate-200">Page not found</p>
      <p className="mt-1 max-w-md text-sm text-slate-400">
        The requested page does not exist or is not available in the current phase.
      </p>
      <div className="mt-6 flex gap-3">
        <Link
          to="/sellers/login"
          className="inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-violet-500 to-indigo-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 hover:brightness-110"
        >
          <ArrowLeft className="h-4 w-4" />
          Go to Seller Portal
        </Link>
      </div>
    </div>
  )
}

export default NotFound
