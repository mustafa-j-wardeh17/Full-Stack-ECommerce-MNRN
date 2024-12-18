'use client';
import React from 'react';
import Image from 'next/image';
import { FaStar, FaEye } from 'react-icons/fa'; // Star and Eye icons from react-icons
import { Product } from '@/util/types';
import ProductCard from '../productCard';

const BestSells = ({ bestSells, type = 'default' }: { bestSells: Product[], type?: 'default' | 'latest' }) => {


    return (
        <section className="my-12 px-4">
            <h2 className="text-3xl font-semibold text-primary/80 w-full text-center mb-6">
                {type === 'default' ? 'Best Sells' : 'Latest Products'}
            </h2>

            {/* Grid for displaying the products */}
            <div className='grid 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-6 '>
                {bestSells.map((product: Product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
};

export default BestSells;
