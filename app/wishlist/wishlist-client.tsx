"use client";

import {
  HeartIcon,
  ShoppingBagIcon,
  StarIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

// Mock wishlist data - in a real app this would come from user's saved items
const initialWishlistItems = [
  {
    id: 1,
    name: "Flowing Chiffon Maxi Dress",
    price: 129.99,
    originalPrice: 159.99,
    image:
      "https://images.unsplash.com/photo-1566479179817-c7a4e1b6b41e?w=600&h=800&fit=crop",
    category: "Dresses",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Navy", "Burgundy", "Emerald", "Black"],
    rating: 4.9,
    reviews: 187,
    badge: "Bestseller",
    inStock: true,
    dateAdded: "2024-01-15",
  },
  {
    id: 2,
    name: "Elegant Midi Wrap Dress",
    price: 94.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop",
    category: "Dresses",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Dusty Rose", "Navy", "Forest Green", "Black"],
    rating: 4.7,
    reviews: 142,
    badge: "New",
    inStock: true,
    dateAdded: "2024-01-12",
  },
  {
    id: 3,
    name: "Luxe Velvet Evening Dress",
    price: 179.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=800&fit=crop",
    category: "Dresses",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Deep Purple", "Emerald", "Navy", "Black"],
    rating: 4.9,
    reviews: 89,
    badge: "Premium",
    inStock: false,
    dateAdded: "2024-01-10",
  },
  {
    id: 4,
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
    badge: null,
    inStock: true,
    dateAdded: "2024-01-08",
  },
  {
    id: 5,
    name: "Classic A-Line Midi Dress",
    price: 79.99,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d74?w=600&h=800&fit=crop",
    category: "Dresses",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["Charcoal", "Navy", "Burgundy", "Black"],
    rating: 4.8,
    reviews: 156,
    badge: "Bestseller",
    inStock: true,
    dateAdded: "2024-01-05",
  },
];

const sortOptions = [
  { value: "date-newest", label: "Recently Added" },
  { value: "date-oldest", label: "Oldest First" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name A-Z" },
];

export default function WishlistClient() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems);
  const [sortBy, setSortBy] = useState("date-newest");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const removeFromWishlist = (itemId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== itemId));
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
  };

  const toggleSelectItem = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(wishlistItems.map((item) => item.id));
    }
  };

  const moveSelectedToCart = () => {
    const selectedItemsData = wishlistItems.filter(
      (item) => selectedItems.includes(item.id) && item.inStock
    );
    // In a real app, this would add items to cart
    console.log("Moving to cart:", selectedItemsData);
    // Remove selected items from wishlist
    setWishlistItems((prev) =>
      prev.filter((item) => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);
  };

  const removeSelectedItems = () => {
    setWishlistItems((prev) =>
      prev.filter((item) => !selectedItems.includes(item.id))
    );
    setSelectedItems([]);
  };

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case "date-newest":
        return (
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
      case "date-oldest":
        return (
          new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        );
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const inStockItems = wishlistItems.filter((item) => item.inStock);

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16">
          <div className="mx-auto w-32 h-32 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center mb-8">
            <HeartIcon className="w-16 h-16 text-pink-400" />
          </div>
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">
            Your wishlist is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Start building your dream wardrobe by saving items you love. Browse
            our collections and click the heart icon to add items here.
          </p>
          <div className="space-x-4">
            <a
              href="/collections/new-in"
              className="inline-flex items-center px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors"
            >
              Browse New Arrivals
            </a>
            <a
              href="/collections/popular-styles"
              className="inline-flex items-center px-6 py-3 border-2 border-pink-600 text-pink-600 font-medium rounded-lg hover:bg-pink-600 hover:text-white transition-colors"
            >
              Popular Styles
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Wishlist Summary & Controls */}
      <div className="bg-pink-50 dark:bg-pink-900/20 border-b border-pink-200 dark:border-pink-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                {wishlistItems.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Items
              </div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {inStockItems.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                In Stock
              </div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                £{totalValue.toFixed(2)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Total Value
              </div>
            </div>
            <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {selectedItems.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Selected
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Selection Controls */}
            <div className="flex items-center space-x-4">
              <button
                onClick={selectAllItems}
                className="text-sm text-pink-600 dark:text-pink-400 hover:text-pink-700 dark:hover:text-pink-300 font-medium"
              >
                {selectedItems.length === wishlistItems.length
                  ? "Deselect All"
                  : "Select All"}
              </button>

              {selectedItems.length > 0 && (
                <>
                  <button
                    onClick={moveSelectedToCart}
                    disabled={
                      !selectedItems.some(
                        (id) =>
                          wishlistItems.find((item) => item.id === id)?.inStock
                      )
                    }
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    <ShoppingBagIcon className="w-4 h-4" />
                    <span>Move to Cart ({selectedItems.length})</span>
                  </button>

                  <button
                    onClick={removeSelectedItems}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                    <span>Remove ({selectedItems.length})</span>
                  </button>
                </>
              )}
            </div>

            {/* Sort Control */}
            <div className="flex items-center space-x-4">
              <label className="text-sm text-gray-700 dark:text-gray-300">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist Items Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedItems.map((item) => (
            <div
              key={item.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 ${
                selectedItems.includes(item.id) ? "ring-2 ring-pink-500" : ""
              } ${!item.inStock ? "opacity-75" : ""}`}
            >
              {/* Selection Checkbox */}
              <div className="absolute top-3 left-3 z-10">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => toggleSelectItem(item.id)}
                  className="w-5 h-5 text-pink-600 bg-white border-gray-300 rounded focus:ring-pink-500 focus:ring-2"
                />
              </div>

              {/* Product Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Stock Status */}
                {!item.inStock && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-3 right-3 flex flex-col space-y-2">
                  {item.badge && (
                    <span
                      className={`px-2 py-1 text-white text-xs font-medium rounded ${
                        item.badge === "Premium"
                          ? "bg-purple-600"
                          : item.badge === "New"
                            ? "bg-green-500"
                            : item.badge === "Bestseller"
                              ? "bg-yellow-600"
                              : "bg-blue-500"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {item.originalPrice && (
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                      Sale
                    </span>
                  )}
                </div>

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-2">
                    {item.inStock && (
                      <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors">
                        Add to Cart
                      </button>
                    )}
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-1"
                    >
                      <TrashIcon className="w-4 h-4" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(item.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300 dark:text-gray-600"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    ({item.reviews})
                  </span>
                </div>

                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                  {item.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {item.category}
                </p>

                {/* Pricing */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl font-semibold text-gray-900 dark:text-white">
                    £{item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      £{item.originalPrice}
                    </span>
                  )}
                </div>

                {/* Item Details */}
                <div className="space-y-1 mb-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Added:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {new Date(item.dateAdded).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Status:
                    </span>
                    <span
                      className={`font-medium ${
                        item.inStock
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {item.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">
                      Colors:
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {item.color.length} options
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  {item.inStock ? (
                    <button className="w-full bg-pink-600 dark:bg-pink-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-pink-700 dark:hover:bg-pink-600 transition-colors">
                      Add to Cart
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white py-2 px-4 rounded-lg font-medium cursor-not-allowed"
                    >
                      Notify When Available
                    </button>
                  )}

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-full flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <HeartIconSolid className="w-4 h-4 text-red-500" />
                    <span>Remove from Wishlist</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Shopping Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-4">
            Continue Building Your Wishlist
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Discover more beautiful modest fashion pieces to add to your
            collection. Save your favorites and shop when you're ready.
          </p>
          <div className="flex justify-center space-x-4">
            <a
              href="/collections/modest-dresses"
              className="inline-flex items-center px-6 py-3 bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors"
            >
              Browse Dresses
            </a>
            <a
              href="/collections/new-in"
              className="inline-flex items-center px-6 py-3 border-2 border-pink-600 text-pink-600 font-medium rounded-lg hover:bg-pink-600 hover:text-white transition-colors"
            >
              New Arrivals
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
