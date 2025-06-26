"use client";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import heroImage from "../public/nanner_img.jpg";

export default function HeroBanner() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative h-[90vh] min-h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {/* Gradient Background - Fallback while image loads */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700" />

        {/* Hero Image */}
        <Image
          src={heroImage}
          alt="Elegant Modest Fashion"
          fill
          className={`object-fill object-top transition-all duration-1000 ${
            imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          priority
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay for text readability - adapts to theme */}
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50" />
      </div>

      {/* Floating Elements for Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated floating dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-bounce delay-700"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-white/30 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/6 w-1 h-1 bg-white/40 rounded-full animate-ping delay-500"></div>

        {/* Animated gradient orbs */}
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-gray-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-xl animate-bounce delay-1000"></div>
      </div>

      {/* Text Content Overlay */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="text-center px-4 sm:px-6 lg:px-8">
          {/* Main Heading with slide-up animation */}
          <h1
            className={`text-3xl md:text-4xl lg:text-5xl font-light text-white mb-4 tracking-wide drop-shadow-lg transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            ELEGANT MODEST FASHION
          </h1>

          {/* Subtitle with delayed slide-up animation */}
          <p
            className={`text-lg md:text-xl text-white/90 mb-8 font-light max-w-2xl mx-auto drop-shadow-md transition-all duration-1000 ease-out delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Discover sophistication in every stitch
          </p>

          {/* Centered Shop Now Button with delayed animation and hover effects */}
          <div
            className={`flex justify-center transition-all duration-1000 ease-out delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href="/collections/new-in"
              className="group relative inline-flex items-center justify-center px-12 py-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm text-black dark:text-white font-medium text-lg tracking-wider uppercase rounded-none hover:bg-white dark:hover:bg-gray-900 transition-all duration-500 shadow-lg hover:shadow-2xl transform hover:scale-105 hover:-translate-y-1 active:scale-95"
            >
              <span className="relative z-10">Shop Now</span>
              <ArrowRightIcon className="relative z-10 ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
            </Link>
          </div>

          {/* Small text with delayed fade-in */}
          <p
            className={`text-white/70 text-sm mt-6 font-light tracking-wide drop-shadow-sm transition-all duration-1000 ease-out delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            Free shipping on orders over £75
          </p>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ease-out delay-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-40 translate-y-4"
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
          </div>
          <p className="text-white/50 text-xs mt-2 animate-pulse">Scroll</p>
        </div>
      </div>

      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 dark:from-black/40 to-transparent" />
    </section>
  );
}
