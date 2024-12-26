import React from 'react'
import ProductSkuForm from '@/components/shop/createProductSkuForm'
import PageWrapper from '@/components/Dashboard/pageWrapper'

type paramsProp = Promise<{ productId: string }>
const page = async ({ params }: { params: paramsProp }) => {
    const productId = (await params).productId
    return (

        <PageWrapper title='Create Product SKU'>
            <ProductSkuForm
                productId={productId}
            />
        </PageWrapper>

    )
}

export default page