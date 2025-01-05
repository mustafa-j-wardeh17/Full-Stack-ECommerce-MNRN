'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useUserContext } from '@/context';

const UpdateUserInfo = () => {
    const { user, setUser } = useUserContext();
    const [form, setForm] = useState<{ username: string, oldPassword: string, newPassword: string }>({
        username: user?.name || '',
        oldPassword: '',
        newPassword: '',
    });
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Prepare the data for PATCH request
        const requestBody: Record<string, string> = {};

        if (form.username) requestBody.name = form.username;
        if (form.oldPassword && form.newPassword) {
            requestBody.oldPassword = form.oldPassword;
            requestBody.newPassword = form.newPassword;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/update-name-password/${user?.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
                credentials: 'include',
            });

            if (response.ok) {
                toast.success('Information updated successfully!');
                if (form.username) {
                    setUser({
                        ...user,
                        name: form.username || user?.name,  // If form.username is undefined, fallback to user?.name
                    });
                }
            } else {
                const errorData = await response.json();
                toast.error(`Failed to update information: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            toast.error('An error occurred while updating your information. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user?.email,
                }),
                credentials: 'include',
            });

            if (response.ok) {
                toast.success('Password reset email sent successfully!');
            } else {
                const errorData = await response.json();
                toast.error(`Failed to send password reset email: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error sending password reset email:', error);
            toast.error('An error occurred while sending password reset email. Please try again.');
        }
    }
    return (
        <>
            <h2 className="text-2xl font-bold text-primary my-6">Update Personal Information</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Username */}
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        User Name
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={form.username}
                        onChange={handleInputChange}
                        className="mt-2 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        placeholder="Enter your username"
                    />
                </div>

                {/* Old Password */}
                <div>
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Old Password
                    </label>
                    <input
                        type="password"
                        name="oldPassword"
                        id="oldPassword"
                        value={form.oldPassword}
                        onChange={handleInputChange}
                        className="mt-2 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        placeholder="Enter your old password"
                    />
                </div>

                {/* New Password */}
                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        New Password
                    </label>
                    <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={form.newPassword}
                        onChange={handleInputChange}
                        className="mt-2 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        placeholder="Enter your new password"
                    />
                </div>
                {/* Forgot Password */}
                <div className="text-sm mt-4 text-right">
                    <button type='button' onClick={handleForgotPassword} className="text-primary hover:underline">
                        Forgot Password?
                    </button>
                </div>


                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-secondary hover:bg-primary/80 font-semibold py-3 rounded-lg shadow-md hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Information'}
                    </button>
                </div>
            </form>
        </>
    )
}

export default UpdateUserInfo