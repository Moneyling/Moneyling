/**
 * Moneyling.org – Home: clear path selection (Educator vs Financial Institution).
 * Funnel-first: one choice, then tailored pages and CTAs.
 */

import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const BASE = import.meta.env.BASE_URL;
const EDUCATOR_IMG = `${BASE}${encodeURIComponent("Educator Pic.png")}`;
const FI_IMG = `${BASE}${encodeURIComponent("Financial Instittutions Pic.png")}`;
const INDIVIDUALS_IMG = `${BASE}general-users.png`;

export function HomePage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-1 sm:px-2 lg:px-3 py-12 sm:py-16">
      {/* What is Moneyling? */}
      <section className="text-center mb-12 sm:mb-14">
        <h1 className="text-2xl sm:text-3xl font-raleway-bold text-primary mb-6">
          What is Moneyling?
        </h1>
        <p className="text-body-color font-raleway-medium text-base sm:text-lg max-w-5xl mx-auto">
          Moneyling comes from Money + Lingo (linguistics) — decoding the language of money so it’s accessible and familiar. But “Ling” is also about action: we don’t stop at words — we give people the tools, frameworks, and weekly tasks to put financial knowledge into practice. <span className="text-primary font-raleway-bold">Learn it. Speak it. Live it. That’s Moneyling.</span>
        </p>
      </section>

      {/* Path question – Are you… */}
      <section className="text-center mb-12 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-raleway-bold text-primary leading-tight">
          Are you…
        </h2>
      </section>

      {/* Three paths – Educator, Financial Institution, For Individuals. Title/image heights fixed so images align in row view. */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-14 items-start">
        <Link
          to="/for-educators"
          className="card-glass group relative rounded-2xl p-8 sm:p-10 shadow-[0px_8px_24px_rgba(69,100,50,0.12)] hover:shadow-[0px_12px_32px_rgba(119,164,64,0.15)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 h-full flex flex-col"
        >
          <div className="flex flex-col items-center text-center flex-1">
            <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-2 min-h-[3.5rem] flex items-center justify-center">
              … an Educator
            </h2>
            <div className="w-full h-44 rounded-2xl overflow-hidden bg-white/40 border border-white/50 mb-5 group-hover:bg-white/50 transition-colors shrink-0 flex items-center justify-center">
              <img src={EDUCATOR_IMG} alt="Educator – financial literacy for schools and community programs" className="w-full h-full object-cover" />
            </div>
            <p className="text-body-color font-raleway-medium text-sm sm:text-base mb-6">
              Schools, nonprofits, libraries, and instructors teaching real-world money skills.
            </p>
            <span className="inline-flex items-center gap-2 text-primary font-raleway-bold text-sm group-hover:gap-3 transition-all mt-auto">
              See how it works
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>

        <Link
          to="/for-financial-institutions"
          className="card-glass group relative rounded-2xl p-8 sm:p-10 shadow-[0px_8px_24px_rgba(69,100,50,0.12)] hover:shadow-[0px_12px_32px_rgba(119,164,64,0.15)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 h-full flex flex-col"
        >
          <div className="flex flex-col items-center text-center flex-1">
            <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-2 min-h-[3.5rem] flex items-center justify-center">
              … a Financial Institution
            </h2>
            <div className="w-full h-44 rounded-2xl overflow-hidden bg-white/40 border border-white/50 mb-5 group-hover:bg-white/50 transition-colors shrink-0 flex items-center justify-center">
              <img src={FI_IMG} alt="" className="w-full h-full object-cover" />
            </div>
            <p className="text-body-color font-raleway-medium text-sm sm:text-base mb-6">
              Banks, credit unions, and CDFIs building trust and impact through financial literacy.
            </p>
            <span className="inline-flex items-center gap-2 text-primary font-raleway-bold text-sm group-hover:gap-3 transition-all mt-auto">
              See how it works
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </Link>

        <Link
          to="/individuals"
          className="card-glass group relative rounded-2xl p-8 sm:p-10 shadow-[0px_8px_24px_rgba(69,100,50,0.12)] hover:shadow-[0px_12px_32px_rgba(119,164,64,0.15)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 h-full flex flex-col"
        >
          <div className="flex flex-col items-center text-center flex-1">
            <h2 className="text-xl sm:text-2xl font-raleway-bold text-primary mb-2 min-h-[3.5rem] flex items-center justify-center">
              … an Individual
            </h2>
            <div className="w-full h-44 rounded-2xl overflow-hidden bg-white/40 border border-white/50 mb-5 group-hover:bg-white/50 transition-colors shrink-0 flex items-center justify-center">
              <img src={INDIVIDUALS_IMG} alt="Individuals using Dreamlife-Sim app on their phones" className="w-full h-full object-cover" />
            </div>
            <p className="text-body-color font-raleway-medium text-sm sm:text-base mb-6">
              Dreamlife-Sim: financial navigation, micro-tasks, and lessons to reach your goals.
            </p>
            <span className="inline-flex items-center gap-2 text-primary font-raleway-bold text-sm group-hover:gap-3 transition-all mt-auto">
              For Individuals
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
