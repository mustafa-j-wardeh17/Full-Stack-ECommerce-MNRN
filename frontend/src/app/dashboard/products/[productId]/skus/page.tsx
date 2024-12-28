import PageWrapper from '@/components/Dashboard/pageWrapper'
import ProductsTable from '@/components/Dashboard/productsTable'
import { ProductResponse } from '@/util/types'
import { Plus } from 'lucide-react'
import Link from 'next/link'
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


        return (
            <PageWrapper title={`${data.result.product.productName} SKUs`}>
                <div className='flex gap-4 items-center justify-between sm:flex-row flex-col'>
                    <div className='flex sm:justify-end w-full justify-between gap-3 items-center'>
                        <Link
                            href={`/dashboard/products/${productId}/skus/create-sku`}
                            className='rounded-lg bg-primary  hover:bg-primary/80 shadow md:w-[130px] md:gap-2 w-11 h-11 flex items-center justify-center  text-secondary'
                        >
                            <Plus />
                            <h2 className='md:flex text-sm hidden'>Add SKU</h2>
                        </Link>
                    </div>
                </div>
                <ProductsTable
                    skus={data.result.product.skuDetails}
                    totalItems={data.result.product.skuDetails.length}
                    hasLicenses={data.result.product.hasLicenses}
                    type={'skus'}
                />
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