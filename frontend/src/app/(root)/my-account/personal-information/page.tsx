'use client';
import React, { useState } from 'react';

const PersonalInformation = () => {
    const [form, setForm] = useState({
        username: '',
        oldPassword: '',
        newPassword: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Submit logic here
        console.log('Updated Info:', form);
    };

    return (
        <div className="w-full  bg-primary-foreground p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-6">Update Personal Information</h2>
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
                        required
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
                        required
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
                        required
                    />
                </div>

                {/* Forgot Password */}
                <div className="text-sm text-right">
                    <a
                        href="/forgot-password"
                        className="text-primary hover:underline"
                    >
                        Forgot Password?
                    </a>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-secondary hover:bg-primary/80 font-semibold py-3 rounded-lg shadow-md hover:bg-primary-dark focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
                    >
                        Update Information
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PersonalInformation;
