"use client";

import { FunnelIcon, HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

// Mock product data for popular styles
const products = [
  {
    id: 1,
    name: "Elegant Maxi Dress",
    price: 89.99,
    originalPrice: 119.99,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
    category: "Dresses",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Navy", "Black", "Burgundy"],
    rating: 4.8,
    reviews: 124,
    badge: "Bestseller",
    isNew: false,
  },
  {
    id: 2,
    name: "Modest Floral Kimono",
    price: 65.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&h=800&fit=crop",
    category: "Outerwear",
    size: ["S", "M", "L", "XL"],
    color: ["Floral Print", "Black Print"],
    rating: 4.6,
    reviews: 89,
    badge: "Limited Edition",
    isNew: true,
  },
  {
    id: 3,
    name: "Classic Midi Skirt",
    price: 45.99,
    originalPrice: 59.99,
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d74?w=600&h=800&fit=crop",
    category: "Bottoms",
    size: ["XS", "S", "M", "L", "XL", "XXL"],
    color: ["Black", "Navy", "Camel", "Grey"],
    rating: 4.9,
    reviews: 156,
    badge: "Bestseller",
    isNew: false,
  },
  {
    id: 4,
    name: "Sophisticated Blouse",
    price: 52.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=800&fit=crop",
    category: "Tops",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["White", "Cream", "Light Blue"],
    rating: 4.7,
    reviews: 78,
    badge: null,
    isNew: false,
  },
  {
    id: 5,
    name: "Modest Evening Gown",
    price: 159.99,
    originalPrice: 199.99,
    image:
      "https://images.unsplash.com/photo-1566479179817-c7a4e1b6b41e?w=600&h=800&fit=crop",
    category: "Dresses",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Emerald", "Navy", "Burgundy", "Black"],
    rating: 4.9,
    reviews: 203,
    badge: "Premium",
    isNew: false,
  },
  {
    id: 6,
    name: "Casual Tunic Top",
    price: 38.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
    category: "Tops",
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["Rose", "Sage", "Cream", "Grey"],
    rating: 4.5,
    reviews: 92,
    badge: null,
    isNew: true,
  },
  {
    id: 7,
    name: "Elegant Palazzo Pants",
    price: 68.99,
    originalPrice: 85.99,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
    category: "Bottoms",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Black", "Navy", "Olive", "Taupe"],
    rating: 4.8,
    reviews: 134,
    badge: "Bestseller",
    isNew: false,
  },
  {
    id: 8,
    name: "Long Sleeve Cardigan",
    price: 74.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=800&fit=crop",
    category: "Outerwear",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Camel", "Grey", "Navy", "Cream"],
    rating: 4.6,
    reviews: 67,
    badge: null,
    isNew: false,
  },
];

const categories = ["All", "Dresses", "Tops", "Bottoms", "Outerwear"];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
];

export default function PopularStylesClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("popular");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products.filter(
    (product) =>
      selectedCategory === "All" || product.category === selectedCategory
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return a.isNew ? -1 : 1;
      case "rating":
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews; // Most popular by review count
    }
  });

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

            {/* Sort and Filter Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent"
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
                <span>Filters</span>
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {sortedProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {product.isNew && (
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
                      New
                    </span>
                  )}
                  {product.badge && (
                    <span className="px-2 py-1 bg-black text-white text-xs font-medium rounded">
                      {product.badge}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                      Sale
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white dark:bg-gray-800 rounded-full shadow-md hover:shadow-lg transition-all duration-200"
                >
                  {wishlist.includes(product.id) ? (
                    <HeartIconSolid className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  )}
                </button>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                  <button className="px-6 py-2 bg-white text-black font-medium rounded-lg hover:bg-gray-100 transition-colors">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    ({product.reviews})
                  </span>
                </div>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {product.category}
                </p>

                {/* Pricing */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    £{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      £{product.originalPrice}
                    </span>
                  )}
                </div>

                {/* Size and Color Options */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Sizes:
                    </span>
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {product.size.join(", ")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Colors:
                    </span>
                    <span className="text-xs text-gray-700 dark:text-gray-300">
                      {product.color.length} options
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-black dark:bg-white text-white dark:text-black py-2 px-4 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center pb-16">
        <button className="px-8 py-3 border-2 border-black dark:border-white text-black dark:text-white font-medium rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300">
          Load More Products
        </button>
      </div>
    </>
  );
}
