'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useUserContext } from '@/context';

interface loginInterface {
    result?: {
        user: {
            name: string,
            email: string,
            type: string,
            id: string
        }
    },
    message?: string
}

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const { setUserType, setUser } = useUserContext()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const response = await fetch('https://mnrn-shop-backend.onrender.com/api/v1/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const result: loginInterface = await response.json();

            if (response.ok) {
                toast.success('Login successful! Redirecting...');
                setUser(result.result?.user || null)
                router.push('/')
            } else {
                setError(result.message || 'Login failed. Please check your credentials.');
            }
        } catch (err: unknown) {
            setError('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="flex flex-col md:flex-row justify-end w-full   overflow-hidden  relative h-full">
                {/* Left Section: Login Form */}
                <div className="h-full w-full 2xl:w-[40%] md:w-1/2 bg-primary-foreground flex flex-col items-center justify-center px-6 py-8">
                    <h2 className="md:text-4xl text-3xl text-primary font-bold mb-6">PS_Store</h2>

                    <p className="text-primary/70 mb-6 text-center md:text-left text-sm">
                        Please fill in your details to access your account.
                    </p>
                    <form className="space-y-5 w-full max-w-[400px] text-sm" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="text-primary font-bold">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 p-3 text-sm border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                required
                            />
                        </div>
                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="text-primary font-bold">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full mt-2 p-3 text-sm border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                                required
                            />
                        </div>
                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox  h-4 w-4 border border-primary checked:border-secondary checked:bg-primary"
                                />
                                <span className="ml-2 text-sm text-primary/70">Remember me</span>
                            </label>
                            <a href="forgot-password" className="text-sm text-primary font-bold hover:underline">
                                Forgot Password?
                            </a>
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-secondary font-semibold p-3 rounded-lg hover:bg-primary/90 transition duration-300 shadow-md flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loader border-t-white"></span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                    {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
                    {success && <p className="text-green-500 text-sm mt-4">{success}</p>}
                    <p className="text-sm text-primary/30 mt-6 text-center">
                        Don&apos;t have an account?{' '}
                        <a href="sign-up" className="text-primary font-bold hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>

                {/* Right Section: Illustration */}
                <div className="h-full md:w-1/2 2xl:w-[60%]  w-full hidden md:flex bg-primary-foreground absolute left-0  overflow-hidden items-center justify-center">
                    <Image
                        src="/sign-in.png"
                        alt="sign-in"
                        fill
                    />
                </div>

            </div>
        </div>
    );
};

export default Login;
