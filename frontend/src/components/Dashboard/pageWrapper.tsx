import React from 'react'
import PageTitle from './pageTitle'

const PageWrapper = ({ title, children }: { title: string, children: React.ReactNode }) => {
    return (
        <div className='relative flex w-full text-dark flex-col gap-8' >
            <PageTitle title={title} />
            <div className='md:p-10 p-5 bg-primary-foreground flex flex-col gap-8'>
                {children}
            </div>
        </div>
    )
}

export default PageWrapper