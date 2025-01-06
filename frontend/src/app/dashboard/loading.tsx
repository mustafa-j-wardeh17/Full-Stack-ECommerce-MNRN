import Spinner from '@/components/Spinner';
import React from 'react';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen  text-white">
            {/* Loading Spinner */}
            <Spinner />
        </div>
    );
};

export default Loading;
