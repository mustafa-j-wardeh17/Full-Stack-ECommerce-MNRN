import React from 'react'
import ProductSkuForm from '@/components/shop/createProductSkuForm'

type paramsProp = Promise<{ productId: string }>
const page = async ({ params }: { params: paramsProp }) => {
    const productId = (await params).productId
    return (
        <div className='my-[30px]'>
            <ProductSkuForm
                productId={productId}
            />
        </div>
    )
}

export default page