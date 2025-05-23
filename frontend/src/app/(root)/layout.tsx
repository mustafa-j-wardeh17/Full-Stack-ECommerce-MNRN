import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import React from 'react';


const RootLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <div className="container mt-[70px] mb-[20px] mx-auto px-4">
                <Navbar />
                {children}
            </div>
            <Footer />
            <ChatWidget />

        </div>
    );
}
export default RootLayout;
