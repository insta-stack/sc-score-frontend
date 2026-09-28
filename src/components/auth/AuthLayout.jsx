import React from 'react'
import { ShieldCheck } from 'lucide-react'

export function AuthLayout({
  portalRole = 'Seller',
  title = 'Sign In',

  subtitle = 'Enter your credentials to access your account',
  children,
}) {
  const roleBadges = {
    seller: { label: 'Seller Portal', color: 'border-violet-300/35 bg-violet-300/10 text-violet-200' },
    consumer: { label: 'Consumer Portal', color: 'border-blue-300/35 bg-blue-300/10 text-blue-200' },
    platform: { label: 'Platform Partner', color: 'border-indigo-300/35 bg-indigo-300/10 text-indigo-200' },
    admin: { label: 'Administration', color: 'border-amber-300/35 bg-amber-300/10 text-amber-100' },
  }

  const badge = roleBadges[portalRole.toLowerCase()] || roleBadges.seller

  return (
    <div className="tech-shell min-h-screen flex flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-3">
          <div className="flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-3 py-1.5 shadow-lg shadow-black/15">
            <ShieldCheck className="h-5 w-5 text-violet-200" />
            <span className="text-sm font-bold tracking-tight text-white">SC·Score</span>
            <span className="text-slate-600">|</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${badge.color}`}>
              {badge.label}
            </span>
          </div>
        </div>

        <h1 className="font-display text-center text-3xl font-semibold tracking-tight text-white">
          {title}
        </h1>
        <p className="mx-auto mt-2 max-w-sm text-center text-sm leading-6 text-slate-400">
          {subtitle}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        {children}
      </div>

      <div className="mt-8 text-center text-xs text-slate-500">
        &copy; {new Date().getFullYear()} SC-Score Credibility Platform. Secure SSL Verification.
      </div>
    </div>
  )
}

export default AuthLayout
