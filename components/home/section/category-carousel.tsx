'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NOT_IMAGE } from '@/lib/constants';

interface CategoryItem {
  id: string;
  name: string;
  logoUrl?: string;
  logoPath?: string;
  slug: string;
}

interface CategoryCarouselProps {
  categories: CategoryItem[];
}

const CategoryCarousel = ({ categories }: CategoryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;

  const nextSlide = () => {
    if (categories.length > itemsPerPage) {
      setCurrentIndex((prev) => 
        prev + itemsPerPage >= categories.length ? 0 : prev + 1
      );
    }
  };

  const prevSlide = () => {
    if (categories.length > itemsPerPage) {
      setCurrentIndex((prev) => 
        prev === 0 ? categories.length - itemsPerPage : prev - 1
      );
    }
  };

  const visibleCategories = categories.length > itemsPerPage
    ? [...categories, ...categories].slice(currentIndex, currentIndex + itemsPerPage)
    : categories;

  if (categories.length === 0) {
    return null;
  }

  return (
    <div className="relative px-8">
      <div className="overflow-hidden">
        <motion.div 
          className="flex gap-4 justify-center"
          initial={false}
        >
          <AnimatePresence mode="wait">
            {visibleCategories.map((category, index) => {
              const imageUrl = category.logoUrl || NOT_IMAGE;
              
              return (
                <motion.div
                  key={`${category.id}-${index}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.3 }}
                  className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 px-2"
                >
                  <Link href={`/search/${category.slug}`} className="block group">
                    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="relative aspect-square">
                        <Image
                          src={imageUrl}
                          alt={category.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = NOT_IMAGE;
                          }}
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h6 className="text-sm font-medium text-gray-800 group-hover:text-primary-500 transition-colors duration-300">
                          {category.name}
                        </h6>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      {categories.length > itemsPerPage && (
        <div className="hidden sm:block">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.25 12H3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M10.5 5.25L3.75 12L10.5 18.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white hover:bg-orange-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.75 12H20.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.5 5.25L20.25 12L13.5 18.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryCarousel;
