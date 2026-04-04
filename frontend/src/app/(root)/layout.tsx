import ChatWidget from '@/components/ChatWidget';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import { SITE_CONTENT_CLASS } from '@/util/constant';
import React from 'react';

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1 w-full pt-[70px] pb-10">
                <div className={SITE_CONTENT_CLASS}>{children}</div>
            </main>
            <Footer />
            <ChatWidget />
        </div>
    );
};

export default RootLayout;
