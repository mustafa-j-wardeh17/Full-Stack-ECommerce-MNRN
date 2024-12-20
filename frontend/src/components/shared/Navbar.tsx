'use client';

import { useState } from 'react';
import { HeartIcon, Search, ShoppingBag, Menu, X } from 'lucide-react';
import { BsPersonCircle } from 'react-icons/bs';
import { usePathname, useRouter } from 'next/navigation';
import { ModeToggle } from '../theme-toggle';
import Link from 'next/link';
import { useUserContext } from '@/context';

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState('');

    const { user } = useUserContext()

    const router = useRouter();
    const pathname = usePathname();

    const handleSearch = () => {
        router.push(`/products?search=${searchText}`);
        setShowSearch(false);
    };

    const navLinks = [
        { label: 'Home', href: '/' },
        { label: 'Shop', href: '/shop' },
        { label: 'About Us', href: '/about-us' },
        { label: 'Contact Us', href: '/contact' },
    ];

    const isActive = (path: string) => path === '/' ? pathname === path : pathname.includes(path);
    const isIconActive = (path: string) => pathname === path

    return (
        <>
            {/* Top Header */}
            <div className="flex  items-center justify-between py-3 px-4 ">
                {/* Logo */}
                <div className="flex items-center">
                    <h3
                        className="text-2xl font-extrabold text-primary cursor-pointer hover:text-primary transition"
                        onClick={() => router.push('/')}
                    >
                        PS_Store
                    </h3>
                </div>

                {/* Navigation Links (Hidden on Small Devices) */}
                <div className="hidden md:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`text-primary/85 hover:text-primary transition ${isActive(link.href) ? 'font-bold border-b-2 border-primary' : ''}`}
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
                    <Link href={'/my-account/my-wishlist'}>
                        <HeartIcon
                            className={`${isIconActive('/my-account/my-wishlist') ? 'text-primary font-bold ' : 'text-primary/60 '} sm:flex hidden  cursor-pointer hover:text-primary transition duration-100`}
                            size={20}
                        />
                    </Link>

                    <Link href={'/my-account/my-orders'}>
                        <ShoppingBag
                            className={`${isIconActive('/my-account/my-orders') ? 'text-primary font-bold' : 'text-primary/60 '} sm:flex hidden  cursor-pointer hover:text-primary transition duration-100`}
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




                    {/* Hamburger Menu Icon (Visible on Small Devices) */}
                    <Menu
                        className="text-primary/70 cursor-pointer hover:text-primary transition md:hidden"
                        size={24}
                        onClick={() => setShowMenu(!showMenu)}
                    />
                    <ModeToggle />
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {showMenu && (
                <div className="absolute top-0 left-0 w-full h-screen bg-primary-foreground z-50 flex flex-col items-center gap-6 pt-16">
                    <X
                        size={24}
                        className="absolute top-4 right-4 text-primary cursor-pointer hover:text-primary transition"
                        onClick={() => setShowMenu(false)}
                    />
                    <div className="flex flex-col w-full items-center px-4 gap-6">
                        <Link href="/" className="text-lg border p-2 rounded-md w-full max-w-[300px] text-center text-primary/85 hover:text-primary hover:bg-secondary/90 transition duration-100" onClick={() => setShowMenu(false)}>
                            Home
                        </Link>
                        <Link href="/shop" className="text-lg border p-2 rounded-md w-full max-w-[300px] text-center text-primary/85 hover:text-primary hover:bg-secondary/90 transition duration-100" onClick={() => setShowMenu(false)}>
                            Shop
                        </Link>
                        <Link href="/about" className="text-lg border p-2 rounded-md w-full max-w-[300px] text-center text-primary/85 hover:text-primary hover:bg-secondary/90 transition duration-100" onClick={() => setShowMenu(false)}>
                            About Us
                        </Link>
                        <Link href="/contact" className="text-lg border p-2 rounded-md w-full max-w-[300px] text-center text-primary/85 hover:text-primary hover:bg-secondary/90 transition duration-100" onClick={() => setShowMenu(false)}>
                            Contact Us
                        </Link>
                    </div>

                    {/* Icons for Mobile Navigation */}
                    <div className="flex items-center gap-6 mt-6">
                        <Search
                            className="text-primary/70 cursor-pointer hover:text-primary transition"
                            size={24}
                            onClick={() => {
                                setShowSearch(true);
                                setShowMenu(false);
                            }}
                        />
                        <HeartIcon className="text-primary/70 cursor-pointer hover:text-primary transition" size={24} />
                        <ShoppingBag className="text-primary/70 cursor-pointer hover:text-primary transition" size={24} />
                        <BsPersonCircle
                            size={24}
                            className={`${isIconActive('/my-account/personal-information') ? 'text-primary font-bold' : 'text-primary/60 '} sm:flex hidden  cursor-pointer hover:text-primary transition duration-100`}
                            onClick={() => {
                                if (user) {
                                    router.push('/my-account/personal-information');
                                } else {
                                    router.push('/sign-in');
                                }
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Full-Screen Search Modal */}
            {showSearch && (
                <div className="fixed inset-0 z-50 bg-primary-foreground/80 flex flex-col py-[40px] items-center ">
                    <X
                        size={24}
                        className="absolute top-4 right-4 text-primary cursor-pointer hover:text-primary transition"
                        onClick={() => setShowSearch(false)}
                    />
                    <div className="w-full max-w-md px-4">
                        <div className="flex  w-full border rounded-lg overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                className="flex-1 px-4 py-3 outline-none text-lg"
                            />
                            <button
                                className="bg-primary text-white px-4 py-3 hover:bg-green-600 transition"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
