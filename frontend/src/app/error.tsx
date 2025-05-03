'use client';

import React, { useEffect, useState } from 'react';

interface ErrorProps {
    error: Error;
    reset: () => void;
}

const Error: React.FC<ErrorProps> = ({ error, reset }) => {
    const [countdown, setCountdown] = useState(45);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    window.location.reload();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <p className='text-red-500 my-2'>{error.message}</p>
            <div style={{ textAlign: 'center' }}>
                <p style={{ width:'70vw',fontSize: '1.2rem', marginBottom: '1rem' }}>
                    The backend server is running now. Please note that it is deployed on a free OnRender version, which may not be available all the time.
                </p>
                <div
                    style={{
                        display: 'inline-block',
                        width: '100px',
                        height: '100px',
                        border: '10px solid #f3f3f3',
                        borderTop: '10px solid #0070f3',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        marginBottom: '1rem',
                    }}
                ></div>
                <p style={{ fontSize: '1rem', marginBottom: '1rem' }}>
                    Reloading in <span id="countdown">{countdown}</span> seconds...
                </p>
                <button
                    onClick={() => reset()}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#0070f3',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Try Again
                </button>
                <style>
                    {`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}
                </style>
            </div>
        </div>
    );
};

export default Error;
