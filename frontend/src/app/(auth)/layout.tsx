
import { ModeToggle } from "@/components/theme-toggle";
import { HttpResponse } from "@/util/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
    const cookieStore = cookies()
    const _digi_auth_token = (await cookieStore).get('_digi_auth_token')
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/verify-token`, {
            method: 'GET',
            headers: {
                // 'Authorization': `Bearer ${_digi_auth_token?.value}`, // Add the token here
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        })
        const data: HttpResponse = await response.json();

        if (response.ok) {
            if (data.result.type === 'admin') {
                redirect('/dashboard')
            }
            else {
                redirect('/my-account')
            }
        }
        return (
            <div className='flex flex-col relative min-h-screen w-full overflow-hidden'>
                <div className='w-full absolute z-10 right-4 top-4 flex items-center justify-end'>
                    <ModeToggle />
                </div>
                <div className="flex-grow h-full w-full flex items-center justify-center">
                    {children}
                </div>
            </div>
        )
    }
    catch (error) {
        return <div>Something went wrong</div>
    }


}

export default Layout;
