'use client'
import { useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation";

const DeleteProductButton = ({ productId }: { productId: string }) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const router = useRouter()
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
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete product. Please try again later.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>


            <AlertDialog>
                <AlertDialogTrigger
                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center"
                >
                    <RiDeleteBin6Line className="text-red-500" size={18} />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDeleteProduct}
                            color="red"
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default DeleteProductButton;
