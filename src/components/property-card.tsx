'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BedDouble, Bath, Square, MapPin, Video, Users, ThumbsUp, Orbit } from 'lucide-react';
import type { Property } from '@/types/property';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="p-0 relative">
        <Carousel className="w-full">
            <CarouselContent>
             {property.images.map((img, index) => (
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
             ))}
            </CarouselContent>
            {property.images.length > 1 && (
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
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-xl font-semibold mb-1 truncate">
          ${property.price.toLocaleString()}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 flex items-center">
           <MapPin className="w-4 h-4 mr-1 shrink-0" />
           <span className="truncate">{property.address}</span>
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
              <span>{property.area.toLocaleString()} sqft</span>
            </div>
          )}
        </div>
         <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {property.description}
         </p>
          <div className="flex gap-2 flex-wrap">
             {property.virtualTourUrl && (
                <Button variant="outline" size="sm" asChild>
                    <Link href={property.virtualTourUrl} target="_blank" rel="noopener noreferrer">
                        <Video className="mr-1" /> Virtual Tour
                    </Link>
                </Button>
            )}
             {property.galleryImages && property.galleryImages.length > 0 && (
                <Button variant="outline" size="sm" onClick={() => { /* TODO: Open Gallery Modal */ }}>
                    <Users className="mr-1" /> Gallery Room
                </Button>
            )}
            {property['3dAnimationUrl'] && (
                <Button variant="outline" size="sm" asChild>
                    <Link href={property['3dAnimationUrl']} target="_blank" rel="noopener noreferrer">
                        <Orbit className="mr-1" /> 3D View
                    </Link>
                </Button>
             )}
          </div>

      </CardContent>
       {/* Optional Footer */}
       {/* <CardFooter className="p-4 pt-0">
           <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">View Details</Button>
       </CardFooter> */}
    </Card>
  );
}
