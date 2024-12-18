'use client'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const Pagination = ({ searchParams, totalPages }: { searchParams: { [key: string]: string | undefined }, totalPages: number }) => {
    const page = parseInt(searchParams.page as string) || 1
    const router = useRouter()
    const pathname = usePathname()

    const handlePagination = (type: "next" | "previous") => {
        const urlParam = new URLSearchParams(window.location.search);
        let currentPage = page;

        if (type === 'next' && currentPage < totalPages) {
            currentPage = page + 1;
            urlParam.set('page', String(currentPage));
        } else if (type === 'previous' && page > 1) {
            currentPage = page - 1;
            urlParam.set('page', String(currentPage));
        }

        // If the page is 1, remove the 'page' parameter from the URL
        if (currentPage === 1) {
            urlParam.delete('page');
        }

        router.push(`${pathname}?${urlParam.toString()}`);
    };

    return (
        <div className="flex justify-center items-center space-x-4 my-8">
            <button
                onClick={() => handlePagination('previous')}
                className={`flex items-center md:w-[120px] w-[100px] justify-center py-2 text-sm font-medium rounded-md border transition duration-200 
                 ${page === 1
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-primary bg-white dark:bg-gray-800 dark:text-white dark:border-primary hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                disabled={page === 1}
            >
                <FaArrowLeft className="mr-2" />
                Previous
            </button>

            {/* Page Number Display */}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Page {page} of {totalPages}
            </span>

            {/* Next Page Button */}
            <button
                onClick={() => handlePagination('next')}
                className={`flex items-center md:w-[120px] w-[100px] justify-center py-2 text-sm font-medium rounded-md border transition duration-200 
        ${page === totalPages
                        ? 'text-gray-400 cursor-not-allowed'
                        : 'text-primary bg-white dark:bg-gray-800 dark:text-white dark:border-primary hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                disabled={page === totalPages}
            >
                Next
                <FaArrowRight className="ml-2" />
            </button>

        </div>
    )
}

export default Pagination
