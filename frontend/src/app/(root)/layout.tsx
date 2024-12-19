import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';
import { Toaster } from 'react-hot-toast';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
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
