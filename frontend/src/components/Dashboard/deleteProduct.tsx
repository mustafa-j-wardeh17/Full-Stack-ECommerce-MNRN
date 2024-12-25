'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const DeleteProduct = ({ id, isDeleteDialogVisible, handleCloseDialog }:
    { id: string, isDeleteDialogVisible: boolean, handleCloseDialog: () => void }) => {

    const [loading, setLoading] = useState<boolean>(false);

    const handleDelete = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${id}`, {
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
            setLoading(false);
            handleCloseDialog();
            location.reload()
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete product. Please try again later.');
        } 

    };
    return (
        <AlertDialog open={isDeleteDialogVisible} onOpenChange={handleCloseDialog}>
            {/* <AlertDialogTrigger asChild>
                <Button variant="outline">Show Dialog</Button>
            </AlertDialogTrigger> */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure</AlertDialogTitle>
                    <AlertDialogDescription>
                        Warning Product
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className='gap-2'>
                    <AlertDialogCancel onClick={handleCloseDialog}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className='bg-red-500 hover:bg-red-400'
                        onClick={handleDelete}
                    >
                        {loading ? (
                            <div className='flex items-center justify-center gap-2'>
                                <p>Delete</p>
                                <div className='w-5 h-5 border-t-2 border-white rounded-full animate-spin' />

                            </div>
                        ) : (
                            <p>Delete</p>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default DeleteProduct