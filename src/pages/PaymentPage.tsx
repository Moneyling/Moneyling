/**
 * Moneyling.org – Payment page with Stripe. Uses cart when available; supports ?audience=, ?plan=, ?amount= (cents), ?success=1.
 * Set VITE_STRIPE_PUBLISHABLE_KEY and VITE_STRIPE_CREATE_PAYMENT_INTENT_URL.
 */

import React, { useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { StripePaymentForm } from "../components/StripePaymentForm";
import { useCart } from "../context/CartContext";

const DEFAULT_AMOUNT_CENTS = 5000; // $50.00

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
      <p className="text-body-color font-raleway-medium mb-8">
        Review your selection and complete payment below. You’ll receive a confirmation and receipt after payment.
      </p>

      {/* Order summary */}
      <section className="rounded-xl border border-primary/20 bg-white p-5 sm:p-6 mb-6 shadow-sm">
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

      {/* Stripe payment form */}
      <section className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 sm:p-8">
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

      <p className="text-center text-sm text-body-color font-raleway-medium mt-8">
        Need an invoice or have questions?{" "}
        <Link to="/contact" className="text-primary font-raleway-bold hover:underline">
          Contact us
        </Link>
      </p>
    </div>
  );
}
