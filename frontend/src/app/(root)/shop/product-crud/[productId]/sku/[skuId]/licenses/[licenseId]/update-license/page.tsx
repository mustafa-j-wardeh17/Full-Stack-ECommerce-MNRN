import CreateUpdateProductSkuLicenseForm from '@/components/shop/createUpdateProductSkuLicence'
import { GetProductSkuLicensesResponse, License } from '@/util/types'
import { cookies } from 'next/headers'
import React from 'react'
import toast from 'react-hot-toast'

type paramsProp = Promise<{ productId: string, skuId: string, licenseId: string }>
const page = async ({ params }: { params: paramsProp }) => {

    const { productId, skuId, licenseId } = await params
    let license: License | undefined;

    const cookieStore = cookies();
    const _digi_auth_token = (await cookieStore).get('_digi_auth_token');

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
            license = data.result.licenses.find((license) => license._id === licenseId)
        } else {
            console.error('Error fetching licenses:', data.message);
            toast.error('Failed to fetch licenses.');
        }

    } catch (error: any) {
        console.error('Error fetching license:', error);
        return <div>{error.message}</div>
    }
    return (
        <div className='my-[30px]'>
            <CreateUpdateProductSkuLicenseForm
                productId={productId}
                skuId={skuId}
                licenseId={licenseId}
                license={license?.licenseKey}
            />
        </div>
    )
}

export default page