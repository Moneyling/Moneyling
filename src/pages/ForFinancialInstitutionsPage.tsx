/**
 * Moneyling.org – For Financial Institutions. Funnel page: benefits → how it works → CTA.
 */

import React from "react";
import { Link } from "react-router-dom";
import {
  Check,
  BarChart3,
  Link2,
  Users,
  ArrowRight,
} from "lucide-react";

export function ForFinancialInstitutionsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 sm:py-14">
      {/* Hero */}
      <section className="text-center mb-12 sm:mb-16">
        <p className="text-primary font-raleway-bold text-sm uppercase tracking-wider mb-3">
          For Financial Institutions
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-raleway-bold text-primary leading-tight">
          Turn community outreach into measurable impact
        </h1>
        <p className="text-body-color font-raleway-medium text-lg mt-4 max-w-2xl mx-auto">
          One platform to deliver financial education, match members to products, and prove ROI—without building it yourself.
        </p>
      </section>

      {/* Benefits */}
      <section className="mb-14">
        <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-6 text-center">
          Why institutions partner with Moneyling
        </h2>
        <ul className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[
            "CRA, financial literacy, and member-engagement goals in one place",
            "Product and milestone matching—surface the right products at the right time",
            "Partner dashboard: KPIs, funnel, and engagement in real time",
          ].map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-body-color font-raleway-medium"
            >
              <span className="shrink-0 w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center mt-0.5">
                <Check className="w-3.5 h-3.5 text-primary" />
              </span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* How it works */}
      <section className="mb-14">
        <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-8 text-center">
          How it works
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              step: "1",
              icon: Link2,
              title: "Connect your products",
              text: "Add links to checking, savings, loans, and more. We match content and prompts to member goals.",
            },
            {
              step: "2",
              icon: Users,
              title: "Reach your community",
              text: "Workshops, events, and in-app education. Members see your brand and your products when it matters.",
            },
            {
              step: "3",
              icon: BarChart3,
              title: "Measure and scale",
              text: "Dashboard with redirects, goals captured, touchpoints, and new engaged members—so you can report and optimize.",
            },
          ].map(({ step, icon: Icon, title, text }) => (
            <div
              key={step}
              className="rounded-xl border border-brand-green/40 bg-white p-6 shadow-sm"
            >
              <span className="text-xs font-raleway-bold text-primary uppercase tracking-wider">
                Step {step}
              </span>
              <div className="mt-3 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-raleway-bold text-primary mt-4 mb-2">
                {title}
              </h3>
              <p className="text-sm text-body-color font-raleway-medium">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Primary CTA */}
      <section className="rounded-2xl bg-primary/10 border border-primary-light/30 p-8 sm:p-10 text-center">
        <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-3">
          Ready to see the platform?
        </h2>
        <p className="text-body-color font-raleway-medium text-sm sm:text-base mb-6 max-w-xl mx-auto">
          Request a demo. We’ll show you the member experience and the partner dashboard, and answer your compliance and integration questions.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact?audience=financial-institution"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90 transition-colors px-6 py-3"
          >
            Request a demo
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </section>

      {/* Cross-sell */}
      <p className="text-center mt-8 text-sm text-gray-500 font-raleway-medium">
        An educator or school?{" "}
        <Link
          to="/for-educators"
          className="text-primary font-raleway-bold underline hover:no-underline"
        >
          See our Educator path
        </Link>
      </p>
    </div>
  );
}
