"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { SUPPORTED_CURRENCIES, getCurrencyByCode } from "lib/currency/types";
import { useState } from "react";
import { useCurrency } from "./currency-context";

export default function CurrencySwitcher() {
  const { selectedCurrency, setCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currentCurrency = getCurrencyByCode(selectedCurrency);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
      >
        <span className="text-lg">{currentCurrency.flag}</span>
        <span className="font-medium">{currentCurrency.code}</span>
        <ChevronDownIcon
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-20">
            <div className="py-1">
              {SUPPORTED_CURRENCIES.map((currency) => (
                <button
                  key={currency.code}
                  onClick={() => {
                    setCurrency(currency.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    selectedCurrency === currency.code
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  <span className="text-lg">{currency.flag}</span>
                  <div className="flex-1">
                    <div className="font-medium">{currency.code}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {currency.name}
                    </div>
                  </div>
                  <span className="text-sm font-medium">{currency.symbol}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
