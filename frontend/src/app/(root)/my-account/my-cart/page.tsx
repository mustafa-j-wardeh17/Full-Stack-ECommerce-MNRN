'use client';

import { useUserContext } from '@/context';
import { Cart, GetCartItemsResponse, UpdateCartItemResponse } from '@/util/types';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';



const CartPage = () => {
    const [cartItems, setCartItems] = useState<Cart[]>([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUserContext()
    const router = useRouter()
    // Fetch cart items
    const fetchCartItems = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/cart/user/${user?.id}`, {
                method: 'GET',
                credentials: 'include',
            });
            if (response.ok) {
                const data: GetCartItemsResponse = await response.json();
                console.log('cart data====>', data.result.cart)
                setCartItems(data.result.cart);
            } else {
                console.error('Failed to fetch cart items:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching cart items:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle removing a cart item
    const handleRemoveItem = async (id: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/cart/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
                toast.success('Item deleted successfully from the cart')
            } else {
                console.error('Failed to remove cart item:', response.statusText);
            }
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    // Handle updating item quantity
    const handleUpdateQuantity = async (id: string, quantity: number) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/cart/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ quantity }),
            });
            if (response.ok) {
                const data: UpdateCartItemResponse = await response.json();
                console.log('data from server', data)

                const updatedItem = data.result
                console.log('updated cart item', updatedItem)
                setCartItems((prevItems) =>
                    prevItems.map((item) => (item._id === id ? updatedItem : item))
                );
            } else {
                console.error('Failed to update cart item:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating cart item:', error);
        }
    };

    // Clear the cart
    const handleClearCart = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/cart/user/clear`, {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                setCartItems([]);
                toast.success('The cart was unloaded successfully.')
            } else {
                console.error('Failed to clear cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
        }
    };

    useEffect(() => {
        fetchCartItems();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center justify-between border p-4 rounded-md shadow-md"
                        >
                            <div className='flex gap-2'>
                                <Image
                                    src={item.productImage}
                                    alt={item.skuId}
                                    width={60}
                                    height={60}
                                />
                                <div>
                                    <h2 className="font-semibold">{item.productName}</h2>
                                    <p>SKU: {item.skuKey}</p>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>Price: ${item.skuPrice}</p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className="px-2 py-1 bg-gray-200 rounded-md"
                                >
                                    -
                                </button>
                                <p>{item.quantity}</p>
                                <button
                                    onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                    className="px-2 py-1 bg-gray-200 rounded-md"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => handleRemoveItem(item._id)}
                                    className="px-4 py-1 bg-red-500 text-white rounded-md"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div>
                        <button
                            onClick={handleClearCart}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                            Clear Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
