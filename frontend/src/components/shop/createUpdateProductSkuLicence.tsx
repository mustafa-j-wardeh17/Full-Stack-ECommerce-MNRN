'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface CreateUpdateProductSkuFormProps {
    productId: string;
    skuId: string;
    licenseId?: string; // Optional for update operations
    license?: string; // Optional for update operations
}

const CreateUpdateProductSkuLicenseForm: React.FC<CreateUpdateProductSkuFormProps> = ({
    productId,
    skuId,
    licenseId,
    license,
}) => {
    const [licenseKey, setLicenseKey] = useState(license || '');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const isUpdate = Boolean(licenseId); // Determines if it's an update or create

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const endpoint = isUpdate
            ? `${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}/skus/${skuId}/licenses/${licenseId}`
            : `${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}/skus/${skuId}/license`;

        const method = isUpdate ? 'PUT' : 'POST';

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ licenseKey }),
                credentials: 'include',
            });

            if (response.ok) {
                toast.success(`License ${isUpdate ? 'updated' : 'created'} successfully!`);
                router.push(`/shop/product-crud/${productId}/sku/${skuId}/licenses`);
            } else {
                const errorData = await response.json();
                console.error(`Error ${isUpdate ? 'updating' : 'creating'} license:`, errorData);
                toast.error(`Operation failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error(`Error ${isUpdate ? 'updating' : 'creating'} license:`, error);
            toast.error('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-primary-foreground p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-6">
                {isUpdate ? 'Update License' : 'Create License'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* License Key Input */}
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

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-secondary hover:bg-primary/80 font-semibold py-3 rounded-lg shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
                        disabled={loading}
                    >
                        {loading ? (isUpdate ? 'Updating...' : 'Creating...') : (isUpdate ? 'Update License' : 'Create License')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateUpdateProductSkuLicenseForm;
