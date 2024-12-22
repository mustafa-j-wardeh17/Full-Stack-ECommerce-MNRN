import { useUserContext } from '@/context';
import { Feedbacker } from '@/util/types';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { MdOutlineDelete } from 'react-icons/md';

type ReviewsProps = {
    customerId: string,
    customerName: string,
    rating: number,
    feedbackMsg: string,
}

const Reviews = ({ productReviews, productId }: { productReviews: Feedbacker[], productId: string }) => {
    const [reviews, setReviews] = useState<ReviewsProps[]>(productReviews ? productReviews : []);
    const { user, userType } = useUserContext()

    const [reviewForm, setReviewForm] = useState<ReviewsProps>({ customerId: user?.id || '', customerName: user?.name || '', rating: 0, feedbackMsg: '' });
    const [loading, setLoading] = useState(false);

    const handleStarClick = (rating: number) => {
        setReviewForm((prev) => ({ ...prev, rating }));
    };

    const handleReviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (reviewForm.customerName && reviewForm.rating > 0 && reviewForm.feedbackMsg) {
            setLoading(true);
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}/reviews`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        rating: reviewForm.rating,
                        review: reviewForm.feedbackMsg,
                    }),
                    credentials: 'include',
                });

                if (response.ok) {
                    const newReview = { customerId: user?.id || '', customerName: reviewForm.customerName, rating: reviewForm.rating, feedbackMsg: reviewForm.feedbackMsg };
                    setReviews([...reviews, newReview]);
                    setReviewForm({ customerId: user?.id || '', customerName: '', rating: 0, feedbackMsg: '' });
                    toast.success('Review submitted successfully!');
                } else {
                    const errorData = await response.json();
                    console.log('Error submitting review:', errorData);
                    toast.error(errorData.errorResponse.message);
                }
            } catch (error) {
                console.error('Error submitting review:', error);
                alert('An error occurred while submitting your review. Please try again.');
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please complete all fields before submitting your review.');
        }
    };

    console.log('CustomerId', productReviews.find(review => review.customerId == user?.id)?._id)
    const handleDeleteReview = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}/reviews/${productReviews.find(review => review.customerId == user?.id)?._id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (response.ok) {
                const newReviews = reviews.filter((review) => review.customerId !== user?.id);
                setReviews(newReviews);
                toast.success('Review deleted successfully!');
            } else {
                const errorData = await response.json();
                toast.error(errorData.message);
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            alert('An error occurred while deleting your review. Please try again.');
        }
    }
    return (
        <div className="fade-in">
            <h3 className="text-xl font-semibold text-primary mb-4">Customer Reviews</h3>
            <div className="space-y-4">
                {
                    reviews.map((review, index) => (
                        <div key={index} className="p-4 relative border rounded-lg shadow-sm bg-white dark:bg-neutral-800">
                            <h4 className="font-medium text-gray-800 dark:text-gray-100">{review.customerName}</h4>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">{"⭐".repeat(review.rating)}</p>
                            <p className="mt-2 text-gray-700 dark:text-gray-300">{review.feedbackMsg}</p>
                            <button
                                className={`${userType === 'guest' || review.customerId !== user?.id ? 'hidden' : 'block'} border flex items-center justify-center rounded-md text-primary/70 h-[40px] w-[40px] absolute top-[50%] -translate-y-1/2 right-2 hover:border-primary hover:bg-primary/10 hover:text-primary transition`}
                                onClick={handleDeleteReview}
                            >
                                <MdOutlineDelete size={25} />

                            </button>
                        </div>
                    ))
                }
            </div>

            {/* Review Form */}
            <div className={`mt-6 ${(userType === 'guest' || reviews.find(review => review.customerId === user?.id)?.customerId === user?.id) ? 'hidden' : 'block'}`}>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Write a Review</h4>
                <form onSubmit={handleReviewSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        defaultValue={user?.name || ''}
                        className=" hidden w-full p-3 border rounded-lg dark:bg-neutral-800 dark:border-gray-600 dark:text-gray-200"
                        required
                    />
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
                        value={reviewForm.feedbackMsg}
                        onChange={(e) => setReviewForm({ ...reviewForm, feedbackMsg: e.target.value })}
                        className="w-full p-3 border rounded-lg dark:bg-neutral-800 dark:border-gray-600 dark:text-gray-200"
                        rows={4}
                        required
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-secondary rounded-lg hover:bg-primary/90 transition"
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Review'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Reviews