import React from 'react'

const PageTitle = ({ title }: { title: string}) => {
    return (
        <section
            className="bg-primary/5 bg-dotted-pattern bg-cover  bg-center w-full py-10 md:py-10">
            <h3 className={`text-left ml-8  font-bold text-3xl `}>{title}</h3>
        </section>
    )
}

export default PageTitle