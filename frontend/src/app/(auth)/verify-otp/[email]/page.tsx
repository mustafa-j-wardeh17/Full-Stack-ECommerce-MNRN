import OTPInput from "@/components/verify-otp/otp-input";
import Image from "next/image";

type tParams = Promise<{ email: string[] }>

export default async function VerifyOTP({ params }: { params: tParams }) {
    const { email } = await params
    console.log(email)
    // if email verify then go out 
    return (
        <div className="flex items-center justify-center w-full h-screen">
            <div className="flex flex-col md:flex-row justify-end w-full   overflow-hidden  relative h-full">
                {/* Left Section: Verify OTP Form */}
                <div className="h-full w-full 2xl:w-[40%] md:w-1/2 bg-primary-foreground flex flex-col items-center justify-center px-6 py-8">
                    <h2 className="text-4xl text-primary font-bold mb-6">Verify OTP</h2>
                    <p className="text-primary/70 text-center max-w-[550px] mb-8 text-lg">
                        Enter the OTP code sent to your email to verify your account.
                    </p>
                    <form className="space-y-5 w-full max-w-[400px]">
                        {/* OTP Input */}
                        <OTPInput />
                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-secondary font-semibold p-3 rounded-lg hover:bg-primary/90 transition duration-300 shadow-md flex items-center justify-center"
                        >
                            Verify OTP
                        </button>
                    </form>
                    <p className="text-sm  text-primary/70 mt-6 text-center">
                        Didn&apos;t receive the code?{' '}
                        <a href="#" className="text-primary font-bold hover:underline">
                            Resend OTP
                        </a>
                    </p>
                </div>
                {/* Right Section: Illustration */}
                <div className="h-full md:w-1/2 2xl:w-[60%]  w-full hidden md:flex bg-primary-foreground absolute left-0  overflow-hidden items-center justify-center">

                    <Image
                        src="/verify-otp.png" // Replace with your illustration URL
                        alt="verify-otp"
                        fill
                    />
                </div>
            </div>
        </div>
    );
};

