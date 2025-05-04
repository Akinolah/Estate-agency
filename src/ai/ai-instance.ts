
/**
 * @fileOverview Centralized initialization for the Genkit AI instance.
 */

import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
// No need to import NextPlugin here if it's not directly used for definitions

const googleApiKey = process.env.GOOGLE_GENAI_API_KEY;
if (!googleApiKey) {
  if (process.env.NODE_ENV === 'production') {
    console.error('GOOGLE_GENAI_API_KEY environment variable is not set.');
    // Potentially throw an error in production or have a stricter check
  } else {
    console.warn('GOOGLE_GENAI_API_KEY environment variable is not set. Genkit features using Google AI will not work.');
  }
}

export const ai = genkit({
  plugins: [
    googleAI({ apiKey: googleApiKey }),
    // nextPlugin() // Removed as it's handled by genkit:dev command for local dev
  ],
  logLevel: 'debug', // Or 'info' for less verbose logging
  enableTracingAndMetrics: true, // Enable tracing for debugging and monitoring
});
