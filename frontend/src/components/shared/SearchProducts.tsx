import { Product, ProductsResponse } from '@/util/types';
import { HeartIcon, Search, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { BsPersonCircle } from 'react-icons/bs';

interface SearchProductsProps {
    showMenu: boolean,
    setShowMenu: (show: boolean) => void,
    showSearch: boolean,
    setShowSearch: (show: boolean) => void,
    searchText: string,
    setSearchText: (text: string) => void,
    handleSearch: () => void,
    user: any,
    router: any,
    isIconActive: (path: string) => boolean,
}
const SearchProducts = ({
    showMenu,
    setShowMenu,
    showSearch,
    setShowSearch,
    searchText,
    setSearchText,
    handleSearch,
    user,
    router,
    isIconActive
}: SearchProductsProps) => {

    const [products, setProducts] = React.useState<Product[]>([]);

    const onChangeText = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
        if (e.target.value === '') {
            setProducts([]);
        } else {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products?search=${e.target.value}&limit=4`)
                const data: ProductsResponse = await response.json();
                if (!response.ok) {
                    console.log('Error fetching search results:', data.message);
                    return;
                }
                setProducts(data.result.products);

            } catch (error: any) {
                console.log('Error fetching search results:', error.message);
            }
        }
    }
    return (
        <>

            {/* Mobile Navigation Menu */}
            {showMenu && (
                <div className="absolute top-0 left-0 w-full h-screen bg-primary-foreground z-50 flex flex-col items-center gap-6 pt-16">
                    <X
                        size={24}
                        className="absolute z-10 top-4 right-4 cursor-pointer text-white transition"
                        onClick={() => setShowMenu(false)}
                    />
                    <div className="flex flex-col w-full items-center px-4 gap-6">
                        <Link href="/" className="text-lg border p-2 rounded-md w-full max-w-[300px] text-center text-primary/85 hover:text-primary hover:bg-secondary/90 transition duration-100" onClick={() => setShowMenu(false)}>
                            Home
                        </Link>
                        <Link href="/shop" className="text-lg border p-2 rounded-md w-full max-w-[300px] text-center text-primary/85 hover:text-primary hover:bg-secondary/90 transition duration-100" onClick={() => setShowMenu(false)}>
                            Shop
                        </Link>
                        <Link href="/about" className="text-lg border p-2 rounded-md w-full max-w-[300px] text-center text-primary/85 hover:text-primary hover:bg-secondary/90 transition duration-100" onClick={() => setShowMenu(false)}>
                            About Us
                        </Link>
                        <Link href="/contact" className="text-lg border p-2 rounded-md w-full max-w-[300px] text-center text-primary/85 hover:text-primary hover:bg-secondary/90 transition duration-100" onClick={() => setShowMenu(false)}>
                            Contact Us
                        </Link>
                    </div>

                    {/* Icons for Mobile Navigation */}
                    <div className="sm:hidden flex items-center gap-6 mt-6">
                        <Search
                            className="text-primary/70 cursor-pointer hover:text-primary transition"
                            size={24}
                            onClick={() => {
                                setShowSearch(true);
                                setShowMenu(false);
                            }}
                        />
                        {
                            !user && (
                                <Link
                                    className='sm:hidden flex bg-primary text-secondary px-3 py-[6px] rounded-md shadow-md hover:bg-primary/80 duration-100'
                                    href={'/sign-in'}
                                >
                                    Login
                                </Link>
                            )
                        }
                        {
                            (user && user.type) && (
                                <>
                                    <Link onClick={() => setShowMenu(false)} href={'/my-account/my-wishlist'}>
                                        <HeartIcon className="text-primary/70 cursor-pointer hover:text-primary transition" size={24} />
                                    </Link>
                                    <Link onClick={() => setShowMenu(false)} href={'/my-account/my-cart'}>
                                        <ShoppingBag className="text-primary/70 cursor-pointer hover:text-primary transition" size={24} />
                                    </Link>
                                    <BsPersonCircle
                                        size={24}
                                        className={`${isIconActive('/my-account/personal-information') ? 'text-primary font-bold' : 'text-primary/60 '} sm:flex hidden  cursor-pointer hover:text-primary transition duration-100`}
                                        onClick={() => {
                                            if (user) {
                                                router.push('/my-account/personal-information');
                                            } else {
                                                router.push('/sign-in');
                                            }
                                        }}
                                    />
                                </>
                            )
                        }
                    </div>
                </div>
            )}

            {/* Full-Screen Search Modal */}
            {showSearch && (
                <div className="fixed inset-0 z-50 bg-black/80 flex flex-col py-[60px] items-center ">
                    <X
                        size={28}
                        className="absolute top-4 right-4 text-white cursor-pointer hover:text-white/80 transition"
                        onClick={() => setShowSearch(false)}
                    />
                    <div className="w-full max-w-md px-4">
                        <div className="flex  w-full border rounded-lg overflow-hidden">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchText}
                                onChange={(e) => onChangeText(e)}
                                className="flex-1 px-4 py-3 outline-none text-lg"
                            />
                            <button
                                className="bg-secondary text-primary px-4 py-3 hover:bg-secondary/80 transition"
                                onClick={handleSearch}
                            >
                                Search
                            </button>
                        </div>
                    </div>

                    {/* Searched Items */}
                    <div className='flex flex-col w-full max-w-md mt-4 gap-4 px-4'>
                        {products.map((product) => (
                            <Link onClick={() => setShowSearch(false)} href={`/shop/${product._id}`} key={product._id}>
                                <div className="flex bg-secondary items-center gap-4 p-4 border rounded-lg hover:bg-primary-foreground cursor-pointer transition">
                                    <Image src={product.image}
                                        alt={product.productName}
                                        width={60}
                                        height={60}
                                        className="w-16 h-16 object-contain"
                                    />
                                    <div className="flex flex-col">
                                        <p className="text-lg font-semibold">{product.productName}</p>
                                        <p className="text-primary/70">{product.category}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}



        </>
    )
}

export default SearchProducts