import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';


const RootLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="container mb-[40px] mx-auto px-4">
                <Navbar />
                {children}
            </div>
            <Footer />

        </div>
    );
}
export default RootLayout;
