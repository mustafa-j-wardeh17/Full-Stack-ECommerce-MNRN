'use client';
import { baseTypesCategories } from '@/util/constant';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const ShopCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const images = baseTypesCategories;

  const itemsPerRow = {
    large: 4,
    medium: 3,
    small: 2,
  };

  const handleResize = () => setScreenWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getResponsiveItemCount = () => {
    if (screenWidth >= 1024) return itemsPerRow.large; // Large screen
    if (screenWidth >= 768) return itemsPerRow.medium; // Medium screen
    return itemsPerRow.small; // Small screen
  };

  const handleNext = () => {
    const maxIndex = images.length - getResponsiveItemCount();
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const getVisibleImages = () => {
    const count = getResponsiveItemCount();
    return images.slice(currentIndex, currentIndex + count);
  };

  return (
    <section className="my-20 px-4 lg:px-16">

      <div className="flex justify-between items-center mb-6">
        <h2 className="sm:text-2xl text-lg font-bold text-primary/80 ">Shop by Categories</h2>

        <div className='flex items-center space-x-4'>
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="bg-primary-foreground flex items-center justify-center w-[45px] h-[45px] border rounded-full text-primary hover:bg-primary hover:text-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft />
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === images.length - getResponsiveItemCount()}
            className="bg-primary-foreground flex items-center justify-center w-[45px] h-[45px] border rounded-full text-primary hover:bg-primary hover:text-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {getVisibleImages().map((image, index) => (
          <div
            key={index}
            className="relative w-full aspect-[9/12] hover:scale-105 transform transition-all duration-300 ease-in-out rounded-lg overflow-hidden group"
          >
            <Image
              src={image.image}
              alt={`baseType ${index + 1}`}
              fill
              className="rounded-lg"
            />

            <div className="absolute z-10 bottom-0 w-full bg-gradient-to-t from-blue-950 to-transparent p-4">
              <div className="flex items-center justify-center w-full h-full  transition-opacity duration-300 ease-in-out">
                <a
                  href={`/shop?baseType=${image.title}`}
                  className="text-white sm:text-lg text-md font-semibold w-2/3 text-center sm:py-2 px-3 py-[6px] bg-gradient-to-r from-blue-800 to-blue-600 rounded-lg hover:opacity-85 transition-all"
                >
                  {image.title}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ShopCategories;