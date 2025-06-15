import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import { CurrencyCode, DEFAULT_CURRENCY } from "lib/currency/types";
import { Product } from "lib/woocommerce/types";
import Link from "next/link";

// Helper function to safely convert string to CurrencyCode
const toCurrencyCode = (code: string): CurrencyCode => {
  const upperCode = code.toUpperCase();
  if (upperCode === "GBP" || upperCode === "USD" || upperCode === "EUR") {
    return upperCode as CurrencyCode;
  }
  return DEFAULT_CURRENCY;
};

export default function ProductGridItems({
  products,
}: {
  products: Product[];
}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`/product/${product.handle}`}
            prefetch={true}
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: toCurrencyCode(
                  product.priceRange.maxVariantPrice.currencyCode
                ),
                regularPrice: product.priceRange.maxVariantPrice.regularPrice,
                salePrice:
                  product.priceRange.maxVariantPrice.salePrice || undefined,
              }}
              src={product.featuredImage?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
