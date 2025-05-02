// src/app/listings/page.tsx
import { PropertyListings } from '@/components/property-listings';
import type { Property } from '@/types/property';

// Placeholder data - In a real app, fetch this from a database or API
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
    videos: ['https://www.youtube.com/embed/dQw4w9WgXcQ'],
    '3dAnimationUrl': 'https://your-3d-provider.com/model/1',
    galleryImages: [
      { id: 'g1', src: 'https://picsum.photos/seed/gallery1a/800/600', alt: 'Living Room' },
      { id: 'g2', src: 'https://picsum.photos/seed/gallery1b/800/600', alt: 'Kitchen' },
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
     galleryImages: [],
  },
   {
    id: '4',
    address: '101 Innovation Rd, Tech Valley',
    price: 1200000,
    bedrooms: 5,
    bathrooms: 4,
    area: 3500,
    type: 'House',
    images: ['https://picsum.photos/seed/prop4img1/800/600','https://picsum.photos/seed/prop4img2/800/600'],
    latitude: 37.3861,
    longitude: -122.0839,
    virtualTourUrl: 'https://your-virtual-tour-provider.com/tour/4',
    description:
      'Modern smart home with expansive living areas and state-of-the-art features.',
    videos: [],
    '3dAnimationUrl': undefined,
     galleryImages: [
        { id: 'g10', src: 'https://picsum.photos/seed/gallery4a/800/600', alt: 'Modern Kitchen' },
        { id: 'g11', src: 'https://picsum.photos/seed/gallery4b/800/600', alt: 'Smart Living Room' },
        { id: 'g12', src: 'https://picsum.photos/seed/gallery4c/800/600', alt: 'Pool Area' },
     ],
  },
  // Add more sample properties if needed
];

export default function ListingsPage() {
  return (
    <div className="flex flex-col space-y-8 md:space-y-12"> {/* Adjust spacing */}
        {/* Optionally add a page-specific header/title */}
        <div className="container pt-8 text-center">
             <h1 className="text-4xl md:text-5xl font-bold mb-2">Explore Our Properties</h1>
             <p className="text-lg text-muted-foreground">Find your next home from our curated list of available properties.</p>
        </div>

      {/* Render the PropertyListings component */}
      <PropertyListings initialProperties={sampleProperties} />

       {/* You could add other sections relevant to the listings page here */}
        {/* For example, a section explaining the buying process or featured neighborhoods */}

    </div>
  );
}
