'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import WhyChooseUs from '@/components/Home/WhyChooseUs';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const AboutUs = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <section className="my-14 space-y-12 text-gray-800 dark:text-gray-200">
      {/* Hero Section */}
      <div className="relative lg:aspect-[16/6] sn:aspect-video aspect-square rounded-xl overflow-hidden  flex items-center justify-center">
        <div className="absolute z-10 w-full h-full flex flex-col md:gap-6 sm:gap-5 gap-3 items-center text-white justify-center bg-black/50 dark:bg-black/50">
          <h1 className="sm:text-6xl text-4xl md:text-8xl font-extrabold text-sky-500">ByteVault</h1>
          <p className="sm:text-2xl text-lg text-center md:text-3xl text-sky-300">Your Gateway to Advanced Technology</p>
        </div>
        <Image
          src="/about/1.jpg"
          layout="fill"
          objectFit="cover"
          alt="ByteVault Hero Image"
        />
      </div>

      {/* Introduction Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto text-center space-y-6"
      >
        <h2 className="text-4xl font-bold text-sky-700 dark:text-sky-300">Welcome to ByteVault</h2>
        <p className="text-lg leading-relaxed text-primary">
          At ByteVault, we are dedicated to revolutionizing how technology enthusiasts, gamers, and professionals access the latest innovations.
          Founded by Mustafa Abu Wardeh, our mission is to provide top-tier products and services that make technology accessible, affordable, and enjoyable for everyone.
        </p>
      </motion.div>
      <Separator />

      {/* Mission, Vision, and Values */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
        className="space-y-16 max-w-7xl mx-auto px-6 lg:px-0"
      >
        {/* Mission */}
        <motion.div
          variants={fadeIn}
          className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-10"
        >
          <div className="flex-1 relative lg:w-1/2 w-full max-w-[500px] lg:aspect-square md:aspect-video aspect-square">
            <Image
              src="/about/2.webp"
              fill
              className="rounded-xl shadow-lg transition-transform transform hover:scale-105"
              alt="Our Mission"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-semibold text-sky-500 leading-tight">Our Mission</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              At ByteVault, our mission is to empower individuals and businesses by providing access to cutting-edge technology that enhances productivity, innovation, and connectivity.
              We strive to offer high-quality tech products at competitive prices, ensuring our customers are always ahead of the curve.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              By fostering a customer-centric approach, we aim to simplify the tech-buying experience and build lasting relationships with our clients.
            </p>
          </div>
        </motion.div>

        {/* Vision */}
        <motion.div
          variants={fadeIn}
          className="flex flex-col lg:flex-row-reverse items-center justify-between space-y-8 lg:space-y-0 lg:space-x-10"
        >
          <div className="flex-1 relative lg:w-1/2 w-full max-w-[500px] lg:aspect-square md:aspect-video aspect-square">
            <Image
              src="/about/4.webp"
              fill
              className="rounded-xl shadow-lg transition-transform transform hover:scale-105"
              alt="Our Vision"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-semibold text-sky-500 leading-tight">Our Vision</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              To become a globally recognized leader in the tech e-commerce industry by consistently delivering innovation, reliability, and trust.
              We envision a world where technology is accessible and affordable for everyone, driving progress and enhancing everyday life.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              ByteVault aspires to be a beacon of excellence in the digital marketplace, fostering a community of tech enthusiasts and professionals.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          variants={fadeIn}
          className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0 lg:space-x-10"
        >
          <div className="flex-1 relative lg:w-1/2 w-full max-w-[500px] lg:aspect-square md:aspect-video aspect-square">
            <Image
              src="/about/3.webp"
              fill
              className="rounded-xl shadow-lg transition-transform transform hover:scale-105"
              alt="Our Core Values"
            />
          </div>
          <div className="flex-1 space-y-6">
            <h3 className="text-3xl font-semibold text-sky-500 leading-tight">Our Core Values</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              At ByteVault, we are guided by a commitment to integrity, innovation, and customer satisfaction. Our core values include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-lg text-gray-700">
              <li><strong>Integrity:</strong> Upholding honesty and transparency in all interactions.</li>
              <li><strong>Customer-Centricity:</strong> Prioritizing customer needs and delivering exceptional service.</li>
              <li><strong>Innovation:</strong> Embracing the latest trends and technological advancements.</li>
              <li><strong>Community Support:</strong> Contributing positively to the tech community and beyond.</li>
            </ul>
          </div>
        </motion.div>
      </motion.div>
      <Separator />

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <WhyChooseUs />
        </motion.div>
      </div>
      <Separator />

      {/* Additional Key Information Section */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        variants={fadeIn}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto text-center space-y-8 py-16"
      >
        <h2 className="text-3xl font-semibold text-sky-500">Why ByteVault is the Right Choice for You</h2>
        <p className="text-lg text-gray-700">
          ByteVault offers a unique combination of reliability, innovation, and customer service. We are committed to ensuring that our customers have access to the best technology solutions available. Whether you are looking for the latest gadgets, reliable hardware, or exceptional customer service, ByteVault has you covered.
        </p>
        <p className="text-lg text-gray-700">
          Our dedication to quality and customer satisfaction is reflected in everything we do, from our hand-picked product selection to our easy-to-navigate online store. Join the ByteVault community today and experience the difference for yourself!
        </p>
        <div className='flex items-center justify-center w-full'>
          <Link
            href={'/shop'}
            className="px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg hover:bg-sky-600 transition duration-200"
          >
            Explore Our Products
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutUs;
