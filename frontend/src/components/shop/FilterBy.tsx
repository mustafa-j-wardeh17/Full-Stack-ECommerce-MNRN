'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { baseType, categoryType, platformType } from '@/util/constant';
import { IoFilter } from 'react-icons/io5';

export function FilterBy() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const getQuery = () => {
        const params = new URLSearchParams(searchParams.toString());
        return params;
    };

    const handleFilterChange = (key: string, value: string) => {
        const query = getQuery();

        if (value === 'All') {
            query.delete(key); // Remove the filter if it's "All"
        } else {
            query.set(key, value); // Add or update the filter
        }

        router.push(`${pathname}?${query.toString()}`);
    };

    // Close the filter when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
                setIsFilterOpen(false);
            }
        };

        if (isFilterOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isFilterOpen]);

    return (
        <div ref={filterRef}>
            {/* Button for Small Screens */}
            <div className="lg:hidden mb-4">
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 text-primary font-semibold rounded-md transition"
                >
                    Filter By <IoFilter />
                </button>
            </div>

            {/* Filter Content */}
            <div
                className={`${isFilterOpen ? 'block w-[300px] absolute z-10' : 'hidden'} lg:block p-4 rounded-md shadow-md lg:shadow-none`}
            >
                {/* Category */}
                <div className="flex flex-col gap-3 mb-4">
                    <h3 className="font-bold text-lg">Category</h3>
                    <RadioGroup
                        defaultValue={searchParams.get('category') || 'All'}
                        onValueChange={(value) => handleFilterChange('category', value)}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="All" id="category1" />
                            <Label htmlFor="category1">All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={categoryType.operatingSystem} id="category2" />
                            <Label htmlFor="category2">{categoryType.operatingSystem}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={categoryType.applicationSoftware} id="category3" />
                            <Label htmlFor="category3">{categoryType.applicationSoftware}</Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Base */}
                <div className="flex flex-col gap-3 mb-4">
                    <h3 className="font-bold text-lg">Base</h3>
                    <RadioGroup
                        defaultValue={searchParams.get('baseType') || 'All'}
                        onValueChange={(value) => handleFilterChange('baseType', value)}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="All" id="base1" />
                            <Label htmlFor="base1">All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={baseType.computer} id="base2" />
                            <Label htmlFor="base2">{baseType.computer}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={baseType.mobile} id="base3" />
                            <Label htmlFor="base3">{baseType.mobile}</Label>
                        </div>
                    </RadioGroup>
                </div>

                {/* Platform */}
                <div className="flex flex-col gap-3">
                    <h3 className="font-bold text-lg">Platform</h3>
                    <RadioGroup
                        defaultValue={searchParams.get('platformType') || 'All'}
                        onValueChange={(value) => handleFilterChange('platformType', value)}
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="All" id="platform1" />
                            <Label htmlFor="platform1">All</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={platformType.windows} id="platform2" />
                            <Label htmlFor="platform2">{platformType.windows}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={platformType.mac} id="platform3" />
                            <Label htmlFor="platform3">{platformType.mac}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={platformType.android} id="platform4" />
                            <Label htmlFor="platform4">{platformType.android}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={platformType.ios} id="platform5" />
                            <Label htmlFor="platform5">{platformType.ios}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value={platformType.linux} id="platform6" />
                            <Label htmlFor="platform6">{platformType.linux}</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>
    );
}
