"use client";

import { FunnelIcon, HeartIcon, StarIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

// Mock product data for modest dresses - focused on elegant, covered designs
const products = [
  {
    id: 1,
    name: "Flowing Chiffon Maxi Dress",
    price: 129.99,
    originalPrice: 159.99,
    image:
      "https://images.unsplash.com/photo-1566479179817-c7a4e1b6b41e?w=600&h=800&fit=crop",
    style: "Maxi",
    occasion: "Evening",
    sleeve: "Long Sleeve",
    neckline: "High Neck",
    size: ["XS", "S", "M", "L", "XL", "XXL"],
    color: ["Navy", "Burgundy", "Emerald", "Black"],
    rating: 4.9,
    reviews: 187,
    badge: "Bestseller",
    isNew: false,
    coverage: "Full Coverage",
  },
  {
    id: 2,
    name: "Elegant Midi Wrap Dress",
    price: 94.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
    style: "Midi",
    occasion: "Work",
    sleeve: "3/4 Sleeve",
    neckline: "V-Neck",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Dusty Rose", "Navy", "Forest Green", "Black"],
    rating: 4.7,
    reviews: 142,
    badge: null,
    isNew: true,
    coverage: "Modest",
  },
  {
    id: 3,
    name: "Sophisticated Shirt Dress",
    price: 89.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
    style: "Midi",
    occasion: "Casual",
    sleeve: "Long Sleeve",
    neckline: "Collar",
    size: ["XS", "S", "M", "L", "XL", "XXL"],
    color: ["White", "Light Blue", "Khaki", "Navy"],
    rating: 4.8,
    reviews: 203,
    badge: "Popular",
    isNew: false,
    coverage: "Full Coverage",
  },
  {
    id: 4,
    name: "Tiered Boho Maxi Dress",
    price: 109.99,
    originalPrice: 139.99,
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop",
    style: "Maxi",
    occasion: "Casual",
    sleeve: "Short Sleeve",
    neckline: "Round Neck",
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["Floral Print", "Paisley", "Solid Navy", "Black"],
    rating: 4.6,
    reviews: 98,
    badge: "Sale",
    isNew: false,
    coverage: "Modest",
  },
  {
    id: 5,
    name: "Classic A-Line Midi Dress",
    price: 79.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d74?w=600&h=800&fit=crop",
    style: "Midi",
    occasion: "Work",
    sleeve: "Sleeveless",
    neckline: "Boat Neck",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Charcoal", "Navy", "Burgundy", "Black"],
    rating: 4.8,
    reviews: 156,
    badge: "Bestseller",
    isNew: false,
    coverage: "Full Coverage",
  },
  {
    id: 6,
    name: "Luxe Velvet Evening Dress",
    price: 179.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop",
    style: "Maxi",
    occasion: "Evening",
    sleeve: "Long Sleeve",
    neckline: "High Neck",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Deep Purple", "Emerald", "Navy", "Black"],
    rating: 4.9,
    reviews: 89,
    badge: "Premium",
    isNew: true,
    coverage: "Full Coverage",
  },
  {
    id: 7,
    name: "Pleated Midi Dress",
    price: 84.99,
    originalPrice: 104.99,
    image:
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=800&fit=crop",
    style: "Midi",
    occasion: "Semi-Formal",
    sleeve: "Cap Sleeve",
    neckline: "Round Neck",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Blush", "Sage", "Navy", "Black"],
    rating: 4.7,
    reviews: 124,
    badge: "Sale",
    isNew: false,
    coverage: "Modest",
  },
  {
    id: 8,
    name: "Floral Print Maxi Dress",
    price: 119.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?w=600&h=800&fit=crop",
    style: "Maxi",
    occasion: "Casual",
    sleeve: "3/4 Sleeve",
    neckline: "V-Neck",
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["Spring Floral", "Autumn Floral", "Navy Floral"],
    rating: 4.8,
    reviews: 167,
    badge: "New",
    isNew: true,
    coverage: "Modest",
  },
  {
    id: 9,
    name: "Knit Sweater Dress",
    price: 92.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop",
    style: "Midi",
    occasion: "Casual",
    sleeve: "Long Sleeve",
    neckline: "Turtle Neck",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Camel", "Grey", "Cream", "Black"],
    rating: 4.6,
    reviews: 178,
    badge: null,
    isNew: false,
    coverage: "Full Coverage",
  },
  {
    id: 10,
    name: "Embroidered Formal Dress",
    price: 149.99,
    originalPrice: 189.99,
    image:
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop",
    style: "Midi",
    occasion: "Evening",
    sleeve: "Long Sleeve",
    neckline: "High Neck",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Navy with Gold", "Black with Silver", "Burgundy with Gold"],
    rating: 4.9,
    reviews: 145,
    badge: "Premium",
    isNew: false,
    coverage: "Full Coverage",
  },
  {
    id: 11,
    name: "Asymmetric Hem Maxi Dress",
    price: 104.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&h=800&fit=crop",
    style: "Maxi",
    occasion: "Semi-Formal",
    sleeve: "Sleeveless",
    neckline: "Scoop Neck",
    size: ["S", "M", "L", "XL", "XXL"],
    color: ["Dusty Blue", "Sage", "Mauve", "Black"],
    rating: 4.7,
    reviews: 112,
    badge: null,
    isNew: true,
    coverage: "Modest",
  },
  {
    id: 12,
    name: "Classic Button-Front Dress",
    price: 87.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
    style: "Midi",
    occasion: "Work",
    sleeve: "Short Sleeve",
    neckline: "V-Neck",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Navy", "Black", "Burgundy", "Forest Green"],
    rating: 4.8,
    reviews: 189,
    badge: "Bestseller",
    isNew: false,
    coverage: "Full Coverage",
  },
];

const styleFilters = ["All", "Maxi", "Midi"];
const occasionFilters = ["All", "Casual", "Work", "Semi-Formal", "Evening"];
const sleeveFilters = [
  "All",
  "Sleeveless",
  "Cap Sleeve",
  "Short Sleeve",
  "3/4 Sleeve",
  "Long Sleeve",
];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
];

export default function ModestDressesClient() {
  const [selectedStyle, setSelectedStyle] = useState("All");
  const [selectedOccasion, setSelectedOccasion] = useState("All");
  const [selectedSleeve, setSelectedSleeve] = useState("All");
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

  const filteredProducts = products.filter((product) => {
    const styleMatch =
      selectedStyle === "All" || product.style === selectedStyle;
    const occasionMatch =
      selectedOccasion === "All" || product.occasion === selectedOccasion;
    const sleeveMatch =
      selectedSleeve === "All" || product.sleeve === selectedSleeve;

    return styleMatch && occasionMatch && sleeveMatch;
  });

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
      <div className="bg-rose-50 dark:bg-rose-900/20 border-b border-rose-200 dark:border-rose-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Filter Categories */}
          <div className="space-y-6">
            {/* Style Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Dress Style
              </h3>
              <div className="flex flex-wrap gap-2">
                {styleFilters.map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      selectedStyle === style
                        ? "bg-rose-600 text-white dark:bg-rose-400 dark:text-rose-900"
                        : "bg-white text-rose-700 hover:bg-rose-100 dark:bg-rose-800 dark:text-rose-300 dark:hover:bg-rose-700"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Occasion
              </h3>
              <div className="flex flex-wrap gap-2">
                {occasionFilters.map((occasion) => (
                  <button
                    key={occasion}
                    onClick={() => setSelectedOccasion(occasion)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedOccasion === occasion
                        ? "bg-gray-800 text-white dark:bg-white dark:text-gray-800"
                        : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    }`}
                  >
                    {occasion}
                  </button>
                ))}
              </div>
            </div>

            {/* Sleeve Filters */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Sleeve Style
              </h3>
              <div className="flex flex-wrap gap-2">
                {sleeveFilters.map((sleeve) => (
                  <button
                    key={sleeve}
                    onClick={() => setSelectedSleeve(sleeve)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 ${
                      selectedSleeve === sleeve
                        ? "bg-gray-600 text-white dark:bg-gray-300 dark:text-gray-800"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
                    }`}
                  >
                    {sleeve}
                  </button>
                ))}
              </div>
            </div>
          </div>

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
                Showing {sortedProducts.length} of {products.length} modest
                dresses
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
                    <span
                      className={`px-2 py-1 text-white text-xs font-medium rounded ${
                        product.badge === "Premium"
                          ? "bg-purple-600"
                          : product.badge === "Sale"
                            ? "bg-red-500"
                            : product.badge === "Bestseller"
                              ? "bg-yellow-600"
                              : "bg-blue-500"
                      }`}
                    >
                      {product.badge}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                      Sale
                    </span>
                  )}
                </div>

                {/* Coverage Badge */}
                <div className="absolute top-3 right-12 bg-rose-600/90 text-white text-xs px-2 py-1 rounded">
                  {product.coverage}
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
                  <button className="px-6 py-2 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors">
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

                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>{product.style}</span>
                  <span>•</span>
                  <span>{product.occasion}</span>
                </div>

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

                {/* Dress Details */}
                <div className="space-y-1 mb-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Sleeve:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {product.sleeve}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Neckline:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {product.neckline}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Colors:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {product.color.length} options
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-rose-600 dark:bg-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-rose-700 dark:hover:bg-rose-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
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
