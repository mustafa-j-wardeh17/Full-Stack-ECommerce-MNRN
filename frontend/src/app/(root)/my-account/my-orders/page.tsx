import OrderItem from '@/components/my-account/my-order/OrderItem'
import { Order } from '@/util/types'
import React from 'react'

interface orderInterface {
  result: {
    orders: Order[]
  },
  message: string
}

const page = async () => {

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/orders`)
    const result: orderInterface = await response.json()
    if (!response.ok) {
      throw new Error(result.message)
    }


    console.log('orders=======>', result.result.orders)

    return (
      <div className='flex w-full flex-col gap-4'>
        {
          [1, 2, 3, 4, 5].map((_, idx: number) => (
            <div
              key={idx}
              className='flex flex-col w-full gap-4'
            >
              <div className={`${idx === 0 && 'hidden'} w-full h-[1.5px] bg-primary/10`} />
              <OrderItem idx={idx} />
              <div className={`${idx + 1 === [1, 2, 3, 4, 5].length ? 'flex' : 'hidden'} w-full h-[1.5px] bg-primary/10`} />
            </div>
          ))
        }
      </div>
    )
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div className="text-center text-red-500">
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }

}

export default page