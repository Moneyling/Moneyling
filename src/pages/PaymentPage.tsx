/**
 * Moneyling.org – My Cart. Supports PO workflow (save/print cart, W-9, return to complete) and pay by card.
 */

import React, { useMemo, useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { ArrowLeft, CheckCircle, Printer, FileDown, CreditCard } from "lucide-react";
import { StripePaymentForm } from "../components/StripePaymentForm";
import { useCart } from "../context/CartContext";

const DEFAULT_AMOUNT_CENTS = 5000;
const W9_URL = "/W-9.pdf"; // Place PDF in public folder, or set via env

export function PaymentPage() {
  const [searchParams] = useSearchParams();
  const audience = searchParams.get("audience");
  const plan = searchParams.get("plan");
  const amountParam = searchParams.get("amount");
  const success = searchParams.get("success") === "1";
  const { items, totalCents, clearCart } = useCart();
  const [poFile, setPoFile] = useState<File | null>(null);

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

  const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
  const stripePromise = useMemo(
    () => (publishableKey ? loadStripe(publishableKey) : null),
    [publishableKey]
  );

  const contactWithPO = "/contact?audience=educator&intent=po";

  if (success) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
        <div className="rounded-2xl bg-primary/10 border-2 border-primary/20 p-8 sm:p-10 text-center">
          <CheckCircle className="w-14 h-14 text-primary mx-auto mb-4" aria-hidden />
          <h1 className="text-2xl font-raleway-bold text-primary mb-2">Payment received</h1>
          <p className="text-body-color font-raleway-medium mb-6">
            Thank you. You’ll receive a confirmation and receipt by email.
          </p>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-white font-raleway-bold text-sm py-3 px-6 hover:bg-primary/90"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-14">
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
        Pay by card or use a Purchase Order. For PO: save/print your cart, download our W-9, get approval from your school, then return to complete your order.
      </p>

      {/* Order summary */}
      <section className="rounded-xl border border-primary/20 bg-white p-5 sm:p-6 mb-4 shadow-sm">
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
            <div className="border-t border-gray-light pt-3 mt-3 flex justify-between text-base font-raleway-bold text-primary">
              <span>Total</span>
              <span>${(amountInCents / 100).toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-sm text-body-color font-raleway-medium">
            <p>Your cart is empty. Add programs or courses from the For Educators page.</p>
            <div className="flex justify-between pt-2">
              <span>Amount</span>
              <span className="font-raleway-bold text-primary">${(amountInCents / 100).toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-light pt-3 mt-3 flex justify-between text-base font-raleway-bold text-primary">
              <span>Total</span>
              <span>${(amountInCents / 100).toFixed(2)}</span>
            </div>
          </div>
        )}
      </section>

      {/* Check out or Purchase Order */}
      <div className="flex flex-wrap gap-4 mb-6">
        <a
          href="#pay-by-card"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-white font-raleway-bold text-sm py-3 px-6 hover:bg-primary/90 transition-colors border-2 border-primary shadow-md"
        >
          <CreditCard className="w-4 h-4 shrink-0" aria-hidden />
          Check out
        </a>
        <a
          href="#purchase-order"
          className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary bg-white text-primary font-raleway-bold text-sm py-3 px-6 hover:bg-primary/10 transition-colors"
        >
          Purchase Order
        </a>
      </div>

      {/* Save/Print cart + Download W-9 — for PO workflow */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          type="button"
          onClick={handlePrintCart}
          className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-white px-4 py-2.5 text-sm font-raleway-bold text-primary hover:bg-primary/10 transition-colors"
        >
          <Printer className="w-4 h-4 shrink-0" aria-hidden />
          Save / Print cart (for PO)
        </button>
        <a
          href={W9_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border-2 border-primary bg-white px-4 py-2.5 text-sm font-raleway-bold text-primary hover:bg-primary/10 transition-colors"
        >
          <FileDown className="w-4 h-4 shrink-0" aria-hidden />
          Download Moneyling W-9
        </a>
      </div>

      </div>

      {/* Print-only content: cart summary for PO */}
      <div className="hidden print:block p-6 print-only">
        <h2 className="text-xl font-raleway-bold text-primary mb-2">Moneyling – Cart for Purchase Order</h2>
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
        <p className="mt-4 text-sm font-raleway-bold text-primary">Total: ${(amountInCents / 100).toFixed(2)}</p>
        <p className="mt-4 text-xs text-body-color">Moneyling · info@moneyling.org · moneyling.org</p>
      </div>

      {/* Two paths: PO vs Pay by card */}
      <div className="space-y-8">
        {/* Path 1: Purchase Order — upload box */}
        <section id="purchase-order" className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 sm:p-8 scroll-mt-6">
          <h2 className="text-lg font-raleway-bold text-primary mb-2 flex items-center gap-2">
            Purchase Order
          </h2>
          <p className="text-sm text-body-color font-raleway-medium mb-4">
            Upload your PO (PDF or image). You can also save/print your cart and download our W-9 above, then return here with your PO.
          </p>
          <div className="rounded-xl border-2 border-dashed border-primary/40 bg-white p-8 text-center mb-4">
            <label htmlFor="po-upload" className="cursor-pointer block">
              <input
                id="po-upload"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                className="sr-only"
                aria-describedby="po-upload-hint"
                onChange={(e) => setPoFile(e.target.files?.[0] ?? null)}
              />
              <span className="text-primary font-raleway-bold text-sm">
                {poFile ? poFile.name : "Choose file"}
              </span>
              <span id="po-upload-hint" className="block text-body-color font-raleway-medium text-sm mt-1">
                PDF, PNG, or JPG
              </span>
            </label>
          </div>
          <Link
            to={contactWithPO}
            className="inline-flex items-center justify-center rounded-lg bg-primary text-white font-raleway-bold text-sm py-3 px-6 hover:bg-primary/90 transition-colors"
          >
            Submit PO / Complete order
          </Link>
        </section>

        {/* Path 2: Pay by card now (Stripe) */}
        <section id="pay-by-card" className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 sm:p-8 scroll-mt-6">
          <h2 className="text-lg font-raleway-bold text-primary mb-2 flex items-center gap-2">
            <CreditCard className="w-5 h-5 shrink-0" aria-hidden />
            Pay by card now
          </h2>
          {!publishableKey ? (
            <div className="rounded-lg border-2 border-dashed border-amber-300 bg-amber-50 p-6 text-center">
              <p className="text-sm text-amber-800 font-raleway-medium">
                Stripe is not configured. Add <code className="bg-amber-100 px-1 rounded">VITE_STRIPE_PUBLISHABLE_KEY</code> to your environment.
              </p>
            </div>
          ) : stripePromise ? (
            <StripePaymentForm
              stripePromise={stripePromise}
              amountInCents={amountInCents}
              audience={audience}
              plan={plan}
            />
          ) : null}
        </section>
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
