"use client";

import { useCart } from "components/cart/cart-context";
import { Product } from "lib/woocommerce/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PopularStylesClientProps {
  products: Product[];
  categoryTitle?: string;
}

export default function PopularStylesClient({
  products,
  categoryTitle = "Popular Styles",
}: PopularStylesClientProps) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const { addCartItem } = useCart();

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = async (product: Product, event: React.MouseEvent) => {
    // Prevent navigation when clicking Add to Cart
    event.preventDefault();
    event.stopPropagation();

    setAddingToCart(product.id);

    try {
      // Create a default variant for the product
      const defaultVariant = {
        id: `${product.id}-default`,
        title: "Default",
        availableForSale: product.availableForSale,
        selectedOptions: [
          {
            name: "Size",
            value: "M",
          },
        ],
        price: product.priceRange.minVariantPrice,
      };

      addCartItem(defaultVariant, product);

      // Reset the adding state after a short delay
      setTimeout(() => {
        setAddingToCart(null);
      }, 1000);
    } catch (error) {
      console.error("Error adding to cart:", error);
      setAddingToCart(null);
    }
  };

  const handleQuickView = (event: React.MouseEvent) => {
    // Prevent navigation when clicking Quick View
    event.preventDefault();
    event.stopPropagation();
  };

  // Get unique categories from products
  const categories = [
    "All",
    ...Array.from(
      new Set(
        products.flatMap(
          (product) => product.categories?.map((cat) => cat.name) || []
        )
      )
    ),
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" ||
      product.categories?.some((cat) => cat.name === selectedCategory)
  );

  // Use filtered products directly (no sorting)
  const sortedProducts = filteredProducts;

  const formatPrice = (amount: string) => {
    return parseFloat(amount).toFixed(2);
  };

  const isOnSale = (product: Product) => {
    const salePrice = product.priceRange.minVariantPrice.salePrice;
    const regularPrice = product.priceRange.minVariantPrice.regularPrice;
    return (
      salePrice &&
      regularPrice &&
      parseFloat(salePrice) < parseFloat(regularPrice)
    );
  };

  return (
    <>
      {/* Filters and Sorting */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {sortedProducts.length} of {products.length} products
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.handle}`}
                className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 block"
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.featuredImage.url || "/placeholder-image.jpg"}
                    alt={product.featuredImage.altText || product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {isOnSale(product) && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                        Sale
                      </span>
                    )}
                    {!product.availableForSale && (
                      <span className="px-2 py-1 bg-gray-500 text-white text-xs font-medium rounded">
                        Out of Stock
                      </span>
                    )}
                  </div>

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={handleQuickView}
                      className="px-6 py-2 bg-white text-black dark:bg-gray-800 dark:text-white font-medium rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {product.title}
                  </h3>

                  {/* Pricing */}
                  <div className="flex items-center space-x-2 mb-4">
                    {isOnSale(product) ? (
                      <>
                        <span className="text-xl font-semibold text-red-600">
                          £
                          {formatPrice(
                            product.priceRange.minVariantPrice.salePrice || "0"
                          )}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          £
                          {formatPrice(
                            product.priceRange.minVariantPrice.regularPrice ||
                              "0"
                          )}
                        </span>
                      </>
                    ) : (
                      <span className="text-xl font-semibold text-gray-900 dark:text-white">
                        £
                        {formatPrice(product.priceRange.minVariantPrice.amount)}
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={
                      !product.availableForSale || addingToCart === product.id
                    }
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      !product.availableForSale
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : addingToCart === product.id
                          ? "bg-green-600 text-white"
                          : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"
                    }`}
                  >
                    {!product.availableForSale
                      ? "Out of Stock"
                      : addingToCart === product.id
                        ? "Added to Cart ✓"
                        : "Add to Cart"}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
