import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="container mx-auto px-4">
            <Navbar />
            {children}
            <Footer />
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
        </div>
    )
}

export default RootLayout