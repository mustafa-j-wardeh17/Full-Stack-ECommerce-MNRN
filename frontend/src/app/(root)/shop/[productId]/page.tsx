import { BreadcrumbWithCustomSeparator } from '@/components/breadcrumb'
import { FaStar } from "react-icons/fa";
import Image from 'next/image'
import React from 'react'
import { FiMinus, FiPlus } from "react-icons/fi";
import ProductDescriptionsRequiermentsReviews from '@/components/shop/product/ProductDescriptionsRequiermentsReviews';
import RelatedProducts from '@/components/shop/product/RelatedProducts';
import { Product } from '@/util/types';

interface ResultInterface {
  result: {
    product: Product,
    relatedProducts: Product[]
  }
}
type tParams = Promise<{ productId: string[] }>
const page = async ({ params }: { params: tParams }) => {
  const { productId } = await (params)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}`)
    if(!response.ok){
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }
    const result: ResultInterface = await response.json()
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
          <div className='flex items-center justify-center 2xl:w-2/5 lg:w-1/2 w-full bg-secondary border-[6px] border-primary/5 dark:bg-neutral-900'>
            <Image
              src={product.image}
              alt={`Product ${product._id} image`}
              width={400}
              height={400}
              className='w-full  object-cover'
            />
          </div>
          <div className='flex flex-col justify-center gap-4 2xl:w-3/5 lg:w-1/2 w-full '>
            <div className='flex items-center justify-between'>
              <h1 className='text-2xl font-bold'>{product.productName}</h1>
              <p className='p-2 rounded-md bg-green-200/40 text-green-500  font-bold text-xs flex items-center justify-center'>In Stock</p>
            </div>
            <p>{product.description}</p>
            <div className='flex items-center gap-2'>
              <span className='flex'>
                {[1, 2, 3, 4, 5].map((_, idx: number) => (
                  <FaStar key={idx} className='text-amber-500' />
                ))}
              </span>
              <span className='text-primary/20 text-xs'>
                5.0 (126 Reviews)
              </span>
            </div>
            <p>00</p>
            <ul className='list-disc pl-8 gap-2'>
              {
                product.highlights && product.highlights.map((item: string) => (
                  <li
                    key={item}
                  >
                    {item}
                  </li>
                ))
              }
            </ul>
            <div className='flex mt-4 items-center justify-between'>
              <div className='border border-primary/60 rounded-lg p-2  flex gap-3 items-center'>
                <button
                >
                  <FiMinus />
                </button>
                <p>1</p>
                <button>
                  <FiPlus />
                </button>
              </div>

              <button
                className='min-w-[200px] bg-primary text-secondary py-2 rounded-lg hover:bg-primary/80 flex items-center justify-center'
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        <ProductDescriptionsRequiermentsReviews description={product.description} requirement={product.requirementSpecification || []} />

        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
    )
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="text-center text-red-500">
        <p>Error loading products. Please try again later.</p>
      </div>
    );

  }
}

export default page