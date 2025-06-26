"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Banner slides data
const bannerSlides = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dzwdx34yl/image/upload/v1750929052/c6uzanjgrvtossxfkqeb.jpg",
    alt: "Elegant Fashion Collection",
    link: "collections/new-in",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dzwdx34yl/image/upload/v1750929118/wvf3jhzbrftdrpicietm.jpg",
    alt: "Latest Fashion Trends",
    link: "collections/new-in",
  },
];

export default function InteractiveBanner() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [failedImages, setFailedImages] = useState(new Set());

  const handleImageError = (imagePath: string) => {
    console.error(`Failed to load image: ${imagePath}`);
    setFailedImages((prev) => new Set(prev).add(imagePath));
  };

  return (
    <section className="relative w-full h-[80vh] min-h-[600px] overflow-hidden group">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          el: ".swiper-pagination-custom",
          clickable: true,
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-active-custom",
        }}
        loop={true}
        speed={1000}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        className="w-full h-full"
      >
        {bannerSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <Link
              href={slide.link}
              className="block w-full h-full group cursor-pointer"
            >
              <div className="relative w-full h-full">
                {/* Banner Image */}
                {!failedImages.has(slide.image) ? (
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    className="object-cover transition-all duration-1000 ease-out group-hover:scale-105"
                    priority={index === 0}
                    onLoad={() => console.log(`Image loaded: ${slide.image}`)}
                    onError={() => handleImageError(slide.image)}
                  />
                ) : (
                  // Fallback gradient background when image fails
                  <div className="w-full h-full bg-gradient-to-br from-gray-500 via-pink-500 to-red-500 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-6xl mb-4">👗</div>
                      <h3 className="text-2xl font-bold">Fashion Collection</h3>
                      <p className="text-lg opacity-90">Image loading...</p>
                    </div>
                  </div>
                )}

                {/* Interactive Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-500" />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />

                {/* Interactive Elements */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  {/* Animated Ring */}
                  <div className="w-20 h-20 border-2 border-white rounded-full animate-pulse">
                    <div className="w-full h-full border border-white/60 rounded-full animate-ping" />
                  </div>
                </div>

                {/* Corner Decorative Elements */}
                <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-white/70 group-hover:border-white group-hover:scale-110 transition-all duration-500" />
                <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-white/70 group-hover:border-white group-hover:scale-110 transition-all duration-500" />

                {/* Floating Particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/40 rounded-full group-hover:animate-bounce transition-all duration-1000" />
                  <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-white/50 rounded-full group-hover:animate-pulse transition-all duration-1000 delay-200" />
                  <div className="absolute bottom-1/3 left-1/5 w-3 h-3 bg-white/30 rounded-full group-hover:animate-ping transition-all duration-1000 delay-400" />
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 group/btn">
        <svg
          className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </div>

      <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition-all duration-300 group/btn">
        <svg
          className="w-6 h-6 text-white group-hover/btn:scale-110 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {bannerSlides.map((_, index) => (
          <div
            key={index}
            className={`swiper-pagination-bullet-custom w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === activeSlide
                ? "swiper-pagination-bullet-active-custom bg-white scale-125"
                : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-6 right-6 z-10 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2">
        <span className="text-white text-sm font-medium">
          {activeSlide + 1} / {bannerSlides.length}
        </span>
      </div>
    </section>
  );
}
