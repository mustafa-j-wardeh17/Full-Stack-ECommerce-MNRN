import PageWrapper from '@/components/Dashboard/pageWrapper'
import ProductsTable from '@/components/Dashboard/productsTable'
import { ProductResponse } from '@/util/types'
import React from 'react'

type tParams = Promise<{ productId: string }>
const skus = async ({ params }: { params: tParams }) => {
    const { productId } = await params
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}`)
        const data: ProductResponse = await response.json()
        if (!response.ok) {
            throw new Error(data.message)
        }

        console.log(data.result.product.skuDetails)

        return (
            <PageWrapper title={`${data.result.product.productName} SKUs`}>
                <ProductsTable
                    skus={data.result.product.skuDetails}
                    totalItems={data.result.product.skuDetails.length}
                    
                    type={'skus'}
                />
                s
            </PageWrapper>
        )
    } catch (error: any) {
        return (
            <div>
                Something went wrong {error.message}
            </div>
        )
    }

}

export default skus