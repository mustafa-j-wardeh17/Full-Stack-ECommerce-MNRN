'use client';

import { useUserContext } from '@/context';
import { Cart, CheckoutSelectedCartItemResponse, GetCartItemsResponse, UpdateCartItemResponse } from '@/util/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CartPage = () => {
    const [cartItems, setCartItems] = useState<Cart[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set()); // For tracking selected items
    const { user } = useUserContext();
    const router = useRouter();

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
                setSelectedItems((prevSelected) => {
                    const newSelected = new Set(prevSelected);
                    newSelected.delete(id);
                    return newSelected;
                });
                toast.success('Item deleted successfully from the cart');
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
                const updatedItem = data.result;
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

    // Handle selecting a product
    const handleSelectProduct = (id: string, isChecked: boolean) => {
        setSelectedItems((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (isChecked) {
                newSelected.add(id);
            } else {
                newSelected.delete(id);
            }
            return newSelected;
        });
    };

    // Handle selecting all products
    const handleSelectAll = (isChecked: boolean) => {
        setSelectedItems((prevSelected) => {
            if (isChecked) {
                const allItemIds = new Set(cartItems.map((item) => item._id));
                return allItemIds;
            } else {
                return new Set();
            }
        });
    };

    // Handle checkout for selected items
    const handleCheckout = async () => {
        if (selectedItems.size === 0) {
            toast.error('Please select at least one item to checkout.');
            return;
        }

        // Extract the necessary details (skuPriceId, quantity, skuId) from selected items
        const checkoutItems = cartItems
            .filter(item => selectedItems.has(item._id)) // Filter items that are selected
            .map(item => ({
                skuPriceId: item.skuPriceId, // Assuming this field exists in the cart item
                quantity: item.quantity,
                skuId: item.skuId,
                productId: item.productId,
                productImage: item.productImage
            }));

        // Prepare the body for the checkout request
        const requestBody = {
            checkoutDetails: checkoutItems,
        };

        console.log('selected items ===>', Array.from(selectedItems))

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/orders/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
                credentials: 'include', // Assuming the user is logged in and you need cookies or session
            });

            if (response.ok) {
                const data: CheckoutSelectedCartItemResponse = await response.json();
                // Optionally, redirect the user to a confirmation page or order summary
                localStorage.setItem('orders', JSON.stringify({ cart: Array.from(selectedItems) }));
                router.push(data.result); // Example redirect, change as needed
            } else {
                const errorData = await response.json();
                console.log('failed checkout ===>', errorData)
                toast.error(`Checkout failed: ${errorData.message || 'Unknown error'}`);
                console.error('Checkout error:', errorData);
            }
        } catch (error:any) {
            toast.error('Error during checkout:', error.message);
        }
    };


    // Clear the cart
    const handleClearSelectedItemsFromCart = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/cart/user/${user?.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cartIds: Array.from(selectedItems),
                }),
                credentials: 'include',
            });
            if (response.ok) {
                setCartItems([]);
                setSelectedItems(new Set()); // Clear the selected items as well
                toast.success('The cart was unloaded successfully.');
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
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-primary">My Cart</h1>
            {cartItems.length === 0 ? (
                <div className='w-full flex flex-col gap-4 items-center justify-center'>
                    <p className="text-gray-500 text-center text-lg font-medium">
                        Your cart is empty. Start adding your favorite items!
                    </p>
                    <Link href="/shop" className="">
                        <span className="text-center text-blue-500 underline">Shop Now</span>
                    </Link>
                </div>
            ) : (

                <div className="space-y-6">
                    <div className="flex items-center my-12 ml-4">
                        <input
                            type="checkbox"
                            checked={cartItems.length === selectedItems.size}
                            onChange={(e) => handleSelectAll(e.target.checked)}
                            className="w-4 h-4 border-primary rounded-md"
                        />
                        <span className="ml-2 text-primary">Select All</span>
                    </div>
                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center gap-4 sm:flex-row flex-col justify-between bg-surface shadow-lg p-4 rounded-lg"
                        >
                            <div className="flex w-full items-center gap-4">
                                <input
                                    type="checkbox"
                                    checked={selectedItems.has(item._id)}
                                    onChange={(e) => handleSelectProduct(item._id, e.target.checked)}
                                    className="w-4 h-4 border-primary rounded-md"
                                />
                                <Image
                                    src={item.productImage}
                                    alt={item.skuId}
                                    width={60}
                                    height={60}
                                    className="rounded-md"
                                />
                                <div>
                                    <h2 className="font-semibold text-primary text-lg">{item.productName}</h2>
                                    <p className="text-sm text-primary/70">SKU: {item.skuKey}</p>
                                    <p className="text-sm text-primary/70">Price: ${item.skuPrice}</p>
                                </div>
                            </div>
                            <div className="flex w-full justify-end items-center gap-3">
                                <button
                                    onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                    className={`${item.quantity <= 1 && 'cursor-not-allowed'} px-3 py-2 bg-primary hover:bg-primary/90 hover:shadow-sm hover:shadow-primary text-secondary rounded-lg disabled:opacity-50`}
                                >
                                    -
                                </button>
                                <p className="text-primary font-semibold">{item.quantity}</p>
                                <button
                                    onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                                    className="px-3 py-2 bg-primary hover:bg-primary/90 text-secondary rounded-lg"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => handleRemoveItem(item._id)}
                                    className="px-4 py-2 bg-primary hover:bg-primary/80 text-secondary rounded-lg"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    {/* Checkout Section */}
                    <div className="flex justify-between items-center pt-8">
                        <button
                            onClick={handleClearSelectedItemsFromCart}
                            className="px-6 py-2 bg-red-600 hover:bg-red-600/80 font-bold shadow-md text-secondary rounded-lg "
                        >
                            Clear Cart
                        </button>
                        <button
                            onClick={handleCheckout}
                            className="px-6 py-2 bg-primary hover:bg-primary/80 shadow-md text-secondary rounded-lg font-medium"
                        >
                            Checkout
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
};

export default CartPage;
