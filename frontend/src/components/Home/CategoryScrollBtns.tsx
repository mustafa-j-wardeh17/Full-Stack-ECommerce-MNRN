'use client';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

interface ShopCategoriesScrollProps {
  scrollContainerClass: string;
}

const ShopCategoriesScroll = ({ scrollContainerClass }: ShopCategoriesScrollProps) => {
  const scroll = (direction: 'left' | 'right') => {
    const scrollContainer = document.querySelector(`.${scrollContainerClass}`) as HTMLElement | null;
    if (scrollContainer) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className='flex flex-row items-center justify-between mb-6'>
      <h2 className="sm:text-2xl text-lg font-bold text-primary/80 ">Shop by Categories</h2>

      <div className="flex justify-between items-center relative sm:space-x-4 space-x-2">
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll Left"
          className="bg-primary-foreground flex items-center justify-center sm:w-[45px] sm:h-[45px] w-[35px] h-[35px] border rounded-full text-primary hover:bg-primary hover:text-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft />
        </button>
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll Right"
          className="bg-primary-foreground flex items-center justify-center sm:w-[45px] sm:h-[45px] w-[35px] h-[35px] border rounded-full text-primary hover:bg-primary hover:text-secondary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
};

export default ShopCategoriesScroll;
