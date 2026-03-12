/**
 * Moneyling.org – Contact page. Funnel endpoint; supports ?audience=educator|financial-institution.
 */

import React from "react";
import { useSearchParams } from "react-router-dom";
import { Calendar, Mail, Phone } from "lucide-react";

const CALENDLY_URL = "https://calendly.com/savanha-moneyling/30min";
const BUSINESS_EMAIL = "Info@moneyling.org";
const BUSINESS_PHONE = "1-844-777-6773";

export function ContactPage() {
  const [searchParams] = useSearchParams();
  const audience = searchParams.get("audience");
  const intent = searchParams.get("intent");

  const isPO = intent === "po";
  const audienceLabel =
    audience === "educator"
      ? isPO
        ? "Complete order with Purchase Order"
        : "Educator (request access)"
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
      {isPO ? (
        <p className="text-body-color font-raleway-medium mb-8">
          Submit your Purchase Order details below. Include your PO number, school or district name, and the cart items you selected so we can complete your order quickly.
        </p>
      ) : (
        <p className="text-body-color font-raleway-medium mb-8">
          Schedule a call or reach out by email or phone. Use the audience
          above so we can tailor our response.
        </p>
      )}

      <div className="space-y-6">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glass flex items-center justify-center gap-2 text-base font-raleway-bold py-4 px-6"
        >
          <Calendar className="w-5 h-5 shrink-0" aria-hidden />
          Schedule a 30-min call on Calendly
        </a>

        <div className="card-glass rounded-xl p-6 space-y-3 text-primary">
          <a
            href={`mailto:${BUSINESS_EMAIL}`}
            className="flex items-center gap-2 font-raleway-medium hover:opacity-90"
          >
            <Mail className="w-4 h-4 shrink-0" aria-hidden />
            {BUSINESS_EMAIL}
          </a>
          <span className="flex items-center gap-2 font-raleway-medium">
            <Phone className="w-4 h-4 shrink-0" aria-hidden />
            {BUSINESS_PHONE ? (
              <a href={`tel:${BUSINESS_PHONE.replace(/\D/g, "")}`} className="hover:text-primary">
                {BUSINESS_PHONE}
              </a>
            ) : (
              "Phone: (add business number from moneyling.org)"
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
