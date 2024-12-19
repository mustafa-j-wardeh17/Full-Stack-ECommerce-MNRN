'use client'

import OTPInput from "@/components/verify-otp/otp-input";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaSignInAlt } from 'react-icons/fa'; // Import the icon


export default function VerifyOTP() {
    const { email } = useParams()

    const router = useRouter()

    const [otp, setOtp] = useState<number | undefined>();

    // Function to handle OTP submission and verification
    const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!otp) {
            toast.error("Please enter a valid OTP");
            return;
        }

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/verify-email/${otp}/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message);
                router.push('/sign-in')
            } else {
                toast.error(result.message || "Verification failed");
            }
        } catch (error: any) {
            toast.error("Error: " + error.message);
        }
    };

    const handleResendOtp = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/send-otp-email/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const result = await response.json();

            if (response.ok) {
                toast.success(result.message);
            } else {
                toast.error(result.message || "Sending otp failed");
            }
        } catch (error: any) {
            toast.error("Error: " + error.message);
        }
    }
    return (
        <div className="flex items-center justify-center w-full h-screen">

            <div className="flex flex-col md:flex-row justify-end w-full overflow-hidden relative h-full">

                {/* Left Section: Verify OTP Form */}
                <div className="h-full w-full 2xl:w-[40%] relative md:w-1/2 bg-primary-foreground flex flex-col items-center justify-center px-6 py-8">
                    <Link
                        href="/sign-in"
                        className="absolute z-40 left-4 top-8 flex cursor-pointer items-center space-x-2 text-lg font-semibold text-primary hover:text-primary/90 transition-colors duration-300"
                    >
                        <ArrowLeftIcon className="text-primary" size={20} />
                        <span >Sign In</span>
                    </Link>
                    <h2 className="text-4xl text-primary font-bold mb-6">Verify OTP</h2>
                    <p className="text-primary/70 text-center max-w-[550px] mb-8 text-lg">
                        Enter the OTP code sent to your email to verify your account.
                    </p>
                    <form onSubmit={handleOtpSubmit} className="space-y-5 w-full max-w-[400px]">
                        {/* OTP Input */}
                        <OTPInput setOtp={setOtp} />

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-primary text-secondary font-semibold p-3 rounded-lg hover:bg-primary/90 transition duration-300 shadow-md flex items-center justify-center"
                        >
                            Verify OTP
                        </button>
                    </form>
                    <p className="text-sm text-primary/70 mt-6 text-center">
                        Didn&apos;t receive the code?{' '}
                        <button
                            onClick={handleResendOtp}
                            className="text-primary font-bold hover:underline"
                        >
                            Resend OTP
                        </button>
                    </p>
                </div>
                {/* Right Section: Illustration */}
                <div className="h-full md:w-1/2 2xl:w-[60%] w-full hidden md:flex bg-primary-foreground absolute left-0 overflow-hidden items-center justify-center">
                    <Image
                        src="/verify-otp.png" // Replace with your illustration URL
                        alt="verify-otp"
                        fill
                    />
                </div>
            </div>
        </div>
    );
}
