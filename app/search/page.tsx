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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Results Header */}
        <div className="mb-6">
          {searchValue ? (
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Search Results
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                {products.length === 0
                  ? "No products found for "
                  : `Found ${products.length} ${resultsText} for `}
                <span className="font-semibold text-gray-900 dark:text-white">
                  &quot;{searchValue}&quot;
                </span>
              </p>
            </div>
          ) : (
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                All Products
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Showing {products.length} {resultsText}
              </p>
            </div>
          )}
        </div>

        {/* No Results State */}
        {searchValue && products.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              We couldn't find any products matching your search. Try different
              keywords or browse our categories.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/"
                className="inline-flex items-center justify-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-medium rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                Browse All Products
              </a>
              <a
                href="/collections"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                View Collections
              </a>
            </div>
          </div>
        )}

        {/* Search Results Grid */}
        {products.length > 0 && (
          <div className="space-y-6">
            {/* Mobile/Tablet Filter Bar (if needed in future) */}
            <div className="flex items-center justify-between lg:hidden">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {products.length} {resultsText}
              </span>
              {/* Future: Add sort/filter options for mobile */}
            </div>

            {/* Products Grid - Responsive */}
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              <ProductGridItems products={products} />
            </Grid>
          </div>
        )}

        {/* Search Tips for Mobile */}
        {searchValue && products.length > 0 && (
          <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6 lg:hidden">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              Search Tips
            </h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li>• Try different keywords or synonyms</li>
              <li>• Check your spelling</li>
              <li>• Use more general terms</li>
              <li>• Browse our categories for inspiration</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
