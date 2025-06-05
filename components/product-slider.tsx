"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { getProducts } from "lib/commerce";
import { Product } from "lib/woocommerce/types";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface ProductSliderProps {
  title: string;
  subtitle?: string;
  category?: string;
  limit?: number;
  autoSlide?: boolean;
  autoSlideInterval?: number;
  showDots?: boolean;
}

export default function ProductSlider({
  title,
  subtitle,
  category,
  limit = 8,
  autoSlide = false,
  autoSlideInterval = 4000,
  showDots = true,
}: ProductSliderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts(limit, category);
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [limit, category]);

  // Auto-slide functionality
  useEffect(() => {
    if (autoSlide && products.length > 0 && !isPaused) {
      autoSlideRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex =
            prevIndex + 1 >= products.length ? 0 : prevIndex + 1;
          return nextIndex;
        });
      }, autoSlideInterval);

      return () => {
        if (autoSlideRef.current) {
          clearInterval(autoSlideRef.current);
        }
      };
    }
  }, [autoSlide, products.length, isPaused, autoSlideInterval]);

  // Update slider position when currentIndex changes
  useEffect(() => {
    if (products.length > 0) {
      scrollToIndex(currentIndex);
    }
  }, [currentIndex, products.length]);

  const scrollToIndex = (index: number) => {
    if (sliderRef.current && products.length > 0) {
      const itemWidth = sliderRef.current.scrollWidth / products.length;
      sliderRef.current.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      });
    }
  };

  const nextSlide = () => {
    const nextIndex =
      currentIndex + 1 >= products.length ? 0 : currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex =
      currentIndex - 1 < 0 ? products.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    if (autoSlide) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (autoSlide) {
      setIsPaused(false);
    }
  };

  if (isLoading) {
    return (
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <div className="h-64 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
            {autoSlide && (
              <p className="text-sm text-gray-500 mt-1">
                Auto-sliding • Hover to pause
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Previous products"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
              aria-label="Next products"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Product Slider */}
        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product) => (
              <div key={product.id} className="flex-none w-64 snap-start">
                <Link
                  href={`/product/${product.handle}`}
                  className="group block"
                >
                  <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                    <img
                      src={product.featuredImage.url}
                      alt={product.featuredImage.altText}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.tags.includes("sale") && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                        SALE
                      </div>
                    )}
                  </div>

                  <h3 className="text-sm font-medium text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
                    {product.title}
                  </h3>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      £{product.priceRange.minVariantPrice.amount}
                    </span>
                    {!product.availableForSale && (
                      <span className="text-sm text-red-600 font-medium">
                        Sold Out
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Dots indicator */}
        {showDots && (
          <div className="flex justify-center mt-8 gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-gray-900" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Auto-slide progress indicator (optional) */}
        {autoSlide && !isPaused && (
          <div className="flex justify-center mt-4">
            <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900 rounded-full animate-pulse"
                style={{
                  animation: `progress ${autoSlideInterval}ms linear infinite`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
