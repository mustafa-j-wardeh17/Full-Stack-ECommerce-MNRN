import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = cookies()
    const _digi_auth_token = (await cookieStore).get('_digi_auth_token')
    if (!_digi_auth_token) {
        redirect('/sign-in')
    }
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="container mb-[40px] mx-auto px-4">
                <Navbar />
                {children}
            </div>
            <Footer />

        </div>
    );
};

export default RootLayout;
