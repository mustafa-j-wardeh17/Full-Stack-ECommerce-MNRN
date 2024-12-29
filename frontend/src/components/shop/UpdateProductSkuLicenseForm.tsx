'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface UpdateProductSkuLicenseFormProps {
    productId: string;
    skuId: string;
    licenseId: string;
    license: string; // Single license key for update
}

const UpdateProductSkuLicenseForm: React.FC<UpdateProductSkuLicenseFormProps> = ({
    productId,
    skuId,
    licenseId,
    license,
}) => {
    const [licenseKey, setLicenseKey] = useState(license);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const endpoint = `${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}/skus/${skuId}/licenses/${licenseId}`;

        try {
            const response = await fetch(endpoint, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ licenseKey }), // Send a single license key
                credentials: 'include',
            });

            if (response.ok) {
                toast.success('License updated successfully!');
                router.push(`/dashboard/products/${productId}/skus/${skuId}/licenses`);
            } else {
                const errorData = await response.json();
                toast.error(`Operation failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full dark:bg-black bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-6">Update License</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="licenseKey" className="block text-sm font-medium text-primary/80">
                        License Key
                    </label>
                    <input
                        type="text"
                        name="licenseKey"
                        id="licenseKey"
                        value={licenseKey}
                        onChange={(e) => setLicenseKey(e.target.value)}
                        required
                        placeholder="Enter license key"
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-secondary hover:bg-primary/80 font-semibold py-3 rounded-lg shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update License'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProductSkuLicenseForm;
