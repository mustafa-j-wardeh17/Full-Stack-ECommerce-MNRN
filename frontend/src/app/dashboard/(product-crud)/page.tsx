import { redirect } from 'next/navigation'
import React from 'react'

const page = () => {
    return redirect('/product-crud/create-product')
}

export default page