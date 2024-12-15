import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br py-3 from-gray-100 to-indigo-50 ">
            <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-3xl shadow-2xl  min-h-[700px] h-[85%]">
                {/* Left Section: Sign-Up Form */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome to PS_Store</h2>
                    <p className="text-gray-500 mb-4 text-md">
                        Create your account and explore a our products.
                    </p>
                    <form className="space-y-3">
                        {/* Full Name Input */}
                        <div>
                            <label
                                htmlFor="name"
                                className="text-sm font-semibold text-gray-700"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your full name"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
                            />
                        </div>
                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="text-sm font-semibold text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
                            />
                        </div>
                        {/* Password Input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
                            />
                        </div>
                        {/* Confirm Password Input */}
                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="text-sm font-semibold text-gray-700"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirm your password"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
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
                            className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition duration-300 shadow-sm"
                        >
                            <FcGoogle size={18}/>
                            <span className="text-gray-700 font-medium">Sign up with Google</span>
                        </button>
                    </form>
                    <p className="text-sm text-gray-500 mt-6 text-center">
                        Already have an account?{' '}
                        <a href="sign-in" className="text-indigo-600 font-medium hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
                {/* Right Section: Illustration */}
                <div
                    className="hidden md:flex bg-gradient-to-br from-indigo-500 to-indigo-700 relative rounded-r-3xl overflow-hidden items-center justify-center md:w-1/2 min-h-[700px] h-[90%]"
                >
                    <Image
                        src="https://res.cloudinary.com/dsos2uuov/image/upload/v1733815775/ps_store/products/ps_store/products/1733815774182.avif" // Replace with your illustration URL
                        alt="Illustration"
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20" />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
