'use client';

import DynamicLink from '@/components/Dashboard/DynamicLink';
import PageWrapper from '@/components/Dashboard/pageWrapper';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCloudUploadAlt } from 'react-icons/fa';

const Page = () => {
    const productId = useParams().productId || '';
    const [productImage, setProductImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const maxSize = 3 * 1024 * 1024; // 3MB

            if (file.size > maxSize) {
                toast.error('File size exceeds 3MB.');
                return;
            }

            if (!file.type.startsWith('image/')) {
                toast.error('Please upload a valid image file.');
                return;
            }

            setProductImage(file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!productImage) {
            toast.error('Please select an image to upload.');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('productImage', productImage);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}/image`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (response.ok) {
                toast.success('Image uploaded successfully!');
                setPreviewImage(null)
                setProductImage(null)
            } else {
                const errorData = await response.json();
                console.log('Error uploading image:', errorData);
                toast.error(`Upload failed: ${errorData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('An error occurred while uploading the image. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageWrapper title='Update Product Image'>
            <DynamicLink
                label='Back'
                url={`/dashboard/products`}
            />
            <div className="w-full bg-primary-foreground rounded-lg shadow-lg md:p-10 p-5">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* File Input with Preview */}
                    <div>
                        <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Product Image
                        </label>
                        <div className="mt-2 flex justify-center items-center w-full lg:h-[500px] h-[300px] border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-md relative">
                            {previewImage ? (
                                <Image
                                    src={previewImage}
                                    alt="Preview"
                                    fill
                                    className=" w-full h-full rounded-md"
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center text-gray-400">
                                    <FaCloudUploadAlt size={50} />
                                    <p className="text-sm">Click to upload or drag and drop</p>
                                </div>
                            )}
                            <input
                                type="file"
                                name="productImage"
                                id="productImage"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-secondary hover:bg-primary/80 font-semibold py-3 rounded-lg shadow-md focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Uploading...' : 'Upload Image'}
                        </button>
                    </div>
                </form>
            </div>
        </PageWrapper>
    );
};

export default Page;
