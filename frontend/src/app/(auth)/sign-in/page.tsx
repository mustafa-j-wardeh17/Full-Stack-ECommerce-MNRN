import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    return (
        <div className="flex items-center justify-center min-h-screen py-3 bg-gray-100 ">
            <div className="flex flex-col md:flex-row w-full max-w-6xl bg-white rounded-3xl shadow-2xl  min-h-[700px] h-[85%]">
            {/* Left Section: Login Form */}
                <div className="w-full md:w-1/2 flex flex-col justify-center px-10 py-12">
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">PS_Store</h2>
                    <p className="text-gray-500 mb-8 text-lg">
                        Please fill in your details to access your account.
                    </p>
                    <form className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label
                                htmlFor="email"
                                className="text-sm font-semibold text-gray-600"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        {/* Password Input */}
                        <div>
                            <label
                                htmlFor="password"
                                className="text-sm font-semibold text-gray-600"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-indigo-600"
                                />
                                <span className="ml-2 text-sm text-gray-600">Remember me</span>
                            </label>
                            <a href="forgot-password" className="text-sm text-indigo-500 hover:underline">
                                Forgot Password?
                            </a>
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
                        >
                            Sign In
                        </button>
                        {/* Google Sign-in */}
                        <button
                            type="button"
                            className="w-full flex items-center justify-center gap-3 border border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition duration-300"
                        >
                            <FcGoogle size={18} />

                            <span className="text-gray-700 font-medium">Sign in with Google</span>
                        </button>
                    </form>
                    <p className="text-sm text-gray-500 mt-6 text-center">
                        Don't have an account?{' '}
                        <a href="sign-up" className="text-indigo-500 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
                {/* Right Section: Illustration */}
                <div
                    className="hidden md:flex bg-indigo-500 relative rounded-r-3xl overflow-hidden items-center justify-center md:w-1/2"
                >
                    <Image
                        src="https://res.cloudinary.com/dsos2uuov/image/upload/v1733815775/ps_store/products/ps_store/products/1733815774182.avif" // Replace with your illustration URL
                        alt="Illustration"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
