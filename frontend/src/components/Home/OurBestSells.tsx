import React from 'react';
import { Product } from '@/util/types';
import ProductCard from '../productCard';

const BestSells = ({ bestSells, type = 'default', isAdmin }: { bestSells: Product[], type?: 'default' | 'latest', isAdmin: boolean }) => {


    return (
        <section className="my-12 px-4">
            <h2 className="text-3xl font-semibold text-primary/80 w-full text-center mb-6">
                {type === 'default' ? 'Best Sells' : 'Latest Products'}
            </h2>

            {/* Grid for displaying the products */}
            <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 sm:place-items-start place-items-center sm:grid-cols-2 grid-cols-1  gap-6 '>
                {bestSells.map((product: Product) => (
                    <div className='w-full max-w-[450px] h-full'>
                        <ProductCard
                            key={product._id}
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
