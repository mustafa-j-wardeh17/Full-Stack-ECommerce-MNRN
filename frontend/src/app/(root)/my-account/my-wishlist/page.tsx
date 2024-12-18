import React from 'react'
import ProductCard from '@/components/productCard';

const page = () => {
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
        <div className='w-full  grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6'>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} type='wishlist' />
            ))}
        </div>
    )
}

export default page