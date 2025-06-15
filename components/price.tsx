"use client";

import { useCurrency } from "components/currency/currency-context";
import { convertPrice, formatPrice } from "lib/currency/exchange-rates";
import { CurrencyCode } from "lib/currency/types";

const Price = ({
  amount,
  className,
  currencyCode = "GBP" as CurrencyCode,
  currencyCodeClassName,
  regularPrice,
  salePrice,
  ...props
}: {
  amount: string;
  className?: string;
  currencyCode?: CurrencyCode;
  currencyCodeClassName?: string;
  regularPrice?: string;
  salePrice?: string;
} & React.ComponentProps<"p">) => {
  const { selectedCurrency, exchangeRates } = useCurrency();

  const convertAndFormatPrice = (price: string): string => {
    if (!exchangeRates) {
      // Fallback formatting if rates aren't loaded yet
      return formatPrice(price, selectedCurrency);
    }

    const convertedAmount = convertPrice(
      price,
      currencyCode,
      selectedCurrency,
      exchangeRates
    );

    return formatPrice(convertedAmount, selectedCurrency);
  };

  // If we have both regular and sale price, show both
  if (
    regularPrice &&
    salePrice &&
    parseFloat(salePrice) < parseFloat(regularPrice)
  ) {
    return (
      <p suppressHydrationWarning={true} className={className} {...props}>
        <span className="font-semibold text-red-600">
          {convertAndFormatPrice(salePrice)}
        </span>
        <span className="ml-2 text-gray-500 line-through">
          {convertAndFormatPrice(regularPrice)}
        </span>
      </p>
    );
  }

  // Otherwise, show the single price
  return (
    <p suppressHydrationWarning={true} className={className} {...props}>
      {convertAndFormatPrice(amount)}
    </p>
  );
};

export default Price;
