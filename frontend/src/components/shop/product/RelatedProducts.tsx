import ProductCard from '@/components/productCard'
import { Product } from '@/util/types'
import React from 'react'

const RelatedProducts = ({ relatedProducts }: { relatedProducts: Product[] }) => {
    
    return (
        <div className='my-[80px] flex flex-col gap-12'>
            <h1 className='font-semibold text-3xl'>Related Products</h1>
            <div className='grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3'>
                {
                    relatedProducts.map((product: Product) => (
                        <ProductCard key={product._id} product={product} />
                    ))
                }
            </div>
        </div>
    )
}

export default RelatedProducts