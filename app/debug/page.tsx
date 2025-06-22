import { getProducts } from "lib/commerce";
import { Product } from "lib/woocommerce/types";

export default async function DebugPage() {
  console.log("=== DEBUG PAGE: Starting product fetch ===");

  let products: Product[] = [];
  let error: any = null;

  try {
    products = await getProducts(5); // Fetch only 5 products for debugging
    console.log("=== DEBUG PAGE: Products fetched successfully ===");
    console.log(`Number of products: ${products.length}`);
  } catch (err) {
    console.error("=== DEBUG PAGE: Error fetching products ===", err);
    error = err;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">WooCommerce API Debug</h1>

      {/* API Configuration */}
      <div className="mb-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
        <div className="space-y-2">
          <p>
            <strong>WooCommerce URL:</strong>{" "}
            {process.env.WOOCOMMERCE_URL || "Not set (using fallback)"}
          </p>
          <p>
            <strong>Consumer Key:</strong>{" "}
            {process.env.WOOCOMMERCE_CONSUMER_KEY
              ? "Set"
              : "Not set (using fallback)"}
          </p>
          <p>
            <strong>Consumer Secret:</strong>{" "}
            {process.env.WOOCOMMERCE_CONSUMER_SECRET
              ? "Set"
              : "Not set (using fallback)"}
          </p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-8 p-4 bg-red-100 border border-red-300 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-red-800">
            Error Details
          </h2>
          <div className="text-sm text-red-700">
            <p>
              <strong>Message:</strong> {error.message || "Unknown error"}
            </p>
            {error.response && (
              <>
                <p>
                  <strong>Status:</strong> {error.response.status}
                </p>
                <p>
                  <strong>Status Text:</strong> {error.response.statusText}
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Products Display */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Products ({products.length} found)
        </h2>

        {products.length === 0 ? (
          <div className="p-4 bg-yellow-100 border border-yellow-300 rounded-lg">
            <p className="text-yellow-800">
              No products found. This could indicate:
            </p>
            <ul className="list-disc list-inside mt-2 text-yellow-700">
              <li>WooCommerce API credentials are incorrect</li>
              <li>WooCommerce store has no published products</li>
              <li>WooCommerce REST API is not enabled</li>
              <li>CORS or network connectivity issues</li>
            </ul>
          </div>
        ) : (
          <div className="grid gap-6">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="border border-gray-300 rounded-lg p-4"
              >
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  {product.featuredImage?.url && (
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText}
                      className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    />
                  )}

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">
                      {product.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <p>
                        <strong>ID:</strong> {product.id}
                      </p>
                      <p>
                        <strong>Handle:</strong> {product.handle}
                      </p>
                      <p>
                        <strong>Price:</strong> £
                        {product.priceRange.minVariantPrice.amount}
                      </p>
                      <p>
                        <strong>Available:</strong>{" "}
                        {product.availableForSale ? "Yes" : "No"}
                      </p>
                      <p>
                        <strong>Images:</strong> {product.images.length}
                      </p>
                      <p>
                        <strong>Tags:</strong> {product.tags.length}
                      </p>
                      <p>
                        <strong>Categories:</strong>{" "}
                        {product.categories?.length || 0}
                      </p>
                    </div>

                    {product.description && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Description:</h4>
                        <div
                          className="text-gray-700 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: product.descriptionHtml,
                          }}
                        />
                      </div>
                    )}

                    {product.categories && product.categories.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Categories:</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.categories.map(
                            (category: any, idx: number) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                              >
                                {category.name}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {product.tags && product.tags.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Tags:</h4>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.map((tag: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Raw Data */}
      {products.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Raw Product Data</h2>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-xs">
            {JSON.stringify(products[0], null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
