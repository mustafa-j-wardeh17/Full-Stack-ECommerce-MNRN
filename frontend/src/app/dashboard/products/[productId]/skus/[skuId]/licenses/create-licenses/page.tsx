import DynamicLink from '@/components/Dashboard/DynamicLink'
import PageWrapper from '@/components/Dashboard/pageWrapper'
import CreateProductSkuLicensesForm from '@/components/shop/CreateProductSkuLicensesForm'
import React from 'react'

type paramsProp = Promise<{ productId: string, skuId: string }>
const page = async ({ params }: { params: paramsProp }) => {
    const { productId, skuId } = await params

    return (
        <PageWrapper title={'Create Licenses For Product'}>
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