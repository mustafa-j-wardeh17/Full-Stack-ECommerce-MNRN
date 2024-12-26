import CreateUpdateProductSkuLicenseForm from '@/components/shop/createUpdateProductSkuLicence'
import React from 'react'

type paramsProp = Promise<{ productId: string, skuId: string }>
const page = async ({ params }: { params: paramsProp }) => {
    const { productId, skuId } = await params

    return (
        <div className='my-[30px]'>
            <CreateUpdateProductSkuLicenseForm
                productId={productId}
                skuId={skuId}
            />
        </div>
    )
}

export default page