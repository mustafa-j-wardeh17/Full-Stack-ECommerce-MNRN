'use client';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

const ShopCategories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const images = [
    '/hero.png',
    '/hero.png',
    '/hero.png',
    '/hero.png',
    '/next.svg',
    '/hero.png',
    '/hero.png',
    '/hero.png',
  ];

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
    <div className="relative mt-12 px-4 lg:px-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-primary/80">Shop by Categories</h2>
        <div className="flex space-x-2">
          <button
            onClick={handlePrev}
            className="bg-primary-foreground border p-3 rounded-full text-primary hover:bg-primary hover:text-secondary transition-all"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="bg-primary-foreground border p-3 rounded-full text-primary hover:bg-primary hover:text-secondary transition-all"
          >
            &#8594;
          </button>
        </div>
      </div>

      {/* Images Container */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {getVisibleImages().map((image, index) => (
          <div
            key={index}
            className="relative shadow-sm shadow-primary w-full lg:h-[280px] md:h-[210px] sm:h-[200px] h-[180px] hover:scale-105 transform transition-all duration-300 ease-in-out rounded-lg overflow-hidden group"
          >
            <Image
              src={image}
              alt={`Category ${index + 1}`}
              fill
              className=" rounded-lg"
            />

            {/* Hover Effect and Button */}
            <div className="absolute z-10 bottom-0 w-full bg-gradient-to-t from-primary to-transparent p-4">
              <div className="flex items-center justify-center w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <a
                  href={`/category/${index}`}
                  className="text-secondary text-lg font-semibold px-4 py-2 bg-primary rounded-lg hover:bg-primary/80 transition-all"
                >
                  Category {index + 1}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopCategories;
