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
import { usePathname } from 'next/navigation';

const Sidebar = () => {
    const pathname = usePathname();
    const [loading, setLoading] = useState<boolean>(false);
    const dashboardLinks = [
        {
            link: '/dashboard',
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
            link: '/settings',
            title: 'User Management',
            icon: <FiUserPlus />
        },
    ];

    const [menu, setMenu] = useState<boolean>(true);

    const isActiveLink = (link: string) => {
        return pathname === link;
    };

    return (
        <div
            dir="ltr"
            className={`md:w-[350px] w-[80px] bg-[#F8F9FA] min-h-screen relative ${!menu ? 'md:ml-[-350px] ml-[-80px]' : 'ml-0'}`}
        >
            <div className={`fixed top-0 shadow h-screen md:w-[350px] w-[80px] md:px-8 px-2 py-8 bg-[#F8F9FA] flex flex-col gap-6 ${!menu ? 'translate transform duration-800 ease-in-out md:ml-[-350px] ml-[-80px]' : 'translate transform duration-200 ml-0'}`}>
                <div className='flex flex-col gap-4'>
                    <div className='flex w-full relative justify-end'>
                        <button
                            onClick={() => setMenu(false)}
                            className={`${menu ? 'flex' : 'hidden'} absolute border rounded-md -top-6 hover:bg-neutral-200 -right-[6px] md:-right-5`}>
                            <IoCloseSharp size={24} className='text-dark' />
                        </button>
                    </div>
                    <div className='flex items-center gap-3 justify-evenly w-full text-dark'>
                        <div className='relative w-[60px] overflow-hidden h-[60px] rounded-full bg-black border-2 border-black'>
                            {/* <Image src={'/adam.png'} alt='admin name' fill className='object-cover' /> */}
                            
                        </div>
                        <h1 className='uppercase text-dark md:flex hidden text-[20px] font-bold'>Hi Admin</h1>
                    </div>
                    <Separator className='bg-[#e6e8e9]' />
                </div>

                <div className='flex relative h-full flex-col items-center gap-4 text-dark'>
                    {dashboardLinks.map((item, i) => (
                        <Link
                            key={i}
                            href={item.link}
                            className={`${isActiveLink(item.link) ? 'bg-white shadow-md text-dark' : 'bg-transparent text-gray-600'} cursor-pointer sm:w-full flex flex-row md:justify-normal justify-center items-center gap-2 sm:p-4 p-2 rounded-md transform duration-0 hover:bg-white hover:shadow-md`}
                        >
                            <p className={`duration-0 p-2 font-bold text-[20px] rounded-lg shadow ${isActiveLink(item.link) ? 'bg-amber-400 text-white' : 'bg-white'}`}>
                                {item.icon}
                            </p>
                            <h1 className='text-md md:flex hidden'>{item.title}</h1>
                        </Link>
                    ))}
                    <button onClick={() => { setLoading(true); setLoading(false); }} className='absolute bottom-0 text-dark shadow-md transform transition-all delay-0 duration-0 hover:bg-red-500 hover:text-white text-center cursor-pointer w-full flex flex-row justify-center items-center gap-2 bg-white p-4 rounded-md'>
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
