import Image from 'next/image'
import React from 'react'

const WhyChooseUs = () => {
    return (
        <section className="my-20 px-4">
            <h2 className="md:text-4xl text-2xl  font-bold text-primary/80 w-full text-center mb-10">
                Why Choose Us?
            </h2>
            <div className='grid lg:grid-cols-3 sm:place-items-start place-items-center sm:grid-cols-2 grid-cols-1  gap-6 '>
                <div className='relative w-full max-w-[450px]  aspect-square  rounded-2xl shadow-md overflow-hidden'>
                    <div className='absolute z-10 w-full h-full pb-8 text-white  flex flex-col items-center justify-end gap-3 text-center  duration-100 top-0 left-0 bg-black/30 dark:bg-gray-700/20 hover:bg-transparent hover:dark:bg-transparent px-4 py-2 rounded-br-2xl'>
                        <h3 className='text-4xl  font-bold '>Tech-Savvy</h3>
                        <p className='text-lg text-white/80  font-semibold '>
                            We are always up to date with the latest technology.
                        </p>
                    </div>
                    <Image
                        src='/choose-us/Tech-Savvy.jpg'
                        alt='Tech-Savvy'
                        fill
                        className='aspect-square'
                    />
                </div>
                <div className='relative w-full max-w-[450px]  aspect-square  rounded-2xl shadow-md overflow-hidden'>
                    <div className='absolute z-10 w-full h-full pb-8 text-white  flex flex-col items-center justify-end gap-3 text-center  duration-100 top-0 left-0 bg-black/30 dark:bg-gray-700/20 hover:bg-transparent hover:dark:bg-transparent px-4 py-2 rounded-br-2xl'>
                        <h3 className='text-4xl  font-bold '>Trusted</h3>
                        <p className='text-lg text-white/80  font-semibold '>
                            We are a trusted brand with a proven track record.
                        </p>
                    </div>
                    <Image
                        src='/choose-us/Trusted.jpg'
                        alt='Trusted'
                        fill
                        className='aspect-square'
                    />
                </div>
                <div className='relative w-full max-w-[450px]  aspect-square  rounded-2xl shadow-md overflow-hidden'>
                    <div className='absolute z-10 w-full h-full pb-8 text-white  flex flex-col items-center justify-end gap-3 text-center  duration-100 top-0 left-0 bg-black/30 dark:bg-gray-700/20 hover:bg-transparent hover:dark:bg-transparent px-4 py-2 rounded-br-2xl'>
                        <h3 className='text-4xl  font-bold '>Value-Driven</h3>
                        <p className='text-lg text-white/80  font-semibold '>
                            We are committed to providing value to our customers.
                        </p>
                    </div>
                    <Image
                        src='/choose-us/Value-Driven.jpg'
                        alt='Value-Driven'
                        fill
                        className='aspect-square'
                    />
                </div>

            </div>
        </section>
    )
}

export default WhyChooseUs