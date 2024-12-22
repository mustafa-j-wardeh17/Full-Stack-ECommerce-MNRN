import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import React from 'react'

const layout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStr = cookies();
    const _digi_auth_token = (await cookieStr).get('_digi_auth_token');
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/is-admin`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${_digi_auth_token?.value}`, // Add the token here
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        const data = await response.json();

        if (!response.ok) {
            redirect('/shop')
        }


        if (!response.ok || data.result === 'user') {
            throw new Error('Unauthorized')
        }

        return (
            <div>
                {children}
            </div>
        )
    } catch (error: any) {
        return redirect('/shop')
    }

}

export default layout