import Image from 'next/image'
import React from 'react'

const OrderItem = ({ idx }: { idx: number }) => {
    return (
        <div className='flex flex-col gap-6 w-full'>
            <div className='flex w-full items-center justify-between'>
                <div className='flex flex-row items-center'>
                    <Image
                        src={'/hero.png'}
                        alt='order'
                        width={80}
                        height={80}
                        className='sm:block hidden'
                    />
                    <div className='flex flex-col'>
                        <h1 className='font-bold sm:text-[18px] text-md'>Order Name</h1>
                        <h1 className=' sm:text-sm text-xs'>SKU: <span>135746</span></h1>
                        <h1 className=' sm:text-sm text-xs'>Qyt: <span>5</span></h1>
                    </div>
                </div>

                <h2 className='font-bold sm:text-md text-sm'>$80.00</h2>

                <div className='flex flex-col md:w-[200px] sm:w-[160px] w-[120px] sm:gap-4 gap-2'>
                    <button
                        className='sm:py-2 sm:px-4 py-[6px] px-2 border rounded-md text-primary sm:text-[14px] text-[12px] hover:bg-primary-foreground duration-200'
                    >
                        View Order
                    </button>
                    <button
                        className={`${idx % 2 === 0 ? 'flex' : 'hidden'} text-center items-center justify-center sm:py-2 sm:px-4 py-[6px] px-2 border rounded-md text-secondary sm:text-[14px] text-[12px] bg-primary hover:bg-primary/70 duration-200`}
                    >
                        Write A Review
                    </button>
                    <button
                        className={`${idx % 2 === 0 ? 'hidden' : 'flex'} text-center items-center justify-center sm:py-2 sm:px-4 py-[6px] px-2 border rounded-md text-secondary sm:text-[14px] text-[12px] bg-red-500 hover:bg-red-700 duration-200`}
                    >
                        Cancel Order
                    </button>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <div className='sm:py-[6px] py-[4px] px-2 rounded-md bg-green-100 text-green-500'>
                    <p className='sm:text-xs text-[11px] font-bold'>Delivered</p>
                </div>
                <p className='sm:text-sm text-xs'>Your product has been inprocess</p>
            </div>
        </div>
    )
}

export default OrderItem