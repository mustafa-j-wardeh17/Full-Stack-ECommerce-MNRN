import { Product } from '@/util/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaEdit, FaEye, FaRegHeart } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { FiShoppingCart } from 'react-icons/fi';
import DeleteProductButton from './ProductCardDeleteButton';
import { CiImageOn } from 'react-icons/ci';

const ProductCard = ({ product, type = 'default', isAdmin = false }: { product: Product, type?: 'default' | 'wishlist', isAdmin?: boolean }) => {
    return (
        <div className="relative bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
            {/* Image Section */}
            <div className="relative group w-full bg-gray-100 h-64 flex items-center justify-center overflow-hidden">
                <Image
                    src={product.image}
                    alt={product.productName}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Action Icons */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {type === 'default' && (
                        <div className="flex items-center justify-center space-x-2">
                            <div className='space-y-2'>
                                <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center">
                                    <FaRegHeart className="text-yellow-400" size={18} />
                                </button>
                                <Link href={`/shop/${product._id}`} className="p-2 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center">
                                    <FaEye className="text-gray-700" size={18} />
                                </Link>

                                <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center">
                                    <FiShoppingCart className="text-gray-700" size={18} />
                                </button>
                            </div>
                            <div className='space-y-2'>
                                {
                                    isAdmin && (
                                        <>
                                            <DeleteProductButton productId={product._id} />
                                            <Link
                                                href={`/dashboard/${product._id}/update-product`}
                                                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center"
                                            >
                                                <FaEdit className="text-blue-500" size={18} />
                                            </Link>
                                            <Link
                                                href={`/dashboard/${product._id}/update-product-image`}
                                                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center"
                                            >
                                                <CiImageOn className="text-green-500" size={18} />
                                            </Link>
                                        </>
                                    )
                                }
                            </div>
                        </div>
                    )}
                    {type === 'wishlist' && (
                        <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg">
                            <RiDeleteBin6Line className="text-red-500" size={18} />
                        </button>
                    )}
                </div>
            </div>

            {/* Product Details */}
            <div className="p-4 flex justify-between items-start">
                {/* Product Info */}
                <div className="flex flex-col space-y-1">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate">
                        {product.productName}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {product.description.length > 24 ? (product.description.slice(0, 24) + '...') : product.description}
                    </p>
                    <p className="text-md font-semibold text-primary mt-2">
                        {product.skuDetails && product.skuDetails.length > 0
                            ? product.skuDetails
                                .reduce(
                                    ([low, high], current) => [
                                        current.price < low ? current.price : low,
                                        current.price > high ? current.price : high,
                                    ],
                                    [Infinity, -Infinity]
                                )
                                .join(" - ") + ' $'
                            : "No prices available"}
                    </p>
                </div>

            </div>
        </div>
    );
};


export default ProductCard;
