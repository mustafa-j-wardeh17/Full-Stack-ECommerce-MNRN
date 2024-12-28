'use client';

import { baseType, categoryType, platformType } from '@/util/constant';
import { HttpResponse, Product } from '@/util/types';
import { DeleteIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosArrowDown } from 'react-icons/io';


const CreateUpdateProduct = ({ type = 'create', product = null }: { type?: 'create' | 'update', product?: Product | null }) => {
    const router = useRouter();
    const [form, setForm] = useState({
        productName: product?.productName || '',
        description: product?.description || '',
        category: product?.category || categoryType.ApplicationSoftware, // Default category
        platformType: product?.platformType || platformType.Windows, // Default platform
        baseType: product?.baseType || baseType.Computer, // Default base type
        productUrl: product?.productUrl || '',
        downloadUrl: product?.downloadUrl || '',
        requirementSpecification: product?.requirementSpecification || [],
        highlights: product?.highlights || [''],
        hasLicenses: product?.hasLicenses || false
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRequirementChange = (index: number, key: string, value: string) => {
        const updatedSpecifications = [...form.requirementSpecification];
        updatedSpecifications[index] = {
            ...updatedSpecifications[index],
            [key]: value,
        };
        setForm((prev) => ({ ...prev, requirementSpecification: updatedSpecifications }));
    };
    const handleHighlightChange = (index: number, value: string) => {
        const updatedHighlights = [...form.highlights];
        updatedHighlights[index] = value;
        setForm((prev) => ({ ...prev, highlights: updatedHighlights }));
    };

    const addRequirement = () => {
        setForm((prev) => ({
            ...prev,
            requirementSpecification: [...prev.requirementSpecification, { key: '', value: '' }],
        }));
    };

    const removeRequirement = (index: number) => {
        const updatedSpecifications = [...form.requirementSpecification];
        updatedSpecifications.splice(index, 1);
        setForm((prev) => ({ ...prev, requirementSpecification: updatedSpecifications }));
    };

    const addHighlight = () => {
        setForm((prev) => ({
            ...prev,
            highlights: [...prev.highlights, ''],
        }));
    };

    const removeHighlight = (index: number) => {
        const updatedHighlights = [...form.highlights];
        updatedHighlights.splice(index, 1);
        setForm((prev) => ({ ...prev, highlights: updatedHighlights }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);


        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products${type === 'update' ? `/${product?._id}` : ''}`, {
                method: type === 'create' ? 'POST' : 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
                credentials: 'include'
            });

            if (response.ok) {
                toast.success(`Product ${type === 'update' ? 'updated' : 'created'} successfully!`);
                setForm({
                    productName: '',
                    description: '',
                    category: categoryType.ApplicationSoftware,
                    platformType: platformType.Windows,
                    baseType: baseType.Computer,
                    productUrl: '',
                    downloadUrl: '',
                    requirementSpecification: [{ key: '', value: '' }],
                    highlights: [''],
                    hasLicenses: false
                });
                if (type === 'create') {
                    const result: HttpResponse = await response.json();
                    router.push(`/shop/${result.result.product._id}`);
                } else {
                    router.push(`/shop/${product?._id}`);
                }
            } else {
                const errorData = await response.json();
                toast.error(`Failed to ${type === 'update' ? 'update' : 'create'} product: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            toast.error('An error occurred while creating the product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full overflow-hidden bg-primary-foreground">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Details */}
                <div>
                    <label htmlFor="productName" className="block text-sm font-medium text-primary/80">
                        Product Name
                    </label>
                    <input
                        type="text"
                        name="productName"
                        id="productName"
                        value={form.productName}
                        onChange={handleInputChange}
                        className="mt-2 block w-full p-3 border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-primary/80">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        value={form.description}
                        onChange={handleInputChange}
                        className="mt-2 block w-full p-3 border rounded-md"
                        rows={4}
                        required
                    />
                </div>

                {/* Category */}
                <div className="relative">
                    <label htmlFor="category" className="block text-sm font-medium text-primary/80">
                        Category
                    </label>
                    <div className='relative mt-2 block w-full rounded-md'>
                        <select
                            name="category"
                            id="category"
                            value={form.category}
                            onChange={handleInputChange}
                            className="mt-2 block w-full relative p-3 border rounded-md appearance-none"
                            required
                        >

                            {Object.values(categoryType).map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                        {/* Custom Arrow Icon */}
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <IoIosArrowDown size={20} />
                        </div>
                    </div>


                </div>

                {/* Platform Type */}
                <div>
                    <label htmlFor="platformType" className="block text-sm font-medium text-primary/80">
                        Platform Type
                    </label>

                    <div className='relative mt-2 block w-full rounded-md'>
                        <select
                            name="platformType"
                            id="platformType"
                            value={form.platformType}
                            onChange={handleInputChange}
                            className="mt-2 block w-full relative p-3 border rounded-md appearance-none"
                            required
                        >
                            {Object.values(platformType).map((platform) => (
                                <option key={platform} value={platform}>
                                    {platform}
                                </option>
                            ))}
                        </select>
                        {/* Custom Arrow Icon */}
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <IoIosArrowDown size={20} />
                        </div>
                    </div>
                </div>

                {/* Base Type */}
                <div>
                    <label htmlFor="baseType" className="block text-sm font-medium text-primary/80">
                        Base Type
                    </label>
                    <div className='relative mt-2 block w-full rounded-md'>
                        <select
                            name="baseType"
                            id="baseType"
                            value={form.baseType}
                            onChange={handleInputChange}
                            className="mt-2 block w-full p-3 border rounded-md appearance-none"
                            required
                        >
                            {Object.values(baseType).map((base) => (
                                <option key={base} value={base}>
                                    {base}
                                </option>
                            ))}
                        </select>
                        {/* Custom Arrow Icon */}
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                            <IoIosArrowDown size={20} />
                        </div>
                    </div>
                </div>

                {/* Other fields */}
                <div>
                    <label htmlFor="productUrl" className="block text-sm font-medium text-primary/80">
                        Product URL
                    </label>
                    <input
                        type="url"
                        name="productUrl"
                        id="productUrl"
                        value={form.productUrl}
                        onChange={handleInputChange}
                        className="mt-2 block w-full p-3 border rounded-md"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="downloadUrl" className="block text-sm font-medium text-primary/80">
                        Download URL
                    </label>
                    <input
                        type="url"
                        name="downloadUrl"
                        id="downloadUrl"
                        value={form.downloadUrl}
                        onChange={handleInputChange}
                        className="mt-2 block w-full p-3 border rounded-md"
                        required
                    />
                </div>
                <div className='flex items-center gap-2'>
                    <label htmlFor="hasLicenses" className="font-bold text-sm text-primary/80">
                        Has Licenses
                    </label>
                    <input
                        type="checkbox"
                        name="hasLicenses"
                        id="hasLicenses"
                        checked={form.hasLicenses}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                hasLicenses: e.target.checked,
                            }))
                        }
                        className="mt-2 w-6 h-6 border rounded-md"
                    />
                </div>

                {/* Dynamic Requirement Specification */}
                <div>
                    <label className="block text-sm font-medium text-primary/80">Requirement Specification</label>
                    {form.requirementSpecification.map((req, index) => (
                        <div key={index} className="space-y-2 mt-4 border p-4 rounded-md">
                            {Object.entries(req).map(([key, value], keyIndex) => (
                                <div key={keyIndex} className="flex space-x-2">
                                    <input
                                        type="text"
                                        placeholder="Key"
                                        value={key}
                                        onChange={(e) => {
                                            const newKey = e.target.value;
                                            const updatedSpecifications = [...form.requirementSpecification];
                                            const currentSpec = updatedSpecifications[index];
                                            delete currentSpec[key]; // Remove the old key
                                            updatedSpecifications[index] = {
                                                ...currentSpec,
                                                [newKey]: value,
                                            };
                                            setForm((prev) => ({
                                                ...prev,
                                                requirementSpecification: updatedSpecifications,
                                            }));
                                        }}
                                        className="sm:flex-1 w-1/2 p-2 border rounded-md"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={value}
                                        onChange={(e) =>
                                            handleRequirementChange(index, key, e.target.value)
                                        }
                                        className="sm:flex-1 w-1/2 p-2 border rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updatedSpecifications = [...form.requirementSpecification];
                                            const currentSpec = updatedSpecifications[index];
                                            delete currentSpec[key]; // Remove the key
                                            updatedSpecifications[index] = { ...currentSpec };
                                            setForm((prev) => ({
                                                ...prev,
                                                requirementSpecification: updatedSpecifications,
                                            }));
                                        }}
                                        className="text-red-500"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            ))}
                            <div className='flex flex-wrap gap-2'>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updatedSpecifications = [...form.requirementSpecification];
                                        updatedSpecifications[index] = {
                                            ...updatedSpecifications[index],
                                            '': '', // Add a new empty key-value pair
                                        };
                                        setForm((prev) => ({
                                            ...prev,
                                            requirementSpecification: updatedSpecifications,
                                        }));
                                    }}
                                    className="mt-2 text-primary underline"
                                >
                                    Add Key
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        const updatedSpecifications = [...form.requirementSpecification];
                                        updatedSpecifications.splice(index, 1);
                                        setForm((prev) => ({
                                            ...prev,
                                            requirementSpecification: updatedSpecifications,
                                        }));
                                    }}
                                    className="mt-2 text-red-500 underline"
                                >
                                    Remove Specification
                                </button>
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() => {
                            setForm((prev) => ({
                                ...prev,
                                requirementSpecification: [...prev.requirementSpecification, {}], // Add a new empty object
                            }));
                        }}
                        className="mt-4 text-primary underline"
                    >
                        Add Specification
                    </button>
                </div>


                {/* Highlights */}
                <div>
                    <label className="block text-sm font-medium text-primary/80">Highlights</label>
                    {form.highlights.map((highlight, index) => (
                        <div key={index} className="flex space-x-2 mt-2">
                            <input
                                type="text"
                                value={highlight}
                                onChange={(e) => handleHighlightChange(index, e.target.value)}
                                className="flex-1 p-2 border rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => removeHighlight(index)}
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addHighlight}
                        className="mt-2 text-primary underline"
                    >
                        Add Highlight
                    </button>
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-primary text-secondary hover:bg-primary/80 font-semibold py-3 rounded-lg shadow-md"
                        disabled={loading}
                    >
                        {loading ? `${type === 'create' ? 'Creating...' : 'Updatinging...'}` : `${type === 'create' ? 'Create Product' : 'Update Product'}`}
                    </button>
                </div>
            </form >
        </div >
    );
};

export default CreateUpdateProduct;
