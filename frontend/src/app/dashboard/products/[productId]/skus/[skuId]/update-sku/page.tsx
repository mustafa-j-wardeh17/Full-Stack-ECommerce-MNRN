import DynamicLink from '@/components/Dashboard/DynamicLink'
import PageWrapper from '@/components/Dashboard/pageWrapper'
import UpdateProductSkuForm from '@/components/shop/updateProductSkuForm'
import { ProductResponse } from '@/util/types'
import React from 'react'

type paramsProp = Promise<{ productId: string, skuId: string }>
const page = async ({ params }: { params: paramsProp }) => {
    const { productId, skuId } = await params
    let skuData = null
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}`, {
            method: 'GET',
        });

        if (response.ok) {
            const data: ProductResponse = await response.json();
            skuData = data.result.product.skuDetails.find((sku) => sku._id === skuId)
        } else {
            const errorData = await response.json();
            return <div>{errorData.message || 'Unknown error'}</div>
        }

    } catch (error: any) {
        return <div>{error.message}</div>
    }

    return (

        <PageWrapper title='Update Product Sku'>
            <DynamicLink
                label='Product SKUs'
                url={`/dashboard/products/${productId}/skus`}
            />
            <UpdateProductSkuForm
                skuData={skuData}
                productId={productId}
                skuId={skuId}
            />
        </PageWrapper>
    )
}

export default page