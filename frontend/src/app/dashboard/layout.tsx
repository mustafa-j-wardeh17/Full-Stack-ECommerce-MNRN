import DashboardNav from '@/components/Dashboard/dashboardNav'
import Sidebar from '@/components/Dashboard/sidebar'
import { HttpResponse } from '@/util/types'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = cookies()
    const _digi_auth_token = (await cookieStore).get('_digi_auth_token')
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/is-admin`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${_digi_auth_token?.value}`, // Add the token here
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        const data: HttpResponse = await response.json();
        if (data.message === 'Unauthorized') {
            throw new Error('Unauthorized')
        }
        return (
            <div className="flex w-full bg-primary-foreground min-h-screen overflow-hidden">
                <div className="h-full">
                    <Sidebar />
                </div>
                <div className="flex flex-col w-full">
                    <DashboardNav />
                    {children}
                </div>
            </div>
        )
    } catch (error) {
        redirect('/')
    }

}

export default layout