'use client'
import Image from 'next/image';
import React, { useState } from 'react';

const ShopCategories = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        '/hero.png',
        '/hero.png',
        '/hero.png',
        '/hero.png',
        '/next.svg',
        '/hero.png',
        '/hero.png',
        '/hero.png',
        // Add more images as needed
    ];

    const itemsPerRow = {
        large: 4,
        medium: 3,
        small: 2,
    };

    const getResponsiveItemCount = () => {
        if (window.innerWidth >= 1024) return itemsPerRow.large;  // Large screen
        if (window.innerWidth >= 768) return itemsPerRow.medium;  // Medium screen
        return itemsPerRow.small;  // Small screen
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
        <div className="relative mt-[60px]">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-primary/80">Shop by Categories</h2>
                <div className="flex space-x-2">
                    <button
                        onClick={handlePrev}
                        className="bg-primary-foreground border p-2 w-[30px] h-[30px] flex items-center justify-center rounded-md aspect-square text-primary hover:bg-primary hover:text-secondary"
                    >
                        &#8592;
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-primary-foreground border p-2 w-[30px] h-[30px] flex items-center justify-center rounded-md aspect-square text-primary hover:bg-primary hover:text-secondary"
                    >
                        &#8594;
                    </button>
                </div>
            </div>

            {/* Images Container */}
            <div className="flex overflow-hidden gap-6">
                {getVisibleImages().map((image, index) => (
                    <div key={index} className="w-full hover:bg-primary/10 aspect-[11/12] bg-primary-foreground rounded-md flex items-center justify-center relative sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 h-full overflow-hidden group">
                        <Image
                            src={image}
                            alt={`Category ${index + 1}`}
                            fill
                            className="object-fill"
                        />

                        {/* Button and hover effect */}
                        <div className="absolute bottom-0 w-[70%] bg-secondary text-primary rounded-xl lg:p-3 p-2 transform translate-y-full group-hover:-translate-y-6 transition-all duration-300 ease-out flex items-center justify-center">
                            <a href={`/category/${index}`} className="lg:text-lg text-md font-semibold">
                               Category {index + 1}
                            </a>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
};

export default ShopCategories;
