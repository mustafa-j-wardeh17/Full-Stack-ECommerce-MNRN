import DashboardCard from '@/components/Dashboard/dashboardProductCard'
import PageTitle from '@/components/Dashboard/pageTitle'
import ProductsTable from '@/components/Dashboard/productsTable'
import Pagination from '@/components/Pagination'
import { baseType, categoryType, platformType } from '@/util/constant'
import { ProductsResponse } from '@/util/types'
import { Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type tSearchParams = Promise<{ [key: string]: string | undefined }>;
const Dashboard = async ({ searchParams }: { searchParams: tSearchParams }) => {

  const resolvedSearchParams = await searchParams

  let products = []
     const category = (Object.values(categoryType).includes(resolvedSearchParams.category as categoryType)
         ? resolvedSearchParams.category
         : '') as categoryType | '';
 
     const platform = (Object.values(platformType).includes(resolvedSearchParams.platformType as platformType)
         ? resolvedSearchParams.platformType
         : '') as platformType | '';
 
     const base = (Object.values(baseType).includes(resolvedSearchParams.baseType as baseType)
         ? resolvedSearchParams.baseType
         : '') as baseType | 'createdAt';
 
     const skip = ((Number(resolvedSearchParams.page) - 1) * 12) || 0;
 
     const search = resolvedSearchParams.search || '';
 
     const sort = resolvedSearchParams.sort || '';
 
     const queryParams = new URLSearchParams();
 
     if (category) queryParams.append('category', category);
     if (platform) queryParams.append('platformType', platform);
     if (base) queryParams.append('baseType', base);
     if (skip) queryParams.append('skip', skip.toString());
     if (sort) queryParams.append('sort', sort);
     if (search) queryParams.append('search', search);
     try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products?limit=12&${queryParams.toString()}`, {
             cache: 'no-store', // Avoid caching for fresh data
         });

    const data: ProductsResponse = await response.json()

    products = data.result.products

    return (

      <div className='relative flex w-full text-dark flex-col gap-8' >
        <PageTitle title='Products' />
        <div className='md:p-10 p-5 bg-primary-foreground flex flex-col gap-8'>
          <div className='flex gap-4 items-center justify-between sm:flex-row flex-col'>
            {/* <DashboardSearch /> */}
            <div className='flex sm:justify-end w-full justify-between gap-3 items-center'>
              {/* <DashboardCategoryFilter
              locale={locale}
              categories={categories}
              type='category'
              selectedCategory={category}
            />
            {
              category !== '' && (
                <DashboardCategoryFilter
                  locale={locale}
                  categories={subCategories}
                  type='sub-category'
                  selectedSubCategory={subCategory}
                />
              )
            } */}
              <Link
                href={`/dashboard/create-product`}
                className='rounded-lg bg-primary  hover:bg-primary/80 shadow md:w-[130px] md:gap-2 w-11 h-11 flex items-center justify-center  text-secondary'
              >
                <Plus />
                <h2 className='md:flex text-sm hidden'>Add Product</h2>
              </Link>
            </div>
          </div>
          <ProductsTable
            items={products}
            page={data.result.metadata.limit}
            totalItems={data.result.metadata.total}
          />
          <div className='w-full mt-8 text-dark  flex justify-center'>
            <Pagination
              totalPages={data.result.metadata.pages}
              searchParams={resolvedSearchParams}
            />
          </div>
        </div>
      </div>

    )
  } catch (error) {

  }

}

export default Dashboard