import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Toaster } from '../ui/toaster'

// portal: 'consumer' | 'sellers' | 'platforms' | 'admin'
export default function PortalLayout({ portal, children }) {
  return (
    <div className="tech-shell flex min-h-screen flex-col">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Navbar portal={portal} />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer portal={portal} />
      <Toaster />
    </div>
  )
}
