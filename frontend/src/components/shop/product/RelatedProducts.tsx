import ProductCard, { productProps } from '@/components/productCard'
import React from 'react'

const RelatedProducts = () => {
    const products: productProps[] = [
        { id: 1, name: 'Product 1', image: '/hero.png', description: 'This is a great product.', price: '$99.99', link: '/product/1' },
        { id: 2, name: 'Product 2', image: '/hero.png', description: 'This is a great product.', price: '$89.99', link: '/product/2' },
        { id: 3, name: 'Product 3', image: '/hero.png', description: 'This is a great product.', price: '$79.99', link: '/product/3' },
        { id: 4, name: 'Product 4', image: '/hero.png', description: 'This is a great product.', price: '$69.99', link: '/product/4' },
    ]
    return (
        <div className='my-[80px] flex flex-col gap-12'>
            <h1 className='font-semibold text-3xl'>Related Products</h1>
            <div className='grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3'>
                {
                    products.map((product: productProps) => (
                        <ProductCard key={product.id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts