import VerifyOTP from '@/components/Auth/VerifyOtp'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: 'Verify OTP',
    description: 'Verify your identity to complete the process at ByteVault! Enter the One-Time Password (OTP) sent to your registered email or phone number to ensure your account security. This verification step, developed and maintained by Mustafa Abu Wardeh, helps us protect your account and provide you with a safe and seamless shopping experience. If you didn’t receive the OTP, request a new one or contact our support team for assistance. Your security is our priority!',
  };
const page = () => {
    return (
        <VerifyOTP />
    )
}

export default page