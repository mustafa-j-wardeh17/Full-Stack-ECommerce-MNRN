import React from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import Link from 'next/link';

interface DynamicLinkProps {
    label: string;
    url: string;
    className?: string; // Optional class for customization
}

const DynamicLink: React.FC<DynamicLinkProps> = ({ label, url, className = '' }) => {
    return (
        <div className='flex '>
            <Link
                href={url}
                className={`flex items-center px-3 py-2 bg-primary shadow-md rounded-md text-secondary hover:bg-primary/70  transition-all duration-300${className}`}
            >
                <FiChevronLeft size={20} className="mr-1" />
                <span className="text-xs font-semibold">{label}</span>

            </Link>
        </div>
    );
};

export default DynamicLink;
