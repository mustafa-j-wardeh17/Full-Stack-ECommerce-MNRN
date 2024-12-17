"use client"

import * as React from "react"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdKeyboardArrowDown } from "react-icons/md"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export function SortBy() {
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 ring-0 focus:ring-0 outline-none">
                    Sort by
                    <p className='flex gap-1 font-bold items-center'>
                        latest
                        <span>
                            <MdKeyboardArrowDown size={16} />
                        </span>
                    </p>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuCheckboxItem
                    checked={showStatusBar}
                    onCheckedChange={setShowStatusBar}
                >
                    CreatedAt
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem
                    checked={showPanel}
                    onCheckedChange={setShowPanel}
                >
                    Rating
                </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
