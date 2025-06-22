import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { getProducts } from "lib/commerce";
import { defaultSort, sorting } from "lib/constants";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

// Helper function to check if any search words match in the text
function matchesSearchWords(text: string, searchWords: string[]): boolean {
  if (!text) return false;
  const lowerText = text.toLowerCase();
  return searchWords.some((word) => lowerText.includes(word));
}

// Helper function to calculate search relevance score
function calculateRelevanceScore(product: any, searchWords: string[]): number {
  let score = 0;
  const title = product.title?.toLowerCase() || "";
  const description = product.description?.toLowerCase() || "";
  const plainDescription = description.replace(/<[^>]*>/g, ""); // Remove HTML tags

  // Title matches get highest score
  searchWords.forEach((word) => {
    if (title.includes(word)) {
      score += title === word ? 10 : 5; // Exact match vs partial match
    }
  });

  // Description matches get medium score
  searchWords.forEach((word) => {
    if (plainDescription.includes(word)) {
      score += 3;
    }
  });

  // Tag matches get lower score
  if (product.tags) {
    product.tags.forEach((tag: string) => {
      searchWords.forEach((word) => {
        if (tag.toLowerCase().includes(word)) {
          score += 2;
        }
      });
    });
  }

  return score;
}

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

  // Enhanced search logic with word-by-word matching
  let products = allProducts;

  if (searchValue) {
    // Split search query into individual words and filter out empty strings
    const searchWords = searchValue
      .toLowerCase()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    if (searchWords.length > 0) {
      // Filter products that match any search word
      const matchingProducts = allProducts.filter((product) => {
        // Check title
        if (matchesSearchWords(product.title, searchWords)) return true;

        // Check description (remove HTML tags for better matching)
        const plainDescription =
          product.description?.replace(/<[^>]*>/g, "") || "";
        if (matchesSearchWords(plainDescription, searchWords)) return true;

        // Check tags
        if (
          product.tags &&
          product.tags.some((tag: string) =>
            matchesSearchWords(tag, searchWords)
          )
        )
          return true;

        return false;
      });

      // Sort by relevance score (highest first)
      products = matchingProducts
        .map((product) => ({
          ...product,
          relevanceScore: calculateRelevanceScore(product, searchWords),
        }))
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .map(({ relevanceScore, ...product }) => product); // Remove relevanceScore from final result
    }
  }

  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Results Header */}
        <div className="mb-6">
          {searchValue ? (
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Search Results for "{searchValue}"
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                {products.length > 0 ? (
                  <>
                    Found {products.length} {resultsText}
                    {searchValue.includes(" ") && (
                      <span className="block mt-1 text-xs text-gray-500 dark:text-gray-500">
                        Showing products matching any of these words:{" "}
                        {searchValue}
                      </span>
                    )}
                  </>
                ) : (
                  "No products found"
                )}
              </p>
            </div>
          ) : (
            <div className="text-center sm:text-left border-b border-gray-200 dark:border-gray-800 pb-4">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                All Products
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                Showing {products.length} {resultsText}
              </p>
            </div>
          )}
        </div>

        {/* Search Results Grid */}
        {products.length > 0 ? (
          <div className="space-y-6">
            {/* Products Grid - 2 columns on tablet, responsive for other sizes */}
            <Grid className="grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <ProductGridItems products={products} />
            </Grid>
          </div>
        ) : searchValue ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No products found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try searching with different keywords or browse all products.
              </p>
              <a
                href="/search"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 transition-colors"
              >
                View All Products
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
