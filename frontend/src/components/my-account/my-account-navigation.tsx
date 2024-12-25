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
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Reset user and userType regardless of the API response
            setUser(null);
            setUserType('guest');
        }
    }
    return (
        <div className="w-full border-r space-y-12">
            <div className='flex px-4 items-center gap-4'>
                <Avatar className='w-[50px] h-[50px]'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                </Avatar>
                <div className='flex flex-col h-auto justify-center'>
                    <p className='text-sm'>Hello</p>
                    <h1 className='font-bold'>{user?.name}</h1>
                </div>
            </div>
            <nav className="flex flex-col gap-4">
                <Link
                    href="/my-account/personal-information"
                    className={`py-3 px-5 flex items-center gap-4  ${pathName.endsWith('personal-information') && 'bg-primary text-secondary'} hover:bg-primary hover:text-secondary transition duration-200 `}
                >
                    <IoPersonOutline size={26} /> Personal Information
                </Link>
                <Link
                    href="/my-account/my-cart"
                    className={`py-3 px-5 flex items-center gap-4  ${pathName.endsWith('my-cart') && 'bg-primary text-secondary'} hover:bg-primary hover:text-secondary transition duration-200 `}
                >
                    <MdOutlineShoppingCart size={22} />My Cart
                </Link>
                <Link
                    href="/my-account/my-orders"
                    className={`py-3 px-5 flex items-center gap-4  ${pathName.endsWith('my-orders') && 'bg-primary text-secondary'} hover:bg-primary hover:text-secondary transition duration-200 `}
                >
                    <BsBoxSeam size={22} />My Orders
                </Link>
                <Link
                    href="/my-account/my-wishlist"
                    className={`py-3 px-5 flex items-center gap-4  ${pathName.endsWith('my-wishlist') && 'bg-primary text-secondary'} hover:bg-primary hover:text-secondary transition duration-200 `}
                >
                    <CiHeart size={26} />My Wishlist
                </Link>
                <button
                    onClick={handleLogout}
                    className="py-3 px-5 flex items-center gap-4  hover:bg-primary hover:text-secondary transition duration-200"
                >
                    <CiLogout size={26} />Logout
                </button>
            </nav>
        </div>
    )
}

export default MyAccountNavigation