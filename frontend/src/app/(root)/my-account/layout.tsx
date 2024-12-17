import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='flex'>
            {children}
        </div>
    )
}

export default layout