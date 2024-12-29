'use client';

import { baseType, categoryType, platformType } from '@/util/constant';
import { HttpResponse, Product } from '@/util/types';
import { DeleteIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import toast from 'react-hot-toast';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

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
        <div className="w-full overflow-hidden bg-white dark:bg-black p-6 rounded-md shadow-md">
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
                <ComboboxField
                    label="Category"
                    name="category"
                    options={categoryType}
                    value={form.category}
                    onChange={handleInputChange}
                />


                {/* Platform Type */}
                <ComboboxField
                    label="Platform Type"
                    name="platformType"
                    options={platformType}
                    value={form.platformType}
                    onChange={handleInputChange}
                />

                {/* Base Type */}
                <ComboboxField
                    label="Base Type"
                    name="baseType"
                    options={baseType}
                    value={form.baseType}
                    onChange={handleInputChange}
                />

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

interface ComboboxFieldProps {
    label: string;
    name: string;
    options: Record<string, string>;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}
const ComboboxField = ({ label, name, options, value, onChange }: ComboboxFieldProps) => {
    const [open, setOpen] = useState(false);
    const handleSelect = (selectedValue: string) => {
        const event = {
            target: {
                name,
                value: selectedValue,
            },
        } as ChangeEvent<HTMLInputElement | HTMLSelectElement>;

        onChange(event);
        setOpen(false);
    };
    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-primary/80">
                {label}
            </label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="mt-2 h-[50px] border dark:bg-[#141414] w-full justify-between"
                    >
                        {value || `Select ${label}`}
                        <ChevronsUpDown className="opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                    <Command>
                        <CommandInput placeholder={`Search ${label}...`} className="h-9" />
                        <CommandList>
                            <CommandEmpty>No {label} found.</CommandEmpty>
                            <CommandGroup>
                                {Object.values(options).map((option) => (
                                    <CommandItem key={option} onSelect={() => handleSelect(option)}>
                                        {option}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                value === option ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    );
};

export default CreateUpdateProduct;
