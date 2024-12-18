import MyAccountNavigation from '@/components/my-account/my-account-navigation'
import React from 'react'


const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full mx-auto space-y-12 py-10  rounded-lg">
            <h1 className='text-4xl'>My Profile</h1>
            <div className="flex lg:flex-row flex-col  gap-6">
                <div className='2xl:w-1/5 lg:w-1/4 '>
                    <MyAccountNavigation />
                </div>

                <div className="2xl:w-4/5 lg:w-3/4 w-full p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout