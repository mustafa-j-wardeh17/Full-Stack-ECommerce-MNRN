'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface CreateProductSkuLicenseFormProps {
    productId: string;
    skuId: string;
}

const CreateProductSkuLicensesForm: React.FC<CreateProductSkuLicenseFormProps> = ({
    productId,
    skuId,
}) => {
    const [licenseKeys, setLicenseKeys] = useState<string[]>(['']);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Function to handle adding a new license key input
    const handleAddLicenseKey = () => {
        setLicenseKeys((prevKeys) => [...prevKeys, '']);
    };

    // Function to handle removing a license key
    const handleRemoveLicenseKey = (index: number) => {
        setLicenseKeys((prevKeys) => prevKeys.filter((_, i) => i !== index));
    };

    // Function to handle the change of each license key
    const handleLicenseKeyChange = (index: number, value: string) => {
        setLicenseKeys((prevKeys) => {
            const newKeys = [...prevKeys];
            newKeys[index] = value;
            return newKeys;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const endpoint = `${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}/skus/${skuId}/license`;

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ licenseKeys }),
                credentials: 'include',
            });

            if (response.ok) {
                toast.success('License created successfully!');
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
            <h2 className="text-2xl font-bold text-primary mb-6">Create License</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {licenseKeys.map((licenseKey, index) => (
                        <div key={index} className="flex-1">
                            <label htmlFor={`licenseKey-${index}`} className="block text-sm font-medium text-primary/80">
                                License Key {index + 1}
                            </label>
                            <div className='flex   items-center space-x-2'>
                                <input
                                    type="text"
                                    name={`licenseKey-${index}`}
                                    id={`licenseKey-${index}`}
                                    value={licenseKey}
                                    onChange={(e) => handleLicenseKeyChange(index, e.target.value)}
                                    required
                                    placeholder="Enter license key"
                                    className="mt-2 flex-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                                />
                                <button
                                    type="button"
                                    className="text-red-500 "
                                    onClick={() => handleRemoveLicenseKey(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>

                ))}

                <div className="flex justify-between items-center">
                    <button
                        type="button"
                        className="text-primary underline"
                        onClick={handleAddLicenseKey}
                    >
                        Add Another License Key
                    </button>
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-secondary hover:bg-primary/80 font-semibold py-3 rounded-lg shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : 'Create License'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProductSkuLicensesForm;
