/**
 * Moneyling.org – Parent website.
 * Global settings and logos preserved; pages built from scratch.
 */

import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { ForEducatorsPage } from "./pages/ForEducatorsPage";
import { ForFinancialInstitutionsPage } from "./pages/ForFinancialInstitutionsPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Layout>
          <Outlet />
        </Layout>
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: "for-educators", element: <ForEducatorsPage /> },
        { path: "for-financial-institutions", element: <ForFinancialInstitutionsPage /> },
        { path: "about", element: <AboutPage /> },
        { path: "contact", element: <ContactPage /> },
      ],
    },
  ],
  { basename }
);

export default function App() {
  return <RouterProvider router={router} />;
}
