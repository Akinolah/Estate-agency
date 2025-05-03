
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BedDouble, Bath, Square, MapPin, Video, Users, ThumbsUp, Orbit, Phone, MessageSquare, Home } from 'lucide-react'; // Added Home
import type { Property } from '@/types/property';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useCurrency } from '@/hooks/useCurrency'; // Import the currency hook


interface PropertyCardProps {
  property: Property;
}

// Example contact info - ideally this comes from property data or agent info
const agentContact = {
    phone: '+2348012345678', // Example Nigerian phone format
    whatsappNumber: '+2348012345678', // Use international format
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { formatPrice, selectedCurrency } = useCurrency(); // Use the currency hook

  const formattedPrice = formatPrice(property.price);

  return (
    <Card
      className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col h-full" // Added h-full
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0 relative">
        <Carousel className="w-full">
            <CarouselContent>
             {property.images && property.images.length > 0 ? (
                property.images.map((img, index) => (
                   <CarouselItem key={index}>
                    <div className="aspect-video relative w-full">
                        <Image
                          src={img}
                          alt={`${property.address} - Image ${index + 1}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          style={{ objectFit: 'cover' }}
                          className={cn(
                            'transition-transform duration-500 ease-in-out',
                            isHovered ? 'scale-105' : 'scale-100'
                          )}
                          data-ai-hint="house exterior interior"
                        />
                     </div>
                   </CarouselItem>
                 ))
             ) : (
                 // Placeholder if no images
                 <CarouselItem>
                    <div className="aspect-video relative w-full bg-muted flex items-center justify-center">
                       <Home className="w-12 h-12 text-muted-foreground opacity-50" />
                    </div>
                 </CarouselItem>
             )}
            </CarouselContent>
             {property.images && property.images.length > 1 && (
              <>
                <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 text-foreground" />
                <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-background/50 hover:bg-background/80 text-foreground" />
              </>
            )}
        </Carousel>

        <Badge variant="secondary" className="absolute top-2 left-2 z-10">
          {property.type}
        </Badge>
         {property.videos && property.videos.length > 0 && (
          <Badge variant="destructive" className="absolute top-2 right-2 z-10">
            <Video className="w-3 h-3 mr-1" /> Video
          </Badge>
        )}
        {property['3dAnimationUrl'] && (
             <Badge variant="default" className="absolute top-10 right-2 z-10 bg-blue-500 text-white">
              <Orbit className="w-3 h-3 mr-1" /> 3D
            </Badge>
        )}
      </CardHeader>
       <CardContent className="p-4 flex flex-col flex-grow"> {/* Added flex flex-col flex-grow */}
        <CardTitle className="text-xl font-semibold mb-1 truncate">
           {formattedPrice} {/* Display formatted price */}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 flex items-center">
           <MapPin className="w-4 h-4 mr-1 shrink-0" />
           {/* Construct Nigerian address format */}
           <span className="truncate">{`${property.address}, ${property.city}, ${property.state}`}</span>
        </CardDescription>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm mb-4">
          <div className="flex items-center">
            <BedDouble className="w-4 h-4 mr-1 text-primary" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 mr-1 text-primary" />
            <span>{property.bathrooms} Baths</span>
          </div>
          {property.area && (
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1 text-primary" />
              {/* Assume area is in square meters if common in Nigeria, or add unit */}
              <span>{property.area.toLocaleString()} sqm</span>
            </div>
          )}
        </div>
         <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-grow"> {/* Added flex-grow */}
            {property.description}
         </p>
          {/* Moved action buttons to CardFooter */}
      </CardContent>
       <CardFooter className="p-4 pt-2 border-t mt-auto flex flex-wrap gap-2 justify-start"> {/* Added mt-auto, border-t, justify-start */}
             {property.virtualTourUrl && (
                <Button variant="outline" size="sm" asChild>
                    <Link href={property.virtualTourUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Video className="mr-1 h-4 w-4" /> Tour
                    </Link>
                </Button>
            )}
             {property.galleryImages && property.galleryImages.length > 0 && (
                <Button variant="outline" size="sm" onClick={() => { /* TODO: Open Gallery Modal */ }}>
                    <Users className="mr-1 h-4 w-4" /> Gallery
                </Button>
            )}
            {property['3dAnimationUrl'] && (
                <Button variant="outline" size="sm" asChild>
                    <Link href={property['3dAnimationUrl']} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        <Orbit className="mr-1 h-4 w-4" /> 3D View
                    </Link>
                </Button>
             )}
             {/* Contact Buttons */}
             <Button variant="outline" size="sm" asChild>
                  <a href={`tel:${agentContact.phone}`} className="flex items-center">
                    <Phone className="mr-1 h-4 w-4" /> Call
                 </a>
             </Button>
            <Button variant="outline" size="sm" asChild>
                 <a href={`https://wa.me/${agentContact.whatsappNumber}?text=Hi,%20I'm%20interested%20in%20the%20property%20at%20${encodeURIComponent(property.address)}%20(ID:%20${property.id})`} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <MessageSquare className="mr-1 h-4 w-4" /> WhatsApp
                 </a>
            </Button>
       </CardFooter>
    </Card>
  );
}
