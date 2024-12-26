import { TableCell, TableRow } from '@/components/ui/table'
import Image from 'next/image'
import React from 'react'
import ActionProducts from './actionProducts'
import { Product } from '@/util/types'
import Link from 'next/link'




const ProductRow = ({ product }: { product: Product  }) => {
    // const formattedDate = new Date(product.createdAt).toLocaleDateString(locale);

    return (
        <TableRow >
            <TableCell className="hidden sm:table-cell">
                <Image
                    src={product.image}
                    alt="Product image"
                    height={64}
                    width={64}
                    className=" rounded-md aspect-square "

                />
            </TableCell>
            <TableCell className="font-medium ">
                {product.productName}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {product.category}
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {product.platformType}

            </TableCell>
            <TableCell >
                <Link
                    className='text-primary underline'
                    href={`/dashboard/products/${product._id}/skus`}
                >
                    Skus
                </Link>
            </TableCell>
            <TableCell>
                <ActionProducts id={String(product._id)} />
            </TableCell>
        </TableRow>
    )
}

export default ProductRow