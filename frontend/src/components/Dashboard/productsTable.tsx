import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import ProductRow from './productRow'
import { Product, SkuDetail } from '@/util/types'
import SkuRow from './product-skus/skuRow'

const ProductsTable = ({ products, hasLicenses, skus, totalItems, page, type = 'products' }: { page?: number, hasLicenses?: boolean, products?: Product[], skus?: SkuDetail[], totalItems: number, type?: 'skus' | 'products' }) => {

    return (
        <div className=' bg-white dark:bg-black w-full md:p-8 p-0 rounded-2xl shadow-md flex flex-col gap-8'>
            <div className='flex md:p-0 p-4 flex-col gap-3'>
                <h1 className='text-3xl font-bold text-primary'>{type == 'products' ? 'Products' : 'SKUs'}</h1>
                <p className='text-primary/70'>{type === 'products' ? 'Manage your products' : 'Manage your product SKUs'}</p>
            </div>
            <>
                {
                    totalItems > 0
                        ? (
                            <>
                                <Table className='w-full '>
                                    <TableHeader>
                                        <TableRow className='text-dark'>
                                            {
                                                type === 'products' && (
                                                    <TableHead className="hidden w-[100px] sm:table-cell">
                                                        <span className="sr-only">Image</span>
                                                    </TableHead>
                                                )
                                            }

                                            <TableHead className='table-cell'>
                                                <p className='flex'>{type === 'products' ? 'Name' : 'SKU-Name'}</p>
                                            </TableHead>
                                            <TableHead className="hidden md:table-cell ">
                                                <p className='flex'>{type === 'products' ? 'Category' : 'SKU-Price'}</p>
                                            </TableHead>
                                            {
                                                (hasLicenses === true) && (
                                                    <TableHead className="hidden md:table-cell ">
                                                        <p className='flex'>{type === 'products' ? 'Platform' : 'SKU-Lifetime'}</p>
                                                    </TableHead>
                                                )
                                            }

                                            {
                                                (hasLicenses === true) && (
                                                    <TableHead >
                                                        <p className='flex'>{type === 'products' ? 'Skus' : 'Licenses'}</p>
                                                    </TableHead>
                                                )
                                            }
                                            <TableHead >
                                                <p className='flex'>Actions</p>
                                            </TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {
                                            type === 'products'
                                                ?
                                                products?.map((item) => (
                                                    <ProductRow
                                                        key={item._id}
                                                        product={item}
                                                    />
                                                ))

                                                :
                                                skus?.map((item) => (
                                                    <SkuRow
                                                        key={item._id}
                                                        sku={item}
                                                        hasLicenses={hasLicenses || false}
                                                    />
                                                ))

                                        }
                                    </TableBody>

                                </Table>
                                {
                                    (type === 'products' && page) && (
                                        <div className="text-xs md:p-0 p-8 text-dark text-muted-foreground">
                                            Showing <strong>{((page - 1) * 12) + totalItems === 0 ? 0 : 1}-{Math.min(page * 12, totalItems)}
                                            </strong> of <strong>{totalItems}</strong>{" "}
                                            items
                                        </div>
                                    )
                                }

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