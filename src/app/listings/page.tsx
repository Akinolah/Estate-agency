
// src/app/listings/page.tsx
import { PropertyListings } from '@/components/property-listings';
import type { Property } from '@/types/property';

// Placeholder data - Updated for Nigerian context
const sampleProperties: Property[] = [
   {
    id: '1',
    address: '15, Adeola Odeku Street',
    city: 'Victoria Island',
    state: 'Lagos',
    price: 1200000, // Price in USD (base currency)
    bedrooms: 5,
    bathrooms: 6,
    area: 600, // sqm
    type: 'Detached Duplex',
    images: [
      'https://picsum.photos/seed/lagosprop1img1/800/600',
      'https://picsum.photos/seed/lagosprop1img2/800/600',
      'https://picsum.photos/seed/lagosprop1img3/800/600',
    ],
    latitude: 6.4315,
    longitude: 3.4167,
    virtualTourUrl: 'https://your-virtual-tour-provider.com/tour/1',
    description:
      'Luxurious 5-bedroom detached duplex in the heart of Victoria Island. Features a swimming pool, BQ, and ample parking space.',
    videos: ['https://www.youtube.com/embed/dQw4w9WgXcQ'], // Example video
    '3dAnimationUrl': 'https://your-3d-provider.com/model/1', // Example 3D model URL
    galleryImages: [ // Add gallery images for Gallery Room
      { id: 'g1', src: 'https://picsum.photos/seed/gallery1a/800/600', alt: 'Living Room' },
      { id: 'g2', src: 'https://picsum.photos/seed/gallery1b/800/600', alt: 'Kitchen' },
      { id: 'g3', src: 'https://picsum.photos/seed/gallery1c/800/600', alt: 'Master Bedroom' },
      { id: 'g4', src: 'https://picsum.photos/seed/gallery1d/800/600', alt: 'Swimming Pool' },
    ],
    isFeatured: true,
    amenities: ['Swimming Pool', "Boys' Quarters", '24/7 Security', 'Gym'],
  },
  {
    id: '2',
    address: 'Plot 10, Wuse 2',
    city: 'Abuja',
    state: 'FCT',
    price: 850000, // Price in USD
    bedrooms: 4,
    bathrooms: 4,
    area: 450, // sqm
    type: 'Terraced House',
    images: [
      'https://picsum.photos/seed/abjprop2img1/800/600',
      'https://picsum.photos/seed/abjprop2img2/800/600',
    ],
    latitude: 9.0765, // Approx Abuja coordinates
    longitude: 7.4965, // Approx Abuja coordinates
    virtualTourUrl: 'https://your-virtual-tour-provider.com/tour/2',
    description:
      'Modern 4-bedroom terrace house in a serene estate in Wuse 2. Comes with fitted kitchen and ensuite rooms.',
    videos: [],
    '3dAnimationUrl': undefined,
    galleryImages: [
      { id: 'g5', src: 'https://picsum.photos/seed/gallery2a/800/600', alt: 'Exterior View' },
      { id: 'g6', src: 'https://picsum.photos/seed/gallery2b/800/600', alt: 'Bedroom' },
      { id: 'g7', src: 'https://picsum.photos/seed/gallery2c/800/600', alt: 'Fitted Kitchen' },
    ],
     isFeatured: false,
    amenities: ['Gated Estate', 'Fitted Kitchen', 'Interlocked Compound'],
  },
   {
    id: '3',
    address: '21, Admiralty Way',
    city: 'Lekki Phase 1',
     state: 'Lagos',
    price: 500000, // Price in USD
    bedrooms: 3,
    bathrooms: 3,
    area: 180, // sqm
    type: 'Flat/Apartment',
    images: ['https://picsum.photos/seed/lekprop3img1/800/600'],
    latitude: 6.4477, // Approx Lekki Phase 1 coordinates
    longitude: 3.4702, // Approx Lekki Phase 1 coordinates
    virtualTourUrl: undefined,
    description:
      'Well-maintained 3-bedroom flat in a serviced apartment block in Lekki Phase 1. Close to shops and restaurants.',
    videos: [],
    '3dAnimationUrl': undefined,
     galleryImages: [
      { id: 'g8', src: 'https://picsum.photos/seed/gallery3a/800/600', alt: 'Living Area' },
      { id: 'g9', src: 'https://picsum.photos/seed/gallery3b/800/600', alt: 'Kitchenette' },
    ],
     isFeatured: false,
     amenities: ['Serviced Apartment', 'Standby Generator', 'Water Treatment'],
  },
   {
    id: '4',
    address: '5, Banana Island Road',
    city: 'Ikoyi',
    state: 'Lagos',
    price: 3500000, // Price in USD
    bedrooms: 6,
    bathrooms: 7,
    area: 1000, // sqm
    type: 'Mansion',
    images: ['https://picsum.photos/seed/ikoyiprop4img1/800/600','https://picsum.photos/seed/ikoyiprop4img2/800/600'],
    latitude: 6.4590, // Approx Ikoyi coordinates
    longitude: 3.4441, // Approx Ikoyi coordinates
    virtualTourUrl: 'https://your-virtual-tour-provider.com/tour/4',
    description:
      'Exquisite waterfront mansion in Banana Island, Ikoyi. Offers unparalleled luxury, jetty access, and panoramic views.',
    videos: [],
    '3dAnimationUrl': undefined,
     galleryImages: [
        { id: 'g10', src: 'https://picsum.photos/seed/gallery4a/800/600', alt: 'Grand Foyer' },
        { id: 'g11', src: 'https://picsum.photos/seed/gallery4b/800/600', alt: 'Waterfront View' },
        { id: 'g12', src: 'https://picsum.photos/seed/gallery4c/800/600', alt: 'Cinema Room' },
     ],
      isFeatured: true,
      amenities: ['Waterfront', 'Jetty', 'Cinema Room', 'Swimming Pool', 'Gym', 'Smart Home'],
  },
  // Add more sample properties if needed
];

export default function ListingsPage() {
  return (
    <div className="flex flex-col space-y-8 md:space-y-12"> {/* Adjust spacing */}
        {/* Optionally add a page-specific header/title */}
        <div className="container pt-8 text-center">
             <h1 className="text-4xl md:text-5xl font-bold mb-2">Explore Properties in Nigeria</h1>
             <p className="text-lg text-muted-foreground">Find your next home or investment from our curated list.</p>
        </div>

      {/* Render the PropertyListings component */}
      <PropertyListings initialProperties={sampleProperties} />

       {/* You could add other sections relevant to the listings page here */}
        {/* For example, a section explaining the buying process or featured neighborhoods */}

    </div>
  );
}
