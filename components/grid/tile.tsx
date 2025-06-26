import clsx from "clsx";
import { CurrencyCode } from "lib/currency/types";
import Image from "next/image";
import Label from "../label";

export function GridTileImage({
  isInteractive = true,
  active,
  label,
  ...props
}: {
  isInteractive?: boolean;
  active?: boolean;
  label?: {
    title: string;
    amount: string;
    currencyCode: CurrencyCode;
    position?: "bottom" | "center";
    regularPrice?: string;
    salePrice?: string;
  };
} & React.ComponentProps<typeof Image>) {
  return (
    <div
      className={clsx(
        "group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border-2 bg-white hover:border-blue-600 dark:bg-black",
        {
          relative: label,
          "border-2 border-blue-600": active,
          "border-gray-300 dark:border-gray-600": !active,
        }
      )}
    >
      {props.src ? (
        <Image
          className={clsx("relative h-full w-full object-contain", {
            "transition duration-300 ease-in-out group-hover:scale-105":
              isInteractive,
          })}
          {...props}
        />
      ) : null}
      {label ? (
        <Label
          title={label.title}
          amount={label.amount}
          currencyCode={label.currencyCode}
          position={label.position}
          regularPrice={label.regularPrice}
          salePrice={label.salePrice}
        />
      ) : null}
    </div>
  );
}
