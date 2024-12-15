import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
    return (
        <div className="flex items-center justify-center w-full h-full py-3">
            <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden md:shadow-xl relative">
                {/* Left Section: Sign-Up Form */}
                <div className="w-full md:w-1/2 md:bg-primary/5 flex flex-col items-center justify-center px-6 py-8">
                    <h2 className="md:text-4xl text-3xl text-primary font-bold md:mb-4 mb-6">PS_Store</h2>
                    <p className="text-primary/70 md:mb-4 mb-6 text-center md:text-left text-sm">
                        Create your account and explore our products.
                    </p>
                    <form className="space-y-6 md:space-y-4 w-full max-w-sm">
                        {/* Full Name Input */}
                        <div>
                            <label htmlFor="name" className="text-sm font-semibold text-primary/70">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your full name"
                                className="w-full mt-2 p-3 text-sm border  border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="text-sm font-semibold text-primary/70">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full mt-2 p-3 text-sm border  border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="text-sm font-semibold text-primary/70">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full mt-2 p-3 text-sm border  border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirm-password" className="text-sm font-semibold text-primary/70">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirm your password"
                                className="w-full mt-2 p-3 text-sm border  border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
                        >
                            Create Account
                        </button>
                        {/* Google Sign-Up */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 border  p-3 rounded-lg hover:bg-primary/5 transition duration-300"
                        >
                            <FcGoogle size={18} />
                            <span className="text-primary/70 font-medium">Sign up with Google</span>
                        </button>
                    </form>
                    <p className="text-sm text-primary/30 mt-6 text-center">
                        Already have an account?{' '}
                        <a href="sign-in" className="text-indigo-600 font-medium hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>

                {/* Right Section: Illustration */}
                <div className="hidden md:flex absolute right-0  rounded-r-3xl overflow-hidden items-center justify-center w-full md:w-1/2 h-full">
                    <Image
                        src="https://res.cloudinary.com/dsos2uuov/image/upload/v1733815775/ps_store/products/ps_store/products/1733815774182.avif"
                        alt="Illustration"
                        fill
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
