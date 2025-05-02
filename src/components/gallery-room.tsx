'use client'

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Maximize, PictureInPicture } from 'lucide-react';
import type { Property, GalleryImage } from '@/types/property';
import { cn } from '@/lib/utils';

interface GalleryRoomProps {
    properties: Property[]; // Pass properties that have gallery images
}

export function GalleryRoom({ properties }: GalleryRoomProps) {
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (property: Property, index: number) => {
        setSelectedProperty(property);
        setSelectedImageIndex(index);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProperty(null);
         setSelectedImageIndex(0); // Reset index on close
    };

     // Flatten all gallery images from all properties for the main display
     const allGalleryImages = properties.flatMap(prop =>
        prop.galleryImages?.map(img => ({ ...img, propertyId: prop.id, propertyAddress: prop.address })) ?? []
      );


    return (
        // Container div without the section ID
        <div className="container py-12 md:py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Gallery Room</h2>
             <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
                Explore beautiful images from our listings. Click an image to enlarge.
            </p>

            {allGalleryImages.length > 0 ? (
                 // Dynamic Masonry-like layout using CSS columns
                 <div
                    className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4"
                    // Style for masonry effect - ensures images fill columns naturally
                    style={{ columnFill: 'balance' }}
                 >
                    {allGalleryImages.map((image, index) => {
                         // Find the property this image belongs to
                         const property = properties.find(p => p.id === image.propertyId);
                         if (!property) return null; // Should not happen if data is correct

                         // Find the index of this image within its property's gallery
                         const imageIndexInProperty = property.galleryImages?.findIndex(img => img.id === image.id) ?? 0;

                        return (
                            // Use figure for semantic meaning, break-inside avoids items breaking across columns
                            <figure key={`${image.propertyId}-${image.id}`} className="overflow-hidden group cursor-pointer relative rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 block break-inside-avoid" onClick={() => openModal(property, imageIndexInProperty)}>
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    width={800} // Provide base width
                                    height={600} // Provide base height to maintain aspect ratio
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" // Adjust sizes
                                    style={{ width: '100%', height: 'auto', display: 'block' }} // Ensure image is responsive within its container
                                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                                    data-ai-hint="real estate interior exterior detail"
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                     <Maximize className="w-8 h-8 text-white" />
                                </div>
                                {/* Optional: Add caption inside figure */}
                                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <p className="text-white text-sm font-medium truncate">{image.alt}</p>
                                    <p className="text-white text-xs truncate">{image.propertyAddress}</p>
                                 </figcaption>
                            </figure>
                        );
                     })}
                </div>
            ) : (
                 <p className="text-center text-muted-foreground">No gallery images available for the current properties.</p>
            )}


            {/* Image Modal using Dialog and Carousel */}
            <Dialog open={isModalOpen} onOpenChange={closeModal}>
                <DialogContent className="sm:max-w-[80vw] max-h-[90vh] p-0 border-0 bg-transparent shadow-none flex flex-col items-center justify-center">
                     {selectedProperty && selectedProperty.galleryImages && (
                        <Carousel
                            opts={{
                                startIndex: selectedImageIndex,
                                loop: selectedProperty.galleryImages.length > 1, // Loop only if more than one image
                             }}
                             className="w-full max-w-4xl max-h-[80vh]"
                             // Set API to control carousel from outside if needed
                        >
                            <CarouselContent>
                                {selectedProperty.galleryImages.map((image, index) => (
                                    <CarouselItem key={`${selectedProperty?.id}-${image.id}`}>
                                        <div className="relative aspect-video w-full max-h-[75vh] flex items-center justify-center">
                                            <Image
                                                src={image.src}
                                                alt={image.alt}
                                                width={1600}
                                                height={900}
                                                style={{ objectFit: 'contain', maxHeight: '75vh', maxWidth: '100%' }}
                                                className="rounded-md"
                                                data-ai-hint="real estate interior exterior detail enlarged"
                                            />
                                             <div className="absolute bottom-2 left-2 right-2 bg-black/50 text-white p-2 rounded-b-md text-center">
                                                <p className="text-sm font-medium">{image.alt}</p>
                                                <p className="text-xs">{selectedProperty.address}</p>
                                             </div>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                           {selectedProperty.galleryImages.length > 1 && ( // Show arrows only if multiple images
                                <>
                                   <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 text-foreground" />
                                   <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 text-foreground" />
                                </>
                           )}
                        </Carousel>
                     )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
