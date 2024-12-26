'use client'

import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'



const DashboardSearch = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const [query, setQuery] = useState<string>('')
    const pathname = usePathname()

    useEffect(() => {
        const delayDebounceFunction = setTimeout(() => {
            const searchParam = new URLSearchParams(searchParams.toString());

            if (query) {
                searchParam.set("search", query); // Remove the "sort" parameter for the default option
            } else {
                searchParam.delete("search"); // Update or add the "sort" parameter
            }
            router.push(`${pathname}?${searchParam.toString()}`, { scroll: false })
        }, 300)
        return () => clearTimeout(delayDebounceFunction)
    }, [query, router, searchParams])

    return (
        <div className="flex items-center min-h-[54px] dark:bg-black bg-white shadow md:w-[380px] sm:w-3/5 w-full overflow-hidden rounded-2xl  px-4 py-1">
            <Search />
            <Input
                type="text"
                placeholder={'Product Title'}
                onChange={(e) => setQuery(e.target.value)}
                className="outline-none border-none focus:border-none focus:ring-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none shadow-none "
            />
        </div>

    )
}

export default DashboardSearch