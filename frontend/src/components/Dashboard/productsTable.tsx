import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import ProductRow from './productRow'
import { Product } from '@/util/types'

const ProductsTable = ({ items, totalItems, page }: { page: number, items: Product[], totalItems: number }) => {

    return (
        <div className=' bg-white w-full md:p-8 p-0 rounded-2xl shadow-md flex flex-col gap-8'>
            <div className='flex md:p-0 p-4 flex-col gap-3'>
                <h1 className='text-3xl font-bold text-black'>Products</h1>
                <p className='text-black/70'>Manage your products and view their sales performance</p>
            </div>
            <>
                {
                    totalItems > 0
                        ? (
                            <>
                                <Table className='w-full '>
                                    <TableHeader>
                                        <TableRow className='text-dark'>
                                            <TableHead className="hidden w-[100px] sm:table-cell">
                                                <span className="sr-only">Image</span>
                                            </TableHead>
                                            <TableHead className='table-cell'>
                                                <p className='flex'>Name</p>
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell ">
                                                <p className='flex'>Category</p>
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell ">
                                                <p className='flex'>Platform</p>
                                            </TableHead>
                                            <TableHead >
                                                <p className='flex'>Rating</p>
                                            </TableHead>
                                            <TableHead >
                                                <p className='flex'>Actions</p>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {
                                            items?.map((item) => (
                                                <ProductRow
                                                    key={item._id}
                                                    product={item}
                                                />
                                            ))
                                        }
                                    </TableBody>

                                </Table>
                                <div className="text-xs md:p-0 p-8 text-dark text-muted-foreground">
                                    Showing <strong>{((page - 1) * 12) + totalItems === 0 ? 0 : 1}-{Math.min(page * 12, totalItems)}
                                    </strong> of <strong>{totalItems}</strong>{" "}
                                    items
                                </div>
                            </>
                        )
                        : (
                            <div className='w-full h-[400px] flex flex-col gap-6 items-center justify-center'>
                                <h1 className='font-bold text-3xl text-dark'>No Data To Deploy</h1>
                                <p className='text-dark/80 text-[20px]'>Product Deploy Desc</p>
                            </div>
                        )
                }
            </>

        </div>
    )
}

export default ProductsTable