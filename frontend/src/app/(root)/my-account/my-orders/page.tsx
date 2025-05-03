import OrderItem from '@/components/my-account/my-order/OrderItem'
import { Order } from '@/util/types'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

interface orderInterface {
  result: {
    orders: Order[]
  },
  message: string
}

const page = async () => {
  const cookieStore = cookies()
  const _digi_auth_token = (await cookieStore).get('_digi_auth_token')
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/orders`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${_digi_auth_token?.value}`, // Add the token here
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Ensure cookies are sent if required
    });

    const result: orderInterface = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch orders');
    }
    console.log('Orders ====>', result)


    return (
      <div className='flex w-full flex-col gap-4'>
        <h1 className="text-3xl font-bold mb-6 text-primary">My Orders</h1>

        {result.result.orders.length === 0 ? (
          <div className='w-full flex flex-col gap-4 items-center justify-center'>
            <p className="text-gray-500 text-center text-lg font-medium">
              Your order list is empty. Start purchase your favorite items!
            </p>
            <Link href="/shop" className="">
              <span className="text-center text-blue-500 underline">Shop Now</span>
            </Link>
          </div>
        )
          :
          result.result.orders.map((order: Order, idx: number) => (
            <div
              key={idx}
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
    throw new Error('Failed to fetch products');

  }

}

export default page