'use client';

import React, { useContext } from 'react';
import { Context } from '../../context';
import { HeartIcon, Search, ShoppingBag, Menu, X } from 'lucide-react';
import { BsPersonCircle } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { ModeToggle } from '../theme-toggle';
import Link from 'next/link';

const Navbar = () => {
    const [showMenu, setShowMenu] = React.useState(false);
    const [showSearch, setShowSearch] = React.useState(false);
    const [searchText, setSearchText] = React.useState('');

    const {
        state: { user },
        cartItems,
    } = useContext(Context);

    const router = useRouter();

    const handleSearch = () => {
        router.push(`/products?search=${searchText}`);
        setShowSearch(false);
    };

    return (
        <>
            {/* Top Header */}
            <div className="flex items-center justify-between py-3 px-4 border-b border-gray-200">
                {/* Logo */}
                <div className="flex items-center">
                    <h3
                        className="text-2xl font-extrabold text-primary cursor-pointer hover:text-green-500 transition"
                        onClick={() => router.push('/')}
                    >
                        PS_Store
                    </h3>
                </div>

                {/* Navigation Links (Hidden on Small Devices) */}
                <div className="hidden md:flex items-center gap-4">
                    <Link href="/" className="text-primary/85 hover:text-green-500 transition">
                        Home
                    </Link>
                    <Link href="/shop" className="text-primary/85 hover:text-green-500 transition">
                        Shop
                    </Link>
                    <Link href="/about" className="text-primary/85 hover:text-green-500 transition">
                        About Us
                    </Link>
                    <Link href="/contact" className="text-primary/85 hover:text-green-500 transition">
                        Contact Us
                    </Link>
                </div>

                {/* Icons */}
                <div className="flex  items-center gap-4">
                    <Search
                        className="sm:flex hidden text-primary/70 cursor-pointer hover:text-green-500 transition"
                        size={20}
                        onClick={() => setShowSearch(true)}
                    />
                    <HeartIcon className=" sm:flex hidden text-primary/70 cursor-pointer hover:text-green-500 transition" size={20} />
                    <ShoppingBag className=" sm:flex hidden text-primary/70 cursor-pointer hover:text-green-500 transition" size={20} />

                    <BsPersonCircle
                        size={28}
                        className="sm:flex hidden text-primary cursor-pointer hover:text-green-500 transition"
                        onClick={() =>
                            user && user.email ? router.push('/my-account') : router.push('/sign-in')
                        }
                    />

                    {/* Hamburger Menu Icon (Visible on Small Devices) */}
                    <Menu
                        className="text-primary/70 cursor-pointer hover:text-green-500 transition md:hidden"
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
                        className="absolute top-4 right-4 text-primary cursor-pointer hover:text-green-500 transition"
                        onClick={() => setShowMenu(false)}
                    />
                    <div className="flex flex-col w-full items-center px-4 gap-6">
                        <Link href="/" className="text-lg border p-2 rounded-md w-full max-w-[300px] text-center text-primary/85 hover:text-green-500 hover:bg-primary transition duration-100" onClick={() => setShowMenu(false)}>
                            Home
                        </Link>
                        <Link href="/shop" className="text-lg border p-2 rounded-md w-full max-w-[300px] text-center text-primary/85 hover:text-green-500 hover:bg-primary transition duration-100" onClick={() => setShowMenu(false)}>
                            Shop
                        </Link>
                        <Link href="/about" className="text-lg border p-2 rounded-md w-full max-w-[300px] text-center text-primary/85 hover:text-green-500 hover:bg-primary transition duration-100" onClick={() => setShowMenu(false)}>
                            About Us
                        </Link>
                        <Link href="/contact" className="text-lg border p-2 rounded-md w-full max-w-[300px] text-center text-primary/85 hover:text-green-500 hover:bg-primary transition duration-100" onClick={() => setShowMenu(false)}>
                            Contact Us
                        </Link>
                    </div>

                    {/* Icons for Mobile Navigation */}
                    <div className="flex items-center gap-6 mt-6">
                        <Search
                            className="text-primary/70 cursor-pointer hover:text-green-500 transition"
                            size={24}
                            onClick={() => {
                                setShowSearch(true);
                                setShowMenu(false);
                            }}
                        />
                        <HeartIcon className="text-primary/70 cursor-pointer hover:text-green-500 transition" size={24} />
                        <ShoppingBag className="text-primary/70 cursor-pointer hover:text-green-500 transition" size={24} />
                        <BsPersonCircle
                            size={28}
                            className="text-primary cursor-pointer hover:text-green-500 transition"
                            onClick={() => {
                                user && user.email ? router.push('/my-account') : router.push('/sign-in');
                                setShowMenu(false);
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
                        className="absolute top-4 right-4 text-primary cursor-pointer hover:text-green-500 transition"
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
                                className="bg-green-500 text-white px-4 py-3 hover:bg-green-600 transition"
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
