import { CurrencyCode, ExchangeRates } from "./types";

// Free exchange rate API (you can replace with a paid service for production)
const EXCHANGE_API_URL = "https://api.exchangerate-api.com/v4/latest";

// Cache for exchange rates
let cachedRates: ExchangeRates | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export async function getExchangeRates(
  baseCurrency: CurrencyCode = "GBP"
): Promise<ExchangeRates> {
  // Check if we have cached rates that are still valid
  if (
    cachedRates &&
    cachedRates.base === baseCurrency &&
    Date.now() - new Date(cachedRates.lastUpdated).getTime() < CACHE_DURATION
  ) {
    return cachedRates;
  }

  try {
    const response = await fetch(`${EXCHANGE_API_URL}/${baseCurrency}`);
    const data = await response.json();

    const rates: ExchangeRates = {
      base: baseCurrency,
      rates: {
        GBP: data.rates.GBP || 1,
        USD: data.rates.USD || 1.27,
        EUR: data.rates.EUR || 1.17,
      },
      lastUpdated: new Date().toISOString(),
    };

    // Cache the rates
    cachedRates = rates;

    return rates;
  } catch (error) {
    console.error("Failed to fetch exchange rates:", error);

    // Return fallback rates if API fails
    return {
      base: baseCurrency,
      rates: {
        GBP: 1,
        USD: 1.27,
        EUR: 1.17,
      },
      lastUpdated: new Date().toISOString(),
    };
  }
}

export function convertPrice(
  amount: string | number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
  rates: ExchangeRates
): string {
  if (fromCurrency === toCurrency) {
    return typeof amount === "string" ? amount : amount.toString();
  }

  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    return "0";
  }

  // Convert to base currency first, then to target currency
  let convertedAmount: number;

  if (fromCurrency === rates.base) {
    // From base currency to target
    convertedAmount = numAmount * rates.rates[toCurrency];
  } else if (toCurrency === rates.base) {
    // From source currency to base
    convertedAmount = numAmount / rates.rates[fromCurrency];
  } else {
    // From source to base, then base to target
    const baseAmount = numAmount / rates.rates[fromCurrency];
    convertedAmount = baseAmount * rates.rates[toCurrency];
  }

  return convertedAmount.toFixed(2);
}

export function formatPrice(
  amount: string | number,
  currency: CurrencyCode,
  locale?: string
): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(numAmount)) {
    return "0";
  }

  // Use Intl.NumberFormat for proper currency formatting
  const formatter = new Intl.NumberFormat(locale || "en-GB", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(numAmount);
}
