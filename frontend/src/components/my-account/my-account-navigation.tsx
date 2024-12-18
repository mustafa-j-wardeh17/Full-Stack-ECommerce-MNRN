'use client'
import React from 'react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import Link from 'next/link'
import { BsBoxSeam } from 'react-icons/bs'
import { CiLogout } from 'react-icons/ci'
import { IoPersonOutline } from 'react-icons/io5'
import { usePathname } from 'next/navigation'

const MyAccountNavigation = () => {
    const pathName = usePathname()
    return (
        <div className="w-full border-r space-y-12">
            <div className='flex px-4 items-center gap-4'>
                <Avatar className='w-[50px] h-[50px]'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                </Avatar>
                <div className='flex flex-col h-auto justify-center'>
                    <p className='text-sm'>Hello</p>
                    <h1 className='font-bold'>User Name</h1>
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
                    href="/my-account/my-orders"
                    className={`py-3 px-5 flex items-center gap-4  ${pathName.endsWith('my-orders') && 'bg-primary text-secondary'} hover:bg-primary hover:text-secondary transition duration-200 `}
                >
                    <BsBoxSeam />My Orders
                </Link>
                <Link
                    href="#"
                    className="py-3 px-5 flex items-center gap-4  hover:bg-primary hover:text-secondary transition duration-200"
                >
                    <CiLogout />Logout
                </Link>
            </nav>
        </div>
    )
}

export default MyAccountNavigation