import Image from 'next/image'
import React from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const DashboardCard = ({ index }: { index: number }) => {
    return (
        <div className='flex relative bg-white shadow w-full  rounded-xl overflow-hidden text-dark  gap-2 h-[250px] xl:h-[300px]  flex-col'>
            <div className='p-2 w-full h-3/4'>
                <div className='w-full h-full relative rounded-md overflow-hidden '>
                    <Image src={'/hero.jpg'} alt='hero' fill className='object-cover' />
                </div>
            </div>

            <div className='flex  mb-4  rounded-t-full px-2 py-2 flex-col gap-1 w-full '>
                <h2 className='text-[18px] font-bold'>Title {' ' + index}</h2>
                <h2 className='text-[14px] text-dark'>Description</h2>
            </div>
            <div className=' absolute flex flex-col gap-1 items-center justify-between top-3 right-3 bg-white/70 rounded-md p-[6px]'>
                <form action="w-full">
                    <button className='text-blue-600 text-center p-2 hover:bg-white rounded-md  w-full'>
                        <CiEdit size={20} />
                    </button>
                </form>

                <AlertDialog>
                    <AlertDialogTrigger
                        className='text-red-500 text-center p-2 hover:bg-white rounded-md  w-full'>
                        <MdOutlineDeleteOutline size={20} />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the product and its associated data.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className='bg-red-500 hover:bg-red-300'>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}

export default DashboardCard