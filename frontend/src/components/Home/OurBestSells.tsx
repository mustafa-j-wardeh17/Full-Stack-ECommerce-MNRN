import React from 'react';
import { Product } from '@/util/types';
import ProductCard from '../productCard';
import Link from 'next/link';

const BestSells = ({ bestSells, type = 'default' }: { bestSells: Product[], type?: 'default' | 'latest'}) => {


    return (
        <section className="my-20 px-4">
            <h2 className="md:text-4xl text-2xl  font-bold text-primary/80 w-full text-center mb-10">
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
                        />
                    </div>
                ))}
            </div>
            {
                type === 'default' && (
                    <div className='w-full flex items-center justify-center mt-10'>
                        <Link href='/shop?sort=-avgRating' className='bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)] hover:opacity-80 px-4 py-2 rounded-md shadow-md hover:bg-primary/70 duration-150 '>
                            <p className='block text-center text-white  font-semibold text-lg'>View All Products</p>
                        </Link>
                    </div>
                )
            }
            {
                type === 'latest' && (
                    <div className='w-full flex items-center justify-center mt-10'>
                        <Link href='/shop?sort=-createdAt' className='bg-[radial-gradient(circle_farthest-side_at_0_100%,#00ccb1,transparent),radial-gradient(circle_farthest-side_at_100%_0,#7b61ff,transparent),radial-gradient(circle_farthest-side_at_100%_100%,#ffc414,transparent),radial-gradient(circle_farthest-side_at_0_0,#1ca0fb,#141316)] hover:opacity-80 px-4 py-2 rounded-md shadow-md hover:bg-primary/70 duration-150 '>
                            <p className='block text-center text-white  font-semibold text-lg'>View All Products</p>
                        </Link>
                    </div>
                )
            }

        </section>
    );
};

export default BestSells;
