'use client'
import { motion } from 'framer-motion';
import GoogleMapComp from "./GoogleMapComp";
import { useRef, useState } from "react";
import Link from "next/link";

import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { BackgroundBeams } from "../background-beams";
import { Facebook, Instagram, Locate, Mail, MessageCircle, Phone, User } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';

const Contact = () => {


    const slideInFromTop = (index: number) => ({
        initial: { y: -100, opacity: 0 },
        whileInView: { y: 0, opacity: 1 },
        transition: { duration: 0.6, delay: index * 0.05 },
        viewport: { once: true }
    });

    const formRef = useRef<HTMLFormElement>(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e: any) => {
        const { target } = e;
        const { name, value } = target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    let NEXT_APP_EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_APP_EMAILJS_SERVICE_ID;
    let NEXT_PUBLIC_APP_EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_APP_EMAILJS_TEMPLATE_ID;
    let NEXT_APP_CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
    let NEXT_APP_EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;


    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (!NEXT_APP_EMAILJS_SERVICE_ID ||
            !NEXT_PUBLIC_APP_EMAILJS_TEMPLATE_ID ||
            !NEXT_APP_CONTACT_EMAIL ||
            !NEXT_APP_EMAILJS_PUBLIC_KEY
        ) {
            alert("Ahh, something went wrong. Please try again.");
            setForm({
                name: "",
                email: "",
                message: "",
            });
            return
        }
        setLoading(true);
        toast.success('Message send successfully')
    };

    return (
        <div className="flex relative overflow-hidden border my-20 rounded-xl flex-col  shadow-md  bg-gradient-to-b  from-black/90 via-blue-950 to-sky-800 py-[40px] gap-[30px]  text-white antialiased">
            <div className="flex relative z-10 lg:flex-row flex-col lg:gap-0 gap-[70px] xl:px-[120px] lg:px-[80px] sm:px-[60px] px-[20px]">
                <motion.div
                    {...slideInFromTop(0)}
                    className="flex lg:w-1/2  w-full flex-col lg:pb-[120px] gap-[40px] lg:gap-[80px] items-start"
                >
                    <div className="flex gap-3 flex-col justify-start">
                        <h1 className="text-[32px] font-bold">
                            Join Us
                        </h1>
                        <div className="w-[80px] h-[2px] bg-neutral-400/40" />
                    </div>
                    <div className="flex flex-col lg:h-full h-[200px] justify-between ">
                        <div className="flex gap-6 items-center ">
                            <Phone size={25} />
                            <p className="tracking-wider text-light/70">{"+972 569 470 288"}</p>
                        </div>
                        <div className="flex gap-6 items-center ">
                            <Mail size={25} />

                            <p className="tracking-wider text-light/70">{"mostafa.warda@gmail.com"}</p>
                        </div>
                        <div className="flex gap-6 items-center ">
                            <Locate size={25} />

                            <p className="tracking-wider text-light/70">Palestine-Hebron</p>
                        </div>
                    </div>

                    <motion.div
                        {...slideInFromTop(1)}
                        className='flex gap-6 lg:pt-12  pt-4 text-white justify-start j w-full  items-center'
                    >
                        <Link href={'https://www.facebook.com/mustafa.j.wardeh17'} className='p-2  flex rounded-full justify-center items-center  transition-all duration-75 hover:scale-125'>
                            <Facebook size={25} />
                        </Link>
                        <Link href={'https://www.instagram.com/mustafa.j.wardeh17'} className='p-2  flex rounded-full justify-center items-center   transition-all duration-75 hover:scale-125'>
                            <Instagram size={25} />
                        </Link>
                        <Link href={'https://wa.me/+972569470288'} className='p-2 flex rounded-full justify-center items-center transition-all duration-75 hover:scale-125'>
                            <FaWhatsapp size={25} />
                        </Link>

                    </motion.div>
                </motion.div>
                <motion.div {...slideInFromTop(1)} className="flex  lg:w-3/5 w-full flex-col gap-[50px] items-start">
                    <div className="flex gap-3 flex-col justify-start">
                        <h1 className="text-[32px] font-bold">Contact us</h1>
                        <div className="w-[80px] h-[2px] bg-neutral-400/40" />
                    </div>
                    <form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        className="flex w-full flex-col gap-[30px] font-bold">
                        <motion.div {...slideInFromTop(2)} className="flex flex-col">
                            <div className={`flex mb-4 items-center gap-2`}>
                                <User size={25} />
                                <p className="font-lg break-keep">Name</p>
                            </div>
                            <input
                                type='text'
                                name='name'
                                value={form.name}
                                onChange={handleChange}
                                required
                                placeholder={'Form Name'}
                                className='bg-black/40  flex-1 py-4 px-6 placeholder:text-white/60 text-light rounded-lg outline-none border-none font-medium'
                            />
                        </motion.div>
                        <motion.div {...slideInFromTop(3)} className="flex flex-col ">
                            <div className={`flex mb-4  items-center gap-2`}>
                                <Mail size={25} />
                                <p className="font-lg break-keep">E-mail</p>
                            </div>
                            <input
                                type='email'
                                name='email'
                                value={form.email}
                                onChange={handleChange}
                                required
                                placeholder={'Form Email'}
                                className='bg-black/40  flex-1 py-4 px-6  placeholder:text-white/60 text-light rounded-lg outline-none border-none font-medium'
                            />                        </motion.div>
                        <motion.div {...slideInFromTop(4)} className="flex flex-col">
                            <div className={`flex  mb-4 items-center gap-2`}>
                                <MessageCircle size={25} />

                                <p className="font-lg break-keep">Message</p>
                            </div>
                            <textarea
                                rows={7}
                                name='message'
                                value={form.message}
                                onChange={handleChange}
                                required
                                placeholder={'Form Message'}
                                className='bg-black/40  flex-1 py-4 px-6  placeholder:text-white/60 text-light rounded-lg outline-none border-none font-medium'
                            />
                        </motion.div>
                        <motion.div {...slideInFromTop(5)} className="w-full flex justify-center">
                            <button
                                type='submit'
                                className="bg-sky-900 text-lg py-3 px-8 text-white rounded-xl outline-none w-fit font-extrabold tracking-wider hover:bg-sky-900/60 shadow-black/60 shadow-sm "
                            >{!loading ? "Contacting" : 'Sending'}</button>
                        </motion.div>
                    </form>
                </motion.div>
            </div>
            <motion.div {...slideInFromTop(6)} className="xl:px-[120px] relative z-10 rounded-xl overflow-hidden sm:px-[60px] px-[20px]">
                <div className="w-full  lg:h-[300px] h-[200px] rounded-2xl overflow-hidden" >
                    <GoogleMapComp />
                </div>
            </motion.div>
            <Toaster />
            <BackgroundBeams />
        </div>


    );
};

export default Contact;