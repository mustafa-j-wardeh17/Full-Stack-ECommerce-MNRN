import Pagination from '@/components/Pagination';
import ProductCard from '@/components/productCard';
import { FilterBy } from '@/components/shop/FilterBy';
import { SortBy } from '@/components/shop/SortBy';
import { baseType, categoryType, platformType } from '@/util/constant';
import { Product } from '@/util/types';
import { Metadata } from 'next';
import React from 'react';
import { CiGrid41 } from "react-icons/ci";

export const metadata: Metadata = {
    title: 'Your Ultimate Tech Shop',
    description: 'Welcome to ByteVault, your trusted destination for the latest in tech! Founded and developed by Mustafa Abu Wardeh, ByteVault offers a wide range of top-quality products including mobile phones, computers, gaming consoles, laptops, accessories, and more. Whether you’re upgrading your gaming setup, looking for a new smartphone, or need essential tech accessories like chargers, headphones, RAM, or storage drives, we have you covered. Our mission is to empower your tech journey with the best products, exceptional service, and unbeatable prices. Explore our collection and elevate your tech experience today at ByteVault.',
};

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
            cache: 'force-cache' // Avoid caching for fresh data
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const result: ProductsInterface = await response.json();

        return (
            <div>
                {/* BreadCrumb */}
                < div className="flex lg:flex-row relative flex-col gap-6 my-14 min-h-[70vh]" >
                    {/* Filter Sidebar */}
                    <div  className="lg:w-1/5  lg:block hidden" >
                        <FilterBy />
                    </div>

                    {/* Product List */}
                    < div className={`flex lg:w-4/5  w-full flex-col gap-6`}>
                        {/* Sorting and Product Count */}
                        <div className={`${result.result.metadata.total !== 0 ? 'flex' : 'hidden'} flex flex-wrap sm:gap-4 gap-2 justify-between md:text-[14px] text-[12px]`}>
                            <div className="flex  items-center sm:gap-3 gap-1">
                                <CiGrid41 size={20} />
                                <p>Showing 1-{Math.min(result.result.products.length, 16)} of {result.result.products.length} items</p>
                            </div>
                            <SortBy />
                        </div >
                        <div className={`lg:w-1/5  lg:hidden block `}>
                            <FilterBy />
                        </div>                        {/* Product Grid */}
                        <div className={`${result.result.metadata.total !== 0 ? 'grid' : 'hidden'} lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-6 sm:place-items-start place-items-center`}>
                            {result.result.products.map((product: Product) => (
                                <div
                                    key={product._id}
                                    className='w-full max-w-[450px] h-full'
                                >
                                    <ProductCard
                                        product={product}
                                    />

                                </div>

                            ))}
                        </div>

                        {/* Pagination */}
                        <div className={`${result.result.metadata.total === 0 && 'hidden'} w-full justify-center `}>
                            <Pagination
                                searchParams={resolvedSearchParams}
                                totalPages={result.result.metadata.pages}
                            />
                        </div>
                    </div >
                    {/* No Products Found */}
                    <div className={`${result.result.metadata.total === 0 ? 'flex' : 'hidden'}  lg:w-4/5 z-0 absolute right-0 bottom-0 sm:h-[70vh] h-[45vh] w-full items-center justify-center p-4  rounded-lg`}>
                        <div className="text-center text-xl font-semibold space-y-4">
                            <h1 className='sm:text-2xl text-xl'>No products available at the moment.</h1>
                            <p className="text-sm text-primary/50">Please check back later or try refining your search or filter.</p>
                        </div>
                    </div>

                </div >

            </div >);
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');

    }
};

export default page;
