/**
 * Moneyling.org – shared layout: header (logo + nav) and footer.
 * Keeps global branding and styles.
 */

import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
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

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { count } = useCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

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
        <div className="max-w-6xl mx-auto px-1 sm:px-2 lg:px-3 py-4 flex items-center justify-between min-h-16">
          <Link to="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary/30 rounded">
            <img
              src={LOGO_SRC}
              alt="Moneyling"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <nav className="flex items-center gap-6" aria-label="Main">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-raleway-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 rounded-lg px-3 py-2 ${
                  location.pathname === to ||
                  (to !== "/" && location.pathname.startsWith(to + "/"))
                    ? "btn-glass text-primary"
                    : "text-body-color hover:text-primary hover:bg-primary/5"
                }`}
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
