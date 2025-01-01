import React from 'react';
import ProductCard from '@/components/productCard';
import { Product } from '@/util/types';
import { cookies } from 'next/headers';
import WishlistTable from '@/components/my-account/my-wishlist/wishlistTable';
import Link from 'next/link';

interface GetUserWishlistInterface {
    result: {
        wishlist: {
            productId: string;
            skuId: string;
        }[];
    };
}

const page = async () => {
    const cookieStore = cookies();
    const _digi_auth_token = (await cookieStore).get('_digi_auth_token');

    try {
        // Fetch user's wishlist
        const userWishlistResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/wishlist`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${_digi_auth_token?.value}`,
            },
        });

        if (!userWishlistResponse.ok) {
            throw new Error(`Failed to fetch user wishlist: ${userWishlistResponse.statusText}`);
        }

        const wishlistData: GetUserWishlistInterface = await userWishlistResponse.json();
        const wishlistSkusIds = wishlistData.result.wishlist;


        // Fetch products for the wishlist
        const wishlistProductsResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/wishlist`, {
            method: 'POST', // Changed to POST
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${_digi_auth_token?.value}`,
            },
            body: JSON.stringify({ wishlist: wishlistSkusIds }),
            credentials: 'include'
        });

        if (!wishlistProductsResponse.ok) {
            throw new Error(`Failed to fetch wishlist products: ${wishlistProductsResponse.statusText}`);
        }

        const result = await wishlistProductsResponse.json();

        const wishlistProducts = result.result.wishlist;


        return (
            <div className="w-full  gap-6">
                {wishlistProducts.length === 0 ? (
                    <div className='w-full flex flex-col gap-4 items-center justify-center'>
                        <p className="text-gray-500 text-center text-lg font-medium">
                            Your wishlist is empty. Start adding your favorite items!
                        </p>
                        <Link href="/shop" className="">
                            <span className="text-center text-blue-500 underline">Shop Now</span>
                        </Link>
                    </div>

                ) : (
                    <WishlistTable wishlist={wishlistProducts} />
                )}
            </div>
        );
    } catch (error) {
        console.error('Error:', error);
        return (
            <div className="text-center text-red-500">
                <p>Error loading products. Please try again later.</p>
            </div>
        );
    }
};

export default page;
