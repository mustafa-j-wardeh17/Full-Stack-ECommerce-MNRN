import { BreadcrumbWithCustomSeparator } from '@/components/breadcrumb'
import { FaStar } from "react-icons/fa";
import React from 'react'
import ProductDescriptionsRequiermentsReviews from '@/components/shop/product/ProductDescriptionsRequiermentsReviews';
import RelatedProducts from '@/components/shop/product/RelatedProducts';
import { Product, ProductResponse } from '@/util/types';
import SkuCards from '@/components/shop/product/SkuCard';
import ProductImageWithLens from '@/components/shop/product/ProductImageWithLens';
import { notFound } from 'next/navigation';


export async function generateMetadata({ params }: { params: tParams }) {
  const { productId } = await (params)

  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch product: ${response.statusText}`);
  }
  const result: ProductResponse = await response.json()
  const product = result.result.product
  return {
    title: product.productName,
    description: product.description
  };

}


type tParams = Promise<{ productId: string }>
const page = async ({ params }: { params: tParams }) => {
  const { productId } = await (params)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}`)
    const result: ProductResponse = await response.json()

    if (!response.ok) {
      throw new Error(result.message);
    }

    const product = result.result.product
    const relatedProducts = result.result.relatedProducts

    return (
      <div className='2xl:px-10 my-8'>
        <BreadcrumbWithCustomSeparator
          paths={[
            {
              label: 'Shop',
              href: '/shop'
            },
            {
              label: 'Product Name',
              href: '/shop/123'
            }
          ]}
        />

        <div className='flex lg:flex-row gap-6 flex-col my-6'>
          <div className=' border-[6px] border-primary/5 2xl:w-2/5 lg:w-1/2 w-full'>
            <ProductImageWithLens
              imageUrl={product.image}
              id={product._id}
            />
          </div>

          <div className='flex flex-col justify-center gap-4 2xl:w-3/5 lg:w-1/2 w-full '>
            <div className='flex items-center justify-between'>
              <h1 className='md:text-2xl sm:text-xl text-lg font-bold'>{product.productName}</h1>
              <p className='p-2 rounded-md min-w-[90px] bg-green-200/40 text-green-500  font-bold text-xs flex items-center justify-center'>In Stock</p>
            </div>
            <p className='md:text-lg sm:text-md text-sm'>{product.description}</p>
            <div className='flex items-center gap-2'>
              <span className='flex'>
                {[...Array(5)].map((_, idx) => (
                  <FaStar
                    key={idx}
                    className={idx < Math.floor(product.avgRating || 0) ? 'text-amber-500' : 'text-gray-300'}
                  />
                ))}
              </span>
              <span className='text-primary/20 text-xs'>
                {product.avgRating?.toFixed(2) || '0.0'} ({product.feedbackDetails.length || 0} Reviews)
              </span>
            </div>
            <ul className='list-disc pl-8 gap-2'>
              {
                product.highlights && product.highlights.map((item: string) => (
                  <li
                    key={item}
                    className='md:text-lg sm:text-md text-sm'
                  >
                    {item}
                  </li>
                ))
              }
            </ul>

            <SkuCards
              productName={product.productName}
              hasLicenses={product.hasLicenses}
              productImage={product.image}
              skus={product.skuDetails || null}
            />

          </div>
        </div>

        <ProductDescriptionsRequiermentsReviews
          productId={productId}
          description={product.description}
          requirement={product.requirementSpecification || []}
          productReviews={
            product.feedbackDetails || []}
        />

        {
          relatedProducts.length > 0 && (
            <RelatedProducts relatedProducts={relatedProducts} />
          )
        }
      </div>
    )
  } catch (error: any) {
    if (error) {
      return notFound()
    }
  }
}

export default page