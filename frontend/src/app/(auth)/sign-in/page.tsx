import Login from '@/components/Auth/SignInForm'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Welcome back to ByteVault! Please log in to your account to access your personalized tech journey. Whether you’re shopping for the latest mobiles, computers, gaming consoles, or accessories, logging in ensures a smooth and secure experience. Developed and maintained by Mustafa Abu Wardeh, ByteVault is dedicated to providing you with seamless access to all your orders, wishlists, and account settings. If you don’t have an account yet, sign up today and join our tech community!',
  };
const page = () => {
    return (
        <Login />
    )
}

export default page