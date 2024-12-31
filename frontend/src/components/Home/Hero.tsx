'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HeroHighlight, Highlight } from '../ui/hero-hightlight';

const Hero = () => {

    return (
        <section className="relative w-full h-[50vh] max-h-[700px] md:h-[70vh] lg:h-[80vh]  rounded-2xl mt-8 overflow-hidden shadow-primary-foreground shadow-xl">
            {/* Background Image */}

            <Image
                src={'/hero-dark.webp'}
                alt="hero image"
                fill
                className="object-cover object-center"
            />


            {/* Overlay */}
            <div className="absolute inset-0 bg-gray-700/50 dark:bg-black/50 flex items-center justify-center">
                {/* Text Content */}
                <HeroHighlight>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.8,
                            ease: [0.4, 0.0, 0.2, 1],
                        }}
                        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold 
            [text-shadow:_0_4px_0_#000000a0,_0_12px_20px_#00000080] 
            text-white dark:text-gray-100 max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto"
                    >
                        Empower your tech journey with the latest mobiles, computers, and gaming consoles at <Highlight className="text-yellow-400">ByteVault</Highlight>!
                    </motion.h1>
                </HeroHighlight>
            </div>
        </section>
    );
};

export default Hero;
