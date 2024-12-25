'use client';

import { useUserContext } from '@/context';
import { Cart, CheckoutSelectedCartItemResponse, GetCartItemsResponse, UpdateCartItemResponse } from '@/util/types';
import Image from 'next/image';
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
        }));

    // Prepare the body for the checkout request
    const requestBody = {
        checkoutDetails: checkoutItems,
    };

    try {
        const response = await fetch('http://localhost:3100/api/v1/orders/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
            credentials: 'include', // Assuming the user is logged in and you need cookies or session
        });

        if (response.ok) {
            const data:CheckoutSelectedCartItemResponse = await response.json();
            // Optionally, redirect the user to a confirmation page or order summary
            router.push(data.result); // Example redirect, change as needed
        } else {
            const errorData = await response.json();
            toast.error(`Checkout failed: ${errorData.message || 'Unknown error'}`);
            console.error('Checkout error:', errorData);
        }
    } catch (error) {
        toast.error('An error occurred during checkout.');
        console.error('Error during checkout:', error);
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
            <h1 className="text-3xl font-bold mb-6 text-primary">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-secondary">Your cart is empty.</p>
            ) : (
                <div className="space-y-6">
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
                    <div className="flex justify-between items-center pt-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                checked={cartItems.length === selectedItems.size}
                                onChange={(e) => handleSelectAll(e.target.checked)}
                                className="w-4 h-4 border-primary rounded-md"
                            />
                            <span className="ml-2 text-primary">Select All</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="px-6 py-2 bg-primary hover:bg-primary/80 shadow-md text-secondary rounded-lg font-medium"
                        >
                            Checkout
                        </button>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleClearCart}
                            className="px-6 py-2 bg-primary hover:bg-primary/80 shadow-md text-secondary rounded-lg font-medium"
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
