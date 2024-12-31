import SignUp from '@/components/Auth/SignUp'
import { Metadata } from 'next';
import React from 'react'
export const metadata: Metadata = {
    title: 'Signup',
    description: 'Join ByteVault today and unlock a world of tech! Sign up to create your account and gain access to the latest mobiles, computers, gaming consoles, accessories, and much more. As a registered member, you’ll enjoy personalized recommendations, faster checkout, and easy access to your order history and account settings. Founded and developed by Mustafa Abu Wardeh, ByteVault is dedicated to enhancing your shopping experience with secure, seamless, and convenient access to all the tech you love. Sign up now and start your journey with us!',
  };
const page = () => {
    return (
        <SignUp />
    )
}

export default page