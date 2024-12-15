import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    return (
        <div className="flex items-center justify-center w-full  py-3">
            <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-3xl overflow-hidden md:shadow-xl relative">
                {/* Left Section: Login Form */}
                <div className="w-full md:w-1/2 md:bg-primary/5 flex flex-col items-center justify-center px-6 py-8">
                    <h2 className="md:text-4xl text-3xl text-primary font-bold mb-6">PS_Store</h2>
                    
                    <p className="text-primary/70 mb-6 text-center md:text-left text-sm">
                        Please fill in your details to access your account.
                    </p>
                    <form className="space-y-5 w-full max-w-[400px]">
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
                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-indigo-600"
                                />
                                <span className="ml-2 text-sm text-primary/70">Remember me</span>
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
                            className="w-full flex items-center justify-center gap-3 border  p-3 rounded-lg hover:bg-primary/5 transition duration-300"
                        >
                            <FcGoogle size={18} />
                            <span className="text-primary/70 font-medium">Sign in with Google</span>
                        </button>
                    </form>
                    <p className="text-sm text-primary/30 mt-6 text-center">
                        Don&apos;t have an account?{' '}
                        <a href="sign-up" className="text-indigo-500 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>

                {/* Right Section: Illustration */}
                <div className="hidden md:flex bg-indigo-500 absolute right-0 rounded-r-3xl overflow-hidden items-center justify-center md:w-1/2 h-full w-full">
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

export default Login;
