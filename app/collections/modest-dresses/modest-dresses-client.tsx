"use client";

import { FunnelIcon } from "@heroicons/react/24/outline";
import { useCart } from "components/cart/cart-context";
import type { Product } from "lib/woocommerce/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// const styleFilters = ["All", "Maxi", "Midi"];
// const occasionFilters = ["All", "Casual", "Work", "Semi-Formal", "Evening"];
// const sleeveFilters = [
//   "All",
//   "Sleeveless",
//   "Cap Sleeve",
//   "Short Sleeve",
//   "3/4 Sleeve",
//   "Long Sleeve",
// ];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
];

interface ModestDressesClientProps {
  products: Product[];
}

export default function ModestDressesClient({
  products,
}: ModestDressesClientProps) {
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
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

  const sortedProducts = [...products].sort((a, b) => {
    const aPrice = Number(a.priceRange.minVariantPrice.amount);
    const bPrice = Number(b.priceRange.minVariantPrice.amount);

    switch (sortBy) {
      case "price-low":
        return aPrice - bPrice;
      case "price-high":
        return bPrice - aPrice;
      case "newest":
        // Use updatedAt as fallback since createdAt might not be available
        return (
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        );
      case "rating":
        // Since we don't have ratings in WooCommerce data, sort by price as fallback
        return bPrice - aPrice;
      default:
        return 0; // Keep original order for "popular"
    }
  });

  return (
    <>
      {/* Filters and Sorting */}
      <div className="bg-rose-50 dark:bg-rose-900/20 border-b border-rose-200 dark:border-rose-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Sort and Results */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mt-6 pt-6 border-t border-rose-200 dark:border-rose-700">
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-rose-500 dark:focus:ring-rose-400 focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                <FunnelIcon className="w-5 h-5" />
                <span>More Filters</span>
              </button>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Showing {sortedProducts.length} modest dresses
              </span>
              <div className="flex items-center space-x-2 text-rose-600 dark:text-rose-400 ml-4">
                <span className="font-medium">👗 Elegant & Modest</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product) => {
            const isOnSale =
              product.priceRange.minVariantPrice.salePrice !== null;
            const salePrice = product.priceRange.minVariantPrice.salePrice;
            const regularPrice =
              product.priceRange.minVariantPrice.regularPrice ||
              product.priceRange.minVariantPrice.amount;
            const displayPrice =
              salePrice || product.priceRange.minVariantPrice.amount;

            return (
              <Link
                key={product.id}
                href={`/product/${product.handle}`}
                className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 block"
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={product.featuredImage?.url || "/placeholder-image.jpg"}
                    alt={product.featuredImage?.altText || product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {isOnSale && (
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

                  {/* Coverage Badge */}
                  <div className="absolute top-3 right-3 bg-rose-600/90 text-white text-xs px-2 py-1 rounded">
                    Modest
                  </div>

                  {/* Quick Actions Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={handleQuickView}
                      className="px-6 py-2 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors"
                    >
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                    {product.title}
                  </h3>

                  {/* Categories */}
                  {product.collections &&
                    product.collections.edges &&
                    product.collections.edges.length > 0 && (
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                        <span>{product.collections.edges[0]?.node?.title}</span>
                      </div>
                    )}

                  {/* Pricing */}
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl font-semibold text-gray-900 dark:text-white">
                      {product.priceRange.minVariantPrice.currencyCode}{" "}
                      {displayPrice}
                    </span>
                    {isOnSale && regularPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.priceRange.minVariantPrice.currencyCode}{" "}
                        {regularPrice}
                      </span>
                    )}
                  </div>

                  {/* Product Description */}
                  {product.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {product.description
                        .replace(/<[^>]*>/g, "")
                        .substring(0, 100)}
                      ...
                    </p>
                  )}

                  {/* Add to Cart Button */}
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    disabled={
                      !product.availableForSale || addingToCart === product.id
                    }
                    className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                      !product.availableForSale
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : addingToCart === product.id
                          ? "bg-green-600 text-white"
                          : "bg-rose-600 dark:bg-rose-500 text-white hover:bg-rose-700 dark:hover:bg-rose-600"
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
            );
          })}
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center pb-16">
        <button className="px-8 py-3 border-2 border-rose-600 dark:border-rose-400 text-rose-600 dark:text-rose-400 font-medium rounded-lg hover:bg-rose-600 hover:text-white dark:hover:bg-rose-400 dark:hover:text-rose-900 transition-all duration-300">
          Load More Dresses
        </button>
      </div>
    </>
  );
}
