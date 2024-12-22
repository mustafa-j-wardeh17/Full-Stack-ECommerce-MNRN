'use client';

import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {
    const productId = useParams().productId || '';
    const [productImage, setProductImage] = useState<File | null>(null);
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
                router.push(`/shop/${productId}`);
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
        <div className="w-full bg-primary-foreground p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-primary mb-6">Upload Product Image</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Input */}
                <div>
                    <label htmlFor="productImage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Product Image
                    </label>
                    <input
                        type="file"
                        name="productImage"
                        id="productImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-2 block w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary"
                        required
                    />
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
    );
};

export default Page;
