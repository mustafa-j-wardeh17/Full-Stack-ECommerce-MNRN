import { Product, ProductsResponse } from '@/util/types';
import { HeartIcon, Search, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react'
import { BsPersonCircle } from 'react-icons/bs';
import { Separator } from '../ui/separator';
import { usePathname } from 'next/navigation';

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
    const pathname = usePathname()
    const [products, setProducts] = React.useState<Product[]>([]);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showMenu) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.body.style.overflow = 'auto'; // Ensure scroll is re-enabled when the component is unmounted
        };
    }, [showMenu]);

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
                <div ref={menuRef} className="fixed top-0 border-l sm:shadow-lg p-2 right-0 md:w-2/5 sm:w-1/2 md:shadow-md w-full h-screen bg-primary-foreground  z-50 flex flex-col items-center gap-6 pt-16">
                    <X
                        size={24}
                        className="absolute z-50 top-4 right-4 cursor-pointer border-2 rounded-md hover:bg-primary/10 text-primary hover:text-primary/80 transition"
                        onClick={() => setShowMenu(false)}
                    />
                    <h1 className="text-3xl font-extrabold text-sky-800 dark:text-sky-500  ">ByteVault</h1>
                    <Separator className='my-4' />
                    <div className="flex flex-col w-full items-center px-4 gap-6">
                        <Link href="/" className={`text-lg border p-2 rounded-md w-full max-w-[240px] text-center  ${pathname === '/' ? 'border-primary bg-primary text-secondary shadow-md' : 'text-primary/85 '} hover:text-secondary hover:border-primary hover:bg-primary  hover:shadow-md transition duration-200`}
                            onClick={() => setShowMenu(false)}
                        >
                            Home
                        </Link>
                        <Link href="/shop" className={`text-lg border p-2 rounded-md w-full max-w-[240px] text-center  ${pathname === '/shop' ? 'border-primary bg-primary text-secondary shadow-md' : 'text-primary/85 '} hover:text-secondary hover:border-primary hover:bg-primary  hover:shadow-md transition duration-200`}
                            onClick={() => setShowMenu(false)}
                        >
                            Shop
                        </Link>
                        <Link href="/about-us" className={`text-lg border p-2 rounded-md w-full max-w-[240px] text-center  ${pathname === '/about-us' ? 'border-primary bg-primary text-secondary shadow-md' : 'text-primary/85 '} hover:text-secondary hover:border-primary hover:bg-primary  hover:shadow-md transition duration-200`}
                            onClick={() => setShowMenu(false)}
                        >
                            About Us
                        </Link>
                        <Link href="/contact" className={`text-lg border p-2 rounded-md w-full max-w-[240px] text-center  ${pathname === '/contact' ? 'border-primary bg-primary text-secondary shadow-md' : 'text-primary/85 '} hover:text-secondary hover:border-primary hover:bg-primary  hover:shadow-md transition duration-200`}
                            onClick={() => setShowMenu(false)}
                        >
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

export default SearchProducts;
