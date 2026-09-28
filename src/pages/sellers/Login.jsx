import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  UserCheck,
  Database,
} from 'lucide-react'

export default function SellerLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [emailOrPhone, setEmailOrPhone] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!emailOrPhone.trim() || !password) {
      setError(
        'Please enter both your registered email/phone and password.'
      )
      return
    }

    try {
      setLoading(true)

      await login('seller', emailOrPhone.trim(), password)

      navigate('/sellers/dashboard')
    } catch (err) {
      const msg =
        err.response?.data?.detail ||
        err.response?.data?.message ||
        (err.response?.status === 401
          ? 'Invalid email/phone or password.'
          : 'Failed to log in. Please check your credentials.')

      setError(typeof msg === 'string' ? msg : JSON.stringify(msg))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#101415] text-[#e6e1e7]">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Violet glow */}
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-[#6718d8]/10 blur-[120px]" />

        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-[#bec1fe]/5 blur-[120px]" />

        {/* Floating ambient lights */}
        <div className="absolute left-[15%] top-[25%] h-40 w-24 rounded-full bg-[#732ee4]/5 blur-[45px] animate-pulse" />

        <div
          className="absolute left-[40%] top-[50%] h-48 w-28 rounded-full bg-[#d2bbff]/5 blur-[55px] animate-pulse"
          style={{ animationDelay: '1s' }}
        />

        <div
          className="absolute right-[15%] top-[20%] h-32 w-24 rounded-full bg-[#732ee4]/5 blur-[45px] animate-pulse"
          style={{ animationDelay: '2s' }}
        />
      </div>

      {/* =========================================================
          NAVIGATION
      ========================================================== */}
      <nav className="relative z-20 mx-auto flex max-w-[1280px] items-center justify-between px-5 py-6 md:px-16">
        <Link
          to="/"
          className="font-['Sora'] text-xl font-bold tracking-tight text-[#e6e1e7] md:text-2xl"
        >
          SC Score
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#platform"
            className="text-sm text-[#cbc4d0] transition-colors hover:text-[#d2bbff]"
          >
            Platform
          </a>

          <a
            href="#security"
            className="text-sm text-[#cbc4d0] transition-colors hover:text-[#d2bbff]"
          >
            Security
          </a>

          <a
            href="#solutions"
            className="text-sm text-[#cbc4d0] transition-colors hover:text-[#d2bbff]"
          >
            Solutions
          </a>

          <Link
            to="/sellers/Logup"
            className="rounded-full border border-[#49454f] px-6 py-2 text-sm text-[#e6e1e7] transition-all hover:bg-white/5"
          >
            Get Access
          </Link>
        </div>
      </nav>

      <main className="relative z-10">
        {/* =========================================================
            HERO
        ========================================================== */}
        <section
          id="platform"
          className="mx-auto flex min-h-[calc(100vh-88px)] max-w-[1280px] flex-col items-center justify-center px-5 py-16 md:flex-row md:px-16 md:py-20"
        >
          {/* LEFT */}
          <div className="mb-16 flex w-full flex-col justify-center md:mb-0 md:w-1/2 md:pr-16">
            <div className="animate-[fadeUp_.8s_ease-out_forwards] opacity-0">
              <p className="mb-4 font-mono text-[12px] font-medium uppercase tracking-[0.2em] text-[#d2bbff]">
                Seller Portal
              </p>

              <h1 className="mb-6 font-['Sora'] text-[40px] font-semibold leading-[1.15] tracking-[-0.04em] text-[#e6e1e7] md:text-[64px] lg:text-[72px]">
                Log in to
                <br />
                <span className="text-[#d2bbff]">SC Score</span>
              </h1>

              <p className="mb-12 max-w-lg text-base leading-[1.6] text-[#cbc4d0]">
                Access your seller credibility dashboard, trust tier,
                verified business identity, and order intelligence from one
                secure platform.
              </p>
            </div>

            {/* Trust points */}
            <div className="space-y-6">
              <TrustPoint
                icon={<ShieldCheck size={19} />}
                text="Secure Authentication"
                delay="0.1s"
              />

              <TrustPoint
                icon={<UserCheck size={19} />}
                text="Verified Business Identity"
                delay="0.2s"
              />

              <TrustPoint
                icon={<BarChart3 size={19} />}
                text="Trusted Across Platforms"
                delay="0.3s"
              />
            </div>
          </div>

          {/* RIGHT - LOGIN */}
          <div className="flex w-full justify-center md:w-1/2 md:justify-end">
            <div className="glass-panel w-full max-w-[430px] animate-[fadeUp_.8s_.15s_ease-out_forwards] opacity-0">
              <div className="p-8 md:p-10">
                <div className="mb-8">
                  <h2 className="mb-2 font-['Sora'] text-[28px] font-semibold text-[#e6e1e7]">
                    Log In
                  </h2>

                  <p className="text-sm leading-6 text-[#cbc4d0]">
                    Log in to continue to your seller account.
                  </p>
                </div>

                {/* Error */}
                {error && (
                  <div className="mb-5 flex items-start gap-3 rounded-lg border border-red-400/30 bg-red-500/10 p-3.5 text-sm text-red-200">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* EMAIL / PHONE */}
                  <div>
                    <label
                      htmlFor="sellerEmailOrPhone"
                      className="mb-2 block font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-[#948e9a]"
                    >
                      EMAIL OR PHONE
                    </label>

                    <input
                      id="sellerEmailOrPhone"
                      type="text"
                      placeholder="seller@business.com"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      autoComplete="username"
                      required
                      className="login-input"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        htmlFor="sellerPassword"
                        className="font-mono text-[11px] font-medium uppercase tracking-[0.05em] text-[#948e9a]"
                      >
                        PASSWORD
                      </label>

                      <Link
                        to="/sellers/forgot-password"
                        className="font-mono text-[10px] font-medium uppercase tracking-[0.05em] text-[#d2bbff] transition hover:underline"
                      >
                        FORGOT PASSWORD?
                      </Link>
                    </div>

                    <input
                      id="sellerPassword"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                      className="login-input"
                    />
                  </div>

                  {/* REMEMBER */}
                  <div className="flex items-center gap-3">
                    <input
                      id="remember"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-[#49454f] bg-[#0f0d11] text-[#732ee4] focus:ring-[#d2bbff]"
                    />

                    <label
                      htmlFor="remember"
                      className="text-sm text-[#cbc4d0]"
                    >
                      Remember Me
                    </label>
                  </div>

                  {/* Log IN */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="primary-gradient flex w-full items-center justify-center gap-2 rounded-lg py-4 font-['Sora'] text-sm font-semibold text-white transition-all duration-200 hover:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Loging In...
                      </>
                    ) : (
                      <>
                        Log In
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center">
                  <div className="h-px flex-1 bg-[#49454f]" />

                  <span className="px-4 font-mono text-[10px] text-[#948e9a]">
                    OR
                  </span>

                  <div className="h-px flex-1 bg-[#49454f]" />
                </div>

                {/* Google UI */}
                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-lg border border-[#49454f] bg-white/[0.02] py-3 text-sm text-[#e6e1e7] transition-colors hover:bg-white/5"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>

                <p className="mt-8 text-center text-sm text-[#948e9a]">
                  Don't have a seller account?{' '}
                  <Link
                    to="/sellers/Logup"
                    className="text-[#d2bbff] hover:underline"
                  >
                    Register business
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            TRUST BENTO
        ========================================================== */}
        <section
          id="solutions"
          className="mx-auto max-w-[1280px] px-5 py-20 md:px-16 md:py-[120px]"
        >
          <div className="grid auto-rows-[220px] grid-cols-1 gap-6 md:grid-cols-4">
            {/* Large */}
            <div className="glass-card group flex flex-col justify-end md:col-span-2 md:row-span-2">
              <div className="mb-auto">
                <BarChart3 className="mb-4 h-9 w-9 text-[#d2bbff]" />
              </div>

              <h3 className="mb-4 font-['Sora'] text-[28px] font-semibold leading-tight text-[#e6e1e7] md:text-[32px]">
                Trusted by Consumers,
                <br />
                Sellers & Platforms
              </h3>

              <p className="text-sm leading-6 text-[#cbc4d0]">
                The unified infrastructure for digital credibility across the
                ecosystem. Powered by analytical intelligence and verified
                data streams.
              </p>
            </div>

            {/* Identity */}
            <div className="glass-card flex flex-col items-start gap-4 md:col-span-2">
              <BadgeCheck className="h-6 w-6 text-[#d2bbff]" />

              <div>
                <h4 className="mb-2 font-['Sora'] text-xl font-semibold text-[#e6e1e7]">
                  Identity Verified
                </h4>

                <p className="text-sm leading-5 text-[#cbc4d0]">
                  Verified business identity and credibility information for
                  trusted commerce.
                </p>
              </div>
            </div>

            {/* Security */}
            <div className="glass-card flex flex-col items-start gap-4">
              <LockKeyhole className="h-5 w-5 text-[#d2bbff]" />

              <div>
                <h4 className="mb-2 text-base font-bold text-[#e6e1e7]">
                  Enterprise Security
                </h4>

                <p className="text-xs leading-5 text-[#cbc4d0]">
                  Protected authentication and secure core identifiers.
                </p>
              </div>
            </div>

            {/* Privacy */}
            <div className="glass-card flex flex-col items-start gap-4">
              <EyeOff className="h-5 w-5 text-[#d2bbff]" />

              <div>
                <h4 className="mb-2 text-base font-bold text-[#e6e1e7]">
                  Privacy First
                </h4>

                <p className="text-xs leading-5 text-[#cbc4d0]">
                  Consent-based sharing and privacy-focused data handling.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECURITY
        ========================================================== */}
        <section
          id="security"
          className="border-y border-[#49454f] bg-[#0f0d11]/90 px-5 py-16 md:px-16"
        >
          <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-12 md:flex-row">
            <div className="max-w-xl text-center md:text-left">
              <h2 className="mb-4 font-['Sora'] text-[28px] font-semibold text-[#e6e1e7]">
                Your Data Stays Secure
              </h2>

              <p className="text-sm leading-6 text-[#cbc4d0] md:text-base">
                SC Score uses secure authentication and enterprise-grade
                security practices to protect your seller identity and
                credibility data.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <SecurityItem
                icon={<LockKeyhole />}
                text="Encrypted Auth"
              />

              <SecurityItem
                icon={<ShieldCheck />}
                text="Privacy Protected"
              />

              <SecurityItem
                icon={<UserCheck />}
                text="Identity Verified"
              />

              <SecurityItem
                icon={<Database />}
                text="Trusted Infra"
              />
            </div>
          </div>
        </section>

        {/* =========================================================
            CTA
        ========================================================== */}
        <section className="mx-auto max-w-[1280px] px-5 py-20 md:px-16 md:py-[120px]">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#141317]/70 p-10 text-center backdrop-blur-xl md:p-20">
            <div className="absolute inset-0 rounded-full bg-[#732ee4]/5 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <h2 className="mb-6 font-['Sora'] text-[30px] font-semibold leading-tight text-[#e6e1e7] md:text-[42px]">
                Join India's Credibility Network
              </h2>

              <p className="mb-10 text-sm leading-6 text-[#cbc4d0] md:text-base">
                Build trust with verified business identity, credibility
                intelligence, and a unified commerce profile.
              </p>

              <div className="flex flex-col justify-center gap-4 md:flex-row">
                <Link
                  to="/sellers/Logup"
                  className="primary-gradient rounded-full px-8 py-4 text-sm font-bold text-white transition hover:scale-105"
                >
                  Register Seller
                </Link>

                <Link
                  to="/"
                  className="rounded-full border border-[#49454f] px-8 py-4 text-sm font-bold text-[#e6e1e7] transition hover:bg-white/5"
                >
                  Explore Platform
                </Link>

                <a
                  href="#security"
                  className="rounded-full border border-[#49454f] px-8 py-4 text-sm font-bold text-[#e6e1e7] transition hover:bg-white/5"
                >
                  Security
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================
          FOOTER
      ========================================================== */}
      <footer className="border-t border-[#49454f] bg-[#0f0d11] px-5 py-10 md:px-16">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-6 md:flex-row">
          <div className="font-['Sora'] text-xl font-bold text-[#e6e1e7]">
            SC Score
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a
              href="#"
              className="text-xs text-[#948e9a] transition hover:text-[#e6e1e7]"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-xs text-[#948e9a] transition hover:text-[#e6e1e7]"
            >
              Terms of Service
            </a>

            <a
              href="#security"
              className="text-xs text-[#948e9a] transition hover:text-[#e6e1e7]"
            >
              Security Architecture
            </a>

            <a
              href="#"
              className="text-xs text-[#948e9a] transition hover:text-[#e6e1e7]"
            >
              Status
            </a>
          </div>

          <p className="text-xs text-[#948e9a]">
            © 2026 SC Score. Institutional Grade Intelligence.
          </p>
        </div>
      </footer>

      {/* =========================================================
          COMPONENT STYLES
      ========================================================== */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Sora:wght@600;700&family=JetBrains+Mono:wght@500&display=swap');

        .glass-panel {
          background: rgba(20, 19, 23, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.10);
          border-top-color: rgba(255,255,255,0.18);
          border-radius: 12px;
          box-shadow: 0 0 30px rgba(210,187,255,0.12);
        }

        .glass-card {
          background: rgba(20, 19, 23, 0.62);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,0.08);
          border-top-color: rgba(255,255,255,0.14);
          border-radius: 12px;
          padding: 32px;
          transition:
            background 200ms ease,
            border-color 200ms ease,
            transform 200ms ease;
        }

        .glass-card:hover {
          background: rgba(255,255,255,0.045);
          border-color: rgba(210,187,255,0.28);
          transform: translateY(-2px);
        }

        .login-input {
          width: 100%;
          border-radius: 8px;
          border: 1px solid #49454f;
          background: #0f0d11;
          color: #e6e1e7;
          padding: 13px 16px;
          outline: none;
          font-family: Inter, sans-serif;
          font-size: 14px;
          transition:
            border-color 180ms ease,
            box-shadow 180ms ease,
            background 180ms ease;
        }

        .login-input::placeholder {
          color: #4a4455;
        }

        .login-input:focus {
          border-color: #d2bbff;
          box-shadow: 0 0 0 2px rgba(210,187,255,0.18);
          background: #141317;
        }

        .primary-gradient {
          background: linear-gradient(
            135deg,
            #732ee4 0%,
            #6718d8 100%
          );
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        * {
          scrollbar-width: thin;
          scrollbar-color: #49454f #101415;
        }

        body {
          font-family: Inter, sans-serif;
        }
      `}</style>
    </div>
  )
}


/* ===============================================================
   TRUST POINT
================================================================ */

function TrustPoint({ icon, text, delay }) {
  return (
    <div
      className="flex items-center gap-4 animate-[fadeUp_.8s_ease-out_forwards] opacity-0"
      style={{ animationDelay: delay }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-[#d2bbff] backdrop-blur-md">
        {icon}
      </div>

      <span className="text-sm text-[#e6e1e7] md:text-base">
        {text}
      </span>
    </div>
  )
}


/* ===============================================================
   SECURITY ITEM
================================================================ */

function SecurityItem({ icon, text }) {
  return (
    <div className="group flex flex-col items-center gap-2 opacity-60 transition-opacity hover:opacity-100">
      <div className="text-[#d2bbff]">
        {React.cloneElement(icon, { size: 20 })}
      </div>

      <span className="whitespace-nowrap text-center font-mono text-[10px] font-medium uppercase tracking-wide text-[#e6e1e7]">
        {text}
      </span>
    </div>
  )
}


/* ===============================================================
   GOOGLE ICON
================================================================ */

function GoogleIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="currentColor"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="currentColor"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="currentColor"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="currentColor"
      />
    </svg>
  )
}