import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { getProducts } from "lib/commerce";
import { defaultSort, sorting } from "lib/constants";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export default async function SearchPage(props: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  // WooCommerce getProducts expects (limit, categoryId, sortKey, reverse)
  // For search, we'll get all products and filter client-side since WooCommerce doesn't support search in this function
  const allProducts = await getProducts(100, undefined, sortKey, reverse);

  // Filter products by search query if provided
  const products = searchValue
    ? allProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          product.description
            ?.toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchValue.toLowerCase())
          )
      )
    : allProducts;

  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? "There are no products that match "
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
