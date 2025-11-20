"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { NOT_IMAGE } from "@/lib/constants";

export default function HeroCarousel({
  images,
}: {
  images: { src: string; altText: string }[];
}) {
  const [current, setCurrent] = React.useState(0);
  const thumbnailContainerRef = React.useRef<HTMLDivElement>(null);
  const [imageErrors, setImageErrors] = React.useState<Record<number, boolean>>({});

  // Helper function to get valid image URL
  const getValidImageUrl = (src: string) => {
    if (!src) return NOT_IMAGE;
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')) {
      return src;
    }
    return `/${src}`;
  };

  const handleImageError = (index: number) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

  const scrollThumbnails = (direction: "left" | "right") => {
    if (thumbnailContainerRef.current) {
      const scrollAmount = 280;
      const currentScroll = thumbnailContainerRef.current.scrollLeft;
      const newScroll = direction === "left" 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      thumbnailContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative h-full w-full"
        >
          <Image
            fill
            alt={images[current]?.altText || "Product image"}
            className="h-full w-full object-contain"
            priority={current === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={imageErrors[current] ? NOT_IMAGE : getValidImageUrl(images[current]?.src)}
            onError={() => handleImageError(current)}
          />
        </motion.div>
      </div>

      {/* Thumbnail Navigation with Arrows */}
      {images && images.length > 0 && (
        <div className="flex items-center gap-2">
          {/* Left Arrow Button */}
          {images.length > 4 && (
            <button
              onClick={() => scrollThumbnails("left")}
              className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-md transition-all"
              aria-label="Scroll thumbnails left"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
          )}

          {/* Thumbnails Container */}
          <div
            ref={thumbnailContainerRef}
            className="flex-1 overflow-x-auto overflow-y-hidden scroll-smooth hide-scrollbar"
          >
            <div className="flex gap-2">
              {images.map((image, index: number) => {
                const isActive = index === current;

                return (
                  <button
                    key={`${image.src}-${index}`}
                    onClick={() => setCurrent(index)}
                    className={`relative flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden border-2 transition-all ${
                      isActive
                        ? "border-orange-500 ring-2 ring-orange-200"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <Image
                      src={imageErrors[index] ? NOT_IMAGE : getValidImageUrl(image.src)}
                      alt={image.altText || `Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="64px"
                      onError={() => handleImageError(index)}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Arrow Button */}
          {images.length > 4 && (
            <button
              onClick={() => scrollThumbnails("right")}
              className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center shadow-md transition-all"
              aria-label="Scroll thumbnails right"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
