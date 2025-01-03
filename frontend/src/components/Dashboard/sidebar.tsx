'use client'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react'
import { CiShoppingCart } from 'react-icons/ci';
import { FaBorderStyle } from 'react-icons/fa';
import { HiOutlineMenu } from "react-icons/hi";
import { IoCloseSharp } from 'react-icons/io5';
import { MdOutlineLogout, MdOutlinePublish } from "react-icons/md";
import { FiUserPlus } from "react-icons/fi";
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import toast from 'react-hot-toast';
import { useUserContext } from '@/context';

const Sidebar = () => {
    const pathname = usePathname();
    const [loading, setLoading] = useState<boolean>(false);
    const dashboardLinks = [
        {
            link: '/dashboard/products',
            title: 'Products',
            icon: <CiShoppingCart />
        },
        {
            link: '/dashboard/create-product',
            title: 'Create Product',
            icon: <MdOutlinePublish />
        },
        {
            link: '/dashboard/decorations',
            title: 'Decorations',
            icon: <FaBorderStyle />
        },
        {
            link: '/dashboard/create-decor',
            title: 'Create A Decorative Design',
            icon: <MdOutlinePublish />
        },
        {
            link: '/dashboard/settings',
            title: 'User Management',
            icon: <FiUserPlus />
        },
    ];

    const [menu, setMenu] = useState<boolean>(true);
    const router = useRouter()
    const { setUser, setUserType } = useUserContext()
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

    const isActiveLink = (link: string) => {
        return pathname === link;
    };

    return (
        <div
            dir="ltr"
            className={`md:w-[350px] w-[68px] bg-secondary min-h-screen relative ${!menu ? 'md:ml-[-350px] ml-[-80px]' : 'ml-0'}`}
        >
            <div className={`fixed z-50 top-0 shadow h-screen md:w-[350px] w-[80px] md:px-8 px-2 py-8 bg-secondary flex flex-col gap-6 ${!menu ? 'translate transform duration-800 ease-in-out md:ml-[-350px] ml-[-80px]' : 'translate transform duration-200 ml-0'}`}>
                <div className='flex flex-col gap-4'>
                    <div className='flex w-full relative justify-end'>
                        <button
                            onClick={() => setMenu(false)}
                            className={`${menu ? 'flex' : 'hidden'} absolute border rounded-md -top-6 hover:bg-primary/20 -right-[6px] md:-right-5`}>
                            <IoCloseSharp size={24} className='text-dark' />
                        </button>
                    </div>
                    <div className='flex items-center gap-3 justify-evenly w-full text-dark'>
                        <div className='relative w-[60px] overflow-hidden h-[60px] rounded-full bg-black border-2 border-black'>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <h1 className='uppercase text-primary md:flex hidden text-[20px] font-bold'>Hi Admin</h1>
                    </div>
                    <Separator className='bg-primary/30' />
                </div>

                <div className='flex relative h-full flex-col items-center gap-4 text-dark'>
                    {dashboardLinks.map((item, i) => (
                        <Link
                            key={i}
                            href={item.link}
                            className={`${isActiveLink(item.link) ? 'bg-primary-foreground shadow-md text-dark' : 'bg-transparent text-gray-600'} cursor-pointer sm:w-full flex flex-row md:justify-normal justify-center items-center gap-2 sm:p-4 p-2 rounded-md transform duration-0 hover:bg-primary/10 hover:shadow-md`}
                        >
                            <p className={`duration-0 p-2 font-bold text-[20px] rounded-lg shadow ${isActiveLink(item.link) ? 'bg-amber-400 text-primary' : 'bg-white'}`}>
                                {item.icon}
                            </p>
                            <h1 className='text-md text-primary md:flex hidden'>{item.title}</h1>
                        </Link>
                    ))}
                    <button onClick={() => { setLoading(true); handleLogout(); setLoading(false); }} className='absolute bottom-0 text-primary shadow-md transform transition-all delay-0 duration-0 hover:bg-red-500 hover:text-white text-center cursor-pointer w-full flex flex-row justify-center items-center gap-2 bg-primary-foreground  p-4 rounded-md'>
                        {!loading ? (
                            <>
                                <MdOutlineLogout className='duration-0' />
                                <h1 className='text-md text-center duration-0 font-bold text-md md:flex hidden'>Logout</h1>
                            </>
                        ) : (
                            <div className='flex gap-2 justify-center items-center'>
                                <div className='w-[31px] h-[31px] rounded-full border-t-2 border-dark animate-spin' />
                                <h1 className='text-md text-center duration-0 font-bold text-md md:flex hidden'>Logout</h1>
                            </div>
                        )}
                    </button>
                </div>
            </div>
            <button
                onClick={() => setMenu(prev => !prev)}
                className={`${menu ? 'hidden' : 'flex'} absolute z-50 top-[26px] right-[-40px] rounded-md`}>
                <HiOutlineMenu size={24} className='text-dark' />
            </button>
        </div>
    )
}

export default Sidebar;
