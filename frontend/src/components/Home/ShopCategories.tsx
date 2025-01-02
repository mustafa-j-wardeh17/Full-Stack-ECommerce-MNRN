import React from 'react'
import ShopCategoriesScroll from './CategoryScrollBtns'
import { baseTypesCategories } from '@/util/constant'
import Image from 'next/image'

const ShopCategories = () => {
  return (
    <section className="my-20 ">
      {/* Scroll Controls */}
      <ShopCategoriesScroll scrollContainerClass="categories-scroll" />

      {/* Scrollable Categories */}
      <div className="categories-scroll flex w-full overflow-x-auto py-6 gap-4 sm:gap-6 lg:gap-8 scroll-smooth hide-scrollbar">
        {baseTypesCategories.map((category, index) => (
          <div
            key={index}
            className="relative flex-none overflow-hidden w-[70%] sm:w-[48%] lg:w-[32%] xl:w-[24%] aspect-[9/12] hover:scale-105 transform transition-transform duration-300 ease-in-out rounded-lg group shadow-lg"
          >
            {/* Category Image */}
            <Image
              src={category.image}
              alt={category.title}
              fill
              className="rounded-lg object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-black/40 via-black/60 to-black/80 dark:from-gray-600/20 dark:via-gray-600/40 dark:to-gray-600/60 opacity-100 group-hover:opacity-0 transition-opacity duration-300 rounded-lg">
              <a
                href={`/shop?baseType=${category.title}`}
                className="text-white text-3xl text-nowrap font-bold"
              >
                {category.title}
              </a>
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>

            {/* Category Title & Link */}
            <div className="absolute bottom-[-50px] group-hover:bottom-4 w-[150px] bg-blue-800 hover:bg-blue-700 px-4 py-2 rounded-lg transition-all duration-300 left-1/2 transform -translate-x-1/2 text-center">
              <a
                href={`/shop?baseType=${category.title}`}
                className="text-white md:text-md text-sm text-nowrap font-semibold"
              >
                Explore Now
              </a>
            </div>
          </div>

        ))}
      </div>
    </section>
  )
}

export default ShopCategories