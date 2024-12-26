'use client';

import { SkuDetail } from '@/util/types';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const UpdateProductSkuForm = ({
    productId,
    skuId,
    skuData,
}: {
    productId: string;
    skuId: string;
    skuData: SkuDetail | undefined,
}) => {

    const router = useRouter()
    const params = useParams()

    const [formData, setFormData] = useState({
        skuName: skuData?.skuName || '',
        price: skuData?.price || 0,
        validity: skuData?.validity || 0,
        lifetime: skuData?.lifetime || false,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? parseFloat(value) : value,
        });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}/skus/${skuId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                    credentials: 'include',
                }
            );

            if (response.ok) {
                toast.success('SKU updated successfully!');
                router.push(`/dashboard/products/${params.productId}/skus`)
            } else {
                const errorData = await response.json();
                console.error('Error updating SKU:', errorData);
                toast.error(`Update failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error updating SKU:', error);
            toast.error('An error occurred while updating the SKU. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full dark:bg-black bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-6">Update Product SKU</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* SKU Name */}
                <div>
                    <label htmlFor="skuName" className="block text-sm font-medium text-primary/80">
                        SKU Name
                    </label>
                    <input
                        type="text"
                        name="skuName"
                        id="skuName"
                        value={formData.skuName}
                        onChange={handleChange}
                        required
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    />
                </div>

                {/* Price */}
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-primary/80">
                        Price
                    </label>
                    <input
                        type="number"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    />
                </div>

                {/* Validity */}
                <div>
                    <label htmlFor="validity" className="block text-sm font-medium text-primary/80">
                        Validity (days)
                    </label>
                    <input
                        type="number"
                        name="validity"
                        id="validity"
                        value={formData.validity}
                        onChange={handleChange}
                        required
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    />
                </div>

                {/* Lifetime */}
                <div className="flex items-center space-x-3">
                    <label htmlFor="lifetime" className="block text-sm font-medium text-primary/80">
                        Lifetime
                    </label>
                    <input
                        type="checkbox"
                        name="lifetime"
                        id="lifetime"
                        checked={formData.lifetime}
                        onChange={handleCheckboxChange}
                        className="mt-1"
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-secondary hover:bg-primary/80 font-semibold py-3 rounded-lg shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update SKU'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProductSkuForm;
