
import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { DefinitionDisplay } from './components/DefinitionDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { InitialState } from './components/InitialState';
import { ErrorDisplay } from './components/ErrorDisplay';
import { getWordDefinition } from './services/geminiService';
import { DictionaryEntry } from './types';
import { Footer } from './components/Footer';
import { ThemeToggle } from './components/ThemeToggle';

function App() {
  const [definition, setDefinition] = useState<DictionaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  const handleSearch = async (word: string) => {
    if (!word) return;
    setIsLoading(true);
    setError(null);
    setDefinition(null);
    try {
      const searchTerm = word.trim().toLowerCase();
      const result = await getWordDefinition(searchTerm);
      if (result && result.word) {
        setDefinition(result);
      } else {
        setError(`Sorry, we couldn't find a definition for "${word.trim()}". Please try another word.`);
      }
    } catch (err) {
      console.error(err);
      setError('An unexpected error occurred. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return <ErrorDisplay message={error} />;
    }
    if (definition) {
      return <DefinitionDisplay entry={definition} />;
    }
    return <InitialState />;
  };

  return (
    <div className="bg-stone-50 dark:bg-gray-900 min-h-screen text-stone-800 dark:text-stone-200 font-sans flex flex-col transition-colors duration-500">
      <main className="flex-grow flex flex-col items-center p-4 sm:p-6 md:p-8">
        <header className="w-full max-w-3xl mb-8 flex justify-between items-center">
            <div className='text-left'>
                <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 dark:text-white">
                    Gemini Dictionary
                </h1>
                <p className="text-stone-600 dark:text-stone-300 mt-2 text-lg">
                    Your modern guide to the English language.
                </p>
            </div>
            <ThemeToggle isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        </header>
        
        <div className="w-full max-w-xl sticky top-4 z-10 bg-stone-50/80 dark:bg-gray-900/80 backdrop-blur-sm p-2 rounded-lg">
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
        
        <div className="w-full max-w-3xl mt-8">
          {renderContent()}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;