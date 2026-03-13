/**
 * Moneyling.org – shared layout: header (logo + nav) and footer.
 * Keeps global branding and styles. Nav is responsive: hamburger menu on mobile.
 */

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Analytics } from "./Analytics";
import { useCart } from "../context/CartContext";

const LOGO_SRC = `${import.meta.env.BASE_URL}moneyling-logo-text.png`;

const PAGE_META: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Moneyling – Financial Literacy & Financial Education | Community Outreach",
    description: "Moneyling delivers story-based financial literacy and personal finance education for K-12 schools, community programs, credit unions, and banks. Standards-aligned curriculum, LMS, and measurable outcomes.",
  },
  "/for-educators": {
    title: "Financial Literacy for Educators – K-12 & Community | Moneyling",
    description: "Standards-aligned financial literacy curriculum for middle school and high school. Jump$tart-aligned, story-based personal finance education, Moneyling LMS, and plug-and-play materials for teachers.",
  },
  "/for-financial-institutions": {
    title: "Financial Literacy for Credit Unions & Banks – Community Outreach | Moneyling",
    description: "Financial education and member financial wellness for credit unions and banks. CRA-friendly community outreach, financial literacy workshops, engagement metrics, and ROI—without adding staff or events.",
  },
  "/individuals": {
    title: "Personal Finance & Financial Wellness – Dreamlife-Sim | Moneyling",
    description: "Dreamlife-Sim: personal finance and financial wellness. Visualize goals, map pathways, and take micro-actions for money management and financial literacy.",
  },
  "/about": {
    title: "About Moneyling – Financial Education & Mission",
    description: "Meet the team behind Moneyling. We’re closing the wealth gap through story-based financial education and measurable outcomes.",
  },
  "/contact": {
    title: "Contact Moneyling – Financial Literacy & Education",
    description: "Get in touch with Moneyling. Questions about financial literacy for schools, financial education for credit unions, or Dreamlife-Sim? We’re here to help.",
  },
  "/payment": {
    title: "My Cart | Moneyling",
    description: "Review your cart and request pricing. Email your cart to Moneyling or download our W-9 for purchase orders.",
  },
};

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/for-educators", label: "For Educators" },
  { to: "/for-financial-institutions", label: "For Institutions" },
  { to: "/individuals", label: "For Individuals" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const linkClass = (active: boolean) =>
  active
    ? "btn-glass text-primary"
    : "text-body-color hover:text-primary hover:bg-primary/5";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { count } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close on escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const isActive = (to: string) =>
    location.pathname === to || (to !== "/" && location.pathname.startsWith(to + "/"));

  // Per-page title and meta description for SEO
  useEffect(() => {
    const path = location.pathname.replace(/\/$/, "") || "/";
    const meta = PAGE_META[path] ?? PAGE_META["/"];
    document.title = meta.title;
    let el = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement("meta");
      el.name = "description";
      document.head.appendChild(el);
    }
    el.content = meta.description;
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 font-raleway flex flex-col">
      <Analytics />
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between min-h-14 sm:min-h-16">
          <Link to="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary/30 rounded shrink-0">
            <img
              src={LOGO_SRC}
              alt="Moneyling"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6" aria-label="Main">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-raleway-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-lg px-3 py-2 ${linkClass(isActive(to))}`}
              >
                {label}
              </Link>
            ))}
            {count > 0 && (
              <Link
                to="/payment"
                className="relative flex items-center justify-center w-10 h-10 rounded-lg text-body-color hover:text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors"
                aria-label={`Cart with ${count} item${count === 1 ? "" : "s"}`}
              >
                <ShoppingCart className="w-5 h-5" aria-hidden />
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-primary text-white text-xs font-raleway-bold px-1">
                  {count > 99 ? "99+" : count}
                </span>
              </Link>
            )}
          </nav>

          {/* Mobile: cart (if any) + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {count > 0 && (
              <Link
                to="/payment"
                className="relative flex items-center justify-center w-11 h-11 rounded-lg text-body-color hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors touch-manipulation"
                aria-label={`Cart with ${count} item${count === 1 ? "" : "s"}`}
              >
                <ShoppingCart className="w-6 h-6" aria-hidden />
                <span className="absolute top-0.5 right-0.5 min-w-[20px] h-[20px] flex items-center justify-center rounded-full bg-primary text-white text-xs font-raleway-bold">
                  {count > 99 ? "99+" : count}
                </span>
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="flex items-center justify-center w-11 h-11 rounded-lg text-body-color hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-colors touch-manipulation"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu backdrop (tap to close) */}
        <div
          role="presentation"
          onClick={() => setMobileMenuOpen(false)}
          className={`md:hidden fixed inset-0 z-[49] bg-black/20 top-14 sm:top-16 transition-opacity duration-200 ${
            mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
          }`}
          aria-hidden="true"
        />
        {/* Mobile menu panel */}
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          aria-label="Main navigation"
          className={`md:hidden absolute left-0 right-0 top-full z-50 bg-white border-b border-gray-200 shadow-lg transition-[visibility,opacity] duration-200 ${
            mobileMenuOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
          }`}
        >
          <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-base font-raleway-medium rounded-lg px-4 py-3.5 -mx-4 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-inset touch-manipulation min-h-[48px] flex items-center ${linkClass(isActive(to))}`}
              >
                {label}
              </Link>
            ))}
            {count > 0 && (
              <Link
                to="/payment"
                className="text-base font-raleway-medium rounded-lg px-4 py-3.5 -mx-4 transition-colors text-body-color hover:text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-inset touch-manipulation min-h-[48px] flex items-center gap-3"
              >
                <ShoppingCart className="w-5 h-5 shrink-0" aria-hidden />
                Cart ({count} item{count === 1 ? "" : "s"})
              </Link>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center">{children}</main>

      <footer className="border-t bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-1 sm:px-2 lg:px-3 py-6 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Moneyling.org. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
