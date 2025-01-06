import Contact from '@/components/shared/Contact';
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Have questions or need assistance? At ByteVault, we are committed to providing you with excellent customer service. Whether you’re looking for more information about our products, need help with an order, or have any other inquiries, our team is here to assist you. Founded and developed by Mustafa Abu Wardeh, ByteVault values your experience with us, and we are always eager to help. Reach out through the contact form below, and we will get back to you as quickly as possible. We look forward to connecting with you and making your tech journey smoother.',
};

const page = () => {
  return (
    <div className="flex relative flex-col items-center w-full  my-20 overflow-hidden">

      {/* Heading and Description */}
      <div className="text-center lg:w-4/5 px-5 w-full">
        <h1 className="text-4xl font-bold text-primary/80 mb-4">Get in Touch</h1>
        <p className="text-lg text-primary/60">
          We&apos;d love to hear from you! Whether you have questions about our products, need assistance with an order, or just want to share your thoughts, our team is ready to assist. Fill out the form below, and we will get back to you as soon as possible in email.
        </p>
      </div>

      {/* Contact Form */}
      <Contact />
    </div>
  );
};

export default page;
