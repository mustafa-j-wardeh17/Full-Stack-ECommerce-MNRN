'use client'
import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { SkuDetail } from '@/util/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ActionSKUs from './actionSku'




const SkuRow = ({ sku, hasLicenses }: { sku: SkuDetail, hasLicenses: boolean }) => {
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
            {
                hasLicenses && (
                    <TableCell className="hidden md:table-cell">
                        {sku.lifetime ? 'true' : 'false'}
                    </TableCell>
                )
            }
            {
                hasLicenses && (
                    <TableCell >
                        <Link
                            className='text-primary underline'
                            href={`${pathname}/${sku._id}/licenses`}
                        >
                            Licenses
                        </Link>
                    </TableCell>
                )
            }
            <TableCell>
                <ActionSKUs id={String(sku._id)} />
            </TableCell>
        </TableRow>
    )
}

export default SkuRow