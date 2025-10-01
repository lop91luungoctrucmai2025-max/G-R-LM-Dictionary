export interface Meaning {
  partOfSpeech: string;
  definition: string;
  vietnameseMeaning?: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

export interface WordFormation {
  type: string;
  relatedWord: string;
}

export interface DictionaryEntry {
  word: string;
  phonetic: string;
  meanings: Meaning[];
  wordFormation?: WordFormation[];
}