'use client';

import React, { useState } from 'react';
import toast from 'react-hot-toast';

// Enums for dropdowns
enum CategoryType {
    OperatingSystem = 'Operating System',
    ApplicationSoftware = 'Application Software',
}

enum PlatformType {
    Windows = 'Windows',
    Mac = 'Mac',
    Linux = 'Linux',
    Android = 'Android',
    IOS = 'iOS',
}

enum BaseType {
    Computer = 'Computer',
    Mobile = 'Mobile',
}

const CreateProduct = () => {
    const [form, setForm] = useState({
        productName: '',
        description: '',
        category: CategoryType.ApplicationSoftware, // Default category
        platformType: PlatformType.Windows, // Default platform
        baseType: BaseType.Computer, // Default base type
        productUrl: '',
        downloadUrl: '',
        requirementSpecification: [{ key: '', value: '' }],
        highlights: [''],
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleRequirementChange = (index: number, field: string, value: string) => {
        const updatedSpecifications = [...form.requirementSpecification];
        updatedSpecifications[index] = { ...updatedSpecifications[index], [field]: value };
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
                credentials:'include'
            });

            if (response.ok) {
                toast.success('Product created successfully!');
                setForm({
                    productName: '',
                    description: '',
                    category: CategoryType.ApplicationSoftware,
                    platformType: PlatformType.Windows,
                    baseType: BaseType.Computer,
                    productUrl: '',
                    downloadUrl: '',
                    requirementSpecification: [{ key: '', value: '' }],
                    highlights: [''],
                });
            } else {
                const errorData = await response.json();
                toast.error(`Failed to create product: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            toast.error('An error occurred while creating the product.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full bg-primary-foreground p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-6">Create Product</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Details */}
                <div>
                    <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
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
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
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
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        name="category"
                        id="category"
                        value={form.category}
                        onChange={handleInputChange}
                        className="mt-2 block w-full p-3 border rounded-md"
                        required
                    >
                        {Object.values(CategoryType).map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Platform Type */}
                <div>
                    <label htmlFor="platformType" className="block text-sm font-medium text-gray-700">
                        Platform Type
                    </label>
                    <select
                        name="platformType"
                        id="platformType"
                        value={form.platformType}
                        onChange={handleInputChange}
                        className="mt-2 block w-full p-3 border rounded-md"
                        required
                    >
                        {Object.values(PlatformType).map((platform) => (
                            <option key={platform} value={platform}>
                                {platform}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Base Type */}
                <div>
                    <label htmlFor="baseType" className="block text-sm font-medium text-gray-700">
                        Base Type
                    </label>
                    <select
                        name="baseType"
                        id="baseType"
                        value={form.baseType}
                        onChange={handleInputChange}
                        className="mt-2 block w-full p-3 border rounded-md"
                        required
                    >
                        {Object.values(BaseType).map((base) => (
                            <option key={base} value={base}>
                                {base}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Other fields */}
                <div>
                    <label htmlFor="productUrl" className="block text-sm font-medium text-gray-700">
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
                    <label htmlFor="downloadUrl" className="block text-sm font-medium text-gray-700">
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

                {/* Dynamic Requirement Specification */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Requirement Specification</label>
                    {form.requirementSpecification.map((req, index) => (
                        <div key={index} className="flex space-x-2 mt-2">
                            <input
                                type="text"
                                placeholder="Key"
                                value={req.key}
                                onChange={(e) => handleRequirementChange(index, 'key', e.target.value)}
                                className="flex-1 p-2 border rounded-md"
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={req.value}
                                onChange={(e) => handleRequirementChange(index, 'value', e.target.value)}
                                className="flex-1 p-2 border rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => removeRequirement(index)}
                                className="text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addRequirement}
                        className="mt-2 text-primary underline"
                    >
                        Add Requirement
                    </button>
                </div>

                {/* Highlights */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Highlights</label>
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
                        {loading ? 'Creating...' : 'Create Product'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;
