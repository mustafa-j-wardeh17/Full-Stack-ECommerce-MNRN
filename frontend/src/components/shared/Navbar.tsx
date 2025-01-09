'use client';

import { useState } from 'react';
import { HeartIcon, Search, ShoppingBag, Menu } from 'lucide-react';
import { BsPersonCircle } from 'react-icons/bs';
import { usePathname, useRouter } from 'next/navigation';
import { ModeToggle } from '../theme-toggle';
import Link from 'next/link';
import { useUserContext } from '@/context';
import SearchProducts from './SearchProducts';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState('');

    const { user } = useUserContext()

    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = () => {
        router.push(`/shop?search=${searchText}`);
        setShowSearch(false);
        setSearchText('');
    };

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Dashboard', href: '/dashboard', type: 'admin' },
        { label: 'Shop', href: '/shop' },
        { label: 'About Us', href: '/about-us' },
        { label: 'Contact Us', href: '/contact' },
    ];

    const isActive = (path: string) => path === '/' ? pathname === path : pathname.includes(path);
    const isIconActive = (path: string) => pathname === path

    return (
        <div className='fixed h-[70px] border-b-2 top-0 flex items-center justify-center left-0 w-full z-50  bg-white dark:bg-black '>
            {/* Top Header */}
            <div className=" flex container items-center justify-between py-3 px-4 ">
                {/* Logo */}
                <div className="flex items-center">
                    <h3
                        className="text-3xl font-extrabold text-sky-800 dark:text-sky-500 cursor-pointer hover:opacity-80 transition"
                        onClick={() => router.push('/')}
                    >
                        ByteVault
                    </h3>
                </div>

                {/* Navigation Links (Hidden on Small Devices) */}
                <div className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={` ${((link.label === 'Dashboard' && user?.type === 'admin') || link.label !== 'Dashboard') ? 'flex' : 'hidden'}  text-primary/85 hover:text-primary transition ${isActive(link.href) ? 'font-bold border-b-2 border-primary' : ''}`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Icons */}
                <div className="flex  items-center gap-4">
                    <Search
                        className="sm:flex hidden text-primary/70 cursor-pointer hover:text-primary transition"
                        size={20}
                        onClick={() => setShowSearch(true)}
                    />
                    {
                        !user && (
                            <Link 
                            className='sm:flex hidden bg-primary text-secondary px-3 py-[6px] rounded-md shadow-md hover:bg-primary/80 duration-100'
                            href={'/sign-in'}
                            >
                                Login
                            </Link>
                        )
                    }
                    {
                        (user && user.type) && (
                            <>
                                <Link href={'/my-account/my-wishlist'}>
                                    <HeartIcon
                                        className={`${isIconActive('/my-account/my-wishlist') ? 'text-primary font-bold ' : 'text-primary/60 '} sm:flex hidden  cursor-pointer hover:text-primary transition duration-100`}
                                        size={20}
                                    />
                                </Link>

                                <Link href={'/my-account/my-cart'}>
                                    <ShoppingBag
                                        className={`${isIconActive('/my-account/my-cart') ? 'text-primary font-bold' : 'text-primary/60 '} sm:flex hidden  cursor-pointer hover:text-primary transition duration-100`}
                                        size={20}
                                    />
                                </Link>

                                <Link href={'/my-account/personal-information'}>
                                    <BsPersonCircle
                                        size={20}
                                        className={`${isIconActive('/my-account/personal-information') ? 'text-primary font-bold' : 'text-primary/60 '} sm:flex hidden  cursor-pointer hover:text-primary transition duration-100`}
                                        onClick={() => {
                                            if (user) {
                                                router.push('/my-account/personal-information');
                                            } else {
                                                router.push('/sign-in');
                                            }
                                        }}
                                    />
                                </Link>
                            </>
                        )
                    }



                    {/* Hamburger Menu Icon (Visible on Small Devices) */}
                    <Menu
                        className="text-primary/70 cursor-pointer hover:text-primary transition lg:hidden"
                        size={24}
                        onClick={() => setShowMenu(!showMenu)}
                    />
                    <ModeToggle />
                </div>
            </div>

            <SearchProducts
                router={router}
                showMenu={showMenu}
                setShowMenu={setShowMenu}
                showSearch={showSearch}
                setShowSearch={setShowSearch}
                user={user}
                isIconActive={isIconActive}
                handleSearch={handleSearch}
                searchText={searchText}
                setSearchText={setSearchText}
            />
        </div>
    );
};

export default Navbar;
