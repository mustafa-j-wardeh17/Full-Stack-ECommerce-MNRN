import { redirect } from 'next/navigation'

const page = () => {
  return redirect('/dashboard/products')
}

export default page