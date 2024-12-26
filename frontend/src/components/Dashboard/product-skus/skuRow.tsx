'use client'
import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
//import ActionProducts from './actionProducts'
import { SkuDetail } from '@/util/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'




const SkuRow = ({ sku }: { sku: SkuDetail }) => {
    // const formattedDate = new Date(product.createdAt).toLocaleDateString(locale);
    const pathname = usePathname()
    return (
        <TableRow >

            <TableCell className="font-medium ">
                {sku.skuName}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {sku.price}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {sku.validity}

            </TableCell>
            <TableCell >
                <Link
                    className='text-primary underline'
                    href={`${pathname}/${sku._id}/licenses`}
                >
                    Licenses
                </Link>
            </TableCell>
            <TableCell>
                {/* <ActionProducts id={String(sku._id)} /> */}
            </TableCell>
        </TableRow>
    )
}

export default SkuRow