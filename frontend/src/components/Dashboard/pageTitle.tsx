import React from 'react'

const PageTitle = ({ title }: { title: string}) => {
    return (
        <section
            className="bg-[#eef0f5]   bg-dotted-pattern bg-cover  bg-center w-full py-10 md:py-10">
            <h3 className={`text-left ml-8  h3-bold `}>{title}</h3>
        </section>
    )
}

export default PageTitle