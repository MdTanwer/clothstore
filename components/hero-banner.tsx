"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import imgg from "../public/nanner_img.jpg";

export default function HeroBanner() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  console.log(imgg);

  return (
    <section className="relative h-[80vh] min-h-[600px] overflow-hidden">
      {/* Background - Image with Gradient Fallback */}
      <div className="absolute inset-0">
        {/* Gradient Background - Adapts to system theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700" />

        {/* Image Overlay */}
        <div
          className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url('${imgg}')`,
          }}
        />

        {/* Overlay for text readability - adapts to theme */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 dark:text-white mb-4 tracking-wide drop-shadow-lg">
            ELEGANT MODEST FASHION
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-800 dark:text-white/90 mb-8 font-light max-w-2xl mx-auto drop-shadow-md">
            Discover sophistication in every stitch
          </p>

          {/* Centered Shop Now Button */}
          <div className="flex justify-center">
            <Link
              href="/collections/new-in"
              className="group relative inline-flex items-center justify-center px-12 py-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-black dark:text-white font-medium text-lg tracking-wider uppercase rounded-none hover:bg-white dark:hover:bg-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Shop Now
              <ArrowRightIcon className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>

          {/* Optional: Small text below button */}
          <p className="text-gray-700 dark:text-white/70 text-sm mt-6 font-light tracking-wide drop-shadow-sm">
            Free shipping on orders over £75
          </p>
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 dark:from-black/40 to-transparent" />
    </section>
  );
}
