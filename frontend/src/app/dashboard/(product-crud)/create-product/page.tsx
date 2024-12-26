

import PageWrapper from '@/components/Dashboard/pageWrapper';
import CreateUpdateProduct from '@/components/shop/updateCreateProductForm';
import React from 'react';



const CreateProduct = () => {

    return (
        <PageWrapper title='Create Product'>
            <CreateUpdateProduct />
        </PageWrapper>
    )
}
export default CreateProduct;