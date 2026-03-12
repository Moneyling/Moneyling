/**
 * Moneyling.org – My Cart. Order summary; checkout and PO flows removed from this page.
 */

import React, { useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, Printer, FileDown, Mail } from "lucide-react";
import { useCart } from "../context/CartContext";

const DEFAULT_AMOUNT_CENTS = 5000;
const W9_URL = `${import.meta.env.BASE_URL}${encodeURIComponent("W-9 Moneyling.pdf")}`;
const PRICING_EMAIL = "info@moneyling.org";
const BUSINESS_PHONE = "1-844-777-6773";
const LOGO_URL = `${import.meta.env.BASE_URL}moneyling-logo-text.png`;

export function PaymentPage() {
  const [searchParams] = useSearchParams();
  const audience = searchParams.get("audience");
  const plan = searchParams.get("plan");
  const amountParam = searchParams.get("amount");
  const success = searchParams.get("success") === "1";
  const { items, totalCents, clearCart } = useCart();

  const amountInCents = useMemo(() => {
    if (totalCents > 0) return totalCents;
    if (!amountParam) return DEFAULT_AMOUNT_CENTS;
    const n = parseInt(amountParam, 10);
    return Number.isFinite(n) && n > 0 ? n : DEFAULT_AMOUNT_CENTS;
  }, [totalCents, amountParam]);

  useEffect(() => {
    if (success) clearCart();
  }, [success, clearCart]);

  const handlePrintCart = () => {
    window.print();
  };

  const audienceLabel =
    audience === "educator"
      ? "Educator"
      : audience === "financial-institution"
        ? "Financial Institution"
        : null;

  const emailCartHref = useMemo(() => {
    const subject = encodeURIComponent("Pricing request – My Cart");
    const bodyLines = [
      "Please provide your details:",
      "",
      "Name:",
      "Email:",
      "School / District or Organization:",
      "Phone (optional):",
      "",
      "---",
      "Cart items I'm requesting pricing for:",
      "",
      items.length > 0
        ? items.map((item) => `• ${item.code} — ${item.name}`).join("\n")
        : "(Cart is empty – please let me know how to add items.)",
      "",
      "Thank you.",
    ];
    const body = encodeURIComponent(bodyLines.join("\n"));
    return `mailto:${PRICING_EMAIL}?subject=${subject}&body=${body}`;
  }, [items]);

  if (success) {
    return (
      <div className="w-full max-w-2xl mx-auto px-1 sm:px-2 lg:px-3 py-10 sm:py-14">
        <div className="card-glass rounded-2xl p-8 sm:p-10 text-center">
          <div className="icon-glass w-14 h-14 mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-primary" aria-hidden />
          </div>
          <h1 className="text-2xl font-raleway-bold text-primary mb-2">Payment received</h1>
          <p className="text-body-color font-raleway-medium mb-6">
            Thank you. You’ll receive a confirmation and receipt by email.
          </p>
          <Link
            to="/"
            className="btn-glass inline-flex items-center justify-center text-sm font-raleway-bold py-3 px-6"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-1 sm:px-2 lg:px-3 py-10 sm:py-14">
      <div className="no-print">
      <Link
        to="/for-educators"
        className="inline-flex items-center gap-2 text-sm font-raleway-medium text-primary hover:underline mb-8"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden />
        Back to For Educators
      </Link>

      <h1 className="text-3xl sm:text-4xl font-raleway-bold text-primary mb-2">
        My Cart
      </h1>
      {audienceLabel && (
        <p className="text-primary font-raleway-bold text-sm uppercase tracking-wider mb-4">
          {audienceLabel}
          {plan ? ` · ${decodeURIComponent(plan)}` : ""}
        </p>
      )}
      <p className="text-body-color font-raleway-medium mb-6">
        Review your order below. Questions or ready to complete your order?{" "}
        <Link to="/contact" className="text-primary font-raleway-bold hover:underline">
          Contact us
        </Link>.
      </p>

      {/* Order summary — neutral (non-green) */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 mb-4 shadow-sm">
        <h2 className="text-sm font-raleway-bold text-primary uppercase tracking-wider mb-3">
          Order summary
        </h2>
        {items.length > 0 ? (
          <div className="space-y-2 text-sm text-body-color font-raleway-medium">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-2">
                <span>
                  <span className="text-primary font-raleway-bold text-xs uppercase">{item.code}</span>
                  {" — "}
                  {item.name}
                </span>
                {item.amountInCents != null && item.amountInCents > 0 ? (
                  <span className="font-raleway-bold text-primary shrink-0">
                    ${(item.amountInCents / 100).toFixed(2)}
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2 text-sm text-body-color font-raleway-medium">
            <p>Your cart is empty. Add programs or courses from the For Educators page.</p>
          </div>
        )}
      </section>

      {/* Save/Print cart + Download W-9 + Email for pricing */}
      <div className="flex flex-wrap gap-3 mb-8">
        <a
          href={emailCartHref}
          className="btn-glass inline-flex items-center gap-2 px-4 py-2.5 text-sm font-raleway-bold"
          aria-label="Email cart to Moneyling for pricing"
        >
          <Mail className="w-4 h-4 shrink-0" aria-hidden />
          Email Cart to Moneyling for Pricing
        </a>
        <button
          type="button"
          onClick={handlePrintCart}
          className="btn-glass inline-flex items-center gap-2 px-4 py-2.5 text-sm font-raleway-bold"
        >
          <Printer className="w-4 h-4 shrink-0" aria-hidden />
          Save / Print cart (for PO)
        </button>
        <a
          href={W9_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-glass inline-flex items-center gap-2 px-4 py-2.5 text-sm font-raleway-bold"
        >
          <FileDown className="w-4 h-4 shrink-0" aria-hidden />
          Download Moneyling W-9
        </a>
      </div>

      </div>

      {/* Print-only content: cart summary for PO (logo, contact, cart) */}
      <div className="hidden print:block p-6 print-only">
        <div className="mb-6">
          <img src={LOGO_URL} alt="Moneyling" className="h-10 w-auto mb-4" />
          <p className="text-sm text-body-color">
            <a href={`mailto:${PRICING_EMAIL}`} className="text-primary font-raleway-bold no-underline">{PRICING_EMAIL}</a>
            {" · "}
            <a href={`tel:${BUSINESS_PHONE.replace(/\D/g, "")}`} className="text-primary font-raleway-bold no-underline">{BUSINESS_PHONE}</a>
            {" · "}
            moneyling.org
          </p>
        </div>
        <h2 className="text-xl font-raleway-bold text-primary mb-2">Cart for Purchase Order</h2>
        <p className="text-sm text-body-color mb-4">Date: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
        {items.length > 0 ? (
          <ul className="list-disc list-inside text-sm text-body-color space-y-1">
            {items.map((item) => (
              <li key={item.id}>
                <span className="font-raleway-bold text-primary">{item.code}</span> — {item.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-body-color">Cart is empty.</p>
        )}
      </div>

      <p className="text-center text-sm text-body-color font-raleway-medium mt-8">
        Need an invoice or have questions?{" "}
        <Link to="/contact" className="text-primary font-raleway-bold hover:underline">
          Contact us
        </Link>
      </p>

      <style>{`@media print { .no-print { display: none !important; } }`}</style>
    </div>
  );
}
