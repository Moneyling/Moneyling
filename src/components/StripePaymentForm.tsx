/**
 * Stripe Payment Element. Requires backend to create PaymentIntent and return clientSecret.
 * Set VITE_STRIPE_PUBLISHABLE_KEY and VITE_STRIPE_CREATE_PAYMENT_INTENT_URL.
 */

import React, { useState, useEffect } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import type { Stripe } from "@stripe/stripe-js";
import { Lock } from "lucide-react";

const DEFAULT_AMOUNT = 5000; // $50.00 in cents

function PaymentFormInner({
  clientSecret,
  amountLabel,
  onSuccess,
  onError,
}: {
  clientSecret: string;
  amountLabel: string;
  onSuccess: () => void;
  onError: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setLoading(true);
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment?success=1`,
          receipt_email: undefined,
          payment_method_data: {
            billing_details: {
              name: undefined,
              email: undefined,
              address: undefined,
            },
          },
        },
      });
      if (error) {
        onError(error.message ?? "Payment failed");
      } else {
        onSuccess();
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement
        options={{
          layout: "tabs",
          defaultCollapsed: false,
          radios: true,
          spacedAccordionItems: true,
        }}
        onReady={() => setReady(true)}
      />
      <button
        type="submit"
        disabled={!stripe || !elements || !ready || loading}
        className="btn-glass w-full font-raleway-bold text-sm py-3 px-4 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Processing…" : `Pay ${amountLabel}`}
      </button>
    </form>
  );
}

const stripeAppearance = {
  theme: "stripe" as const,
  variables: {
    colorPrimary: "#466431",
    borderRadius: "8px",
  },
};

export function StripePaymentForm({
  stripePromise,
  amountInCents,
  audience,
  plan,
  orderLabel,
  onMessage,
}: {
  stripePromise: Promise<Stripe | null>;
  amountInCents?: number;
  audience?: string | null;
  plan?: string | null;
  orderLabel?: string;
  onMessage?: (msg: string) => void;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const amount = amountInCents ?? DEFAULT_AMOUNT;
  const amountLabel = `$${(amount / 100).toFixed(2)}`;

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_STRIPE_CREATE_PAYMENT_INTENT_URL;
    if (!apiUrl) {
      setError("Payment backend not configured. Set VITE_STRIPE_CREATE_PAYMENT_INTENT_URL.");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            currency: "usd",
            metadata: { audience: audience ?? undefined, plan: plan ?? undefined },
          }),
        });
        if (!res.ok) {
          const t = await res.text();
          throw new Error(t || `Server error ${res.status}`);
        }
        const data = await res.json();
        const secret = data.clientSecret ?? data.client_secret;
        if (!secret && !cancelled) {
          setError("Invalid response: missing clientSecret");
          return;
        }
        if (!cancelled) setClientSecret(secret);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to start payment");
      }
    })();
    return () => { cancelled = true; };
  }, [amount, audience, plan]);

  if (success) {
    return (
      <div className="card-glass rounded-lg p-6 text-center">
        <p className="text-primary font-raleway-bold">Payment submitted successfully.</p>
        <p className="text-sm text-body-color mt-1">You will be redirected to the confirmation page.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border-2 border-dashed border-amber-300 bg-amber-50 p-6 text-center">
        <p className="text-sm text-amber-800 font-raleway-medium">{error}</p>
        <p className="text-xs text-amber-700 mt-2">
          Backend should POST accept <code className="bg-amber-100 px-1 rounded">{`{ amount, currency, metadata? }`}</code> and return <code className="bg-amber-100 px-1 rounded">{`{ clientSecret }`}</code>.
        </p>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="rounded-lg border border-primary/20 bg-white p-8 text-center">
        <p className="text-body-color font-raleway-medium">Loading secure payment form…</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-primary font-raleway-bold text-sm">
        <Lock className="w-4 h-4 shrink-0" aria-hidden />
        <span>Secure payment by Stripe</span>
      </div>
      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: stripeAppearance,
        }}
      >
        <PaymentFormInner
          clientSecret={clientSecret}
          amountLabel={amountLabel}
          onSuccess={() => setSuccess(true)}
          onError={(msg) => { setError(msg); onMessage?.(msg); }}
        />
      </Elements>
    </div>
  );
}
