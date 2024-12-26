import DashboardCategoryFilter from '@/components/Dashboard/dashboardCategoryFilter'
import DashboardSearch from '@/components/Dashboard/dashboardSearch'
import PageWrapper from '@/components/Dashboard/pageWrapper'
import ProductsTable from '@/components/Dashboard/productsTable'
import Pagination from '@/components/Pagination'
import { baseType, categoryType, platformType } from '@/util/constant'
import { ProductsResponse } from '@/util/types'
import { Plus } from 'lucide-react'
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
      <PageWrapper title='Products'>
        <>
          <div className='flex gap-4 items-center justify-between sm:flex-row flex-col'>
            <DashboardSearch />
            <div className='flex sm:justify-end w-full justify-between gap-3 items-center'>
              <DashboardCategoryFilter
                type='category'
                categories={[categoryType.applicationSoftware, categoryType.operatingSystem]}
              />
              <DashboardCategoryFilter
                type='platformType'
                categories={[platformType.android, platformType.ios, platformType.linux, platformType.mac, platformType.windows]}
              />

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
            products={products}
            page={(Number(resolvedSearchParams.page) || 1)}
            totalItems={products.length}
          />
          <div className='w-full mt-8 text-dark  flex justify-center'>
            <Pagination
              totalPages={data.result.metadata.pages}
              searchParams={resolvedSearchParams}
            />
          </div>
        </>
      </PageWrapper>


    )
  } catch (error) {

  }

}

export default Dashboard