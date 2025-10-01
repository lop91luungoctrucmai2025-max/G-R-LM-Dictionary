import { GoogleGenAI, Type } from "@google/genai";
import type { DictionaryEntry } from "../types";

// Initialize the Google Gemini AI client using the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Define the JSON schema for the dictionary entry to ensure structured output from the model.
const responseSchema = {
  type: Type.OBJECT,
  properties: {
    word: { type: Type.STRING, description: "The word being defined." },
    phonetic: { type: Type.STRING, description: "The phonetic transcription of the word." },
    meanings: {
      type: Type.ARRAY,
      description: "A list of meanings for the word, categorized by part of speech.",
      items: {
        type: Type.OBJECT,
        properties: {
          partOfSpeech: { type: Type.STRING, description: "The part of speech (e.g., noun, verb, adjective)." },
          definition: { type: Type.STRING, description: "The definition of the word for this part of speech." },
          vietnameseMeaning: { type: Type.STRING, description: "The Vietnamese translation of the meaning." },
          example: { type: Type.STRING, description: "An example sentence demonstrating the word's usage." },
          synonyms: { type: Type.ARRAY, description: "A list of synonyms for this meaning.", items: { type: Type.STRING } },
          antonyms: { type: Type.ARRAY, description: "A list of antonyms for this meaning.", items: { type: Type.STRING } },
        },
        required: ["partOfSpeech", "definition"],
      },
    },
    wordFormation: {
      type: Type.ARRAY,
      description: "Related word formations, such as noun, verb, or adjective forms.",
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, description: "The type of the related word (e.g., noun, adjective)." },
          relatedWord: { type: Type.STRING, description: "The related word itself." },
        },
        required: ["type", "relatedWord"],
      },
    },
  },
  required: ["word", "phonetic", "meanings"],
};

/**
 * Fetches a dictionary definition for a given word using the Gemini API.
 * @param word The word to look up.
 * @returns A promise that resolves to a DictionaryEntry object, or null if a definition isn't found.
 */
export const getWordDefinition = async (word: string): Promise<DictionaryEntry | null> => {
  try {
    const prompt = `Provide a comprehensive dictionary definition for the word "${word}". Include its phonetic transcription, multiple meanings with parts of speech, synonyms and antonyms for each meaning, an example sentence for each meaning, a Vietnamese translation for each meaning, and any relevant word formations (like noun, verb, adjective forms). Ensure the output is a single, valid JSON object that adheres to the provided schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });

    const jsonText = response.text.trim();

    if (jsonText) {
      // The Gemini API with a JSON schema should return valid JSON, but as a safeguard,
      // we'll attempt to parse it and ensure it's a valid object.
      const parsed = JSON.parse(jsonText);
      if (parsed && parsed.word) {
        return parsed as DictionaryEntry;
      }
    }
    // Return null if no valid definition is found.
    return null;
  } catch (error) {
    console.error("Error fetching definition from Gemini API:", error);
    // Let the UI layer handle the error state by throwing it.
    throw new Error("Failed to fetch word definition from the API.");
  }
};