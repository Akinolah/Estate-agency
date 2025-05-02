'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const slides = [
  {
    id: 1,
    imageUrl: 'https://picsum.photos/seed/slide1/1920/800',
    alt: 'Modern House Exterior',
    title: 'Find Your Dream Home Today',
    subtitle: 'Explore thousands of listings with advanced search features.',
    dataAiHint: 'modern house exterior day',
  },
  {
    id: 2,
    imageUrl: 'https://picsum.photos/seed/slide2/1920/800',
    alt: 'Cozy Living Room Interior',
    title: 'Personalized Recommendations',
    subtitle: 'Let our AI find properties tailored just for you.',
     dataAiHint: 'cozy living room interior',
  },
  {
    id: 3,
    imageUrl: 'https://picsum.photos/seed/slide3/1920/800',
    alt: 'Family in front of a new house',
    title: 'Expert Guidance Every Step',
    subtitle: 'Our experienced agents are here to help you navigate the market.',
     dataAiHint: 'family new house sold sign',
  },
];

export function HeroSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setCurrentIndex((prevIndex) =>
          prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        ),
      5000 // Change slide every 5 seconds
    );

    return () => {
      resetTimeout();
    };
  }, [currentIndex]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] w-full overflow-hidden">
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={cn(
              'absolute inset-0 transition-opacity duration-1000 ease-in-out',
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
            )}
          >
            <Image
              src={slide.imageUrl}
              alt={slide.alt}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
              priority={index === 0} // Prioritize loading the first slide image
              data-ai-hint={slide.dataAiHint}
            />
            <div className="absolute inset-0 bg-black/40"></div> {/* Dark overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 z-20">
              <h1
                className={cn(
                  'text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-700 ease-out',
                  index === currentIndex
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                )}
                style={{ transitionDelay: index === currentIndex ? '0.2s' : '0s' }}
              >
                {slide.title}
              </h1>
              <p
                className={cn(
                  'text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl transition-all duration-700 ease-out',
                  index === currentIndex
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                )}
                 style={{ transitionDelay: index === currentIndex ? '0.4s' : '0s' }}
              >
                {slide.subtitle}
              </p>
              <Button
                size="lg"
                className={cn(
                  'bg-accent text-accent-foreground hover:bg-accent/90 transition-all duration-700 ease-out',
                   index === currentIndex
                    ? 'scale-100 opacity-100'
                    : 'scale-90 opacity-0'
                )}
                 style={{ transitionDelay: index === currentIndex ? '0.6s' : '0s' }}
              >
                Get Started
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 rounded-full bg-white/30 hover:bg-white/50 border-none text-white"
        onClick={goToPrevious}
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 rounded-full bg-white/30 hover:bg-white/50 border-none text-white"
        onClick={goToNext}
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

       {/* Dots Indicator */}
       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors duration-300",
                  currentIndex === index ? "bg-white" : "bg-white/50 hover:bg-white/75"
                )}
                 aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
    </section>
  );
}
