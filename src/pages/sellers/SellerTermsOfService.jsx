import React from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'

export default function SellerTermsOfService() {
  return (
    <div className="relative min-h-screen bg-surface-container-lowest text-on-surface font-body-md overflow-x-hidden selection:bg-secondary/30 selection:text-white">
      {/* Existing App Reusable Navbar */}
      <Navbar portal="sellers" />

      {/* Main Content Area */}
      <main className="relative pt-12 md:pt-16">
        {/* Hero Section */}
        <section className="relative px-container-padding pt-16 md:pt-20 pb-24 md:pb-32 overflow-hidden">
          {/* Atmospheric Background */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-secondary/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 blur-[100px] rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-glass-border bg-glass-fill mb-8">
              <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" aria-hidden="true" />
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-[0.15em]">
                Compliance Protocol v2.4
              </span>
            </div>

            <h1 className="font-h1 text-h1-mobile md:text-h1 text-primary mb-4 font-bold tracking-tight">
              Terms of Service
            </h1>
            <h2 className="font-h2 text-3xl md:text-h2 text-on-surface-variant mb-12 font-semibold">
              For Sellers
            </h2>

            <div className="flex justify-center items-center gap-8 text-on-surface-variant border-y border-glass-border py-6">
              <div className="text-left">
                <p className="font-label-caps text-label-caps uppercase text-secondary mb-1">Effective Date</p>
                <p className="font-data-mono text-data-mono">Dec 01, 2025</p>
              </div>
              <div className="h-10 w-[1px] bg-glass-border" aria-hidden="true" />
              <div className="text-left">
                <p className="font-label-caps text-label-caps uppercase text-secondary mb-1">Entity</p>
                <p className="font-data-mono text-data-mono text-white">SHOPPERS_CREDIBILITY_NODE_IN</p>
              </div>
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="px-container-padding pb-section-gap relative">
          <div className="max-w-4xl mx-auto space-y-gutter">
            {/* Last Updated Versioning Marker */}
            <div className="glass-panel p-8 rounded-xl glow-violet mb-12 flex items-center justify-between">
              <div>
                <h3 className="font-label-caps text-label-caps text-secondary mb-2 tracking-[0.15em]">
                  DOCUMENT STATUS
                </h3>
                <p className="font-body-md text-on-surface">Last updated: December 2025</p>
              </div>
              <div className="hidden md:block">
                <span
                  className="material-symbols-outlined text-primary text-4xl"
                  role="img"
                  aria-label="Verified Document Status"
                  style={{ fontVariationSettings: "'FILL' 0" }}
                >
                  verified_user
                </span>
              </div>
            </div>

            {/* Section 1 */}
            <div className="group border-l-2 border-glass-border hover:border-secondary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-[10px] pl-8 py-4">
              <h3 className="font-h3 text-2xl md:text-h3 text-primary mb-4 flex items-center gap-3">
                <span className="font-data-mono text-lg text-secondary opacity-50">01</span>
                Acceptance of Terms
              </h3>
              <div className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant leading-relaxed">
                By registering as a Seller on <span className="text-secondary font-semibold">SC Score</span>, you agree to these Terms of Service. If you do not agree, please do not use our services. Your continued interaction with the protocol constitutes binding acceptance of all parameters defined herein.
              </div>
            </div>

            {/* Section 2 */}
            <div className="group border-l-2 border-glass-border hover:border-secondary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-[10px] pl-8 py-4">
              <h3 className="font-h3 text-2xl md:text-h3 text-primary mb-4 flex items-center gap-3">
                <span className="font-data-mono text-lg text-secondary opacity-50">02</span>
                Eligibility
              </h3>
              <div className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant leading-relaxed">
                To register as a seller, you must be a legitimate business with a valid <span className="font-data-mono text-primary">GSTIN</span> registered in India. You must be authorized to enter into agreements on behalf of your business and maintain legal standing within your jurisdiction.
              </div>
            </div>

            {/* Section 3 - Requirements */}
            <div className="glass-panel p-6 sm:p-10 rounded-2xl glow-violet">
              <h3 className="font-h3 text-2xl md:text-h3 text-primary mb-8 flex items-center gap-3">
                <span className="font-data-mono text-lg text-secondary opacity-50">03</span>
                Your Obligations
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-secondary pt-1 shrink-0" aria-hidden="true">
                    check_circle
                  </span>
                  <span className="font-body-md text-on-surface-variant">
                    Provide accurate and current GSTIN and business information for node verification.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-secondary pt-1 shrink-0" aria-hidden="true">
                    check_circle
                  </span>
                  <span className="font-body-md text-on-surface-variant">
                    Maintain the security of your account credentials and multi-factor authentication.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-secondary pt-1 shrink-0" aria-hidden="true">
                    check_circle
                  </span>
                  <span className="font-body-md text-on-surface-variant">
                    Conduct business ethically and comply with all applicable local and international laws.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-secondary pt-1 shrink-0" aria-hidden="true">
                    check_circle
                  </span>
                  <span className="font-body-md text-on-surface-variant">
                    Not sell counterfeit, prohibited, or illegal products through any protocol-enabled channel.
                  </span>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="material-symbols-outlined text-secondary pt-1 shrink-0" aria-hidden="true">
                    check_circle
                  </span>
                  <span className="font-body-md text-on-surface-variant">
                    Fulfill orders accurately and promptly to maintain the trust-integrity index.
                  </span>
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="group border-l-2 border-glass-border hover:border-secondary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-[10px] pl-8 py-4">
              <h3 className="font-h3 text-2xl md:text-h3 text-primary mb-4 flex items-center gap-3">
                <span className="font-data-mono text-lg text-secondary opacity-50">04</span>
                Seller Credibility Score
              </h3>
              <div className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant leading-relaxed">
                Your <span className="text-secondary uppercase">SC Score</span> is calculated based on decentralized data from partner platforms including fulfillment rate, product quality, and customer complaints. The score is updated periodically via our <span className="italic">Trust Engine</span> and may affect your visibility on partner platforms.
              </div>
            </div>

            {/* Section 5 */}
            <div className="group border-l-2 border-glass-border hover:border-secondary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-[10px] pl-8 py-4">
              <h3 className="font-h3 text-2xl md:text-h3 text-primary mb-4 flex items-center gap-3">
                <span className="font-data-mono text-lg text-secondary opacity-50">05</span>
                Score Disputes
              </h3>
              <div className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant leading-relaxed">
                If you believe your score is incorrect, you may submit a dispute through your <span className="font-data-mono text-primary text-sm bg-surface-container px-2 py-0.5 rounded">TRUST_DASHBOARD</span>. We will review the dispute within 5 business days. Our decision on score calculations, generated by our algorithmic auditor, is final.
              </div>
            </div>

            {/* Section 6 */}
            <div className="group border-l-2 border-glass-border hover:border-secondary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-[10px] pl-8 py-4">
              <h3 className="font-h3 text-2xl md:text-h3 text-error mb-4 flex items-center gap-3">
                <span className="font-data-mono text-lg text-error opacity-50">06</span>
                Account Suspension
              </h3>
              <div className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant leading-relaxed">
                We may suspend or terminate your account if you violate these terms, engage in fraudulent activity, or if your score drops significantly due to repeated counterfeit or quality complaints. Re-instatement requires a complete audit of business practices.
              </div>
            </div>

            {/* Section 7 */}
            <div className="group border-l-2 border-glass-border hover:border-secondary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-[10px] pl-8 py-4">
              <h3 className="font-h3 text-2xl md:text-h3 text-primary mb-4 flex items-center gap-3">
                <span className="font-data-mono text-lg text-secondary opacity-50">07</span>
                Limitation of Liability
              </h3>
              <div className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant leading-relaxed">
                SC Score provides scoring services 'as-is'. We are not liable for any business losses resulting from your score or visibility on partner platforms. Our liability is strictly limited to direct damages not exceeding <span className="text-primary font-semibold">INR 10,000</span>.
              </div>
            </div>

            {/* Section 8 */}
            <div className="group border-l-2 border-glass-border hover:border-secondary transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-[10px] pl-8 py-4">
              <h3 className="font-h3 text-2xl md:text-h3 text-primary mb-4 flex items-center gap-3">
                <span className="font-data-mono text-lg text-secondary opacity-50">08</span>
                Governing Law
              </h3>
              <div className="font-body-lg text-body-md md:text-body-lg text-on-surface-variant leading-relaxed">
                These terms are governed by the laws of India. Any disputes shall be resolved through binding arbitration in <span className="text-white">Jaipur, Rajasthan</span>, conducted in English.
              </div>
            </div>

            {/* Section 9 - Contact Card */}
            <div className="mt-20 glass-panel p-8 sm:p-12 rounded-3xl glow-violet text-center">
              <h3 className="font-h2 text-2xl sm:text-h3 text-primary mb-6 font-semibold">
                Contact Shoppers Credibility
              </h3>
              <p className="font-body-lg text-body-md sm:text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
                Reach out to our compliance department for clarifications or technical inquiries.
              </p>
              <address className="not-italic flex flex-col md:flex-row justify-center gap-6 md:gap-8 items-center">
                <a
                  className="flex items-center gap-3 text-secondary hover:text-white transition-colors"
                  href="mailto:info@scscore.in"
                  aria-label="Send email to info@scscore.in"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    mail
                  </span>
                  <span className="font-data-mono text-data-mono">info@scscore.in</span>
                </a>
                <div className="hidden md:block w-[1px] h-6 bg-glass-border" aria-hidden="true" />
                <a
                  className="flex items-center gap-3 text-secondary hover:text-white transition-colors"
                  href="tel:+911413520329"
                  aria-label="Call +91 141 3520329"
                >
                  <span className="material-symbols-outlined" aria-hidden="true">
                    call
                  </span>
                  <span className="font-data-mono text-data-mono">+91 141 3520329</span>
                </a>
              </address>
            </div>
          </div>
        </section>
      </main>

      {/* Existing App Reusable Footer with preserved copyright line */}
      <Footer
        portal="sellers"
        copyright="© 2024 SHOPPERS CREDIBILITY. ALL RIGHTS RESERVED. TRUST ENFORCED BY CODE."
      />

      {/* Atmospheric Background Glows & Radial Dot Matrix */}
      <div className="fixed inset-0 pointer-events-none -z-20 overflow-hidden" aria-hidden="true">
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(#d2bbff 0.5px, transparent 0.5px)',
            backgroundSize: '32px 32px',
          }}
        />
        {/* Large Abstract Glows */}
        <div className="absolute top-[10%] right-[-10%] w-[500px] h-[500px] bg-secondary-container/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[20%] left-[-5%] w-[400px] h-[400px] bg-primary-container/10 blur-[130px] rounded-full" />
      </div>
    </div>
  )
}
