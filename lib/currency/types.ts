export type CurrencyCode = "GBP" | "USD" | "EUR";

export interface Currency {
  code: CurrencyCode;
  name: string;
  symbol: string;
  flag: string;
  locale: string;
  stripeCode: string; // Stripe currency code (lowercase)
}

export interface ExchangeRates {
  base: CurrencyCode;
  rates: Record<CurrencyCode, number>;
  lastUpdated: string;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    flag: "🇬🇧",
    locale: "en-GB",
    stripeCode: "gbp",
  },
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    flag: "🇺🇸",
    locale: "en-US",
    stripeCode: "usd",
  },
  {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    flag: "🇪🇺",
    locale: "en-EU",
    stripeCode: "eur",
  },
];

export const DEFAULT_CURRENCY: CurrencyCode = "GBP";

export function getCurrencyByCode(code: CurrencyCode): Currency {
  const currency = SUPPORTED_CURRENCIES.find(
    (currency) => currency.code === code
  );
  return currency ?? SUPPORTED_CURRENCIES[0]!;
}
