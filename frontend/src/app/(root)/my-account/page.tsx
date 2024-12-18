import { redirect } from 'next/navigation'

const page = () => {
    return redirect('/my-account/personal-information')
}

export default page