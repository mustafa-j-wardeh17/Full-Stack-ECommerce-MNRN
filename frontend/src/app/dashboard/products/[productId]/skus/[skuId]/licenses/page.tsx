import React from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { cookies } from 'next/headers';
import { GetProductSkuLicensesResponse, License, Product, ProductResponse } from '@/util/types';
import DeleteProductSkuLicenseButton from '@/components/shop/DeleteProductSkuLicenseButton';
import PageWrapper from '@/components/Dashboard/pageWrapper';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import DynamicLink from '@/components/Dashboard/DynamicLink';



type paramsProp = Promise<{ productId: string, skuId: string }>
const page = async ({ params }: { params: paramsProp }) => {
    const cookieStore = cookies();
    const _digi_auth_token = (await cookieStore).get('_digi_auth_token');

    const { productId, skuId } = await params
    let licenses: License[] = []
    let product: Product;

    try {
        const productresponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}`)

        const productdata: ProductResponse = await productresponse.json()
        if (!productresponse.ok) {
            throw new Error(productdata.message)
        }
        product = productdata.result.product

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_PREFIX}/products/${productId}/skus/${skuId}/licenses`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${_digi_auth_token?.value}`, // Add the token here
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            }
        );
        const data: GetProductSkuLicensesResponse = await response.json();

        if (response.ok) {
            licenses = data.result.licenses
        } else {
            console.error('Error fetching licenses:', data.message);
            toast.error('Failed to fetch licenses.');
        }




        return (
            <PageWrapper title={`SKU ${product.productName} Licenses`}>
                <DynamicLink
                    label='Product Skus'
                    url={`/dashboard/products/${productId}/skus`}
                />
                <div className=' bg-white dark:bg-black w-full md:p-8 p-3 rounded-2xl shadow-md flex flex-col gap-8'>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                        Licenses for SKU {product.skuDetails.find(item => item._id === skuId)?.skuName}
                    </h1>


                    <Table className='w-full '>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="table-cell">
                                    License Key
                                </TableHead>
                                <TableHead className="table-cell">
                                    Is Sold
                                </TableHead>
                                <TableHead className="table-cell">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {licenses.length > 0 && licenses.map((license) => (
                                <TableRow key={license._id}>
                                    <TableCell className="table-cell">
                                        {license.licenseKey}
                                    </TableCell>
                                    <TableCell className="table-cell">
                                        {license.isSold ? 'true' : 'false'}
                                    </TableCell>
                                    <TableCell className="table-cell">
                                        <div className='flex gap-3 items-center'>
                                            <Link
                                                href={`/dashboard/products/${productId}/skus/${skuId}/licenses/${license._id}/update-license`}
                                                className="text-blue-600 hover:underline"
                                            >
                                                Update
                                            </Link>
                                            <DeleteProductSkuLicenseButton
                                                productId={productId}
                                                skuId={skuId}
                                                licenseId={license._id}
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>


                    <div className="mt-4">
                        <Link
                            href={`/dashboard/products/${productId}/skus/${skuId}/licenses/create-licenses`}
                            className="bg-blue-600 sm:text-ms text-sm text-white sm:px-4 px-3 sm:py-2 py-1 rounded-lg hover:bg-blue-700"
                        >
                            Create License
                        </Link>
                    </div>
                </div>
            </PageWrapper>
        );

    } catch (error: any) {
        console.error('Error fetching licenses:', error);
        toast.error('An error occurred while fetching licenses.');
        return <div>{error.message}</div>
    }

};

export default page;
