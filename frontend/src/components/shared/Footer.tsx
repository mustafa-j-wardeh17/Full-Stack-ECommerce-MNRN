import React from 'react';
import Image from 'next/image';
import { ArrowRightIcon } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="text-primary bg-primary-foreground py-6 border-t">
            <div className="container mx-auto px-6 md:px-12 flex flex-row  flex-wrap justify-between items-start md:items-center space-y-8 md:space-y-0">
                {/* Logo and Contact */}
                <div className="flex flex-col items-start space-y-6">
                    <div className='relative w-[135px] h-[44px] flex justify-start dark:invert'>
                        <Image src="/logo.png" alt="PS Store" width={135} height={44} />
                    </div>
                    <ul className="space-y-4 text-sm">
                        <li><a href="tel:+17045550127" className="hover:underline transition duration-300 ease-in-out"><i className="fas fa-phone mr-2"></i> (704) 555-0127</a></li>
                        <li><a href="mailto:psstore@example.com" className="hover:underline transition duration-300 ease-in-out"><i className="fas fa-envelope mr-2"></i> krist@example.com</a></li>
                        <li><a href="#" className="hover:underline transition duration-300 ease-in-out"><i className="fas fa-map-marker-alt mr-2"></i> 3891 CA 62639</a></li>
                    </ul>

                </div>

                {/* Information Links */}
                <div className="flex flex-col space-y-6 text-sm">
                    <h3 className="text-lg font-semibold">Information</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:underline transition duration-300 ease-in-out">My Account</a></li>
                        <li><a href="#" className="hover:underline transition duration-300 ease-in-out">Login</a></li>
                        <li><a href="#" className="hover:underline transition duration-300 ease-in-out">My Cart</a></li>
                        <li><a href="#" className="hover:underline transition duration-300 ease-in-out">My Wishlist</a></li>
                        <li><a href="#" className="hover:underline transition duration-300 ease-in-out">Checkout</a></li>
                    </ul>
                </div>

                {/* Services Links */}
                <div className="flex flex-col space-y-6 text-sm">
                    <h3 className="text-lg font-semibold">Services</h3>
                    <ul className="space-y-3">
                        <li><a href="#" className="hover:underline transition duration-300 ease-in-out">About Us</a></li>
                        <li><a href="#" className="hover:underline transition duration-300 ease-in-out">Careers</a></li>
                        <li><a href="#" className="hover:underline transition duration-300 ease-in-out">Delivery Information</a></li>
                        <li><a href="#" className="hover:underline transition duration-300 ease-in-out">Privacy Policy</a></li>
                        <li><a href="#" className="hover:underline transition duration-300 ease-in-out">Terms & Conditions</a></li>
                    </ul>
                </div>

                {/* Subscribe Section */}
                <div className="flex w-full max-w-[300px] flex-col space-y-4 text-sm">
                    <h3 className="text-lg font-semibold">Subscribe</h3>
                    <p className='text-xs text-primary/70'>
                        Entre your email below to be the rirst to know about new collections and products launches.
                    </p>
                    <div className="flex flex-col  relative">
                        <input type="email" placeholder="Your Email" className="p-3 rounded-lg border border-primary bg-primary-foreground text-primary focus:outline-none focus:ring-2 focus:ring-secondary transition duration-300" />
                        <button className="absolute right-2 top-[50%] -translate-y-[50%]  transition duration-300 ease-in-out">
                            <ArrowRightIcon size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <Separator color='white' />
            <div className="mx-auto w-full px-6 md:px-12 flex flex-col gap-6  mt-12">
                <div className='w-full h-[1px] bg-primary/40'/>
                <div className='flex items-center w-full  justify-between'>
                    <div className="sm:flex hidden space-x-4 ">
                        <div className="w-10 h-[30px] py-1 bg-primary flex items-center justify-center rounded-sm">
                            <Image src="/visa.svg" alt="Visa" width={24} height={12} />
                        </div>
                        <div className="w-10 h-[30px] py-1 bg-primary flex items-center justify-center rounded-sm">
                            <Image src="/mastercard.svg" alt="Mastercard" width={20} height={12} />
                        </div>
                        <div className="w-10 h-[30px] py-1 bg-primary flex items-center justify-center rounded-sm">
                            <Image src="/paypal.svg" alt="Paypal" width={20} height={12} />
                        </div>
                    </div>
                    <p className="text-sm">©2024 PS_Store All Rights Reserved</p>
                    <div className="flex justify-center space-x-2 text-primary">
                        <a href="#"><FaFacebook className='hover:scale-110 hover:text-primary/80' /></a>
                        <a href="#"><FaInstagram className='hover:scale-110 hover:text-primary/80' /></a>
                        <a href="#"><FaTwitter className='hover:scale-110 hover:text-primary/80' /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
