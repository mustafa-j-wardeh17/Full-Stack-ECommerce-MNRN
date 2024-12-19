import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { cookies } from 'next/headers';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    // Fetch the token on the server side
   // const digi_auth_token = (await cookies()).get('digi_auth_token') || null
    //console.log('tooken=======================>', digi_auth_token)
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="container mb-[40px] mx-auto px-4">
                <Navbar />
                {children}
            </div>
            <Footer />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    );
};

export default RootLayout;
