/**
 * Moneyling.org – Analytics (Google Analytics 4).
 * Loads gtag when VITE_GA_MEASUREMENT_ID is set; sends page_view on route change.
 * To enable: add VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX to .env and .env.production.
 */

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;

export function Analytics() {
  const location = useLocation();

  // Load gtag script once when ID is present; send initial page_view when script is ready
  useEffect(() => {
    if (!GA_MEASUREMENT_ID || typeof window === "undefined") return;

    const w = window as unknown as { dataLayer: unknown[]; gtag: (...args: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () {
      w.dataLayer.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", GA_MEASUREMENT_ID, { send_page_view: false });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.onload = () => {
      w.gtag("event", "page_view", {
        page_path: window.location.pathname + window.location.search,
        page_title: document.title,
      });
    };
    document.head.appendChild(script);
  }, []);

  // Send page_view on route change (SPA navigation); initial view is sent from script.onload
  const prevPathRef = React.useRef<string | null>(null);
  useEffect(() => {
    if (!GA_MEASUREMENT_ID) return;
    const path = location.pathname + location.search;
    const isNavigation = prevPathRef.current !== null && prevPathRef.current !== path;
    prevPathRef.current = path;
    if (isNavigation) {
      const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
      if (typeof gtag === "function") {
        gtag("event", "page_view", { page_path: path, page_title: document.title });
      }
    }
  }, [location.pathname, location.search]);

  return null;
}
