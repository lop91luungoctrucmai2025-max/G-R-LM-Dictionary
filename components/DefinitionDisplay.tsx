import React from 'react';
import { DictionaryEntry, Meaning } from '../types';

interface DefinitionDisplayProps {
  entry: DictionaryEntry;
}

const VolumeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-stone-500 dark:text-stone-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
);

export const DefinitionDisplay: React.FC<DefinitionDisplayProps> = ({ entry }) => {
    const handleSpeak = () => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(entry.word);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        } else {
            alert('Text-to-speech is not supported in your browser.');
        }
    }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md border border-stone-200 dark:border-gray-700 font-serif animate-fade-in">
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-stone-200 dark:border-gray-600">
        <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 dark:text-white">{entry.word}</h2>
            <p className="text-xl text-indigo-600 dark:text-indigo-400 mt-1">{entry.phonetic}</p>
        </div>
        <button onClick={handleSpeak} title="Pronounce word" className="group p-2 rounded-full hover:bg-stone-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800">
            <VolumeIcon />
        </button>
      </div>

      {entry.wordFormation && entry.wordFormation.length > 0 && (
        <div className="my-6">
          <h3 className="font-sans font-bold text-lg text-stone-600 dark:text-stone-300 mb-3">Word Formation</h3>
          <div className="flex flex-wrap gap-2">
            {entry.wordFormation.map((form, index) => (
              <div key={index} className="bg-stone-100 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-sans">
                <span className="font-semibold text-stone-800 dark:text-stone-200">{form.relatedWord}</span>
                <span className="text-stone-500 dark:text-stone-400"> ({form.type})</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-6 pt-6 border-t border-stone-200 dark:border-gray-600">
        {entry.meanings.map((meaning, index) => (
          <div key={index}>
            <h3 className="font-bold text-xl text-stone-800 dark:text-stone-100 italic mb-2">{meaning.partOfSpeech}</h3>
            <div className="pl-4 border-l-4 border-indigo-200 dark:border-indigo-700 space-y-3">
                <p className="text-lg text-stone-700 dark:text-stone-300">{meaning.definition}</p>
                {meaning.vietnameseMeaning && (
                  <p className="text-lg text-sky-700 dark:text-sky-400">
                    <span className="font-sans font-semibold text-xs bg-sky-100 dark:bg-sky-800 text-sky-800 dark:text-sky-200 rounded-sm px-1.5 py-0.5 mr-2 align-middle">VN</span>
                    {/* FIX: Corrected typo from `vieteaning` to `vietnameseMeaning`. */}
                    {meaning.vietnameseMeaning}
                  </p>
                )}
                {meaning.example && (
                <p className="text-stone-500 dark:text-stone-400 italic">"{meaning.example}"</p>
                )}
                {meaning.synonyms && meaning.synonyms.length > 0 && (
                    <div className="pt-2 font-sans">
                        <h4 className="font-semibold text-md text-stone-600 dark:text-stone-400 mr-3 inline-block">Synonyms:</h4>
                        <div className="flex flex-wrap gap-2 mt-1 inline-flex">
                            {meaning.synonyms.map((synonym, sIndex) => (
                                <span key={sIndex} className="bg-stone-100 dark:bg-gray-700 rounded px-2 py-1 text-sm text-stone-700 dark:text-stone-300">
                                {synonym}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
                {meaning.antonyms && meaning.antonyms.length > 0 && (
                    <div className="pt-2 font-sans">
                        <h4 className="font-semibold text-md text-stone-600 dark:text-stone-400 mr-3 inline-block">Antonyms:</h4>
                        <div className="flex flex-wrap gap-2 mt-1 inline-flex">
                            {meaning.antonyms.map((antonym, aIndex) => (
                                <span key={aIndex} className="bg-stone-100 dark:bg-gray-700 rounded px-2 py-1 text-sm text-stone-700 dark:text-stone-300">
                                {antonym}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Add a simple fade-in animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
`;
document.head.appendChild(style);