'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const SuccessPage = () => {
    const router = useRouter();

    useEffect(() => {
        const deleteItemsFromCart = async () => {
            const orders = JSON.parse(localStorage.getItem('orders') || '')
            const cart: string[] = orders.cart

            if (!cart || cart.length < 1) {
                router.push('/my-account/my-orders');
            }

            cart.map(async item => {
                try {
                    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/cart/${item}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include'
                    })
                    const result = await response.json()
                    console.log('delete items from cart ====>',result)
                    if (response.ok) {
                        router.push('/my-account/my-cart');
                    }
                } catch (error) {
                    router.push('/my-account/my-orders');
                }
            })
        }
        // After 3 seconds, redirect to /my-account/my-cart
        const timer = setTimeout(() => {
            deleteItemsFromCart()
            localStorage.removeItem('orders')
        }, 2000);

        // Clean up the timer when the component unmounts
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="absolute right-0 top-0 z-50 h-screen w-screen flex items-center justify-center bg-gradient-to-r from-secondary to-primary-foreground">
            <div className="text-center p-8 bg-secondary shadow-lg rounded-lg max-w-md mx-auto">
                <h1 className="text-4xl font-bold text-green-500 mb-4">Success!</h1>
                <p className="text-xl text-primary/80 mb-6">Your order has been placed successfully.</p>
                <div className="animate-pulse mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-16 h-16 mx-auto text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <p className="text-sm text-primary/60">Redirecting you to your cart...</p>
            </div>
        </div>
    );
};

export default SuccessPage;
