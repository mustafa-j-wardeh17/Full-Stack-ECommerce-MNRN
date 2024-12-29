import React from 'react';
import { Product } from '@/util/types';
import ProductCard from '../productCard';

const BestSells = ({ bestSells, type = 'default', isAdmin }: { bestSells: Product[], type?: 'default' | 'latest', isAdmin: boolean }) => {


    return (
        <section className="my-20 px-4">
            <h2 className="text-4xl font-bold text-primary/80 w-full text-center mb-10">
                {type === 'default' ? 'Best Sells' : 'Latest Products'}
            </h2>

            {/* Grid for displaying the products */}
            <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 sm:place-items-start place-items-center sm:grid-cols-2 grid-cols-1  gap-6 '>
                {bestSells.map((product: Product) => (
                    <div
                        key={product._id}
                        className='w-full max-w-[450px] h-full'
                    >
                        <ProductCard
                            product={product}
                            isAdmin={isAdmin}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BestSells;
