'use client';

import { useUserContext } from '@/context';
import { HttpResponse } from '@/util/types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const ToggleSubscription = () => {
    const { user } = useUserContext();
    const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkSubscription = async () => {
            if (!user?.email) return;

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/subscriber`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                if (response.ok) {
                    setIsSubscribed(true);
                } else {
                    setIsSubscribed(false);
                }
            } catch {
                setIsSubscribed(false);
            }
        };

        checkSubscription();
    }, [user?.email]);

    const toggleSubscription = async () => {
        if (!user?.email) {
            toast.error('User email is not available.');
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/subscriber`, {
                method: isSubscribed ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email: user.email })
            });
            const data: HttpResponse = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'Failed to update subscription.');
                throw new Error(data.message || 'Failed to update subscription.');
            }

            setIsSubscribed(!isSubscribed);
            toast.success(data.message);
        } catch (error: any) {
            toast.error(error.message || 'Failed to update subscription. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col my-6 items-start space-y-4">
            <h1 className='text-2xl font-bold text-primary '>Our Newsletter</h1>
            <div className="flex items-center space-x-2">
                <Switch
                    checked={!!isSubscribed}
                    onCheckedChange={toggleSubscription}
                    disabled={loading || isSubscribed === null}
                />
                <Label>{isSubscribed ? 'Subscribed' : 'Not Subscribed'}</Label>
            </div>
            <p className="text-sm text-primary/60 mt-2">
                Subscribe to our newsletter and be the first to know about new collections, exclusive offers, and exciting product launches.
                As a subscriber, you'll receive early access to sales and special discounts, ensuring you never miss out on the latest trends.
            </p>
            <p className="text-xs text-primary/50">
                We respect your privacy. Your email will never be shared with third parties, and you can unsubscribe at any time with just one click.
                Join our community and enjoy staying updated with all things ByteVault!
            </p>
        </div>
    );
};

export default ToggleSubscription;
