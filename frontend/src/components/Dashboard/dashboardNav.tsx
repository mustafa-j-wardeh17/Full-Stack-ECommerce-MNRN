import React from 'react'
import { IoIosNotifications, IoMdSettings } from 'react-icons/io'

const DashboardNav = () => {
  return (
    <div className=' bg-primary-foreground  w-full h-[60px] flex px-[45px] shadow  text-[22px] flex-row py-[38px]  justify-between items-center'>
      <h1 className='font-bold tracking-wider lg:ml-6 sm:ml-4 ml-3'>Dashboard</h1>
      <div className='flex gap-2  text-primary items-center'>
        {/* <LanguageButton locale={locale} /> */}
        <IoMdSettings />
        <IoIosNotifications />
      </div>
    </div>
  )
}

export default DashboardNav