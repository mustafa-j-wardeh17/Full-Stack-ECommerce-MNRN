'use client';
import { HttpResponse } from '@/util/types';
import { ArrowRightIcon } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Subscribe = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleSubscribe = async () => {
        if (!email) {
            setMessage('Please enter your email.');
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/subscriber`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Ensures cookies are sent with the request
                body: JSON.stringify({ email }),
            });

            if (!response.ok) {
                const errorData: HttpResponse = await response.json(); console.log(errorData)
                toast.error(errorData.message)
                throw new Error(errorData.message || 'Failed to subscribe. Please try again.');
            }
            toast.success('Subscription successful! Thank you for subscribing.')
            setMessage('Subscription successful! Thank you for subscribing.');
        } catch (error: any) {
            setMessage(error.message || 'Failed to subscribe. Please try again.');
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="flex w-full max-w-[300px] flex-col space-y-4 text-sm">
            <h3 className="text-lg font-semibold">Subscribe</h3>
            <p className="text-xs text-primary/70">
                Enter your account email below to be the first to know about new collections and product launches.
            </p>
            <div className="flex flex-col relative">
                <input
                    type="email"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-3 rounded-lg border border-primary bg-primary-foreground text-primary focus:outline-none focus:ring-2 focus:ring-secondary transition duration-300"
                />
                <button
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="absolute right-2 top-[50%] -translate-y-[50%] transition duration-300 ease-in-out"
                    aria-label="Subscribe"
                >
                    <ArrowRightIcon size={18} />
                </button>
            </div>
            {message && <p className={`text-xs mt-2 ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
        </div>
    );
};

export default Subscribe;
