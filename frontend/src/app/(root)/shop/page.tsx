import Pagination from '@/components/Pagination';
import ProductCard from '@/components/productCard';
import { FilterBy } from '@/components/shop/FilterBy';
import { SortBy } from '@/components/shop/SortBy';
import { baseType, categoryType, platformType } from '@/util/constant';
import { Product } from '@/util/types';
import { cookies } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { CiGrid41 } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";

interface ProductsInterface {
    result: {
        products: Product[];
        metadata: {
            pages: number,
            total: number
        }
    };
}
type tSearchParams = Promise<{ [key: string]: string | undefined }>;

const page = async ({ searchParams }: { searchParams: tSearchParams }) => {
    const cookieStore = cookies();
    const _digi_auth_token = (await cookieStore).get('_digi_auth_token');
    let isAdmin = false;
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/is-admin`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${_digi_auth_token?.value}`, // Add the token here
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        if (response.ok) {
            isAdmin = true;
        } else {
            isAdmin = false;
        }
    } catch (error) {
        isAdmin = false;
    }
    const resolvedSearchParams = await searchParams;

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
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products?${queryParams.toString()}`, {
            cache: 'no-store', // Avoid caching for fresh data
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const result: ProductsInterface = await response.json();

        return (
            <div>
                {/* BreadCrumb */}
                <div className="flex lg:flex-row relative flex-col gap-6 mt-8">
                    {/* Filter Sidebar */}
                    <div className="lg:w-1/5 w-full">
                        <FilterBy />
                    </div>

                    {/* Product List */}
                    <div className={`${result.result.metadata.total !== 0 ? 'flex' : 'hidden'} lg:w-4/5 w-full flex-col gap-6`}>
                        {/* Sorting and Product Count */}
                        <div className="flex sm:flex-row flex-col gap-4 justify-between md:text-[14px] text-[12px]">
                            <div className="flex  items-center gap-3">
                                <CiGrid41 size={20} />
                                <p>Showing 1-{Math.min(result.result.products.length, 16)} of {result.result.products.length} items</p>
                            </div>
                            <div className='flex sm:justify-start justify-between items-center gap-3'>
                                <Link
                                    className='text-primary flex items-center gap-1 border border-primary rounded-md p-2 hover:bg-primary hover:text-secondary transition'
                                    href={`/shop/product-crud/create-product`}
                                >
                                    Create Product <IoMdAdd />
                                </Link>
                                <SortBy />
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="grid 2xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
                            {result.result.products.map((product: Product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                    isAdmin={isAdmin}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className='w-full justify-center'>
                            <Pagination
                                searchParams={resolvedSearchParams}
                                totalPages={result.result.metadata.pages}
                            />
                        </div>
                    </div>
                    {/* No Products Found */}
                    <div className={`${result.result.metadata.total === 0 ? 'flex' : 'hidden'} lg:w-4/5 w-full items-center justify-center p-4  rounded-lg`}>
                        <div className="text-center text-xl font-semibold space-y-4">
                            <h1 className='sm:text-2xl text-xl'>No products available at the moment.</h1>
                            <p className="text-sm text-primary/50">Please check back later or try refining your search or filter.</p>
                        </div>
                    </div>

                </div>

            </div>
        );
    } catch (error) {
        console.error('Error fetching products:', error);
        return (
            <div className="text-center text-red-500">
                <p>Error loading products. Please try again later.</p>
            </div>
        );
    }
};

export default page;
