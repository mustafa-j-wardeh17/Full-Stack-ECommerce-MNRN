'use client'
import { useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";

const DeleteProductButton = ({ productId }: { productId: string }) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const handleDeleteProduct = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`Failed to delete product: ${response.statusText}`);
            }
            toast.success('Product deleted successfully');
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete product. Please try again later.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>
            <button
                className="p-2 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center"
                onClick={handleDeleteProduct}
                disabled={isDeleting}
            >
                <RiDeleteBin6Line className="text-red-500" size={18} />
            </button>
        </>
    );
}

export default DeleteProductButton;
