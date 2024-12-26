'use client'
import React from 'react'
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LuListFilter } from "react-icons/lu";

import { Button } from '@/components/ui/button'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
const DashboardCategoryFilter = ({ categories, type }: { categories: string[], type: 'category' | 'platformType' }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [selectedSelectedCategory, setSelectedSelectedCategory] = React.useState(
        searchParams.get(type) || "All"
    );
    const onSelectedCategory = (category: string) => {
        setSelectedSelectedCategory(category);

        const query = new URLSearchParams(searchParams.toString());
        if (selectedSelectedCategory === 'All') {
            query.delete(type)
        } else {
            query.set(type, category); // Update or add the "sort" parameter
        }

        router.push(`${pathname}?${query.toString()}`);
    };

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="md:w-[140px]  flex items-center justify-center shadow md:gap-2 sm:w-10 w-[105px] h-10 gap-1 text-sm">
                        <LuListFilter />
                        <span className=" md:flex sm:hidden text-[12px] flex">
                            {
                                type && selectedSelectedCategory === 'All'
                                    ? type === 'category' ? 'Category' : 'platformType'
                                    : selectedSelectedCategory
                            }
                        </span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className={`h-[200px] ${categories.length > 2 && 'overflow-y-scroll custom-scrollbar'} `}
                    align="end"
                >
                    <DropdownMenuLabel>Filter by  {type}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                        key={'All'}
                        className='select-item p-regular-14'
                        checked={selectedSelectedCategory === 'All' ? true : false}
                        onCheckedChange={() => onSelectedCategory('All')}
                    >
                        All
                    </DropdownMenuCheckboxItem>
                    {categories.map((category, index) => (
                        <DropdownMenuCheckboxItem
                            key={index}
                            className='select-item p-regular-14'
                            checked={selectedSelectedCategory === category ? true : false}
                            onCheckedChange={() => onSelectedCategory(category)}
                        >
                            {category}
                        </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    )
}

export default DashboardCategoryFilter