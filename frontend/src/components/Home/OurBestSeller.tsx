'use client';
import React from 'react';
import Image from 'next/image';
import { FaStar, FaEye } from 'react-icons/fa'; // Star and Eye icons from react-icons

const BestSellers = () => {
    // Sample data for Best Sellers
    const products = [
        { id: 1, name: 'Product 1', image: '/hero.png', description: 'This is a great product.', price: '$99.99', link: '/product/1' },
        { id: 2, name: 'Product 2', image: '/hero.png', description: 'This is a great product.', price: '$89.99', link: '/product/2' },
        { id: 3, name: 'Product 3', image: '/hero.png', description: 'This is a great product.', price: '$79.99', link: '/product/3' },
        { id: 4, name: 'Product 4', image: '/hero.png', description: 'This is a great product.', price: '$69.99', link: '/product/4' },
        { id: 5, name: 'Product 5', image: '/hero.png', description: 'This is a great product.', price: '$59.99', link: '/product/5' },
        { id: 6, name: 'Product 6', image: '/hero.png', description: 'This is a great product.', price: '$49.99', link: '/product/6' },
        { id: 7, name: 'Product 7', image: '/hero.png', description: 'This is a great product.', price: '$39.99', link: '/product/7' },
        { id: 8, name: 'Product 8', image: '/hero.png', description: 'This is a great product.', price: '$29.99', link: '/product/8' },
    ];

    return (
        <section className="my-12 px-4">
            <h2 className="text-3xl font-semibold text-primary/80 w-full text-center mb-6">
                Best Sells
            </h2>

            {/* Grid for displaying the products */}
            <div className="flex flex-row flex-wrap gap-6 justify-center">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="relative  overflow-hidden min-w-[250px]"
                    >
                        {/* Image Container */}
                        <div className="relative group justify-center items-center overflow-hidden w-full bg-primary-foreground hover:bg-primary/10 h-72 hover:scale-105 rounded-lg">
                            {/* Image */}
                            <Image
                                src={product.image}
                                alt={product.name}
                                layout="fill"
                                objectFit="cover"
                                className="transition-all duration-300 ease-in-out group-hover:opacity-80"
                            />

                            {/* Star and Eye Icons */}
                            <div className="flex flex-col justify-center items-center space-y-2 absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                                {/* Star Icon in a white circle */}
                                <button className="cursor-pointer bg-secondary hover:bg-primary-foreground/30 text-primary rounded-full p-2 w-[30px] h-[30px] flex items-center justify-center">
                                    <FaStar className="text-primary" size={15} />
                                </button>

                                {/* Eye Icon in a white circle */}
                                <button className="cursor-pointer bg-secondary hover:bg-primary-foreground/30 text-primary rounded-full p-2 w-[30px] h-[30px] flex items-center justify-center">
                                    <FaEye className="text-primary" size={15} />
                                </button>
                            </div>

                            {/* Add to Cart Button */}
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[80%] bg-secondary text-primary rounded-xl lg:p-3 p-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out flex items-center justify-center">
                                <a href={product.link} className="lg:text-lg text-md font-semibold">Add to Cart</a>
                            </div>
                        </div>

                        {/* Product Info */}
                        <div className="mt-3">
                            <h3 className="lg:text-xl text-lg font-semibold text-primary">{product.name}</h3>
                            <p className="text-sm text-gray-500">{product.description}</p>
                            <p className="mt-2 text-sm font-semibold text-primary">{product.price}</p>
                        </div>


                    </div>
                ))}
            </div>
        </section>
    );
};

export default BestSellers;
