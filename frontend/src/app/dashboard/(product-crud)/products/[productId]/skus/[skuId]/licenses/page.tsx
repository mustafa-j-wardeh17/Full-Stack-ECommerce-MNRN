import React from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { cookies } from 'next/headers';
import { GetProductSkuLicensesResponse, License } from '@/util/types';
import DeleteProductSkuLicenseButton from '@/components/shop/DeleteProductSkuLicenseButton';
import PageWrapper from '@/components/Dashboard/pageWrapper';



type paramsProp = Promise<{ productId: string, skuId: string }>
const page = async ({ params }: { params: paramsProp }) => {
    const cookieStore = cookies();
    const _digi_auth_token = (await cookieStore).get('_digi_auth_token');

    const { productId, skuId } = await params
    let licenses: License[] = []
    try {
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
            <PageWrapper title='SKU Licenses'>
                <div className=' bg-white dark:bg-black w-full md:p-8 p-3 rounded-2xl shadow-md flex flex-col gap-8'>
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                        Licenses for SKU
                    </h1>


                    <table className="w-full border border-gray-300 dark:border-gray-600">
                        <thead>
                            <tr>
                                <th className="p-2 text-left border-b border-gray-300 dark:border-gray-600">
                                    License Key
                                </th>
                                <th className="p-2 text-left border-b border-gray-300 dark:border-gray-600">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {licenses.length > 0 && licenses.map((license) => (
                                <tr key={license._id}>
                                    <td className="p-2 border-b sm:text-sm text-xs border-gray-300 dark:border-gray-600">
                                        {license.licenseKey}
                                    </td>
                                    <td className="p-2 flex gap-3 sm:text-sm text-xs border-b border-gray-300 dark:border-gray-600">
                                        <Link
                                            href={`/dashboard/products/${productId}/skus/${skuId}/licenses/${license._id}/update-license`}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Update
                                        </Link>
                                        <DeleteProductSkuLicenseButton licenseId={license._id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>


                    <div className="mt-4">
                        <Link
                            href={`/dashboard/products/${productId}/skus/${skuId}/licenses/create-license`}
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
