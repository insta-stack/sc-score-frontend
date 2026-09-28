import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ portal, copyright }) {
  const base = `/${portal}`;

  return (
    <footer className="border-t border-white/10 bg-black/15">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-6">
        <p>
          {copyright || `©${new Date().getFullYear()} SC·Score — Credibility intelligence.`}
        </p>

        <nav
        
          className="flex flex-wrap gap-x-4 gap-y-2"
          aria-label="Legal navigation"
        >
          <Link
            to={`${base}/about`}
            className="transition-colors hover:text-violet-200"
          >
            About
          </Link>

          <Link
            to={`${base}/contact`}
            className="transition-colors hover:text-violet-200"
          >
            Contact
          </Link>

          <Link
            to={`${base}/privacy`}
            className="transition-colors hover:text-violet-200"
          >
            Privacy
          </Link>

          <Link
            to={`${base}/terms`}
            className="transition-colors hover:text-violet-200"
          >
            Terms
          </Link>

           <Link
            to={`${base}/support`}
            className="transition-colors hover:text-violet-200"
          >
            Support
          </Link>
        </nav>
      </div>
    </footer>
  );
}

