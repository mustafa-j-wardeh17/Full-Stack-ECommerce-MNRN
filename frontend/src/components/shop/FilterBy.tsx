'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { baseType, categoryType, platformType } from '@/util/constant';

export function FilterBy() {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isBaseOpen, setIsBaseOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
        setIsBaseOpen(false);
        setIsPlatformOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderComboboxItems = (enumObj: Record<string, string>, filterName: string) => {
    return Object.keys(enumObj).map((key) => (
      <CommandItem
        key={key}
        value={enumObj[key]}
        onSelect={(currentValue) => {
          handleFilterChange(filterName, currentValue);
          // Close the popover after selection
          if (filterName === 'category') setIsCategoryOpen(false);
          if (filterName === 'baseType') setIsBaseOpen(false);
          if (filterName === 'platformType') setIsPlatformOpen(false);
        }}
      >
        {enumObj[key]}
        <Check
          className={cn(
            'ml-auto',
            searchParams.get(filterName) === enumObj[key] ? 'opacity-100' : 'opacity-0'
          )}
        />
      </CommandItem>
    ));
  };

  return (
    <div ref={filterRef} className="lg:sticky top-0 lg:h-screen lg:w-full  rounded-lg  p-4 mb-6 lg:mb-0">
      <h2 className="text-xl font-semibold mb-4">Filter By</h2>
      {/* Category */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Category</h3>
        <Popover open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex justify-between items-center text-left"
            >
              {searchParams.get('category') || 'Select Category'}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder="Search Category..." className="h-9" />
              <CommandList>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup className="w-full">
                  <CommandItem
                    key="allCategory"
                    value="All"
                    onSelect={() => handleFilterChange('category', 'All')}
                  >
                    All
                  </CommandItem>
                  {renderComboboxItems(categoryType, 'category')}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Base */}
      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-2">Base</h3>
        <Popover open={isBaseOpen} onOpenChange={setIsBaseOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex justify-between items-center text-left"
            >
              {searchParams.get('baseType') || 'Select Base'}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0" >
            <Command >
              <CommandInput placeholder="Search Base..." className="h-9" />
              <CommandList>
                <CommandEmpty>No base found.</CommandEmpty>
                <CommandGroup className="w-full">
                  <CommandItem
                    key="allBase"
                    value="All"
                    onSelect={() => handleFilterChange('baseType', 'All')}
                  >
                    All
                  </CommandItem>
                  {renderComboboxItems(baseType, 'baseType')}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Platform */}
      <div className="mb-6 w-full relative overflow-hidden">
        <h3 className="font-semibold text-lg mb-2">Platform</h3>
        <Popover open={isPlatformOpen} onOpenChange={setIsPlatformOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full flex justify-between items-center text-left"
            >
              {searchParams.get('platformType') || 'Select Platform'}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
            <Command>
              <CommandInput placeholder="Search Platform..." className="h-9" />
              <CommandList>
                <CommandEmpty>No platform found.</CommandEmpty>
                <CommandGroup className="w-full">
                  <CommandItem
                    key="allPlatform"
                    value="All"
                    onSelect={() => handleFilterChange('platformType', 'All')}
                  >
                    All
                  </CommandItem>
                  {renderComboboxItems(platformType, 'platformType')}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
