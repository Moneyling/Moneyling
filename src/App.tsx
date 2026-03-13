/**
 * Moneyling.org – Parent website.
 * Global settings and logos preserved; pages built from scratch.
 */

import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ForEducatorsPage } from "./pages/ForEducatorsPage";
import { ForFinancialInstitutionsPage } from "./pages/ForFinancialInstitutionsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { PaymentPage } from "./pages/PaymentPage";
import { IndividualsPage } from "./pages/IndividualsPage";

// Support both project URL (e.g. /Moneyling/) and root (custom domain or Azure)
const pathname = typeof window !== "undefined" ? window.location.pathname : "";
const basename = pathname.startsWith("/Moneyling") ? "/Moneyling" : "";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <CartProvider>
          <Layout>
            <Outlet />
          </Layout>
        </CartProvider>
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: "for-educators", element: <ForEducatorsPage /> },
        { path: "for-financial-institutions", element: <ForFinancialInstitutionsPage /> },
        { path: "individuals", element: <IndividualsPage /> },
        { path: "about", element: <AboutPage /> },
        { path: "contact", element: <ContactPage /> },
        { path: "payment", element: <PaymentPage /> },
      ],
    },
  ],
  { basename }
);

export default function App() {
  return <RouterProvider router={router} />;
}
