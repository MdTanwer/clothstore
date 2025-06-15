import { CurrencyCode } from "lib/currency/types";
import Stripe from "stripe";

// Hardcoded Stripe keys (temporary fix)
const STRIPE_SECRET_KEY =
  "sk_test_51RaEpuAlPUuV7a5FSz2hDdKrTE0K0e1CQbxD7w8UoggtBpXBdZeOFVnP9cn80Rmu9Y1vcCVW6v6peqWRiUPanoOi00bJWHKVqF";
const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51RaEpuAlPUuV7a5FDTzwCwAiNOCzXWBs39NAqnOeDw2WTrknO13ow95cXoHKOejvu2Cc9RpdJIIKabpIukcTNRU700XQfpPoOn";

if (!STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-05-28.basil",
});

export const STRIPE_CONFIG = {
  publishableKey: STRIPE_PUBLISHABLE_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
  supportedCurrencies: ["gbp", "usd", "eur"] as const,
};

// Validate that publishable key is available
if (!STRIPE_CONFIG.publishableKey) {
  console.error("Stripe publishable key is not available");
}

export function getStripeCurrency(currency: CurrencyCode): string {
  const currencyMap: Record<CurrencyCode, string> = {
    GBP: "gbp",
    USD: "usd",
    EUR: "eur",
  };

  return currencyMap[currency] || "gbp";
}

export function formatAmountForStripe(
  amount: number,
  currency: CurrencyCode
): number {
  // Stripe expects amounts in the smallest currency unit
  // For GBP, USD, EUR: multiply by 100 (pence/cents)
  return Math.round(amount * 100);
}
