import Image from 'next/image'
import React from 'react'
import { FaEye, FaStar } from 'react-icons/fa'

export type productProps = {
    id: number;
    name: string;
    image: string;
    link: string;
    description: string;
    price: string
}

const ProductCard = ({ product }: { product: productProps }) => {
    return (
        <div
            className="relative  overflow-hidden min-w-[250px]"
        >
            {/* Image Container */}
            <div className="relative group justify-center items-center w-full bg-primary-foreground hover:bg-primary/10 h-72  rounded-lg overflow-hidden">
                {/* Image */}
                <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-300 ease-in-out group-hover:opacity-80 hover:scale-105"
                />

                {/* Star and Eye Icons */}
                <div className="flex flex-col justify-center items-center space-y-2 absolute top-3 right-3 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
                    {/* Star Icon in a white circle */}
                    <button className="cursor-pointer bg-secondary hover:bg-primary-foreground/30 text-primary rounded-full p-2 w-[30px] h-[30px] flex items-center justify-center">
                        <FaStar className="text-primary" size={15} />
                    </button>

                    {/* Eye Icon in a white circle */}
                    <button className="cursor-pointer bg-secondary hover:bg-primary-foreground/30 text-primary rounded-full p-2 w-[30px] h-[30px] flex items-center justify-center">
                        <FaEye className="text-primary" size={15} />
                    </button>
                </div>

                {/* Add to Cart Button */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[80%] bg-secondary text-primary rounded-xl lg:p-3 p-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out flex items-center justify-center">
                    <a href={product.link} className="lg:text-lg text-md font-semibold">Add to Cart</a>
                </div>
            </div>

            {/* Product Info */}
            <div className="mt-3">
                <h3 className="lg:text-xl text-lg font-semibold text-primary">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <p className="mt-2 text-sm font-semibold text-primary">{product.price}</p>
            </div>


        </div>
    )
}

export default ProductCard