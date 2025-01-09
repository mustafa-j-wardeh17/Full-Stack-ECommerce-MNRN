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
      query.delete('page')
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
    <div ref={filterRef} className="lg:sticky top-20 lg:h-auto  lg:w-full lg:block flex flex-wrap justify-between gap-4  rounded-lg  lg:p-4 mb-6 lg:mb-0">
      <h2 className="xs:text-xl text-lg font-semibold mb-6 lg:block hidden">Filter Products By</h2>
      {/* Category */}
      <div className="lg:mb-6 lg:block flex-1 min-w-[200xp]">
        <h3 className="font-semibold text-md mb-2 lg:block hidden">Category</h3>
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
            <Command className='sm:h-full h-[250px]'>
              <CommandInput placeholder="Search Category..." className="h-9" />
              <CommandList >
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
      <div className="lg:mb-6 lg:block flex-1 min-w-[200xp]">
        <h3 className="font-semibold text-md mb-2 lg:block hidden">Base</h3>
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
            <Command className='sm:h-full h-[250px]'>
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
      <div className="lg:mb-6 lg:block flex-1 min-w-[200xp]">
        <h3 className="font-semibold text-md mb-2 lg:block hidden">Platform</h3>
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
            <Command className='sm:h-full h-[250px]'>
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
