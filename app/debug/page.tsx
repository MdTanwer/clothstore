import { getProducts } from "lib/woocommerce";

export default async function DebugPage() {
  const products = await getProducts(20); // Fetch up to 20 products

  // Add some debug logging
  if (products.length > 0 && products[0]) {
    console.log("First product price data:", {
      amount: products[0]?.priceRange?.minVariantPrice?.amount,
      regularPrice: products[0]?.priceRange?.minVariantPrice?.regularPrice,
      salePrice: products[0]?.priceRange?.minVariantPrice?.salePrice,
      currency: products[0]?.priceRange?.minVariantPrice?.currencyCode,
    });
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">WooCommerce Products Debug</h1>

      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-lg">
          <strong>Total Products Found:</strong> {products.length}
        </p>
      </div>

      {products.length === 0 ? (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-800">
            ❌ No products found. Check your WooCommerce API connection.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="border rounded-lg p-6 bg-white shadow-sm"
            >
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="md:w-1/3">
                  {product.featuredImage?.url ? (
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText || product.title}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-2">
                    {index + 1}. {product.title}
                  </h2>

                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Price Debug Info:</h3>
                    <div className="text-sm bg-gray-100 p-2 rounded">
                      <p>
                        <strong>Amount:</strong>{" "}
                        {product.priceRange.minVariantPrice.amount}
                      </p>
                      <p>
                        <strong>Regular Price:</strong>{" "}
                        {product.priceRange.minVariantPrice.regularPrice ||
                          "Not set"}
                      </p>
                      <p>
                        <strong>Sale Price:</strong>{" "}
                        {product.priceRange.minVariantPrice.salePrice ||
                          "Not set"}
                      </p>
                      <p>
                        <strong>Currency:</strong>{" "}
                        {product.priceRange.minVariantPrice.currencyCode}
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <p>
                        <strong>ID:</strong> {product.id}
                      </p>
                      <p>
                        <strong>Handle:</strong> {product.handle}
                      </p>
                      <p>
                        <strong>Available:</strong>{" "}
                        {product.availableForSale ? "✅ Yes" : "❌ No"}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Price:</strong>{" "}
                        {product.priceRange.minVariantPrice.salePrice &&
                        product.priceRange.minVariantPrice.regularPrice &&
                        parseFloat(
                          product.priceRange.minVariantPrice.salePrice
                        ) <
                          parseFloat(
                            product.priceRange.minVariantPrice.regularPrice
                          ) ? (
                          <>
                            <span className="font-semibold text-red-600">
                              {product.priceRange.minVariantPrice.currencyCode}{" "}
                              {product.priceRange.minVariantPrice.salePrice}
                            </span>
                            <span className="ml-2 text-gray-500 line-through">
                              {product.priceRange.minVariantPrice.currencyCode}{" "}
                              {product.priceRange.minVariantPrice.regularPrice}
                            </span>
                          </>
                        ) : (
                          <>
                            {product.priceRange.minVariantPrice.currencyCode}{" "}
                            {product.priceRange.minVariantPrice.amount}
                          </>
                        )}
                      </p>
                      <p>
                        <strong>Images:</strong> {product.images.length}
                      </p>
                      <p>
                        <strong>Tags:</strong> {product.tags.length}
                      </p>
                    </div>
                  </div>

                  {product.description && (
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">Description:</h3>
                      <div
                        className="text-gray-700 prose prose-sm max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: product.descriptionHtml,
                        }}
                      />
                    </div>
                  )}

                  {product.collections?.edges &&
                    product.collections.edges.length > 0 && (
                      <div className="mb-4">
                        <h3 className="font-semibold mb-2">Categories:</h3>
                        <div className="flex flex-wrap gap-2">
                          {product.collections.edges.map((edge, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                            >
                              {edge.node.title}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="flex gap-4">
                    <a
                      href={`/product/${product.handle}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                      target="_blank"
                    >
                      View Product Page
                    </a>
                    <a
                      href={`/search?q=${encodeURIComponent(product.title)}`}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                      target="_blank"
                    >
                      Search Product
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Quick Links:</h3>
        <div className="flex flex-wrap gap-2">
          <a
            href="/"
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
          >
            Homepage
          </a>
          <a
            href="/search"
            className="px-3 py-1 bg-green-100 text-green-800 rounded hover:bg-green-200"
          >
            All Products
          </a>
          <a
            href="/product/new-hijab-for-adults"
            className="px-3 py-1 bg-purple-100 text-purple-800 rounded hover:bg-purple-200"
          >
            Your Hijab Product
          </a>
        </div>
      </div>
    </div>
  );
}
