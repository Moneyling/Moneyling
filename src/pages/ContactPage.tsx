/**
 * Moneyling.org – Contact page. Funnel endpoint; supports ?audience=educator|financial-institution.
 */

import React from "react";
import { useSearchParams } from "react-router-dom";

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const audience = searchParams.get("audience");

  const audienceLabel =
    audience === "educator"
      ? "Educator (request access)"
      : audience === "financial-institution"
        ? "Financial Institution (request demo)"
        : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
      <h1 className="text-3xl sm:text-4xl font-raleway-bold text-primary mb-4">
        Get in touch
      </h1>
      {audienceLabel && (
        <p className="text-primary font-raleway-bold text-sm uppercase tracking-wider mb-4">
          {audienceLabel}
        </p>
      )}
      <p className="text-body-color font-raleway-medium mb-8">
        Add your contact form, email, or calendar link here. Use the audience
        above to route leads (educator vs. financial institution) when you
        connect a form or CRM.
      </p>
      <div className="rounded-xl border-2 border-dashed border-brand-green/50 bg-gray-50/80 p-8 text-center">
        <p className="text-sm text-gray-500 font-raleway-medium">
          Contact form or CTA will go here (e.g. Typeform, Calendly, or
          email link).
        </p>
      </div>
    </div>
  );
}
