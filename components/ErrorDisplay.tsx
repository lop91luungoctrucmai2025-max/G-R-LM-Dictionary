
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const AlertIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 dark:text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="text-center p-10 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-500/30">
        <div className="flex justify-center mb-4">
            <AlertIcon />
        </div>
      <h2 className="text-xl font-serif font-semibold text-red-800 dark:text-red-300">An Error Occurred</h2>
      <p className="mt-2 text-red-600 dark:text-red-400">{message}</p>
    </div>
  );
};