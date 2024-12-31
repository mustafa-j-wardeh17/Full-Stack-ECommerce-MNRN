import ForgotPassword from '@/components/Auth/ForgotPasswordForm'
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
    title: 'Forgot Password',
    description: 'Forgot your password? No worries! At ByteVault, we make it easy to reset your password and regain access to your account. Simply enter your registered email address, and we’ll send you instructions on how to reset your password securely. Founded and developed by Mustafa Abu Wardeh, ByteVault prioritizes the security and convenience of our customers. If you encounter any issues or need further assistance, feel free to contact our support team for help. We’re here to ensure your tech journey stays uninterrupted.',
};

const page = () => {
    return (
        <ForgotPassword />
    )
}

export default page