import Image from "next/image";

const VerifyOTP = ({ params: { email } }: { params: { email: string } }) => {
    console.log(email)
    // if email verify then go out 
    return (
        <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-100 to-indigo-50 overflow-hidden">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden h-[70%]">
                {/* Left Section: Verify OTP Form */}
                <div className="md:w-1/2 w-full flex flex-col justify-center px-10 py-8">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">Verify OTP</h2>
                    <p className="text-gray-500 mb-6 text-md">
                        Enter the OTP code sent to your email to verify your account.
                    </p>
                    <form className="space-y-5">
                        {/* OTP Input */}
                        <div>
                            <label
                                htmlFor="otp"
                                className="text-sm font-semibold text-gray-700"
                            >
                                OTP Code
                            </label>
                            <input
                                type="text"
                                id="otp"
                                placeholder="Enter OTP Code"
                                maxLength={6}
                                className="w-full mt-2 p-3 text-center tracking-widest uppercase border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
                            />
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white font-semibold p-3 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-lg transform hover:scale-105"
                        >
                            Verify OTP
                        </button>
                    </form>
                    <p className="text-sm text-gray-500 mt-6 text-center">
                        Didn't receive the code?{' '}
                        <a href="#" className="text-indigo-600 font-medium hover:underline">
                            Resend OTP
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

export default VerifyOTP;
