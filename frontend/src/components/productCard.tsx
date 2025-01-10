'use client'
import { Product } from '@/util/types';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { BackgroundGradient } from './ui/background-gradient';

import { useUserContext } from '@/context';
import RatingStars from './RatingStars';

const ProductCard = ({ product, type = 'default' }: { product: Product, type?: 'default' | 'wishlist' }) => {
    const { user } = useUserContext()
    const [loadImage, setloadImage] = useState(true)

    const handleLoad = () => {
        setloadImage(false)
    }
    return (
        <BackgroundGradient className=" relative  bg-white flex flex-col justify-center dark:bg-zinc-900">
            <Link href={`/shop/${product._id}`}>
                {/* Image Section */}
                <div className="relative group w-full  h-64 flex items-center justify-center overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.productName}
                        fill
                        className="object-center object-fill aspect-square transition-transform duration-300 group-hover:scale-105"
                        onLoad={handleLoad}
                    />
                    {
                        loadImage && (
                            <div className='w-full h-full flex items-center justify-center'>
                                <div className='w-[40px] h-[40px] rounded-full border-primary border-t-[2px] animate-spin' />
                            </div>
                        )
                    }
                </div>

                {/* Product Details */}
                <div className="pt-4 p-4  w-full flex justify-between items-start">
                    {/* Product Info */}
                    <div className="flex w-full flex-col items-center lg:space-y-3 space-y-2">
                        <h3 className="xl:text-lg text-md font-semibold text-gray-800 dark:text-gray-200 truncate">
                            {product.productName.length > 25 ? product.productName.slice(0, 25) + '...' : product.productName}
                        </h3>
                        <p className="xl:text-sm text-xs text-gray-500   text-wrap text-center dark:text-gray-400 truncate">
                            {product.description.length > 60 ? (product.description.slice(0, 60) + '...') : product.description}
                        </p>
                        <RatingStars avgRating={product.avgRating!} />
                        <div className='flex justify-between items-center'>
                            <p className="text-primary text-sm font-semibold ">
                                {product.skuDetails && product.skuDetails.length > 0
                                    ? (() => {
                                        const [low, high] = product.skuDetails.reduce(
                                            ([low, high], current) => [
                                                current.price < low ? current.price : low,
                                                current.price > high ? current.price : high,
                                            ],
                                            [Infinity, -Infinity]
                                        );

                                        // If low and high are the same, show only one price
                                        return low === high ? `${low} $` : `${low} - ${high} $`;
                                    })()
                                    : "No prices available"}
                            </p>

                        </div>

                    </div>

                </div>
            </Link>


            <div className="absolute z-10 top-4 left-4 flex flex-col space-y-2 transition-opacity duration-300">
                {/* {type === 'default' && (
                    <div className="flex flex-col items-start justify-center space-y-2">
                        <div className='space-y-2'>
                            <button className="p-[6px] border-[2px] border-gray-300 hover:border-red-300 text-gray-400  hover:text-red-500  rounded-full shadow-md hover:shadow-lg flex items-center justify-center">
                                <TbHeartFilled size={17} />
                            </button>
                        </div>
                    </div>
                )} */}
                {type === 'wishlist' && (
                    <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg">
                        <RiDeleteBin6Line className="text-red-500" size={18} />
                    </button>
                )}
            </div>
        </BackgroundGradient>
    );
};


export default ProductCard;
