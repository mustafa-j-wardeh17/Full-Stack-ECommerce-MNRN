'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative bg-primary-foreground  rounded-2xl overflow-hidden">
            {/* Background Image */}
            {/* <div className="absolute inset-0 -z-10">
                <Image
                    src="/hero.avif" // Replace with your product image
                    alt="Market Background"
                    fill
                    className="object-contain object-center"
                />
            </div> */}

            {/* Content Wrapper */}
            <div className="container mx-auto px-4 md:py-1 py-10 sm:px-8 lg:px-16 xl:px-20">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 min-h-screen">
                    {/* Left Content */}
                    <div className="text-center lg:text-left max-w-2xl">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-tight">
                            Welcome to <span className="text-green-500">PS Market</span>
                        </h1>
                        <p className="mt-4 text-lg text-primary/50">
                            Discover the best products at unbeatable prices. Shop from a wide variety of categories and enjoy fast, reliable delivery right to your doorstep.
                        </p>

                        <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <Link
                                href="/shop"
                                className="bg-green-500 text-white py-3 px-6 rounded-lg text-lg font-medium hover:bg-green-600 transition"
                            >
                                Shop Now
                            </Link>
                            <Link
                                href="/about"
                                className="bg-gray-200 text-gray-800 py-3 px-6 rounded-lg text-lg font-medium hover:bg-gray-300 transition"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="relative w-full lg:w-1/2 max-w-lg min-w-[400px] rounded-xl overflow-hidden">
                        <Image
                            src="/hero.png" // Replace with your product image
                            alt="Featured Product"
                            width={600}
                            height={600}
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
