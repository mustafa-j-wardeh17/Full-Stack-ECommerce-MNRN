import Image from "next/image";

type tParams = Promise<{ email: string[] }>

export default async function VerifyOTP({ params }: { params: tParams }) {
    const { email } = await params
    console.log(email)
    // if email verify then go out 
    return (
        <div className="flex items-center justify-center h-screen w-full overflow-hidden">
            <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden md:shadow-xl relative">
                {/* Left Section: Verify OTP Form */}
                <div className="w-full md:w-1/2 md:bg-primary/5 flex flex-col items-center justify-center px-6 py-8">
                    <h2 className="text-4xl text-primary font-bold mb-6">Verify OTP</h2>
                    <p className="text-primary/70 text-center mb-8 text-lg">
                        Enter the OTP code sent to your email to verify your account.
                    </p>
                    <form className="space-y-5 w-full max-w-[400px]">
                        {/* OTP Input */}
                        <div>
                            <label
                                htmlFor="otp"
                                className="text-sm font-semibold text-primary/70"
                            >
                                OTP Code
                            </label>
                            <input
                                type="text"
                                id="otp"
                                placeholder="Enter OTP Code"
                                maxLength={6}
                                className="w-full mt-2 p-3 text-center tracking-widest uppercase border border-primary/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition"
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
                    <p className="text-sm  text-primary/70 mt-6 text-center">
                        Didn&apos;t receive the code?{' '}
                        <a href="#" className="text-indigo-600 font-medium hover:underline">
                            Resend OTP
                        </a>
                    </p>
                </div>
                {/* Right Section: Illustration */}
                <div className="hidden md:flex bg-indigo-500 absolute right-0 rounded-r-3xl overflow-hidden items-center justify-center md:w-1/2 h-full w-full">

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

