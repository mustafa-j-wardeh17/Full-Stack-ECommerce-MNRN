import OrderItem from '@/components/my-account/my-order/OrderItem'
import { Order } from '@/util/types'
import { cookies } from 'next/headers'
import React from 'react'

interface orderInterface {
  result: {
    orders: Order[]
  },
  message: string
}

const page = async () => {

  try {
    const cookieStore = cookies()
    const _digi_auth_token = (await cookieStore).get('_digi_auth_token')
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/orders`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${_digi_auth_token?.value}`, // Add the token here
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Ensure cookies are sent if required
    });

    const result: orderInterface = await response.json();
    console.log('Orders ====>', result)
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch orders');
    }


    return (
      <div className='flex w-full flex-col gap-4'>
        {
          result.result.orders.map((order: Order, idx: number) => (
            <div
              key={order._id}
              className='flex flex-col w-full gap-4'
            >
              <div className={`${idx === 0 && 'hidden'} w-full h-[1.5px] bg-primary/10`} />
              <OrderItem
                order={order}
              />
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