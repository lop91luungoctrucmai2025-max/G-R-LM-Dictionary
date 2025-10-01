
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (word: string) => void;
  isLoading: boolean;
}

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [term, setTerm] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full shadow-lg rounded-full border border-stone-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus-within:ring-2 focus-within:ring-indigo-500 transition-shadow duration-300">
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="Search for a word..."
        className="w-full py-3 px-6 bg-transparent rounded-full focus:outline-none text-lg text-stone-800 dark:text-stone-100 placeholder-stone-400 dark:placeholder-gray-500"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !term}
        className="m-1 p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:bg-stone-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors duration-300"
      >
        <SearchIcon />
      </button>
    </form>
  );
};