import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';

const googleApiKey = process.env.GOOGLE_GENAI_API_KEY;

if (!googleApiKey || googleApiKey === 'YOUR_API_KEY_HERE') {
  console.warn(
    '\n********************************************************************\n' +
      '* WARNING: GOOGLE_GENAI_API_KEY is not set or is placeholder.    *\n' +
      '* AI features will not work.                                     *\n' +
      '* Please add your key to the .env.local file.                    *\n' +
      '* Get a key from Google AI Studio: https://aistudio.google.com/  *\n' +
      '********************************************************************\n'
  );
}


export const ai = genkit({
  promptDir: './prompts',
  plugins: [
    googleAI({
      apiKey: googleApiKey, // Use the potentially undefined key
    }),
  ],
  model: 'googleai/gemini-2.0-flash',
   // Log errors only by default to avoid console spam in dev.
   // Change to 'debug' to see more detailed Genkit logs.
  logLevel: 'error',
  enableTracing: true, // Enable tracing for better debugging in Genkit UI
});
