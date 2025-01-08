import DynamicLink from '@/components/Dashboard/DynamicLink'
import PageWrapper from '@/components/Dashboard/pageWrapper'
import CreateProductSkuLicensesForm from '@/components/shop/CreateProductSkuLicensesForm'
import { Product, ProductResponse } from '@/util/types'
import React from 'react'

type paramsProp = Promise<{ productId: string, skuId: string }>
const page = async ({ params }: { params: paramsProp }) => {
    const { productId, skuId } = await params
    let product: Product;

    const productresponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}`)

    const productdata: ProductResponse = await productresponse.json()
    if (!productresponse.ok) {
        throw new Error(productdata.message)
    }
    product = productdata.result.product
    return (
        <PageWrapper title={`Create Licenses For ${product.skuDetails.find(item => item._id === skuId)?.skuName}`}>
            <DynamicLink
                label={'Licenses'}
                url={`/dashboard/products/${productId}/skus/${skuId}/licenses`}
            />
            <CreateProductSkuLicensesForm
                productId={productId}
                skuId={skuId}
            />
        </PageWrapper>
    )
}

export default page