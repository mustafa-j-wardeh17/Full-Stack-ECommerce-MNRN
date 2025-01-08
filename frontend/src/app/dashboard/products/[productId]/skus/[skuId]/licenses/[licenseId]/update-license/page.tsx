import DynamicLink from '@/components/Dashboard/DynamicLink'
import PageWrapper from '@/components/Dashboard/pageWrapper'
import CreateUpdateProductSkuLicenseForm from '@/components/shop/CreateProductSkuLicensesForm'
import UpdateProductSkuLicenseForm from '@/components/shop/UpdateProductSkuLicenseForm'
import { GetProductSkuLicensesResponse, License, Product, ProductResponse } from '@/util/types'
import { cookies } from 'next/headers'
import React from 'react'
import toast from 'react-hot-toast'

type paramsProp = Promise<{ productId: string, skuId: string, licenseId: string }>
const page = async ({ params }: { params: paramsProp }) => {

    const { productId, skuId, licenseId } = await params
    let license: License | undefined;

    const cookieStore = cookies();
    const _digi_auth_token = (await cookieStore).get('_digi_auth_token');
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
        <PageWrapper title={`Update License for SKU ${product.productName}`}>
            <DynamicLink
                label={'Licenses'}
                url={`/dashboard/products/${productId}/skus/${skuId}/licenses`}
            />
            <UpdateProductSkuLicenseForm
                productId={productId}
                skuId={skuId}
                licenseId={licenseId}
                license={license?.licenseKey || ''}
            />
        </PageWrapper>
    )
}

export default page