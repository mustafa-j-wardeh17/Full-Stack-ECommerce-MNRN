import PageWrapper from '@/components/Dashboard/pageWrapper'
import CreateUpdateProductSkuLicenseForm from '@/components/shop/createUpdateProductSkuLicence'
import React from 'react'

type paramsProp = Promise<{ productId: string, skuId: string }>
const page = async ({ params }: { params: paramsProp }) => {
    const { productId, skuId } = await params

    return (
        <PageWrapper title={'Create License For Product'}>
             <CreateUpdateProductSkuLicenseForm
                productId={productId}
                skuId={skuId}
            />
        </PageWrapper>
    )
}

export default page