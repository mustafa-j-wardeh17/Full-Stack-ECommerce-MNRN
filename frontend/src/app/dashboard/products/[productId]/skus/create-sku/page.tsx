import React from 'react'
import ProductSkuForm from '@/components/shop/createProductSkuForm'
import PageWrapper from '@/components/Dashboard/pageWrapper'
import { Product, ProductResponse } from '@/util/types'
import DynamicLink from '@/components/Dashboard/DynamicLink'

type paramsProp = Promise<{ productId: string }>
const page = async ({ params }: { params: paramsProp }) => {
    const productId = (await params).productId
    let product: Product;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}`)

        const data: ProductResponse = await response.json()
        if (!response.ok) {
            throw new Error(data.message)
        }
        product = data.result.product
        return (

            <PageWrapper title='Create Product SKU'>
                <DynamicLink
                    label='Product SKUs'
                    url={`/dashboard/products/${productId}/skus`}
                />
                <ProductSkuForm
                    productId={productId}
                    hasLicenses={product.hasLicenses}
                />
            </PageWrapper>

        )

    } catch (error: any) {
        return <h1>{error.message}</h1>
    }
}

export default page