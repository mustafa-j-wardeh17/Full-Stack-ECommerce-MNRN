'use client'
import { Lens } from '@/components/ui/lens';
import Image from 'next/image'
import React, { useState } from 'react'

const ProductImageWithLens = ({ imageUrl, id }: { imageUrl: string, id: string }) => {
    const [hovering, setHovering] = useState(false);

    return (
        <Lens hovering={hovering} setHovering={setHovering}>
            <div className='flex items-center justify-center w-full bg-secondary dark:bg-neutral-900'>
                <Image
                    src={imageUrl}
                    alt={`Product ${id} image`}
                    width={400}
                    height={400}
                    className='w-full  object-fill aspect-square'
                />
            </div>
        </Lens>
    )
}

export default ProductImageWithLens