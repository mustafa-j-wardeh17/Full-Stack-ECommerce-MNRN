import Image from "next/image";

const ForgotPassword = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-indigo-50 overflow-hidden">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden h-[70%]">
                {/* Left Section: Forgot Password Form */}
                <div className="md:w-1/2 h-full w-full flex flex-col itece justify-center px-10 py-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Forgot Password?</h2>
                    <p className="text-gray-500 mb-6 text-md">
                        Enter your email address and we'll send you instructions to reset your password.
                    </p>
                    <form className="space-y-5">
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
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg transform hover:scale-105"
                        >
                            Send Instructions
                        </button>
                    </form>
                    <p className="text-sm text-gray-500 mt-6 text-center">
                        Remembered your password?{' '}
                        <a href="sign-in" className="text-indigo-600 font-medium hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
                {/* Right Section: Illustration */}
                <div
                    className="hidden md:flex bg-gradient-to-br from-indigo-500 to-indigo-700 relative rounded-r-3xl overflow-hidden items-center justify-center md:w-1/2 h-full"
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

export default ForgotPassword;
