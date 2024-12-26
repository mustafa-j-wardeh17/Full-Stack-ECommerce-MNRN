import PageWrapper from '@/components/Dashboard/pageWrapper'
import CreateUpdateProduct from '@/components/shop/updateCreateProductForm'
import { Product, ProductResponse } from '@/util/types'
import React from 'react'

type tParams = Promise<{ productId: string }>
const page = async ({ params }: { params: tParams }) => {
  const productId = (await params).productId
  let product: Product | null = null
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}`)
    const result: ProductResponse = await response.json()
    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${result.message}`)
    }
    product = result.result.product;
  } catch (error) {

  }
  return (
    <PageWrapper title='Update Product'>
      <CreateUpdateProduct
        type='update'
        product={product}
      />
    </PageWrapper>
  )
}

export default page