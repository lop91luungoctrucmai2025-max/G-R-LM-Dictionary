
import React from 'react';

const BookIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-stone-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
);


export const InitialState: React.FC = () => {
  return (
    <div className="text-center p-10 bg-white dark:bg-gray-800 rounded-lg border border-stone-200 dark:border-gray-700 shadow-sm">
        <div className="flex justify-center mb-4">
            <BookIcon/>
        </div>
      <h2 className="text-2xl font-serif font-semibold text-stone-700 dark:text-stone-200">Discover new words</h2>
      <p className="mt-2 text-stone-500 dark:text-gray-400">
        Enter a word in the search bar above to get started.
      </p>
    </div>
  );
};