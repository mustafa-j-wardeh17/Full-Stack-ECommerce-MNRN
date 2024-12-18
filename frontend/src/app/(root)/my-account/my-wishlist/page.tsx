import React from 'react'
import ProductCard from '@/components/productCard';
import { Product } from '@/util/types';

interface ResultInterface {
    result: {
        products: [
            {
                latestProducts: Product[],
                topRatedProducts: Product[]
            }
        ]
    }
}

const page = async () => {
    try {
        const response = await fetch('https://mnrn-shop-backend.onrender.com/api/v1/products?homepage=true')
        
        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const result: ResultInterface = await response.json() || ''

        return (
            <div className='w-full  grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6'>
                {result.result.products[0].topRatedProducts.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        type='wishlist'
                    />
                ))}
            </div>
        )
    } catch (error) {
        console.error('Error fetching products:', error);
        return (
            <div className="text-center text-red-500">
                <p>Error loading products. Please try again later.</p>
            </div>
        );
    }

}

export default page