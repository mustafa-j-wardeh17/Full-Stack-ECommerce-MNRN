'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative bg-gradient-to-br from-primary-foreground to-gray-100 dark:from-neutral-800 dark:to-neutral-900 rounded-2xl mt-8 overflow-hidden shadow-lg">
            {/* Content Wrapper */}
            <div className="container mx-auto px-6 sm:px-8 lg:px-16 xl:px-20 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                    {/* Left Content */}
                    <div className="text-center lg:text-left">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-tight">
                            Welcome to <span className="text-green-500">PS Market</span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-gray-700 dark:text-gray-300">
                            Discover the best products at unbeatable prices. Shop from a wide variety of categories and enjoy fast, reliable delivery right to your doorstep.
                        </p>
                        <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <Link
                                href="/shop"
                                className="bg-green-500 text-white py-3 px-6 rounded-full text-lg font-medium shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
                            >
                                Shop Now
                            </Link>
                            <Link
                                href="/about"
                                className="bg-gray-200 text-gray-800 dark:bg-neutral-700 dark:text-gray-100 py-3 px-6 rounded-full text-lg font-medium shadow-md hover:bg-gray-300 dark:hover:bg-neutral-600 transition-transform transform hover:scale-105"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className=" w-full flex items-center justify-center lg:w-3/4 mx-auto max-w-lg rounded-xl overflow-hidden">
                        <Image
                            src="/hero.png"
                            alt="Featured Product"
                            width={400}
                            height={400}
                            className="sm:w-[450px] w-[300px] rounded-xl object-contain"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
