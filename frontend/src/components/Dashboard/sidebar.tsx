'use client'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link';
import React, { useState } from 'react'
import { HiOutlineMenu } from "react-icons/hi";
import { IoCloseSharp } from 'react-icons/io5';
import { MdOutlineLogout, MdOutlinePublish } from "react-icons/md";
import { usePathname, useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import toast from 'react-hot-toast';
import { useUserContext } from '@/context';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { PiShoppingCartSimpleFill, PiShoppingCartSimpleLight } from "react-icons/pi";

const Sidebar = () => {
    const pathname = usePathname();
    const [loading, setLoading] = useState<boolean>(false);
    const dashboardLinks = [
        {
            link: '/dashboard/products',
            title: 'Products',
            icon: <PiShoppingCartSimpleLight />,
            selectedIcon: <PiShoppingCartSimpleFill />
        },
        {
            link: '/dashboard/create-product',
            title: 'Create Product',
            icon: <MdOutlinePublish />
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
            className={`w-[68px] bg-secondary min-h-screen relative ${!menu ? ' ml-[-80px]' : 'ml-0'}`}
        >
            <div className={`fixed z-50 top-0 shadow h-screen w-[80px]  px-2 py-8 bg-secondary flex flex-col gap-6 ${!menu ? 'translate transform duration-800 ease-in-out  ml-[-80px]' : 'translate transform duration-200 ml-0'}`}>
                <div className='flex flex-col gap-4'>
                    <div className='flex w-full relative justify-end'>
                        <button
                            onClick={() => setMenu(false)}
                            className={`${menu ? 'flex' : 'hidden'} absolute border rounded-md -top-6 hover:bg-primary/20 -right-[6px] `}>
                            <IoCloseSharp size={24} className='text-dark' />
                        </button>
                    </div>
                    <div className='flex items-center gap-3 justify-evenly w-full text-dark'>

                        <TooltipProvider
                        >
                            <Tooltip >
                                <TooltipTrigger asChild>
                                    <div className='relative w-[60px] overflow-hidden h-[60px] rounded-full bg-black border-2 border-black'>
                                        <Avatar>
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </TooltipTrigger>

                                <TooltipContent className='transition-none delay-0 duration-0 bg-primary' side="right">
                                    Hi Admin
                                </TooltipContent>

                            </Tooltip>
                        </TooltipProvider>
                    </div>
                    <Separator className='bg-primary/30' />
                </div>

                <div className='flex relative h-full flex-col items-center gap-4 text-dark'>
                    <div className=' flex relative h-full flex-col items-center gap-4 text-dark'>
                        {dashboardLinks.map((item, i) => (
                            <TooltipProvider
                                key={i}

                            >
                                <Tooltip >
                                    <TooltipTrigger asChild>
                                        <Link
                                            key={i}
                                            href={item.link}
                                            className={`${isActiveLink(item.link) ? 'bg-primary-foreground shadow-md text-dark' : 'bg-transparent text-gray-600'} cursor-pointer w-[60px] h-[60px]  flex flex-row justify-center items-center gap-2  p-2 rounded-md transform duration-0 hover:bg-primary/10 hover:shadow-md`}
                                        >
                                            <p className={`duration-0 w-full h-full flex items-center justify-center font-bold text-[28px] rounded-lg shadow ${isActiveLink(item.link) ? 'bg-sky-400 text-white' : 'bg-white'}`}>
                                                {item.icon}
                                            </p>
                                            {/* <h1 className='text-md text-primary md:flex hidden'>{item.title}</h1> */}
                                        </Link>
                                    </TooltipTrigger>

                                    <TooltipContent className='transition-none delay-0 duration-0 bg-primary' side="right">
                                        {item.title}
                                    </TooltipContent>

                                </Tooltip>
                            </TooltipProvider>

                        ))}
                    </div>
                    <TooltipProvider
                    >
                        <Tooltip >
                            <TooltipTrigger asChild>
                                <button onClick={() => { setLoading(true); handleLogout(); setLoading(false); }} className='absolute bottom-0 text-primary shadow-md transform transition-all delay-0 duration-0 hover:bg-red-500 hover:text-white text-center cursor-pointer w-full flex flex-row justify-center items-center gap-2 bg-primary-foreground  p-4 rounded-md'>

                                    {loading ? (
                                        <>
                                            <MdOutlineLogout className='duration-0' />
                                        </>
                                    ) : (
                                        <div className='flex gap-2 justify-center items-center'>
                                            <div className='w-[31px] h-[31px] rounded-full border-t-2 border-dark animate-spin' />
                                        </div>
                                    )}
                                </button>
                            </TooltipTrigger>

                            <TooltipContent className='transition-none delay-0 duration-0 bg-primary' side="right">
                                Logout
                            </TooltipContent>

                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
            <button
                onClick={() => setMenu(prev => !prev)}
                className={`${menu ? 'hidden' : 'flex'} absolute z-50 top-[18px] right-[-60px] p-2 bg-primary/10 hover:bg-primary/30 rounded-md`}>
                <HiOutlineMenu size={24} className='text-dark' />
            </button>
        </div>
    )
}

export default Sidebar;
