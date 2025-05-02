'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { propertyRecommendation } from '@/ai/flows/property-recommendation';
import { PropertyCard } from './property-card';
import type { Property } from '@/types/property'; // Assuming you have a Property type
import { useToast } from '@/hooks/use-toast';

// Helper function to parse the AI output string into Property objects
// This is a placeholder and needs to be adapted based on the actual AI output format
const parseRecommendations = (recommendationString: string): Partial<Property>[] => {
  if (!recommendationString) return [];
  try {
     // Example parsing logic: assumes comma-separated properties with features in parentheses
     // "Property A (3 bed, 2 bath, $500k, Location X), Property B (4 bed, 3 bath, $750k, Location Y)"
    return recommendationString.split(', ').map((rec, index) => {
      const mainPart = rec.substring(0, rec.indexOf('(')).trim();
      const featuresPart = rec.substring(rec.indexOf('(') + 1, rec.indexOf(')')).trim();

      // Basic parsing - adjust based on actual AI output structure
      const features = featuresPart.split(',').map(f => f.trim());
      let price = NaN;
      let bedrooms = NaN;
      let bathrooms = NaN;
      let address = mainPart || `Recommended Property ${index + 1}`; // Fallback address

      features.forEach(f => {
        if (f.includes('bed')) bedrooms = parseInt(f) || NaN;
        else if (f.includes('bath')) bathrooms = parseInt(f) || NaN;
        else if (f.includes('$')) price = parseInt(f.replace(/[^0-9]/g, '')) || NaN;
        // Attempt to extract location if not part of the main title
        // This is highly dependent on the AI's output format
        else if (!mainPart && (f.toLowerCase().includes('location') || f.split(' ').length > 1)) {
             address = f;
        }
      });

      return {
        id: `rec-${index + 1}`, // Generate a unique ID
        address: address,
        price: isNaN(price) ? 0 : price, // Provide default value
        bedrooms: isNaN(bedrooms) ? 0 : bedrooms, // Provide default value
        bathrooms: isNaN(bathrooms) ? 0 : bathrooms, // Provide default value
        type: 'Recommended', // Set a default type or try to parse
        images: [`https://picsum.photos/seed/rec${index + 1}/800/600`], // Placeholder image
        description: `AI Recommended Property based on your preferences. Features: ${featuresPart}`,
        // Add other necessary default fields from the Property type
        area: undefined,
        latitude: 0,
        longitude: 0,
        virtualTourUrl: undefined,
        videos: [],
        '3dAnimationUrl': undefined,
        galleryImages: [],
      };
    });
  } catch (error) {
    console.error("Failed to parse recommendations:", error);
    return [];
  }
};


export function PropertyRecommendations() {
  const [recommendations, setRecommendations] = useState<Partial<Property>[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
   const { toast } = useToast();

  // Placeholder user data - In a real app, fetch this dynamically
  const [userData] = useState({
    searchHistory: '3 bedrooms, near downtown, modern style',
    savedProperties: 'Property ID 2 (Condo, 4 bed, city view)',
    preferences: 'Likes spacious kitchens, needs a home office',
  });

  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    setRecommendations([]); // Clear previous recommendations

    try {
      const result = await propertyRecommendation({
        searchHistory: userData.searchHistory,
        savedProperties: userData.savedProperties,
        preferences: userData.preferences,
      });

      if (result && result.propertyRecommendations) {
         const parsed = parseRecommendations(result.propertyRecommendations);
         // Ensure the parsed results conform mostly to the Property type
         const validRecommendations = parsed.map(p => ({
           ...p,
           id: p.id ?? `rec-${Math.random()}`,
           address: p.address ?? 'Unknown Address',
           price: p.price ?? 0,
           bedrooms: p.bedrooms ?? 0,
           bathrooms: p.bathrooms ?? 0,
           type: p.type ?? 'Unknown',
           images: p.images?.length ? p.images : ['https://picsum.photos/seed/defaultrec/800/600'],
           latitude: p.latitude ?? 0,
           longitude: p.longitude ?? 0,
           description: p.description ?? 'AI recommended property.'
         })) as Property[]; // Cast to Property[], assuming defaults cover required fields
         setRecommendations(validRecommendations);
      } else {
          setError('No recommendations received from the AI.');
           toast({
             title: "Recommendation Issue",
             description: "Could not get recommendations at this time.",
             variant: "destructive",
           });
      }

    } catch (err) {
       console.error('Error fetching recommendations:', err);
       let message = 'Failed to fetch recommendations.';
       if (err instanceof Error) {
         message = `${message} ${err.message}`;
       }
       setError(message);
        toast({
          title: "Error",
          description: message,
          variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  };

   // Optionally fetch recommendations on component mount
   // useEffect(() => {
   //   fetchRecommendations();
   // }, []);


  return (
    <section id="recommendations" className="container py-12 md:py-16">
      <Card className="bg-secondary/50 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl md:text-3xl font-bold text-center">
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
           <p className="text-muted-foreground mb-6">
            Get property suggestions tailored to your activity and preferences.
          </p>
          <Button onClick={fetchRecommendations} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Get My Recommendations'
            )}
          </Button>

          {error && <p className="text-destructive mt-4">{error}</p>}

          {recommendations.length > 0 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 text-left">
              {recommendations.map((property) => (
                // Cast Partial<Property> to Property, assuming parseRecommendations provides necessary fields
                <PropertyCard key={property.id} property={property as Property} />
              ))}
            </div>
          )}
          {!isLoading && !error && recommendations.length === 0 && recommendations !== null && (
             <p className="text-muted-foreground mt-6">Click the button above to generate recommendations.</p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
