import React from 'react';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer className="bg-black text-white py-6">
            <div className="container mx-auto px-6 md:px-12 flex flex-row  flex-wrap justify-between items-start md:items-center space-y-8 md:space-y-0">
                {/* Logo and Contact */}
                <div className="flex flex-col items-start space-y-6">
                    <div className='relative w-[135px] h-[44px] flex justify-start invert'>
                        <Image src="/logo.png" alt="PS Store" fill/>
                    </div>
                    <ul className="space-y-4 text-sm">
                        <li><a href="tel:+17045550127" className="hover:underline transition duration-300 ease-in-out"><i className="fas fa-phone mr-2"></i> (704) 555-0127</a></li>
                        <li><a href="mailto:psstore@example.com" className="hover:underline transition duration-300 ease-in-out"><i className="fas fa-envelope mr-2"></i> krist@example.com</a></li>
                        <li><a href="#" className="hover:underline transition duration-300 ease-in-out"><i className="fas fa-map-marker-alt mr-2"></i> 3891 CA 62639</a></li>
                    </ul>
                    <div className="flex space-x-4 mt-4">
                        <div className='w-[45px] h-[28px] rounded-sm bg-secondary relative flex items-center justify-center overflow-hidden'>
                            <Image src="/visa.svg" alt="Visa" width={25} height={15} />
                        </div>
                        <div className='w-[45px] h-[28px] rounded-sm bg-secondary relative flex items-center justify-center overflow-hidden'>
                            <Image src="/mastercard.svg" alt="mastercard" width={25} height={15} />
                        </div>
                        <div className='w-[45px] h-[28px] rounded-sm bg-secondary relative flex items-center justify-center overflow-hidden'>
                            <Image src="/paypal.svg" alt="paypal" width={25} height={15} />
                        </div>
                    </div>
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
                <div className="flex w-full max-w-[300px] flex-col space-y-6 text-sm">
                    <h3 className="text-lg font-semibold">Subscribe</h3>
                    <div className="flex flex-col space-y-4">
                        <input type="email" placeholder="Your Email" className="p-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300" />
                        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">Subscribe</button>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center mt-12">
                <p className="text-sm">©2024 PS_Store All Rights Reserved</p>
                <div className="flex justify-center space-x-6 mt-4">
                    <a href="#" className="hover:underline transition duration-300 ease-in-out">Facebook</a>
                    <a href="#" className="hover:underline transition duration-300 ease-in-out">Instagram</a>
                    <a href="#" className="hover:underline transition duration-300 ease-in-out">Twitter</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
