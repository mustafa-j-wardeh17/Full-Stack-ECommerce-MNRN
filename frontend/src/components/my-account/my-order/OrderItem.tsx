import { Order } from '@/util/types';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const OrderItem = ({ order }: { order: Order }) => {
    console.log(order)

    return (
        <div className="flex flex-col gap-8 w-full">
            {order.orderedItems.map((item, idx) => {
                // Calculate total price for the specific item
                const itemTotalPrice = ((+item.price) * +item.quantity).toFixed(2);

                return (
                    <div
                        key={idx}
                        className="flex flex-col gap-6 w-full p-4 border border-gray-200 rounded-lg shadow-sm"
                    >
                        {/* Order Details */}
                        <div className="flex flex-wrap lg:flex-nowrap gap-6 w-full">
                            <div className="flex items-center gap-6 w-full 2xl:w-2/3 lg:w-3/5">
                                <Image
                                    src={item.productImage}
                                    alt={item.productName || "Product"}
                                    width={80}
                                    height={80}
                                    className="rounded-lg object-cover shadow-sm"
                                />
                                <div className="flex flex-col gap-1">
                                    <h2 className="font-bold sm:text-lg text-md">{item.productName}</h2>
                                    <p className="sm:text-sm text-xs text-gray-600">SKU: {item.skuCode}</p>
                                    <p className="sm:text-sm text-xs text-gray-600">
                                        Quantity: {item.quantity}
                                    </p>
                                    <p className="sm:text-sm text-xs text-gray-600">
                                        Price per item: ${(+item.price).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end lg:items-start justify-between gap-2 w-full 2xl:w-1/3 lg:w-2/5">
                                <h2 className="font-bold lg:text-xl md:text-lg sm:text-md text-sm text-primary">
                                    Total: ${itemTotalPrice}
                                </h2>
                                <div className="flex flex-row md:w-[280px] w-full items-center sm:items-start gap-4">
                                    <button
                                        className="md:w-[120px]  text-xs w-full text-center px-3 py-2 sm:text-sm font-medium border rounded-md text-primary hover:bg-primary-foreground hover:text-primary/70 transition duration-200"
                                    >
                                        View Order
                                    </button>
                                    {order.orderStatus === "completed" && (
                                        <Link
                                            href={`/shop/${item.productId}`}
                                            className="md:w-[120px]  text-xs w-full text-center px-3 py-2 sm:text-sm font-medium text-secondary bg-primary rounded-md hover:bg-primary/70 transition duration-200"
                                        >
                                            Write A Review
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Status Section */}
                        <div className="flex items-center gap-4">
                            <span
                                className={`px-3 py-1 text-sm font-semibold rounded-md ${order.orderStatus === "completed"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-yellow-100 text-yellow-600"
                                    }`}
                            >
                                {Object.hasOwn(item,'lifetime') ? "Delivered" : "In Process"}
                            </span>
                            <p className="sm:text-sm text-xs text-gray-600">
                                {order.orderStatus === "completed"
                                    ? "Your product has been delivered."
                                    : "Your product is being processed."}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default OrderItem;
