/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_PUBLISHABLE_KEY?: string;
  /** Backend URL that POSTs create PaymentIntent and returns { clientSecret }. */
  readonly VITE_STRIPE_CREATE_PAYMENT_INTENT_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
