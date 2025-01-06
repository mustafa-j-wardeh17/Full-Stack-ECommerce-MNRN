"use client";

import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MdKeyboardArrowDown, MdDateRange, MdStar } from "react-icons/md";

export function SortBy() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Default selected sort is "createdAt"
    const [selectedSort, setSelectedSort] = React.useState(
        searchParams.get("sort") || "createdAt"
    );

    const handleSortChange = (sortOption: string) => {
        setSelectedSort(sortOption);

        const query = new URLSearchParams(searchParams.toString());
        if (sortOption === "createdAt") {
            query.delete("sort"); // Remove the "sort" parameter for the default option
        } else {
            query.set("sort", sortOption); // Update or add the "sort" parameter
        }
        router.push(`${pathname}?${query.toString()}`);
    };

    const sortOptions = [
        { label: "Oldest First", value: "createdAt", icon: <MdDateRange size={16} /> },
        { label: "Newest First", value: "-createdAt", icon: <MdDateRange size={16} /> },
        { label: "Highest Rated", value: "-avgRating", icon: <MdStar size={16} /> },
        { label: "Lowest Rated", value: "avgRating", icon: <MdStar size={16} /> },
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 ring-0 focus:ring-0 outline-none">
                    <span className="font-medium">Sort by:</span>
                    <p className="flex gap-1 font-bold items-center">
                        {sortOptions.find(option => option.value === selectedSort)?.label || "Sort"}
                        <MdKeyboardArrowDown size={16} />
                    </p>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
                {sortOptions.map(option => (
                    <DropdownMenuItem
                        key={option.value}
                        onSelect={() => handleSortChange(option.value)}
                        className={`flex items-center  ${selectedSort === option.value ? "font-bold text-blue-500" : ""
                            }`}
                    >
                        {option.icon}
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
