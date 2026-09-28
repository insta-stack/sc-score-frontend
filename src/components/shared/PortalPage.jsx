import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CircleHelp, FileText, Landmark, Mail, ShieldCheck } from 'lucide-react'
import PortalLayout from '../layout/PortalLayout'

const icons = { about: Landmark, contact: Mail, privacy: ShieldCheck, terms: FileText, support: CircleHelp }
const copy = {
  about: ['Built for decision-ready trust', 'SC·Score helps participants interpret credibility signals with the clarity and restraint required by modern supply chains.'],
  contact: ['Contact the SC·Score team', 'For account, integration, or product questions, use your registered support channel. We will respond through the verified contact details on your account.'],
  privacy: ['Privacy, handled with care', 'SC·Score uses account and operational data only to provide the credibility services you request. Detailed privacy terms are made available through your organization’s agreement.'],
  terms: ['Service terms', 'Use of SC·Score is subject to your organization’s applicable service agreement and authorized access policies.'],
  support: ['Research support', 'Need help interpreting a score, updating a record, or accessing your workspace? Our support team can help through your verified account channel.'],
}

export function PublicPortalPage({ portal, page = 'about' }) {
  const [title, description] = copy[page] || copy.about
  const Icon = icons[page] || Landmark
  return <PortalLayout portal={portal}><section className="mx-auto flex min-h-[62vh] max-w-7xl items-center px-5 py-16 lg:px-6"><div className="tech-surface max-w-3xl rounded-2xl p-7 sm:p-10"><span className="flex h-11 w-11 items-center justify-center rounded-xl border border-violet-300/25 bg-violet-300/10 text-violet-200"><Icon className="h-5 w-5" /></span><p className="tech-label mt-8">SC·Score / {portal}</p><h1 className="font-display mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1><p className="mt-4 max-w-2xl text-base leading-7 text-slate-400">{description}</p><Link to={`/${portal}/login`} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-white">Return to portal <ArrowRight className="h-4 w-4" /></Link></div></section></PortalLayout>
}

export function PortalHome({ portal }) {
  const labels = { consumer: 'Consumer', sellers: 'Seller', platforms: 'Platform' }
  return <PortalLayout portal={portal}><section className="mx-auto grid min-h-[68vh] max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-[1.1fr_.9fr] lg:px-6"><div><p className="tech-label">SC·Score / {labels[portal]}</p><h1 className="font-display mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">Credibility intelligence, built for accountable decisions.</h1><p className="mt-5 max-w-xl text-base leading-7 text-slate-400">A focused workspace for verified signals, confidence-aware decisions, and meaningful operational context.</p><Link to={`/${portal}/login`} className="mt-8 inline-flex items-center gap-2 rounded-lg bg-linear-to-r from-violet-500 to-indigo-700 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-950/30 hover:brightness-110">Enter {labels[portal]} portal <ArrowRight className="h-4 w-4" /></Link></div><div className="tech-surface metric-glow rounded-2xl p-6 sm:p-8"><p className="tech-label">Signal status</p><div className="mt-6 flex items-end gap-3"><span className="font-mono text-6xl font-semibold tracking-tighter text-violet-200">01</span><span className="mb-2 text-sm text-slate-400">verified workspace</span></div><div className="mt-7 grid grid-cols-2 gap-3"><div className="tech-panel rounded-lg p-4"><p className="tech-label">Security</p><p className="mt-2 text-sm font-medium text-slate-200">Role-scoped</p></div><div className="tech-panel rounded-lg p-4"><p className="tech-label">Context</p><p className="mt-2 text-sm font-medium text-slate-200">Decision-ready</p></div></div></div></section></PortalLayout>
}

export function WorkspacePlaceholder({ portal, title, description }) {
  return <PortalLayout portal={portal}><section className="mx-auto max-w-7xl px-5 py-10 lg:px-6"><p className="tech-label">{portal} / workspace</p><h1 className="font-display mt-2 text-3xl font-semibold text-white">{title}</h1><div className="tech-surface mt-7 rounded-xl p-8 text-center"><CircleHelp className="mx-auto h-6 w-6 text-violet-200" /><h2 className="mt-4 text-base font-semibold text-slate-100">No workspace data is available yet</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">{description}</p></div></section></PortalLayout>
}
