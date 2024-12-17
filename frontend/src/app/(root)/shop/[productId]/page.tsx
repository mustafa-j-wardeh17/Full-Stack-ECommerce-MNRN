import React from 'react'
type tParams = Promise<{ productId: string[] }>
const page = async ({ params }: { params: tParams }) => {
  const { productId } = await (params)
  return (
    <div>{productId}</div>
  )
}

export default page