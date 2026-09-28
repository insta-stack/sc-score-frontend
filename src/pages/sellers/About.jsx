import React from "react";
import { Link } from "react-router-dom";

import SpecularButton from "../../components/shared/SpecularButton";
import GradientWaves from "../../components/shared/gradientwaves/GradientWaves";
const benefits = [
  {
    icon: "shield",
    title: "Instant",
    title2: "Trust",
    description: "Gain immediate credibility with verified badges.",
  },
  {
    icon: "trend",
    title: "Increased",
    title2: "Sales",
    description: "Higher conversion rates from trust-driven traffic.",
  },
  {
    icon: "users",
    title: "Loyal",
    title2: "Buyers",
    description: "Build long-term relationships through transparency.",
  },
  {
    icon: "target",
    title: "Top",
    title2: "Visibility",
    description: "Priority placement for high-scoring merchants.",
  },
];

const credentials = [
  {
    icon: "file",
    label: "ENTITY IDENTITY",
    title: "Company",
    title2: "Details",
    description: "Shopper Credibility Score (OPC) Private Limited",
    meta: "CIN: U62090RJ2025OPC016523",
    accent: "text-purple-300",
  },
  {
    icon: "gear",
    label: "REGISTRATION",
    title: "DPIIT",
    title2: "Recognised",
    description:
      "Recognised startup by Department for Promotion of Industry and Internal Trade.",
    accent: "text-yellow-300",
  },
  {
    icon: "globe",
    label: "INITIATIVE",
    title: "Startup India",
    description: "Part of the Government of India's Startup India initiative.",
    accent: "text-blue-300",
  },
  {
    icon: "shield",
    label: "COMPLIANCE",
    title: "GSTIN Verified",
    description:
      "All sellers verified through official government GSTIN database.",
    accent: "text-violet-300",
  },
];

function Icon({ type, className = "h-4 w-4" }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (type) {
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 19 6v5c0 4.7-2.9 8.2-7 10-4.1-1.8-7-5.3-7-10V6l7-3Z" />
          <path d="m9.5 12.2 1.7 1.8 3.5-4" />
        </svg>
      );

    case "trend":
      return (
        <svg {...common}>
          <path d="m4 16 6-6 4 4 6-7" />
          <path d="M15 7h5v5" />
        </svg>
      );

    case "users":
      return (
        <svg {...common}>
          <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20" />
          <circle cx="10" cy="8" r="3" />
          <path d="M16 11a3 3 0 0 0 0-6" />
          <path d="M18 15.2a3.5 3.5 0 0 1 2 3.3V20" />
        </svg>
      );

    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      );

    case "file":
      return (
        <svg {...common}>
          <path d="M6 3.5h8l4 4v13H6z" />
          <path d="M14 3.5v4h4M9 12h6M9 15h5" />
        </svg>
      );

    case "gear":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19 13.5a7.7 7.7 0 0 0 .1-1.5 7.7 7.7 0 0 0-.1-1.5l2-1.5-2-3.5-2.4 1a8 8 0 0 0-2.6-1.5L13.7 2h-3.4l-.3 3a8 8 0 0 0-2.6 1.5L5 5.5l-2 3.5 2 1.5A7.7 7.7 0 0 0 4.9 12c0 .5 0 1 .1 1.5l-2 1.5 2 3.5 2.4-1A8 8 0 0 0 10 19l.3 3h3.4l.3-3a8 8 0 0 0 2.6-1.5l2.4 1 2-3.5z" />
        </svg>
      );

    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.8 9h16.4M3.8 15h16.4" />
          <path d="M12 3.5c2.1 2.2 3.2 5 3.2 8.5s-1.1 6.3-3.2 8.5c-2.1-2.2-3.2-5-3.2-8.5S9.9 5.7 12 3.5Z" />
        </svg>
      );

    default:
      return null;
  }
}

const scrollToId = (id) => () =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function About() {
  return (
    <div className="min-h-screen bg-[#121114] text-[#f0eef2] antialiased">
      {/* ================= NAVBAR ================= */}
      <header className="sticky top-0 z-50 border-b border-[#2a282d] bg-[#141316]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5">
          <Link to="/sellers" className="text-base font-bold tracking-[-0.03em]">
            Nexus Insight
          </Link>

          <nav className="hidden items-center gap-7 text-[11px] text-[#ddd9df] md:flex">
            <a href="#platform" className="transition-colors hover:text-white">
              Platform
            </a>
            <a href="#verification" className="transition-colors hover:text-white">
              Verification
            </a>
            <a
              href="#sellers"
              className="relative text-white after:absolute after:-bottom-[9px] after:left-0 after:right-0 after:h-px after:bg-white"
            >
              Sellers
            </a>
            <a href="#protocol" className="transition-colors hover:text-white">
              Protocol
            </a>
          </nav>

          <SpecularButton
            size="sm"
            radius={24}
            tint="#eadcff"
            tintOpacity={0.92}
            blur={3}
            textColor="#38255e"
            lineColor="#ffffff"
            baseColor="#d2bbff"
            intensity={1.15}
            shineSize={13}
            shineFade={36}
            thickness={1}
            speed={0.4}
            followMouse
            proximity={220}
          >
            Partner Now
          </SpecularButton>
        </div>
      </header>

      <main>
        {/* ================= HERO ================= */}
        <section
          id="platform"
          className="relative flex min-h-[370px] flex-col items-center overflow-hidden px-5 pb-10 pt-12 text-center"
        >
          <div className="absolute inset-0 z-0">
            <GradientWaves
              horizonColor="#121114"
              waveColor="#5b21b6"
              crestColor="#eadcff"
              speed={0.35}
              amplitude={2}
              waveScale={0.55}
              waveRatio={0.9}
              swell={30}
              turbulence={16}
              tilt={1.15}
              zoom={1.1}
              height={5}
              fogDepth={14}
              detail="medium"
              brightness={0.85}
              opacity={0.9}
              mouseInteraction
              parallaxStrength={0.4}
              grain
              grainIntensity={0.04}
            />
          </div>

          <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/10 via-transparent to-[#121114]" />

          <div className="relative z-10 flex w-full flex-col items-center">
            <div className="rounded-full border border-[#3d3941] px-3 py-1.5 font-mono text-[8px] tracking-wide text-[#d2ccd8]">
              THE TRUST PROTOCOL
            </div>

            <h1 className="mt-5 max-w-[720px] text-4xl font-bold leading-[1.04] tracking-[-0.055em] sm:text-5xl lg:text-[52px]">
              About Shopper Credibility
              <br />
              Score (OPC) Private Limited
            </h1>

            <p className="mt-5 max-w-[470px] text-[11px] leading-6 text-[#c4bec8]">
              We are dedicated to building trust in e-commerce by verifying
              sellers and providing credibility scores that help you grow your
              business securely.
            </p>

            <div className="mt-6 flex gap-3">
              <SpecularButton
                size="lg"
                radius={28}
                tint="#eadcff"
                tintOpacity={0.94}
                blur={4}
                textColor="#38255e"
                lineColor="#ffffff"
                baseColor="#c4b5fd"
                intensity={1.25}
                shineSize={12}
                shineFade={35}
                thickness={1.1}
                speed={0.4}
                followMouse
                proximity={280}
                autoAnimate
                onClick={scrollToId("verification")}
              >
                Get Verified
              </SpecularButton>

              <SpecularButton
                size="lg"
                radius={28}
                tint="#ffffff"
                tintOpacity={0.025}
                blur={8}
                textColor="#eadcff"
                lineColor="#d2bbff"
                baseColor="#211f23"
                intensity={1}
                shineSize={10}
                shineFade={42}
                thickness={1}
                speed={0.3}
                followMouse
                proximity={260}
                onClick={scrollToId("protocol")}
              >
                View Protocol
              </SpecularButton>
            </div>
          </div>
        </section>

        {/* ================= TRUST ================= */}
        <section
          id="sellers"
          className="mx-auto grid max-w-[900px] grid-cols-1 items-center gap-10 px-5 pt-10 pb-16 md:grid-cols-2"
        >
          <div>
            <h2 className="text-3xl font-semibold leading-[1.05] tracking-[-0.045em]">
              How We Help Sellers
              <br />
              Build Trust
            </h2>

            <p className="mt-6 text-[10px] leading-[1.7] text-[#b7b1ba]">
              Our mission is to eliminate the opacity that often surrounds
              digital commerce. By introducing a standardized, GSTIN-verified
              system, we create a transparent ecosystem where merit and
              reliability are the primary drivers of success.
            </p>

            <p className="mt-5 text-[10px] leading-[1.7] text-[#b7b1ba]">
              We focus on bridging the gap between quality merchants and
              conscious buyers. Our rigorous verification process ensures that
              every seller on the Nexus Insight platform adheres to the
              highest standards of professional conduct.
            </p>

            <div className="mt-7 flex items-center gap-2 font-mono text-[7px] tracking-[0.08em] text-[#e2d65b]">
              <span className="text-base">✺</span>
              OFFICIAL VERIFICATION PARTNER
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {benefits.map((item) => (
              <article
                key={item.title}
                className="flex min-h-[145px] flex-col items-center rounded-xl border border-[#36333a] bg-[#1c1b1f]/70 px-3 py-4 text-center transition duration-300 hover:-translate-y-1 hover:border-[#514b58] hover:bg-[#211f24]"
              >
                <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#6d3699] bg-[#32105b] text-[#e9d9ff]">
                  <Icon type={item.icon} className="h-4 w-4" />
                </div>

                <h3 className="text-[15px] font-semibold leading-[1.1] tracking-[-0.03em]">
                  {item.title}
                  <br />
                  {item.title2}
                </h3>

                <p className="mt-2 max-w-[150px] text-[8px] leading-[1.5] text-[#aaa4ad]">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ================= CREDENTIALS ================= */}
        <section
          id="verification"
          className="mx-auto max-w-[900px] border-t border-white/[0.02] px-5 py-20"
        >
          <div>
            <h2 className="text-3xl font-semibold tracking-[-0.045em]">
              Our Company Credentials
            </h2>

            <p className="mt-3 text-[9px] leading-5 text-[#c2bdc5]">
              Shopper Credibility Score (OPC) Private Limited is committed to
              <br className="hidden sm:block" />
              secure, compliant e-commerce solutions.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {credentials.map((item) => (
              <article
                key={item.label}
                className="group relative min-h-[205px] overflow-hidden rounded-xl border border-[#36333a] bg-[#1a191d] p-4 transition duration-300 hover:-translate-y-1 hover:border-[#514b58]"
              >
                <div className="mb-5 flex h-7 w-7 items-center justify-center rounded-md border border-[#4b4650] text-[#e6e0ea]">
                  <Icon type={item.icon} className="h-3.5 w-3.5" />
                </div>

                <div
                  className={`font-mono text-[6px] font-medium tracking-[0.13em] ${item.accent}`}
                >
                  {item.label}
                </div>

                <h3 className="mt-2 text-[14px] font-semibold leading-[1.05] tracking-[-0.02em]">
                  {item.title}
                  {item.title2 && (
                    <>
                      <br />
                      {item.title2}
                    </>
                  )}
                </h3>

                <p className="mt-3 text-[8px] leading-[1.55] text-[#b4afb7]">
                  {item.description}
                </p>

                {item.meta && (
                  <div className="mt-4 inline-block rounded bg-[#26232a] px-2 py-1.5 font-mono text-[6px] text-[#cbc3d1]">
                    {item.meta}
                  </div>
                )}

                <div className="pointer-events-none absolute -bottom-5 -right-2 text-[80px] leading-none text-white/[0.025]">
                  {item.icon === "file"
                    ? "▣"
                    : item.icon === "gear"
                    ? "⚙"
                    : item.icon === "globe"
                    ? "◎"
                    : "♢"}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ================= SCORE ================= */}
        <section id="protocol" className="flex justify-center px-5 py-20">
          <div className="w-full max-w-[570px] rounded-[18px] border border-[#49434e] bg-[#1a191d] px-6 py-7 text-center shadow-[0_20px_70px_rgba(0,0,0,0.18)] sm:px-10">
            <div className="font-mono text-[6px] tracking-[0.15em] text-[#d6cedd]">
              TRUST PROTOCOL
            </div>

            <div className="mt-2 text-5xl font-bold leading-none text-[#eee4fb] drop-shadow-[0_0_12px_rgba(215,193,255,0.45)]">
              98
            </div>

            <h2 className="mt-2 text-lg font-semibold tracking-[-0.025em]">
              Elite Credibility Score
            </h2>

            <p className="mx-auto mt-3 max-w-[380px] text-[9px] leading-[1.6] text-[#c0bac4]">
              Our proprietary algorithm evaluates hundreds of data points to
              generate a real-time credibility metric that buyers can trust
              implicitly.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 border-t border-[#2e2b31] pt-5 sm:grid-cols-3 sm:gap-0">
              <div className="text-left sm:border-r sm:border-[#302d34] sm:px-4">
                <span className="block font-mono text-[6px] text-[#aaa3ad]">
                  NETWORK
                </span>
                <strong className="mt-1 block text-[10px]">15k+ Sellers</strong>
              </div>

              <div className="text-left sm:border-r sm:border-[#302d34] sm:px-4">
                <span className="block font-mono text-[6px] text-[#aaa3ad]">
                  VERIFICATION
                </span>
                <strong className="mt-1 block text-[10px]">Real-Time GST</strong>
              </div>

              <div className="text-left sm:px-4">
                <span className="block font-mono text-[6px] text-[#aaa3ad]">
                  PROTECTION
                </span>
                <strong className="mt-1 block text-[10px]">
                  256-bit Encrypted
                </strong>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer id="contact" className="border-t border-[#2a282e] px-5 py-5">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-base font-semibold tracking-[-0.02em] text-[#dfd2ef]">
              Nexus Insight
            </div>

            <div className="mt-1 font-mono text-[6px] text-[#aaa3ad]">
              © {new Date().getFullYear()} Nexus Insight Platform. All Rights
              Reserved.
            </div>
          </div>

          <div className="flex flex-wrap gap-5 font-mono text-[6px] text-[#c1bbc5]">
            <Link to="/sellers/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/sellers/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <Link to="/sellers" className="hover:text-white">
              GSTIN lookup
            </Link>
            <Link to="/platforms" className="hover:text-white">
              API Docs
            </Link>
          </div>

          {/* share components — untouched */}
          <div className="flex gap-2">
            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[#3c3841] text-[10px] text-[#d7d1dc] transition hover:bg-white/5">
              ↗
            </button>

            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-[#3c3841] text-[10px] text-[#d7d1dc] transition hover:bg-white/5">
              ◉
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}