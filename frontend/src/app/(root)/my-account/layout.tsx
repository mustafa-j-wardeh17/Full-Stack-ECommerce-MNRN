import MyAccountNavigation from '@/components/my-account/my-account-navigation'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'


const layout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = cookies()
    const _digi_auth_token = (await cookieStore).get('_digi_auth_token')
    if (!_digi_auth_token) {
        redirect('/sign-in')
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/verify-token`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${_digi_auth_token?.value}`, // Add the token here
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        if (!response.ok) {
            redirect('/sign-in')
        }
        return (
            <div className="w-full mx-auto space-y-12 py-10  rounded-lg">
                <h1 className='text-4xl'>My Profile</h1>
                <div className="flex lg:flex-row flex-col  gap-6">
                    <div className='2xl:w-1/5 lg:w-1/4 '>
                        <MyAccountNavigation />
                    </div>

                    <div className="2xl:w-4/5 lg:w-3/4 w-full lg:px-6 px-0 py-6">
                        {children}
                    </div>
                </div>
            </div>
        )
    } catch (error) {
        return <div>Something went wrong</div>
    }
}

export default layout