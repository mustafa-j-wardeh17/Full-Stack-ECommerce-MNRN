'use client';
import React, { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const ProductDescriptionsRequiermentsReviews = ({ description, requirement }: { description: string, requirement?: Record<string, any>[] }) => {
    const [select, setSelect] = useState<'Reviews' | 'Requierments' | 'Descriptions'>('Descriptions');
    const [reviews, setReviews] = useState<{ name: string; rating: number; comment: string }[]>([
        { name: 'John Doe', rating: 5, comment: 'Absolutely amazing product! It exceeded all my expectations.' },
        { name: 'Jane Smith', rating: 4, comment: 'Great value for money. Would definitely recommend!' },
    ]);
    const [reviewForm, setReviewForm] = useState({ name: '', rating: 0, comment: '' });
    const handleStarClick = (rating: number) => {
        setReviewForm((prev) => ({ ...prev, rating }));
    };

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (reviewForm.name && reviewForm.rating > 0 && reviewForm.comment) {
            setReviews([...reviews, reviewForm]);
            setReviewForm({ name: '', rating: 0, comment: '' });
        }
    };

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
                    <div className="fade-in">
                        <h3 className="text-xl font-semibold text-primary mb-4">Customer Reviews</h3>
                        <div className="space-y-4">
                            {reviews.map((review, index) => (
                                <div key={index} className="p-4 border rounded-lg shadow-sm bg-white dark:bg-neutral-800">
                                    <h4 className="font-medium text-gray-800 dark:text-gray-100">{review.name}</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">{"⭐".repeat(review.rating)}</p>
                                    <p className="mt-2 text-gray-700 dark:text-gray-300">{review.comment}</p>
                                </div>
                            ))}
                        </div>

                        {/* Review Form */}
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Write a Review</h4>
                            <form onSubmit={handleReviewSubmit} className="space-y-4">
                                {/* Star Rating */}
                                <div className="flex items-center space-x-1">
                                    {[1, 2, 3, 4, 5].map((value) => (
                                        <button
                                            key={value}
                                            type="button"
                                            onClick={() => handleStarClick(value)}
                                            className="text-2xl"
                                        >
                                            {value <= reviewForm.rating ? (
                                                <AiFillStar className="text-amber-500" />
                                            ) : (
                                                <AiOutlineStar className="text-gray-400" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <textarea
                                    placeholder="Your Review"
                                    value={reviewForm.comment}
                                    onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                                    className="w-full p-3 border rounded-lg dark:bg-neutral-800 dark:border-gray-600 dark:text-gray-200"
                                    rows={4}
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary text-secondary rounded-lg hover:bg-primary/90 transition"
                                >
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDescriptionsRequiermentsReviews;
