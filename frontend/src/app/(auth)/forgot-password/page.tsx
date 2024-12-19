'use client'
import Image from "next/image";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')

    const handleForgetPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/forgot-password`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Failed to reset password');
            }

            console.log('Successful password reset:', result.result);
            toast.success('Successful password reset check email');

        } catch (error: any) {
            console.error('Error during password reset:', error.message);
            toast.error('An error occurred. Please try again.');
        }
    };
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="flex flex-col md:flex-row justify-end w-full   overflow-hidden  relative h-full">
                {/* Left Section: Forgot Password Form */}
                <div className="h-full w-full 2xl:w-[40%] md:w-1/2 bg-primary-foreground flex flex-col items-center justify-center px-6 py-8">
                    <h2 className="text-4xl font-bold text-primary mb-4">Forgot Password?</h2>
                    <p className="text-primary/70 text-center mb-8 text-lg max-w-[550px]">
                        Enter your email address and we&apos;ll send you instructions to reset your password.
                    </p>
                    <form
                        onSubmit={(e) => handleForgetPassword(e)}
                        className="space-y-5 w-full max-w-[400px]"
                    >
                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="text-primary font-bold"
                            >
                                Email
                            </label>
                            <input
                                value={email}
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full mt-2 p-3 text-center tracking-widest  border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
                            />
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-secondary font-semibold p-3 rounded-lg hover:bg-primary/90 transition duration-300 shadow-md flex items-center justify-center"
                        >
                            Send Instructions
                        </button>
                    </form>
                    <p className="text-sm text-primary/50 mt-6 text-center">
                        Remembered your password?{' '}
                        <a href="sign-in" className="text-primary font-bold hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
                {/* Right Section: Illustration */}
                <div className="h-full md:w-1/2 2xl:w-[60%]  w-full hidden md:flex bg-primary-foreground absolute left-0  overflow-hidden items-center justify-center">

                    <Image
                        src="/forgot-password.png" // Replace with your illustration URL
                        alt="forgot-password"
                        fill
                    />
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
