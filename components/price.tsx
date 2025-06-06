import clsx from "clsx";

const Price = ({
  amount,
  className,
  currencyCode = "USD",
  currencyCodeClassName,
  regularPrice,
  salePrice,
  ...props
}: {
  amount: string;
  className?: string;
  currencyCode: string;
  currencyCodeClassName?: string;
  regularPrice?: string;
  salePrice?: string;
} & React.ComponentProps<"p">) => {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currencyCode,
      currencyDisplay: "narrowSymbol",
    }).format(parseFloat(price));
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
          {formatPrice(salePrice)}
        </span>
        <span className="ml-2 text-gray-500 line-through">
          {formatPrice(regularPrice)}
        </span>
      </p>
    );
  }

  // Otherwise, show the single price
  return (
    <p suppressHydrationWarning={true} className={className} {...props}>
      {formatPrice(amount)}
      <span
        className={clsx("ml-1 inline", currencyCodeClassName)}
      >{`${currencyCode}`}</span>
    </p>
  );
};

export default Price;
