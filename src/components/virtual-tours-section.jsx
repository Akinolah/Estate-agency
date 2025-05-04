
'use client';

import { useState } from 'react';
// Removed type import
import { PropertyCard } from './property-card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';

// Removed interface

export function VirtualToursSection({ properties }) { // Removed type
  const [selectedTourUrl, setSelectedTourUrl] = useState(null); // Removed type
  const [isModalOpen, setIsModalOpen] = useState(false);

  const propertiesWithTours = properties.filter(p => p.virtualTourUrl);

  const openTourModal = (url) => { // Removed type
    setSelectedTourUrl(url);
    setIsModalOpen(true);
  };

   const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTourUrl(null);
  };


  return (
    // Container div without the section ID
    <div className="container py-12 md:py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Immersive Virtual Tours</h2>
      <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
        Explore properties from the comfort of your home with our high-definition virtual tours. Click 'Virtual Tour' on a listing below.
      </p>

      {propertiesWithTours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {propertiesWithTours.map(property => (
             // Enhance PropertyCard or handle click here to trigger modal
             <div key={property.id}>
                 <PropertyCard property={property} />
                 {/* Add a button here if PropertyCard doesn't handle the modal trigger */}
                 {/* Example:
                 <Button onClick={() => openTourModal(property.virtualTourUrl)} className="mt-2 w-full"> // Removed non-null assertion
                    <Video className="mr-2 h-4 w-4" /> Open Virtual Tour
                 </Button>
                 */}
                 {/* Ensure PropertyCard's Virtual Tour button calls openTourModal if it exists */}
             </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground mt-12">No properties currently feature virtual tours.</p>
      )}

        {/* Virtual Tour Modal */}
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
            <DialogContent className="sm:max-w-[90vw] max-h-[90vh] p-0 border-0 bg-background flex flex-col">
                 <DialogHeader className="p-4 border-b">
                    <DialogTitle>Virtual Tour</DialogTitle>
                    {/* Optional: Add property address here */}
                </DialogHeader>
                 <div className="flex-grow overflow-hidden">
                    {selectedTourUrl ? (
                        <iframe
                            src={selectedTourUrl}
                            width="100%"
                            height="100%" // Ensure parent div has height
                            style={{ border: 0 }}
                            allowFullScreen={true}
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Virtual Property Tour"
                        ></iframe>
                    ) : (
                        <p className="text-center p-8">Loading tour...</p>
                    )}
                 </div>
            </DialogContent>
        </Dialog>

    </div>
  );
}
