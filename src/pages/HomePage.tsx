/**
 * Moneyling.org – Home: clear path selection (Educator vs Financial Institution).
 * Funnel-first: one choice, then tailored pages and CTAs.
 */

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BASE = import.meta.env.BASE_URL;
const EDUCATOR_IMG = `${BASE}Educator Pic.png`;
const FI_IMG = `${BASE}Financial Instittutions Pic.png`;

export function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16">
      {/* Hero + tagline + single question */}
      <section className="text-center mb-12 sm:mb-14">
        <p className="text-primary font-raleway-bold text-base sm:text-lg mb-3">
          Learn it. Speak it. Live it. That’s Moneyling.
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-raleway-bold text-primary leading-tight">
          Are you…
        </h1>
        <p className="text-body-color font-raleway-medium text-lg mt-4 max-w-2xl mx-auto">
          Choose your path below. We’ll show you how Moneyling fits your goals and how to get started.
        </p>
      </section>

      {/* Two clear paths – primary CTAs */}
      <section className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-14">
        <Link
          to="/for-educators"
          className="group relative rounded-2xl border-2 border-primary/30 bg-white p-8 sm:p-10 shadow-[0px_8px_24px_rgba(69,100,50,0.12)] hover:border-primary-light hover:shadow-[0px_12px_32px_rgba(119,164,64,0.15)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-2">
              I’m an Educator
            </h2>
            <div className="w-full aspect-[4/3] max-h-48 rounded-2xl overflow-hidden bg-primary/5 border border-primary-light/30 mb-5 group-hover:border-primary-light/50 transition-colors">
              <img src={EDUCATOR_IMG} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="text-body-color font-raleway-medium text-sm sm:text-base mb-6">
              Schools, nonprofits, libraries, and instructors teaching real-world money skills.
            </p>
            <span className="inline-flex items-center gap-2 text-primary font-raleway-bold text-sm group-hover:gap-3 transition-all">
              See how it works
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>

        <Link
          to="/for-financial-institutions"
          className="group relative rounded-2xl border-2 border-primary/30 bg-white p-8 sm:p-10 shadow-[0px_8px_24px_rgba(69,100,50,0.12)] hover:border-primary-light hover:shadow-[0px_12px_32px_rgba(119,164,64,0.15)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
        >
          <div className="flex flex-col items-center text-center">
            <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-2">
              I’m a Financial Institution
            </h2>
            <div className="w-full aspect-[4/3] max-h-48 rounded-2xl overflow-hidden bg-primary/5 border border-primary-light/30 mb-5 group-hover:border-primary-light/50 transition-colors">
              <img src={FI_IMG} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="text-body-color font-raleway-medium text-sm sm:text-base mb-6">
              Banks, credit unions, and CDFIs building trust and impact through financial literacy.
            </p>
            <span className="inline-flex items-center gap-2 text-primary font-raleway-bold text-sm group-hover:gap-3 transition-all">
              See how it works
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>
      </section>

      {/* Trust / one-liner */}
      <p className="text-center text-sm text-gray-500 font-raleway-medium">
        One platform. Standards-aligned curriculum. Measurable outcomes for learners and partners.
      </p>
    </div>
  );
}
