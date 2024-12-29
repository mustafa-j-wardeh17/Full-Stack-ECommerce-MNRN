

import DynamicLink from '@/components/Dashboard/DynamicLink';
import PageWrapper from '@/components/Dashboard/pageWrapper';
import CreateUpdateProduct from '@/components/shop/updateCreateProductForm';
import React from 'react';



const CreateProduct = () => {

    return (
        <PageWrapper title='Create Product'>
            <DynamicLink
                label='Products'
                url={`/dashboard/products`}
            />
            <CreateUpdateProduct />
        </PageWrapper>
    )
}
export default CreateProduct;