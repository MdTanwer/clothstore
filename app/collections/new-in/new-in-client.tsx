"use client";

import {
  FunnelIcon,
  HeartIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

// Mock product data for new arrivals - focused on fresh, contemporary designs
const products = [
  {
    id: 1,
    name: "Asymmetric Wrap Dress",
    price: 94.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop",
    category: "Dresses",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Sage Green", "Dusty Rose", "Cream"],
    rating: 4.9,
    reviews: 43,
    badge: "New Arrival",
    isNew: true,
    daysAgo: 2,
  },
  {
    id: 2,
    name: "Textured Knit Cardigan",
    price: 79.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop",
    category: "Outerwear",
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["Oatmeal", "Caramel", "Charcoal"],
    rating: 4.7,
    reviews: 28,
    badge: "New Arrival",
    isNew: true,
    daysAgo: 1,
  },
  {
    id: 3,
    name: "High-Waist Palazzo Trousers",
    price: 72.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop",
    category: "Bottoms",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Terracotta", "Navy", "Black", "Olive"],
    rating: 4.8,
    reviews: 67,
    badge: "New Arrival",
    isNew: true,
    daysAgo: 3,
  },
  {
    id: 4,
    name: "Silk Blend Tunic Blouse",
    price: 89.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop",
    category: "Tops",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Ivory", "Blush", "Sage", "Charcoal"],
    rating: 4.6,
    reviews: 35,
    badge: "New Arrival",
    isNew: true,
    daysAgo: 4,
  },
  {
    id: 5,
    name: "Tiered Maxi Skirt",
    price: 67.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d74?w=600&h=800&fit=crop",
    category: "Bottoms",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Rust", "Forest Green", "Cream", "Black"],
    rating: 4.9,
    reviews: 52,
    badge: "New Arrival",
    isNew: true,
    daysAgo: 5,
  },
  {
    id: 6,
    name: "Oversized Blazer",
    price: 124.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
    category: "Outerwear",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Camel", "Black", "Cream", "Pinstripe"],
    rating: 4.8,
    reviews: 89,
    badge: "New Arrival",
    isNew: true,
    daysAgo: 1,
  },
  {
    id: 7,
    name: "Ribbed Midi Dress",
    price: 82.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
    category: "Dresses",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Mocha", "Black", "Ivory", "Dusty Blue"],
    rating: 4.7,
    reviews: 41,
    badge: "New Arrival",
    isNew: true,
    daysAgo: 2,
  },
  {
    id: 8,
    name: "Statement Sleeve Top",
    price: 58.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=800&fit=crop",
    category: "Tops",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["White", "Cream", "Soft Pink", "Sage"],
    rating: 4.5,
    reviews: 29,
    badge: "New Arrival",
    isNew: true,
    daysAgo: 6,
  },
  {
    id: 9,
    name: "Pleated Ankle Pants",
    price: 76.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=800&fit=crop",
    category: "Bottoms",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Navy", "Black", "Khaki", "Burgundy"],
    rating: 4.6,
    reviews: 38,
    badge: "New Arrival",
    isNew: true,
    daysAgo: 7,
  },
  {
    id: 10,
    name: "Embroidered Kimono Jacket",
    price: 98.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&h=800&fit=crop",
    category: "Outerwear",
    size: ["S", "M", "L", "XL"],
    color: ["Floral Embroidery", "Geometric Print"],
    rating: 4.9,
    reviews: 71,
    badge: "New Arrival",
    isNew: true,
    daysAgo: 3,
  },
];

const categories = ["All", "Dresses", "Tops", "Bottoms", "Outerwear"];
const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
];

const timeFilters = [
  { value: "all", label: "All New Items" },
  { value: "week", label: "This Week" },
  { value: "3days", label: "Last 3 Days" },
  { value: "today", label: "Today" },
];

export default function NewInClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [timeFilter, setTimeFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products.filter((product) => {
    // Category filter
    const categoryMatch =
      selectedCategory === "All" || product.category === selectedCategory;

    // Time filter
    let timeMatch = true;
    if (timeFilter === "today") {
      timeMatch = product.daysAgo <= 1;
    } else if (timeFilter === "3days") {
      timeMatch = product.daysAgo <= 3;
    } else if (timeFilter === "week") {
      timeMatch = product.daysAgo <= 7;
    }

    return categoryMatch && timeMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return a.daysAgo - b.daysAgo; // Newest first (lower days ago)
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews; // Most popular by review count
    }
  });

  return (
    <>
      {/* Filters and Sorting */}
      <div className="bg-emerald-50 dark:bg-emerald-900/20 border-b border-emerald-200 dark:border-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Time Filters */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Arrival Time
            </h3>
            <div className="flex flex-wrap gap-2">
              {timeFilters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setTimeFilter(filter.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                    timeFilter === filter.value
                      ? "bg-emerald-600 text-white dark:bg-emerald-400 dark:text-emerald-900"
                      : "bg-white text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-700"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

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
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-400 focus:border-transparent"
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
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">
              Showing {sortedProducts.length} of {products.length} new arrivals
            </span>
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <SparklesIcon className="w-4 h-4" />
              <span className="font-medium">Fresh & New</span>
            </div>
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
                  <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded flex items-center space-x-1">
                    <SparklesIcon className="w-3 h-3" />
                    <span>New</span>
                  </span>
                  {product.daysAgo <= 3 && (
                    <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded">
                      Just In
                    </span>
                  )}
                </div>

                {/* Days Ago Badge */}
                <div className="absolute top-3 right-12 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {product.daysAgo === 1
                    ? "Yesterday"
                    : `${product.daysAgo} days ago`}
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
                  <button className="px-6 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition-colors">
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
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    New Arrival
                  </span>
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
                <button className="w-full bg-emerald-600 dark:bg-emerald-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-emerald-700 dark:hover:bg-emerald-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      <div className="text-center pb-16">
        <button className="px-8 py-3 border-2 border-emerald-600 dark:border-emerald-400 text-emerald-600 dark:text-emerald-400 font-medium rounded-lg hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-400 dark:hover:text-emerald-900 transition-all duration-300">
          Load More New Arrivals
        </button>
      </div>
    </>
  );
}
