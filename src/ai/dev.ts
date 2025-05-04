
/**
 * @fileOverview Development entry point for starting the Genkit development server.
 * This file imports all defined flows so they are registered with Genkit.
 */

// Ensure ai instance is initialized first
import {ai} from './ai-instance';

// Import flows to register them with Genkit
// import './flows/property-recommendation'; // Uncomment if you have this flow
import './flows/property-recommendation-flow'; // Import the correct flow file name


// Export the configured Genkit instance
export default ai;
