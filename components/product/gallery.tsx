"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { GridTileImage } from "components/grid/tile";
import { useProduct, useUpdateURL } from "components/product/product-context";
import Image from "next/image";
import { startTransition, useEffect, useState } from "react";

export function Gallery({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const { state, updateImage } = useProduct();
  const updateURL = useUpdateURL();
  const imageIndex = state.image ? parseInt(state.image) : 0;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  const nextImageIndex = imageIndex + 1 < images.length ? imageIndex + 1 : 0;
  const previousImageIndex =
    imageIndex === 0 ? images.length - 1 : imageIndex - 1;

  const buttonClassName =
    "h-full px-6 transition-all ease-in-out hover:scale-110 hover:text-black dark:hover:text-white flex items-center justify-center";

  // Check if device is mobile or tablet
  useEffect(() => {
    const checkDevice = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Handle fullscreen navigation with startTransition
  const navigateFullscreen = (direction: "next" | "prev") => {
    const newIndex = direction === "next" ? nextImageIndex : previousImageIndex;
    startTransition(() => {
      const newState = updateImage(newIndex.toString());
      updateURL(newState);
    });
  };

  // Handle thumbnail click in fullscreen with startTransition
  const handleThumbnailClick = (index: number) => {
    startTransition(() => {
      const newState = updateImage(index.toString());
      updateURL(newState);
    });
  };

  // Prevent body scroll when fullscreen is open
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  // Handle keyboard navigation in fullscreen
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isFullscreen) return;

      if (e.key === "Escape") {
        setIsFullscreen(false);
      } else if (e.key === "ArrowLeft") {
        navigateFullscreen("prev");
      } else if (e.key === "ArrowRight") {
        navigateFullscreen("next");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isFullscreen, nextImageIndex, previousImageIndex]);

  return (
    <>
      <form>
        <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
          {images[imageIndex] && (
            <div
              className={`h-full w-full ${isMobileOrTablet ? "cursor-pointer" : ""}`}
              onClick={() => isMobileOrTablet && setIsFullscreen(true)}
            >
              <Image
                className="h-full w-full object-contain"
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                alt={images[imageIndex]?.altText as string}
                src={images[imageIndex]?.src as string}
                priority={true}
              />
            </div>
          )}

          {images.length > 1 ? (
            <div className="absolute bottom-[15%] flex w-full justify-center">
              <div className="mx-auto flex h-11 items-center rounded-full border border-white bg-neutral-50/80 text-neutral-500 backdrop-blur-sm dark:border-black dark:bg-neutral-900/80">
                <button
                  formAction={() => {
                    const newState = updateImage(previousImageIndex.toString());
                    updateURL(newState);
                  }}
                  aria-label="Previous product image"
                  className={buttonClassName}
                >
                  <ArrowLeftIcon className="h-5" />
                </button>
                <div className="mx-1 h-6 w-px bg-neutral-500"></div>
                <button
                  formAction={() => {
                    const newState = updateImage(nextImageIndex.toString());
                    updateURL(newState);
                  }}
                  aria-label="Next product image"
                  className={buttonClassName}
                >
                  <ArrowRightIcon className="h-5" />
                </button>
              </div>
            </div>
          ) : null}
        </div>

        {images.length > 1 ? (
          <ul className="my-12 flex items-center flex-wrap justify-center gap-2 overflow-auto py-1 lg:mb-0">
            {images.map((image, index) => {
              const isActive = index === imageIndex;

              return (
                <li key={image.src} className="h-20 w-20">
                  <button
                    formAction={() => {
                      const newState = updateImage(index.toString());
                      updateURL(newState);
                    }}
                    aria-label="Select product image"
                    className="h-full w-full"
                  >
                    <GridTileImage
                      alt={image.altText}
                      src={image.src}
                      width={80}
                      height={80}
                      active={isActive}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </form>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-60 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Close fullscreen view"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>

          {/* Image Container */}
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {images[imageIndex] && (
              <div className="relative max-w-full max-h-full">
                <Image
                  src={images[imageIndex]?.src as string}
                  alt={images[imageIndex]?.altText as string}
                  width={800}
                  height={800}
                  className="max-w-full max-h-full object-contain"
                  priority={true}
                />
              </div>
            )}

            {/* Navigation Buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={() => navigateFullscreen("prev")}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Previous image"
                >
                  <ArrowLeftIcon className="h-6 w-6" />
                </button>
                <button
                  onClick={() => navigateFullscreen("next")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label="Next image"
                >
                  <ArrowRightIcon className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm">
              {imageIndex + 1} / {images.length}
            </div>
          )}

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 max-w-full overflow-x-auto px-4">
              {images.map((image, index) => (
                <button
                  key={image.src}
                  onClick={() => handleThumbnailClick(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    index === imageIndex
                      ? "border-white"
                      : "border-transparent opacity-60 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.altText}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
