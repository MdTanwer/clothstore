"use client";

import {
  FunnelIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { useCart } from "components/cart/cart-context";
import { Product } from "lib/woocommerce/types";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface NewInClientProps {
  products: Product[];
}

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

export default function NewInClient({ products }: NewInClientProps) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  const { addCartItem } = useCart();

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

  // Filter products by category
  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" ||
      product.categories?.some((cat) => cat.name === selectedCategory)
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (
          parseFloat(a.priceRange.minVariantPrice.amount) -
          parseFloat(b.priceRange.minVariantPrice.amount)
        );
      case "price-high":
        return (
          parseFloat(b.priceRange.minVariantPrice.amount) -
          parseFloat(a.priceRange.minVariantPrice.amount)
        );
      case "newest":
      default:
        return (
          new Date(b.updatedAt || 0).getTime() -
          new Date(a.updatedAt || 0).getTime()
        );
    }
  });

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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <SparklesIcon className="h-8 w-8 mr-3" />
              <h1 className="text-4xl md:text-6xl font-bold">New In</h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover our latest arrivals. Fresh styles and trending fashion
              pieces just added to our collection.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <div className="flex items-center">
                <StarIcon className="h-5 w-5 mr-1" />
                <span>New Arrivals Weekly</span>
              </div>
              <div className="flex items-center">
                <SparklesIcon className="h-5 w-5 mr-1" />
                <span>Trending Styles</span>
              </div>
            </div>
          </div>
        </div>
      </div>

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
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort and Filter Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filters
              </button>

              <div className="text-sm text-gray-600 dark:text-gray-400">
                {sortedProducts.length} products
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No new products found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.handle}`}
                className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 block"
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
                    <span className="px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded">
                      New
                    </span>
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

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
                  >
                    <StarIcon
                      className={`h-5 w-5 ${
                        wishlist.includes(product.id)
                          ? "text-yellow-500 fill-current"
                          : "text-gray-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
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
                          : "bg-purple-600 text-white hover:bg-purple-700"
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
    </div>
  );
}
