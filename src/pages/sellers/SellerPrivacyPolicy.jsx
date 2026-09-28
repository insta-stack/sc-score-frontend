import React, { useEffect, useRef } from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import SpecularButton from '../../components/shared/SpecularButton';

// FadeInSection wrapper component utilizing IntersectionObserver
function FadeInSection({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
        }
      });
    }, { threshold: 0.1 });

    const currentRef = ref.current;
    if (currentRef) {
      currentRef.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-8');
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={ref} className={`group ${className}`}>
      {children}
    </section>
  );
}

export default function SellerPrivacyPolicy() {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 50;
      const rotateY = (centerX - x) / 50;
      
      // Apply subtle rotation if viewport is large enough
      if (window.innerWidth > 1024) {
        card.style.transform = `perspective(1000px) rotateX(${rotateX * 0.2}deg) rotateY(${rotateY * 0.2}deg)`;
      } else {
        card.style.transform = 'none';
      }
    };
    
    // Applying to document to maintain identical tracking behavior as source, 
    // but cleaning it up properly on unmount
    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="font-body-md text-body-md overflow-x-hidden min-h-screen bg-surface-container-lowest text-on-surface selection:bg-secondary/30 selection:text-white">
      {/* TopNavBar (Shared Component) */}
      <Navbar portal="sellers" />

      {/* Main Content Canvas */}
      <main className="relative pt-32 pb-section-gap px-container-padding">
        {/* Background Animation Layer */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true"></div>

        {/* Page Header */}
        <header className="relative z-10 w-full max-w-4xl mx-auto mb-12 text-center md:text-left">
          <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
            <span className="font-data-mono text-data-mono text-secondary px-3 py-1 bg-secondary-container/20 border border-secondary/30 rounded-lg">SYSTEM: CONFIDENTIAL</span>
            <span className="w-12 h-[1px] bg-glass-border"></span>
            <span className="font-data-mono text-data-mono text-on-surface-variant uppercase tracking-widest">Version 2.0.4</span>
          </div>
          <h1 className="font-h1 text-h1 text-primary mb-2">Privacy Policy</h1>
          <h6 className="font-h3 text-xl md:text-2xl text-on-surface-variant opacity-80">How we protect your e-commerce data and safeguard our platform</h6>
          <div className="mt-6 font-data-mono text-data-mono text-primary-fixed-dim">
            LAST UPDATED: DECEMBER 2025
          </div>
        </header>

        {/* Main Content Card */}
        <article ref={cardRef} className="relative z-10 w-full max-w-4xl mx-auto glass-card rounded-[32px] p-8 md:p-12 overflow-hidden transition-transform duration-200 ease-out">
          {/* Subtle Watermark */}
          <div className="absolute top-10 right-10 opacity-5 pointer-events-none" aria-hidden="true">
            <span className="material-symbols-outlined text-[200px]" data-icon="security" style={{ fontVariationSettings: "'FILL' 0" }}>security</span>
          </div>
          
          <div className="flex flex-col gap-12">
            {/* Section 01 */}
            <FadeInSection>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-data-mono text-h3 text-secondary">01</span>
                <h2 className="font-h2 text-[32px] text-on-surface group-hover:text-primary transition-colors">Introduction</h2>
              </div>
              <div className="text-on-surface-variant leading-relaxed">
                <p className="mb-4">This Privacy Policy governs the manner in which Nexus Insight collects, uses, maintains, and discloses information collected from users. Our focus is on the <span className="text-primary font-medium">SC Score (Shopper Credibility Score OPC Private Limited)</span>, a proprietary trust mechanism designed to verify and authenticate transactional integrity within decentralized e-commerce environments.</p>
              </div>
            </FadeInSection>
            <div className="technical-line" aria-hidden="true"></div>

            {/* Section 02 */}
            <FadeInSection>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-data-mono text-h3 text-secondary">02</span>
                <h2 className="font-h2 text-[32px] text-on-surface group-hover:text-primary transition-colors">Data Collection</h2>
              </div>
              <ul className="space-y-4">
                <li className="flex gap-4 items-start">
                  <span className="mt-2 w-2 h-2 rounded-full bg-secondary glowing-dot shrink-0" aria-hidden="true"></span>
                  <div>
                    <span className="font-label-caps text-label-caps text-primary block mb-1">Entity Details</span>
                    <p className="text-on-surface-variant">Business registration details, corporate identifiers, and contact information for verification.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="mt-2 w-2 h-2 rounded-full bg-secondary glowing-dot shrink-0" aria-hidden="true"></span>
                  <div>
                    <span className="font-label-caps text-label-caps text-primary block mb-1">Technical Logs</span>
                    <p className="text-on-surface-variant">API transaction logs, CSV order data ingestion, and billing telemetry metadata.</p>
                  </div>
                </li>
              </ul>
            </FadeInSection>
            <div className="technical-line" aria-hidden="true"></div>

            {/* Section 03 */}
            <FadeInSection>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-data-mono text-h3 text-secondary">03</span>
                <h2 className="font-h2 text-[32px] text-on-surface group-hover:text-primary transition-colors">Data Usage</h2>
              </div>
              <p className="text-on-surface-variant mb-6">Our processing activities are strictly limited to the following core protocol functions:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-container-high border border-glass-border">
                  <span className="font-label-caps text-label-caps text-secondary">Service API</span>
                  <p className="text-body-md text-on-surface-variant mt-2">Powering real-time trust verification services.</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-high border border-glass-border">
                  <span className="font-label-caps text-label-caps text-secondary">Score Calculation</span>
                  <p className="text-body-md text-on-surface-variant mt-2">Applying proprietary algorithms for SC Score derivation.</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-high border border-glass-border">
                  <span className="font-label-caps text-label-caps text-secondary">Fraud Detection</span>
                  <p className="text-body-md text-on-surface-variant mt-2">Identifying anomalous patterns to protect the marketplace.</p>
                </div>
                <div className="p-4 rounded-xl bg-surface-container-high border border-glass-border">
                  <span className="font-label-caps text-label-caps text-secondary">Refinement</span>
                  <p className="text-body-md text-on-surface-variant mt-2">Continuous algorithm improvement through anonymized telemetry.</p>
                </div>
              </div>
            </FadeInSection>
            <div className="technical-line" aria-hidden="true"></div>

            {/* Section 04 */}
            <FadeInSection>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-data-mono text-h3 text-secondary">04</span>
                <h2 className="font-h2 text-[32px] text-on-surface group-hover:text-primary transition-colors">Data Sharing</h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Nexus Insight operates on a zero-leak policy. We only transmit <span className="text-tertiary">aggregated, non-identifiable scores</span> to the marketplace protocol. Individual personal data or raw CSV order logs are <span className="text-error font-medium">NEVER</span> shared with third parties or external entities.
              </p>
            </FadeInSection>
            <div className="technical-line" aria-hidden="true"></div>

            {/* Section 05 */}
            <FadeInSection>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-data-mono text-h3 text-secondary">05</span>
                <h2 className="font-h2 text-[32px] text-on-surface group-hover:text-primary transition-colors">Data Security</h2>
              </div>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 bg-surface-container-highest border border-tertiary/20 text-tertiary rounded-full font-data-mono text-data-mono flex items-center gap-2">
                  <span className="w-2 h-2 bg-tertiary rounded-full glowing-dot" aria-hidden="true"></span> AES-256
                </span>
                <span className="px-4 py-2 bg-surface-container-highest border border-tertiary/20 text-tertiary rounded-full font-data-mono text-data-mono flex items-center gap-2">
                  <span className="w-2 h-2 bg-tertiary rounded-full glowing-dot" aria-hidden="true"></span> TLS 1.3
                </span>
                <span className="px-4 py-2 bg-surface-container-highest border border-secondary/20 text-secondary rounded-full font-data-mono text-data-mono flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full glowing-dot" aria-hidden="true"></span> SOC 2 COMPLIANT
                </span>
              </div>
              <p className="text-on-surface-variant">Our infrastructure leverages industrial-grade encryption at rest and in transit, ensuring the absolute sanctity of the Trust Protocol data pipeline.</p>
            </FadeInSection>
            <div className="technical-line" aria-hidden="true"></div>

            {/* Section 06 */}
            <FadeInSection>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-data-mono text-h3 text-secondary">06</span>
                <h2 className="font-h2 text-[32px] text-on-surface group-hover:text-primary transition-colors">Data Retention</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-6 glass-card rounded-2xl">
                  <div className="text-h1 text-primary opacity-50 font-data-mono">7y</div>
                  <div>
                    <h4 className="font-label-caps text-label-caps text-secondary">Account Data</h4>
                    <p className="text-sm text-on-surface-variant">Archived for compliance and audit trails.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 glass-card rounded-2xl">
                  <div className="text-h1 text-primary opacity-50 font-data-mono">5y</div>
                  <div>
                    <h4 className="font-label-caps text-label-caps text-secondary">Order Data</h4>
                    <p className="text-sm text-on-surface-variant">Retained for long-term fraud modeling.</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
            <div className="technical-line" aria-hidden="true"></div>

            {/* Section 07 */}
            <FadeInSection>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-data-mono text-h3 text-secondary">07</span>
                <h2 className="font-h2 text-[32px] text-on-surface group-hover:text-primary transition-colors">Platform Responsibilities</h2>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Users are responsible for ensuring consent is obtained from end-shoppers before data ingestion. Nexus Insight provides the tools for <span className="text-primary">transparency and accuracy</span>, but the final mandate for data legality resides with the initiating entity.
              </p>
            </FadeInSection>
            <div className="technical-line" aria-hidden="true"></div>

            {/* Section 08 */}
            <FadeInSection>
              <div className="flex items-baseline gap-4 mb-4">
                <span className="font-data-mono text-h3 text-secondary">08</span>
                <h2 className="font-h2 text-[32px] text-on-surface group-hover:text-primary transition-colors">Contact</h2>
              </div>
              <div className="flex flex-col md:flex-row gap-8">
                <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors" href="mailto:info@scscore.in">
                  <span className="material-symbols-outlined p-3 bg-surface-container-high rounded-xl" aria-hidden="true">alternate_email</span>
                  <div>
                    <span className="font-label-caps text-label-caps block opacity-50">Email</span>
                    <span className="font-data-mono">info@scscore.in</span>
                  </div>
                </a>
                <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors" href="tel:+911413520329">
                  <span className="material-symbols-outlined p-3 bg-surface-container-high rounded-xl" aria-hidden="true">call</span>
                  <div>
                    <span className="font-label-caps text-label-caps block opacity-50">Phone</span>
                    <span className="font-data-mono">+91 141 3520329</span>
                  </div>
                </a>
              </div>
            </FadeInSection>
          </div>
        </article>

        {/* CTA Floating Interaction */}
        <div className="mt-16 max-w-4xl mx-auto flex flex-col items-center gap-4 relative z-10">
          <SpecularButton 
            type="button"
            className="group"
            onClick={() => alert("PDF download functionality is coming soon.")}
          >
            <span className="flex items-center gap-3 font-label-caps text-label-caps">
              <span className="material-symbols-outlined text-primary" aria-hidden="true">download</span>
              Download PDF Version
            </span>
          </SpecularButton>
          <p className="font-data-mono text-[10px] text-on-surface-variant tracking-[0.2em] opacity-40 uppercase">END OF PROTOCOL DOCUMENTATION</p>
        </div>
      </main>

      {/* Footer (Shared Component) */}
      <Footer portal="sellers" copyright="© 2024 Nexus Insight Protocol. Secure Decentralized Trust." />
    </div>
  );
}
