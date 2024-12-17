import ProductCard, { productProps } from '@/components/productCard';
import { FilterBy } from '@/components/shop/FilterBy';
import { SortBy } from '@/components/shop/SortBy';
import React from 'react'
import { CiGrid41 } from "react-icons/ci";

const page = () => {
    const products: productProps[] = [
        { id: 1, name: 'Product 1', image: '/hero.png', description: 'This is a great product.', price: '$99.99', link: '/product/1' },
        { id: 2, name: 'Product 2', image: '/hero.png', description: 'This is a great product.', price: '$89.99', link: '/product/2' },
        { id: 3, name: 'Product 3', image: '/hero.png', description: 'This is a great product.', price: '$79.99', link: '/product/3' },
        { id: 4, name: 'Product 4', image: '/hero.png', description: 'This is a great product.', price: '$69.99', link: '/product/4' },
        { id: 5, name: 'Product 5', image: '/hero.png', description: 'This is a great product.', price: '$59.99', link: '/product/5' },
        { id: 6, name: 'Product 6', image: '/hero.png', description: 'This is a great product.', price: '$49.99', link: '/product/6' },
        { id: 7, name: 'Product 7', image: '/hero.png', description: 'This is a great product.', price: '$39.99', link: '/product/7' },
        { id: 8, name: 'Product 8', image: '/hero.png', description: 'This is a great product.', price: '$29.99', link: '/product/8' },
        { id: 9, name: 'Product 8', image: '/hero.png', description: 'This is a great product.', price: '$29.99', link: '/product/8' },
        { id: 10, name: 'Product 8', image: '/hero.png', description: 'This is a great product.', price: '$29.99', link: '/product/8' },
        { id: 11, name: 'Product 8', image: '/hero.png', description: 'This is a great product.', price: '$29.99', link: '/product/8' },
        { id: 12, name: 'Product 8', image: '/hero.png', description: 'This is a great product.', price: '$29.99', link: '/product/8' },
        { id: 13, name: 'Product 8', image: '/hero.png', description: 'This is a great product.', price: '$29.99', link: '/product/8' },
        { id: 14, name: 'Product 8', image: '/hero.png', description: 'This is a great product.', price: '$29.99', link: '/product/8' },
        { id: 15, name: 'Product 8', image: '/hero.png', description: 'This is a great product.', price: '$29.99', link: '/product/8' },
        { id: 16, name: 'Product 8', image: '/hero.png', description: 'This is a great product.', price: '$29.99', link: '/product/8' },
    ];
    return (
        <div>
            {/* BreadCrumb */}
            <div className='flex lg:flex-row relative flex-col gap-6 my-8'>
                <div className='lg:w-1/5 w-full'>
                    <FilterBy />
                </div>
                <div className='lg:w-4/5 w-full flex flex-col gap-6'>

                    <div className='flex flex-row justify-between md:text-[14px] text-[12px]'>
                        <div className='flex items-center gap-3'>
                            <CiGrid41 size={20} />
                            <p>Showing 1-16 of 72 items</p>
                        </div>
                        <SortBy />
                    </div>

                    <div className='grid 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1  gap-6 '>
                        {
                            products.map((product: productProps) =>
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page