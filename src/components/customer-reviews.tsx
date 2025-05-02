'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
  imageUrl?: string; // Optional image URL for avatar
}

interface CustomerReviewsProps {
  reviews: Review[];
}

export function CustomerReviews({ reviews }: CustomerReviewsProps) {
  if (!reviews || reviews.length === 0) {
    return null; // Don't render the section if there are no reviews
  }

  return (
    <section id="reviews" className="bg-muted py-12 md:py-16">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">What Our Clients Say</h2>

        <Carousel
          opts={{
            align: "start",
            loop: reviews.length > 2, // Loop only if enough items
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review) => (
              <CarouselItem key={review.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col shadow-md hover:shadow-lg transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <Avatar>
                        <AvatarImage src={review.imageUrl} alt={review.name} data-ai-hint="person portrait professional" />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold">{review.name}</p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2 flex-grow">
                      <p className="text-sm text-muted-foreground italic">
                        &ldquo;{review.review}&rdquo;
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {reviews.length > 1 && ( // Show arrows only if more than 1 review
            <>
                <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden md:flex" />
                <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden md:flex" />
            </>
           )}
        </Carousel>
      </div>
    </section>
  );
}
