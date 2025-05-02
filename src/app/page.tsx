import { HeroSlider } from '@/components/hero-slider';
import { PropertyListings } from '@/components/property-listings';
import { PropertyRecommendations } from '@/components/property-recommendations';
import { InteractiveMapSection } from '@/components/interactive-map-section';
import { VirtualToursSection } from '@/components/virtual-tours-section';
import { MortgageCalculatorSection } from '@/components/mortgage-calculator-section';
import { CustomerReviews } from '@/components/customer-reviews';
import { ContactFormSection } from '@/components/contact-form-section';
import { GalleryRoom } from '@/components/gallery-room';
import type { Property } from '@/types/property';

// Placeholder data for properties
const sampleProperties: Property[] = [
  {
    id: '1',
    address: '123 Dream Lane, Imagination City',
    price: 500000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: 'House',
    images: [
      'https://picsum.photos/seed/prop1img1/800/600',
      'https://picsum.photos/seed/prop1img2/800/600',
      'https://picsum.photos/seed/prop1img3/800/600',
    ],
    latitude: 34.0522,
    longitude: -118.2437,
    virtualTourUrl: 'https://your-virtual-tour-provider.com/tour/1',
    description:
      'A beautiful family home in a quiet neighborhood. Features a large backyard and modern kitchen.',
    videos: ['https://www.youtube.com/embed/dQw4w9WgXcQ'], // Example video
    '3dAnimationUrl': 'https://your-3d-provider.com/model/1', // Example 3D model URL
    galleryImages: [ // Add gallery images for Gallery Room
      { id: 'g1', src: 'https://picsum.photos/seed/gallery1a/800/600', alt: 'Living Room' },
      { id: 'g2', src: 'https://picsum.photos/seed/gallery1b/800/600', alt: 'Kitchen' },
      { id: 'g3', src: 'https://picsum.photos/seed/gallery1c/800/600', alt: 'Bedroom 1' },
      { id: 'g4', src: 'https://picsum.photos/seed/gallery1d/800/600', alt: 'Backyard' },
    ],
  },
  {
    id: '2',
    address: '456 Opportunity Ave, Creative Corner',
    price: 750000,
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    type: 'Condo',
    images: [
      'https://picsum.photos/seed/prop2img1/800/600',
      'https://picsum.photos/seed/prop2img2/800/600',
    ],
    latitude: 34.055,
    longitude: -118.25,
    virtualTourUrl: 'https://your-virtual-tour-provider.com/tour/2',
    description:
      'Luxurious condo with stunning city views. Includes access to gym and pool.',
    videos: [],
    '3dAnimationUrl': undefined,
    galleryImages: [
      { id: 'g5', src: 'https://picsum.photos/seed/gallery2a/800/600', alt: 'View from Balcony' },
      { id: 'g6', src: 'https://picsum.photos/seed/gallery2b/800/600', alt: 'Master Bedroom' },
      { id: 'g7', src: 'https://picsum.photos/seed/gallery2c/800/600', alt: 'Building Exterior' },
    ],
  },
  {
    id: '3',
    address: '789 Serenity St, Peaceful Place',
    price: 320000,
    bedrooms: 2,
    bathrooms: 1,
    area: 1200,
    type: 'Townhouse',
    images: ['https://picsum.photos/seed/prop3img1/800/600'],
    latitude: 34.048,
    longitude: -118.24,
    virtualTourUrl: undefined,
    description:
      'Cozy townhouse perfect for first-time buyers. Close to parks and schools.',
    videos: [],
    '3dAnimationUrl': undefined,
     galleryImages: [
      { id: 'g8', src: 'https://picsum.photos/seed/gallery3a/800/600', alt: 'Cozy Living Area' },
      { id: 'g9', src: 'https://picsum.photos/seed/gallery3b/800/600', alt: 'Small Kitchen' },
    ],
  },
];

// Sample reviews data
const sampleReviews = [
  {
    id: 'r1',
    name: 'Alice B.',
    rating: 5,
    review:
      'EstateFindr helped us find our perfect home! The process was smooth and the recommendations were spot on.',
    imageUrl: 'https://picsum.photos/seed/rev1/100/100',
  },
  {
    id: 'r2',
    name: 'Bob C.',
    rating: 4,
    review:
      'Great platform with lots of useful features. The mortgage calculator was very helpful.',
    imageUrl: 'https://picsum.photos/seed/rev2/100/100',
  },
  {
    id: 'r3',
    name: 'Charlie D.',
    rating: 5,
    review:
      'The virtual tours are amazing! It felt like I was really there. Highly recommend EstateFindr.',
    imageUrl: 'https://picsum.photos/seed/rev3/100/100',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col space-y-16 md:space-y-24">
      <HeroSlider />

      <PropertyListings initialProperties={sampleProperties} />

      <PropertyRecommendations />

       {/* Conditionally render Gallery Room if there are properties with gallery images */}
      {sampleProperties.some(p => p.galleryImages && p.galleryImages.length > 0) && (
        <GalleryRoom properties={sampleProperties.filter(p => p.galleryImages && p.galleryImages.length > 0)} />
      )}


      <InteractiveMapSection properties={sampleProperties} />

      <VirtualToursSection properties={sampleProperties} />

      <MortgageCalculatorSection />

      <CustomerReviews reviews={sampleReviews} />

      <ContactFormSection />
    </div>
  );
}
