"use client";

import { getExchangeRates } from "lib/currency/exchange-rates";
import {
  CurrencyCode,
  DEFAULT_CURRENCY,
  ExchangeRates,
} from "lib/currency/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface CurrencyContextType {
  selectedCurrency: CurrencyCode;
  exchangeRates: ExchangeRates | null;
  isLoading: boolean;
  setCurrency: (currency: CurrencyCode) => void;
  refreshRates: () => Promise<void>;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

const CURRENCY_STORAGE_KEY = "selected-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] =
    useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);

  // Load saved currency from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCurrency = localStorage.getItem(
        CURRENCY_STORAGE_KEY
      ) as CurrencyCode;
      if (savedCurrency && ["GBP", "USD", "EUR"].includes(savedCurrency)) {
        setSelectedCurrency(savedCurrency);
      }
    }
  }, []);

  // Fetch exchange rates when component mounts or currency changes
  useEffect(() => {
    fetchExchangeRates();
  }, [selectedCurrency]);

  const fetchExchangeRates = async () => {
    setIsLoading(true);
    try {
      const rates = await getExchangeRates(selectedCurrency);
      setExchangeRates(rates);
    } catch (error) {
      console.error("Failed to fetch exchange rates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const setCurrency = (currency: CurrencyCode) => {
    setSelectedCurrency(currency);
    if (typeof window !== "undefined") {
      localStorage.setItem(CURRENCY_STORAGE_KEY, currency);
    }
  };

  const refreshRates = async () => {
    await fetchExchangeRates();
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        exchangeRates,
        isLoading,
        setCurrency,
        refreshRates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
