import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  AtSign,
  CheckCircle2,
  MapPin,
  Phone,
  Send,
  Wallet,
} from "lucide-react";
import SpecularButton from "../../components/shared/SpecularButton";
import "./sellerSupport.css";

const inquiryOptions = [
  "Seller Registration",
  "Score Improvement Consultation",
  "Dispute Resolution",
  "Technical API Support",
  "Verification Pipeline Inquiry",
];

const initialForm = {
  name: "",
  business: "",
  email: "",
  phone: "",
  subject: inquiryOptions[0],
  message: "",
};

export default function SellerSupport({ onSubmit }) {
  const canvasRef = useRef(null);

  const [form, setForm] = useState(initialForm);
  const [focused, setFocused] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /*
   * Background particles
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    let width = 0;
    let height = 0;
    let animationFrame;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;

      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const dots = Array.from({ length: 50 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = "#eadcff";

      dots.forEach((dot) => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > width) dot.vx *= -1;
        if (dot.y < 0 || dot.y > height) dot.vy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 0.8, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  const updateField = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setSubmitted(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) return;

    try {
      setSubmitting(true);

      if (onSubmit) {
        await onSubmit(form);
      } else {
        /*
         * Replace this with your SC Score API request.
         * Example:
         * await fetch("/api/contact", {
         *   method: "POST",
         *   headers: { "Content-Type": "application/json" },
         *   body: JSON.stringify(form),
         * });
         */
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setSubmitted(true);
      setForm(initialForm);
    } catch (error) {
      console.error("Inquiry submission failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="seller-support-page">
      <canvas
        ref={canvasRef}
        className="seller-support-particles"
        aria-hidden="true"
      />

      {/* =========================
          NAVBAR
      ========================== */}
      <header className="support-navbar">
        <nav className="support-navbar-inner">
          <Link to="/sellers" className="support-brand">
            Sc-Score
          </Link>

          <div className="support-nav-links">
            <Link to="/platforms">Platform</Link>
            <Link to="/verification">Verification</Link>
            <Link to="/sellers" className="active">
              Sellers
            </Link>
            <Link to="/protocol">Protocol</Link>
          </div>

          <SpecularButton
            type="button"
            className="wallet-button"
            onClick={() => console.log("Connect wallet")}
            size="sm"
            tint="#6001d1"
            tintOpacity={0.2}
          >
            <div className="flex items-center gap-2">
              <Wallet size={19} strokeWidth={2} />
              <span>Connect Wallet</span>
            </div>
          </SpecularButton>
        </nav>
      </header>

      <main className="support-main">
        {/* =========================
            HERO
        ========================== */}
        <section className="support-hero fade-in">
          <div className="support-eyebrow">
            <span>Support Portal</span>
          </div>

          <h1>
            Contact Seller <span>Support</span>
          </h1>

          <p>
            Have questions about registering your business or optimizing your
            Trust Protocol score? Our technical team is ready to facilitate
            your onboarding.
          </p>
        </section>

        {/* =========================
            CONTACT BENTO
        ========================== */}
        <section
          className="support-bento fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {/* LEFT COLUMN */}
          <div className="support-sidebar">
            <InfoCard
              icon={<AtSign />}
              label="EMAIL"
              title="info@scscore.in"
            />

            <InfoCard
              icon={<Phone />}
              label="SECURE LINE"
              title="+91 141 3520329"
              description="Mon - Sat | 09:00 - 18:00 IST"
            />

            <div className="glass-card location-card">
              <MapPin className="watermark-icon" />

              <div className="card-label">Address</div>

              <address className="location-address">
                <strong></strong>
                <span>34/37, Satlaj Path, Sector 3</span>
                <span>Mansarovar, Jaipur, Rajasthan 302015</span>
                <span>Bharat (IN)</span>
              </address>

            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="glass-card inquiry-card">
            <div className="inquiry-heading">
              <div className="heading-accent" />

              <h2>Contact Form
              </h2>
            </div>

            <form className="inquiry-form" onSubmit={handleSubmit}>
              <Field
                label="LEGAL NAME"
                value={form.name}
                placeholder="John Doe"
                focused={focused === "name"}
                onFocus={() => setFocused("name")}
                onBlur={() => setFocused("")}
                onChange={(value) => updateField("name", value)}
              />

              <Field
                label="BUSINESS ENTITY"
                value={form.business}
                placeholder="Nexus Global Ltd."
                focused={focused === "business"}
                onFocus={() => setFocused("business")}
                onBlur={() => setFocused("")}
                onChange={(value) => updateField("business", value)}
              />

              <Field
                label="EMAIL ADDRESS"
                type="email"
                value={form.email}
                placeholder="contact@business.com"
                focused={focused === "email"}
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused("")}
                onChange={(value) => updateField("email", value)}
              />

              <Field
                label="CONTACT NUMBER"
                type="tel"
                value={form.phone}
                placeholder="+91 000 0000 000"
                focused={focused === "phone"}
                onFocus={() => setFocused("phone")}
                onBlur={() => setFocused("")}
                onChange={(value) => updateField("phone", value)}
              />

              <div className="form-field full-width">
                <label
                  className={
                    focused === "subject" ? "field-focused" : undefined
                  }
                >
                  INQUIRY SUBJECT
                </label>

                <select
                  value={form.subject}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused("")}
                  onChange={(event) =>
                    updateField("subject", event.target.value)
                  }
                >
                  {inquiryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field full-width">
                <label
                  className={
                    focused === "message" ? "field-focused" : undefined
                  }
                >
                  DETAILED MESSAGE
                </label>

                <textarea
                  value={form.message}
                  placeholder="Provide context regarding your technical requirement..."
                  rows={5}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused("")}
                  onChange={(event) =>
                    updateField("message", event.target.value)
                  }
                />
              </div>

              <div className="submit-area full-width">
                <SpecularButton
                  className="inquiry-submit group"
                  type="submit"
                  disabled={submitting}
                  size="lg"
                  tint="#6001d1"
                  tintOpacity={0.3}
                >
                  <div className="flex items-center gap-2">
                    {submitted ? (
                      <>
                        Inquiry Initialized
                        <CheckCircle2 size={22} />
                      </>
                    ) : (
                      <>
                        {submitting
                          ? "Initializing..."
                          : "Submit Inquiry"}

                        {!submitting && <Send size={20} />}
                      </>
                    )}
                  </div>
                </SpecularButton>

              </div>
            </form>
          </div>
        </section>

        {/* =========================
            MAP
        ========================== */}
        <section
          className="map-section fade-in"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="map-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.130171201225!2d75.75875657548043!3d26.86760507667404!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5aa97d479a7%3A0x5cebe5f64681e88f!2s34%2F37%2C%20Satlaj%20Path%2C%20Shipra%20Path%2C%20Mansarovar%20Sector%203%2C%20Mansarovar%2C%20Jaipur%2C%20Rajasthan%20302020!5e0!3m2!1sen!2sin!4v1790172014705!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Google Maps Location"
            />
          </div>
        </section>
      </main>

      {/* =========================
          FOOTER
      ========================== */}
      <footer className="support-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="footer-logo">SHoopers Credibality Score (SCS)</div>

            <p> ©2026 scscore.in
              <br />
              All rights reserved.</p>
          </div>

          <div className="footer-links">
            <div>
              <h4>RESOURCES</h4>

              <Link to="/api">API Documentation</Link>
              <Link to="/security">Security Audit</Link>
            </div>

            <div>
              <h4>GOVERNANCE</h4>

              <Link to="/legal">Legal Framework</Link>
              <Link to="/sellers/terms">Terms of Service</Link>
            </div>
          </div>
        </div>

        <div className="footer-line" />
      </footer>
    </div>
  );
}

/* =====================================================
   INFO CARD
===================================================== */

function InfoCard({ icon, label, title, description }) {
  return (
    <div className="glass-card info-card">
      <div className="watermark-icon">{icon}</div>

      <div className="card-label">{label}</div>

      <p className="info-title">{title}</p>

      <p className="info-description">{description}</p>
    </div>
  );
}

/* =====================================================
   FORM FIELD
===================================================== */

function Field({
  label,
  value,
  placeholder,
  type = "text",
  focused,
  onFocus,
  onBlur,
  onChange,
}) {
  return (
    <div className="form-field">
      <label className={focused ? "field-focused" : undefined}>
        {label}
      </label>

      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}
