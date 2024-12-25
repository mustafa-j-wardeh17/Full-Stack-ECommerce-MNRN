'use client'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import DeleteProduct from './deleteProduct';
import { FaEllipsisVertical } from "react-icons/fa6";

const ActionProducts = ({ id }: { id: string }) => {
    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState<boolean>(false);
    const router = useRouter()
    const pathName = usePathname()
    const handleShowDialog = (event: React.MouseEvent) => {
        setIsDeleteDialogVisible(true);
    };

    const handleCloseDialog = () => {
        location.reload()

        //setIsDeleteDialogVisible(false);
    };


    return (
        <>
            <DropdownMenu >
                <DropdownMenuTrigger asChild>
                    <Button
                        aria-haspopup="true"
                        size="icon"
                        variant="ghost"
                    >
                        <FaEllipsisVertical />

                        <span className="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className={`text-left`}>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => router.push(`/dashboard/products/${id}/update-product`)}
                    >
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleShowDialog}
                    >
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>

            </DropdownMenu>
            <DeleteProduct
                id={id}
                handleCloseDialog={handleCloseDialog}
                isDeleteDialogVisible={isDeleteDialogVisible}
            />
        </>



    );
};

export default ActionProducts;