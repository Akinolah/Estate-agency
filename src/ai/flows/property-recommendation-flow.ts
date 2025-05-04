
'use server';
/**
 * @fileOverview Provides an AI flow for generating property recommendations.
 *
 * - recommendProperties - A function that takes user preferences and generates property recommendations.
 * - RecommendPropertiesInput - The input type for the recommendProperties function.
 * - RecommendPropertiesOutput - The return type for the recommendProperties function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
// Removed Property type import

// Define input schema using Zod
const RecommendPropertiesInputSchema = z.object({
  locationPreference: z.string().describe('Preferred city or state in Nigeria (e.g., Lagos, Abuja, Lekki Phase 1).'),
  propertyType: z.string().describe('Desired property type (e.g., Detached Duplex, Flat, Bungalow). Optional.'),
  minPrice: z.number().optional().describe('Minimum budget in USD. Optional.'),
  maxPrice: z.number().optional().describe('Maximum budget in USD. Optional.'),
  minBedrooms: z.number().optional().describe('Minimum number of bedrooms. Optional.'),
  // Add other preferences as needed
});
export type RecommendPropertiesInput = z.infer<typeof RecommendPropertiesInputSchema>;

// Define output schema using Zod - simplified for recommendation text
const RecommendPropertiesOutputSchema = z.object({
  recommendations: z.array(z.object({
     id: z.string().describe("The unique ID of the recommended property."),
     reasoning: z.string().describe("Brief explanation why this property is recommended based on the user's preferences."),
     address: z.string().describe("Full address of the property."),
     price: z.number().describe("Price of the property in USD."),
     bedrooms: z.number().describe("Number of bedrooms."),
     bathrooms: z.number().describe("Number of bathrooms."),
    // Add other key property details you want the AI to return
  })).describe('List of recommended property IDs and reasoning.'),
  summary: z.string().describe('A short summary of the recommendations provided.')
});
export type RecommendPropertiesOutput = z.infer<typeof RecommendPropertiesOutputSchema>;


// Wrapper function to call the flow
export async function recommendProperties(input: RecommendPropertiesInput): Promise<RecommendPropertiesOutput> {
  return propertyRecommendationFlow(input);
}

// Define the prompt template
const propertyRecommendationPrompt = ai.definePrompt({
  name: 'propertyRecommendationPrompt',
  input: { schema: RecommendPropertiesInputSchema },
  output: { schema: RecommendPropertiesOutputSchema },
  prompt: `You are a Nigerian real estate expert assistant. Based on the following user preferences, recommend up to 3 suitable properties from a fictional database. For each recommendation, provide the property ID, a brief reasoning why it matches the preferences, address, price (USD), bedrooms, and bathrooms. Also provide a short overall summary.

User Preferences:
- Location: {{{locationPreference}}}
{{#if propertyType}}- Property Type: {{{propertyType}}}{{/if}}
{{#if minPrice}}- Minimum Price (USD): {{{minPrice}}}{{/if}}
{{#if maxPrice}}- Maximum Price (USD): {{{maxPrice}}}{{/if}}
{{#if minBedrooms}}- Minimum Bedrooms: {{{minBedrooms}}}{{/if}}

Recommend properties based *only* on the provided preferences. If a preference is not provided, do not assume one.
Focus on matching the location and price range primarily.
Ensure the output matches the specified JSON schema exactly.`,
});

// Define the Genkit flow
const propertyRecommendationFlow = ai.defineFlow<
  typeof RecommendPropertiesInputSchema,
  typeof RecommendPropertiesOutputSchema
>(
  {
    name: 'propertyRecommendationFlow',
    inputSchema: RecommendPropertiesInputSchema,
    outputSchema: RecommendPropertiesOutputSchema,
  },
  async (input) => {
    // In a real scenario, you might fetch actual properties based on input here
    // and pass them to the prompt or use a tool/retriever.
    // For this example, the AI will generate fictional recommendations based on the prompt instructions.

    const { output } = await propertyRecommendationPrompt(input);
    return output!; // Add non-null assertion
  }
);
