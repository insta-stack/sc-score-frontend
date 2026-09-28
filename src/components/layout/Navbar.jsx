import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, ShieldCheck, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const labels = { consumer: 'Consumer', sellers: 'Seller', platforms: 'Platform', admin: 'Admin' }

export default function Navbar({ portal }) {
  const { isAuthenticated, user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const base = `/${portal}`
  const active = (path) => location.pathname === path
  const close = () => setOpen(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${scrolled ? 'border-white/15 bg-[#101415]/95 shadow-lg shadow-black/40' : 'border-white/10 bg-[#101415]/80'} backdrop-blur-xl`}><div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-5 lg:px-6"><Link to={isAuthenticated ? `${base}/dashboard` : base} className="flex items-center gap-2 text-sm font-bold tracking-tight text-white" onClick={close}><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-violet-300 to-indigo-700 text-[#25005a]"><ShieldCheck className="h-4 w-4" aria-hidden="true" /></span>SC·SCORE <span className="hidden text-violet-200 sm:inline">/ {labels[portal]}</span></Link><button className="rounded-lg p-2 text-slate-300 hover:bg-white/8 md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="portal-navigation" aria-label="Toggle navigation">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button><nav id="portal-navigation" className={`${open ? 'flex' : 'hidden'} absolute inset-x-0 top-full flex-col gap-1 border-b border-white/10 bg-[#101415] p-4 md:static md:flex md:flex-row md:items-center md:border-0 md:bg-transparent md:p-0`} aria-label={`${labels[portal]} navigation`}>{isAuthenticated ? <><Link to={`${base}/dashboard`} onClick={close} className={`rounded-md px-3 py-2 text-sm ${active(`${base}/dashboard`) ? 'bg-violet-300/12 text-violet-200' : 'text-slate-300 hover:bg-white/8 hover:text-white'}`}>Dashboard</Link>{portal !== 'admin' && <Link to={`${base}/profile`} onClick={close} className={`rounded-md px-3 py-2 text-sm ${active(`${base}/profile`) ? 'bg-violet-300/12 text-violet-200' : 'text-slate-300 hover:bg-white/8 hover:text-white'}`}>Profile</Link>}<span className="hidden border-l border-white/10 pl-3 text-xs text-slate-400 lg:inline">{user?.name || labels[portal]}</span><button onClick={() => { logout(); close() }} className="rounded-lg border border-white/14 px-3 py-2 text-left text-sm font-medium text-slate-200 hover:border-violet-300/45 hover:bg-white/7">Sign out</button></> : <><Link to={`${base}/login`} onClick={close} className="rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-white/8 hover:text-white">Sign in</Link>{portal !== 'admin' && <Link to={`${base}/signup`} onClick={close} className="rounded-lg bg-linear-to-r from-violet-500 to-indigo-700 px-3 py-2 text-center text-sm font-semibold text-white hover:brightness-110">Create account</Link>}</>}</nav></div></header>
}
