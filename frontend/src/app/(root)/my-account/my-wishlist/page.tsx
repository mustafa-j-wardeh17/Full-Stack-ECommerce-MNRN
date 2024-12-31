import React from 'react'
import ProductCard from '@/components/productCard';
import { Product } from '@/util/types';
import { cookies } from 'next/headers';
import WishlistTable from '@/components/my-account/my-wishlist/wishlistTable';

interface GetUserWishlistInterface {
    result: {
        wishlist: {
            productId: string,
            skuId: string,
        }[]
    }
}

const page = async () => {
    const cookieStore = cookies()
    const _digi_auth_token = (await cookieStore).get('_digi_auth_token')

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/wishlist`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${_digi_auth_token?.value}`,

            },
            credentials: 'include',
        })

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.statusText}`);
        }
        const result: GetUserWishlistInterface = await response.json() || ''
        const wishlist = result.result.wishlist

        try {

            return (
                <div className='w-full  grid 2xl:grid-cols-3 lg:grid-cols-2 sm:place-items-start place-items-center sm:grid-cols-2 grid-cols-1 gap-6'>
                    <WishlistTable />
                </div>
            )
        } catch (error: any) {
            throw new Error(error.message)
        }
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