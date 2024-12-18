import OrderItem from '@/components/my-account/my-order/OrderItem'
import React from 'react'

const page = () => {
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
}

export default page