'use client';
import { useUserContext } from '@/context';
import { Feedbacker } from '@/util/types';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';
import Reviews from './Reviews';

const ProductDescriptionsRequiermentsReviews = ({ description, requirement, productId, productReviews }: { description: string, requirement?: Record<string, any>[], productId: string, productReviews: Feedbacker[] }) => {
    const [select, setSelect] = useState<'Reviews' | 'Requierments' | 'Descriptions'>('Descriptions');

    return (
        <div className="flex flex-col w-full p-4 bg-secondary dark:bg-neutral-900 rounded-lg shadow-lg">
            {/* Tab Buttons */}
            <div className="flex justify-start gap-6 border-b border-gray-300 dark:border-gray-600 mb-6">
                <button
                    onClick={() => setSelect('Descriptions')}
                    className={`relative py-2 sm:text-lg text-sm font-medium transition-all duration-300 ${select === 'Descriptions'
                        ? 'text-primary border-b-4 border-primary'
                        : 'text-gray-500 dark:text-gray-400 hover:text-primary'
                        }`}
                >
                    Descriptions
                </button>
                <button
                    onClick={() => setSelect('Requierments')}
                    className={`relative py-2 sm:text-lg text-sm font-medium transition-all duration-300 ${select === 'Requierments'
                        ? 'text-primary border-b-4 border-primary'
                        : 'text-gray-500 dark:text-gray-400 hover:text-primary'
                        }`}
                >
                    Requirements
                </button>
                <button
                    onClick={() => setSelect('Reviews')}
                    className={`relative py-2 sm:text-lg text-sm font-medium transition-all duration-300 ${select === 'Reviews'
                        ? 'text-primary border-b-4 border-primary'
                        : 'text-gray-500 dark:text-gray-400 hover:text-primary'
                        }`}
                >
                    Reviews
                </button>
            </div>

            {/* Tab Content */}
            <div className="p-4 rounded-md bg-gray-50 dark:bg-neutral-900 shadow-inner">
                {/* Descriptions */}
                {select === 'Descriptions' && (
                    <div className="fade-in">
                        <h3 className="text-xl font-semibold text-primary mb-2">Product Description</h3>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {description}
                        </p>
                    </div>
                )}

                {/* Requirements */}
                {select === 'Requierments' && requirement && (
                    <div className="fade-in">
                        <h3 className="text-xl font-semibold text-primary mb-2">System Requirements</h3>
                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                            {requirement.map((req, index) => (
                                Object.entries(req).map(([key, value]) => (
                                    <li key={`${index}-${key}`}>{`${key}: ${value}`}</li>
                                ))
                            ))}
                        </ul>
                    </div>
                )}

                {/* Reviews */}
                {select === 'Reviews' && (
                    <Reviews
                        productReviews={productReviews}
                        productId={productId}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductDescriptionsRequiermentsReviews;
