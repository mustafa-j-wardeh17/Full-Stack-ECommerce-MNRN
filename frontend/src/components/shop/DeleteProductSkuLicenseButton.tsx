'use client'
import { useState } from "react";
import toast from "react-hot-toast";
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

const DeleteProductSkuLicenseButton = ({ licenseId }: { licenseId: string }) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const router = useRouter()
    const handleDeleteProduct = async () => {
        setIsDeleting(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/licenses/${licenseId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });
            if (!response.ok) {
                throw new Error(`Failed to delete license: ${response.statusText}`);
            }

            toast.success('License deleted successfully');
            router.refresh();
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete license. Please try again later.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <>


            <AlertDialog>
                <AlertDialogTrigger
                    className=" text-red-600 rounded-full shadow-md hover:underline flex items-center justify-center"
                >
                    Delete
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the license
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

export default DeleteProductSkuLicenseButton;
