import React from 'react';
import Image from 'next/image';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import Subscribe from './Subscribe';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="text-primary bg-primary-foreground py-6 border-t">
            <div className="container mx-auto px-6 md:px-12 flex flex-row  flex-wrap justify-between items-start md:items-center md:gap-8 gap-6">
                {/* Logo and Contact */}
                <div className="flex flex-col items-start space-y-6">
                    <div className='relative w-[135px] h-[44px] flex justify-start dark:invert'>
                        <h1 className='font-extrabold text-3xl text-sky-600'>ByteVault</h1>
                    </div>
                    <ul className="space-y-4 text-sm">
                        <li><Link href="tel:+972569470288" className="hover:underline transition duration-300 ease-in-out"><i className="fas fa-phone mr-2"></i> +972 56-947-0288</Link></li>
                        <li><Link href="mailto:mostafa.wardeh2000@gmail.com" className="hover:underline transition duration-300 ease-in-out"><i className="fas fa-envelope mr-2"></i> mostafa.wardeh2000@gmail.com</Link></li>
                        <li><Link href="#" className="hover:underline transition duration-300 ease-in-out"><i className="fas fa-map-marker-alt mr-2"></i> Palestine-Hebron</Link></li>
                    </ul>

                </div>

                {/* Information Links */}
                <div className="flex flex-col space-y-6 text-sm">
                    <h3 className="text-lg font-semibold">Information</h3>
                    <ul className="space-y-3">
                        <li><Link href="/my-account" className="hover:underline transition duration-300 ease-in-out">My Account</Link></li>
                        <li><Link href="/sign-in" className="hover:underline transition duration-300 ease-in-out">Login</Link></li>
                        <li><Link href="/my-account/my-cart" className="hover:underline transition duration-300 ease-in-out">My Cart</Link></li>
                        <li><Link href="/my-account/my-wishlist" className="hover:underline transition duration-300 ease-in-out">My Wishlist</Link></li>
                        <li><Link href="/my-account/my-orders" className="hover:underline transition duration-300 ease-in-out">Orders</Link></li>
                    </ul>
                </div>

                {/* Services Links */}
                <div className="flex flex-col space-y-6 text-sm">
                    <h3 className="text-lg font-semibold">Services</h3>
                    <ul className="space-y-3">
                        <li><Link href="/about-us" className="hover:underline transition duration-300 ease-in-out">About Us</Link></li>
                        <li><Link href="/contact" className="hover:underline transition duration-300 ease-in-out">Contact</Link></li>
                        <li><Link href="/privacy-policy" className="hover:underline transition duration-300 ease-in-out">Privacy Policy</Link></li>
                        <li><Link href="/terms-and-conditions" className="hover:underline transition duration-300 ease-in-out">Terms & Conditions</Link></li>
                    </ul>
                </div>

                {/* Subscribe Section */}
                <Subscribe />
            </div>

            {/* Footer Bottom */}
            <Separator color='white' />
            <div className="mx-auto w-full px-6 md:px-12 flex flex-col gap-6  mt-12">
                <div className='w-full h-[1px] bg-primary/40' />
                <div className='flex items-center w-full  justify-between'>
                    <div className="sm:flex hidden space-x-4 ">
                        <div className="w-10 h-[30px] py-1 bg-secondary border border-primary/40 flex items-center justify-center rounded-sm">
                            <Image src="/visa.svg" alt="Visa" width={24} height={12} />
                        </div>
                        <div className="w-10 h-[30px] py-1 bg-secondary border border-primary/40 flex items-center justify-center rounded-sm">
                            <Image src="/mastercard.svg" alt="Mastercard" width={20} height={12} />
                        </div>
                        <div className="w-10 h-[30px] py-1 bg-secondary border border-primary/40 flex items-center justify-center rounded-sm">
                            <Image src="/paypal.svg" alt="Paypal" width={20} height={12} />
                        </div>
                    </div>
                    <p className="text-sm">©2024 ByteVault All Rights Reserved</p>
                    <div className="flex justify-center space-x-4 text-primary">
                        <Link href="#"><FaFacebookF size={18} className='hover:scale-110 hover:text-primary/80' /></Link>
                        <Link href="#"><FaInstagram size={18} className='hover:scale-110 hover:text-primary/80' /></Link>
                        <Link href="#"><FaTwitter size={18} className='hover:scale-110 hover:text-primary/80' /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
