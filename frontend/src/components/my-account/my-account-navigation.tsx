'use client'
import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { BsBoxSeam } from 'react-icons/bs'
import { CiLogout, CiHeart } from 'react-icons/ci'
import { IoPersonOutline } from 'react-icons/io5'
import { usePathname, useRouter } from 'next/navigation'
import { useUserContext } from '@/context'
import toast from 'react-hot-toast'
import { MdOutlineShoppingCart } from "react-icons/md";

const MyAccountNavigation = () => {
    const pathName = usePathname()
    const { setUser, setUserType, user } = useUserContext()
    const router = useRouter()
    const handleLogout = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/users/logout`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })
            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || 'Failed to log out');
            }
            toast.success('Logout Successfully')
            router.push('/sign-in')
            setUser(null);
            setUserType('guest');
        } catch (error: any) {
            toast.success(error.message)

        }
    }
    return (
        <div className="w-full overflow-hidden lg:border-r space-y-12">
            <div className='flex flex-row justify-between w-full '>
                <div className='flex px-4 items-center lg:gap-4 gap-2 lg:w-auto '>
                    <Avatar className='w-[50px] h-[50px]'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    </Avatar>
                    <div className='flex flex-col h-auto justify-center'>
                        <p className='text-sm'>Hello</p>
                        <h1 className='font-bold'>{user?.name}</h1>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="lg:hidden block p-2 rounded-md border border-primary/60 hover:bg-primary hover:text-secondary transition duration-200"
                >
                    <CiLogout size={26} />
                </button>
            </div>
            <nav className="flex lg:flex-col lg:overflow-x-hidden overflow-x-scroll lg:gap-4 gap-2 lg:w-auto w-full">
                <Link
                    href="/my-account/personal-information"
                    className={`lg:py-3 flex-1  lg:px-5 p-2 lg:rounded-none rounded-md flex lg:flex-row flex-col lg:justify-start justify-center text-center items-center xl:text-lg md:text-md sm:text-sm text-xs lg:gap-4 gap-2 w-auto   ${pathName.endsWith('personal-information') && 'bg-primary text-secondary'} hover:bg-primary hover:text-secondary transition duration-200 `}
                >
                    <IoPersonOutline size={26} /> Personal Information
                </Link>
                <Link
                    href="/my-account/my-wishlist"
                    className={`lg:py-3 flex-1  lg:px-5 p-2 lg:rounded-none rounded-md flex lg:flex-row flex-col lg:justify-start  justify-center text-center items-center xl:text-lg md:text-md sm:text-sm text-xs lg:gap-4 gap-2 w-auto   ${pathName.endsWith('my-wishlist') && 'bg-primary text-secondary'} hover:bg-primary hover:text-secondary transition duration-200 `}
                >
                    <CiHeart size={26} />My Wishlist
                </Link>
                <Link
                    href="/my-account/my-cart"
                    className={`lg:py-3 flex-1  lg:px-5 p-2 lg:rounded-none rounded-md flex lg:flex-row flex-col lg:justify-start justify-center text-center items-center xl:text-lg md:text-md sm:text-sm text-xs lg:gap-4 gap-2 w-auto   ${pathName.endsWith('my-cart') && 'bg-primary text-secondary'} hover:bg-primary hover:text-secondary transition duration-200 `}
                >
                    <MdOutlineShoppingCart size={22} />My Cart
                </Link>
                <Link
                    href="/my-account/my-orders"
                    className={`lg:py-3  flex-1 lg:px-5 p-2 lg:rounded-none rounded-md flex lg:flex-row flex-col lg:justify-start justify-center text-center items-center xl:text-lg md:text-md sm:text-sm text-xs lg:gap-4 gap-2  w-auto  ${pathName.endsWith('my-orders') && 'bg-primary text-secondary'} hover:bg-primary hover:text-secondary transition duration-200 `}
                >
                    <BsBoxSeam size={22} />My Orders
                </Link>
                <button
                    onClick={handleLogout}
                    className="lg:flex  flex-1 hidden lg:py-3 lg:px-5 p-2 lg:rounded-none rounded-md  items-center lg:text-lg md:text-md sm:text-sm text-xs lg:gap-4 gap-2   hover:bg-primary hover:text-secondary transition duration-200"
                >
                    <CiLogout size={26} />Logout
                </button>
            </nav>
        </div>
    )
}

export default MyAccountNavigation