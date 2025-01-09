'use client'
import { Lens } from '@/components/ui/lens';
import Image from 'next/image'
import React, { useState } from 'react'

const ProductImageWithLens = ({ imageUrl, id }: { imageUrl: string, id: string }) => {
    const [hovering, setHovering] = useState(false);
    const [loadImage, setloadImage] = useState(true)

    const handleLoadImage = () => {
        setloadImage(false)
    }
    return (
        <Lens hovering={hovering} setHovering={setHovering}>
            <div className='flex items-center justify-center w-full h-full '>
                <Image
                    src={imageUrl}
                    alt={`Product ${id} image`}
                    width={400}
                    height={400}
                    className='w-full h-full object-fill lg:aspect-square md:aspect-[9/8] aspect-square'
                    onLoad={handleLoadImage}
                />
                {
                    loadImage && (
                        <div className='w-full h-full flex items-center justify-center'>
                            <div className='w-[40px] h-[40px] rounded-full border-primary border-t-[2px] animate-spin' />
                        </div>
                    )
                }
            </div>
        </Lens>
    )
}

export default ProductImageWithLens