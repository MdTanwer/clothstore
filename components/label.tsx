import clsx from "clsx";
import { CurrencyCode } from "lib/currency/types";
import Price from "./price";

const Label = ({
  title,
  amount,
  currencyCode,
  position = "bottom",
  regularPrice,
  salePrice,
}: {
  title: string;
  amount: string;
  currencyCode: CurrencyCode;
  position?: "bottom" | "center";
  regularPrice?: string;
  salePrice?: string;
}) => {
  return (
    <div
      className={clsx(
        "absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label",
        {
          "lg:px-20 lg:pb-[35%]": position === "center",
        }
      )}
    >
      <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
        <h3 className="mr-4 line-clamp-2 grow pl-2 leading-none tracking-tight">
          {title}
        </h3>
        <Price
          className="flex-none rounded-full bg-blue-100 p-2 text-white"
          amount={amount}
          currencyCode={currencyCode}
          currencyCodeClassName="hidden @[275px]/label:inline"
          regularPrice={regularPrice}
          salePrice={salePrice}
        />
      </div>
    </div>
  );
};

export default Label;
