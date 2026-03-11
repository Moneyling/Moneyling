/**
 * Moneyling.org – shared layout: header (logo + nav) and footer.
 * Keeps global branding and styles.
 */

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../context/CartContext";

const LOGO_SRC = `${import.meta.env.BASE_URL}moneyling-logo-text.png`;

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/for-educators", label: "For Educators" },
  { to: "/for-financial-institutions", label: "For Institutions" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { count } = useCart();

  return (
    <div className="min-h-screen bg-gray-50 font-raleway flex flex-col">
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between min-h-16">
          <Link to="/" className="flex items-center focus:outline-none focus:ring-2 focus:ring-primary/30 rounded">
            <img
              src={LOGO_SRC}
              alt="Moneyling"
              className="h-10 w-auto object-contain"
            />
          </Link>
          <nav className="flex items-center gap-6" aria-label="Main">
            <Link
              to="/payment"
              className="relative flex items-center gap-1.5 text-sm font-raleway-medium text-body-color hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 rounded px-1"
              aria-label={`My Cart${count > 0 ? `, ${count} items` : ""}`}
            >
              <ShoppingCart className="w-5 h-5" aria-hidden />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1 min-w-[1.25rem] h-5 flex items-center justify-center rounded-full bg-primary text-white text-xs font-raleway-bold">
                  {count > 99 ? "99+" : count}
                </span>
              )}
            </Link>
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`text-sm font-raleway-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 rounded px-1 ${
                  location.pathname === to ||
                  (to !== "/" && location.pathname.startsWith(to + "/"))
                    ? "text-primary"
                    : "text-body-color hover:text-primary"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 w-full flex flex-col items-center">{children}</main>

      <footer className="border-t bg-white mt-auto">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} Moneyling.org. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
