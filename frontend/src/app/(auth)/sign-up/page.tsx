import Image from "next/image";

const SignUp = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="flex flex-col md:flex-row justify-end w-full   overflow-hidden  relative h-full">
                {/* Left Section: Sign-Up Form */}
                <div className="h-full w-full 2xl:w-[40%] md:w-1/2 bg-primary-foreground flex flex-col items-center justify-center px-6 py-8">
                    <h2 className="md:text-4xl text-3xl text-primary font-bold md:mb-4 mb-6">PS_Store</h2>
                    <p className="text-primary/70 md:mb-4 mb-6 text-center md:text-left text-sm">
                        Create your account and explore our products.
                    </p>
                    <form className="space-y-6 md:space-y-4 w-full max-w-sm text-sm">
                        {/* Full Name Input */}
                        <div>
                            <label htmlFor="name" className="text-primary font-bold">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your full name"
                                className="w-full mt-2 p-3 border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="text-primary font-bold">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                className="w-full mt-2 p-3  border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className=" text-primary font-bold">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter your password"
                                className="w-full mt-2 p-3  border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        {/* Confirm Password Input */}
                        <div>
                            <label htmlFor="confirm-password" className=" text-primary font-bold">Confirm Password</label>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirm your password"
                                className="w-full mt-2 p-3 text-sm border border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                        </div>
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-secondary font-semibold p-3 rounded-lg hover:bg-primary/90 transition duration-300 shadow-md flex items-center justify-center"
                        >
                            Create Account
                        </button>
    
                    </form>
                    <p className="text-sm text-primary/30 mt-6 text-center">
                        Already have an account?{' '}
                        <a href="sign-in" className="text-sm text-primary font-bold hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>

                {/* Right Section: Illustration */}
                <div className="h-full md:w-1/2 2xl:w-[60%]  w-full hidden md:flex bg-primary-foreground absolute left-0  overflow-hidden items-center justify-center">
                    <Image
                        src="/sign-up.png"
                        alt="Illustration"
                        fill
                    />
                </div>
            </div>
        </div>
    );
};

export default SignUp;
