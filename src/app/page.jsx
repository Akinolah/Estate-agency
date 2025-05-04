
import { HeroSlider } from '@/components/hero-slider';
import { PropertyListings } from '@/components/property-listings';
import { InteractiveMapSection } from '@/components/interactive-map-section';
import { VirtualToursSection } from '@/components/virtual-tours-section';
import { MortgageCalculatorSection } from '@/components/mortgage-calculator-section';
import { CustomerReviews } from '@/components/customer-reviews';
import { ContactFormSection } from '@/components/contact-form-section';
import { GalleryRoom } from '@/components/gallery-room';
// Removed type import

// Placeholder data for properties - Updated for Nigerian context
const sampleProperties = [
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
    galleryImages: [ // Updated gallery images for Gallery Room with relevant hints
      { id: 'g1', src: 'https://picsum.photos/seed/gallery1aNG/800/600', alt: 'Modern Living Room Lagos', 'data-ai-hint': 'modern living room interior luxury nigeria' },
      { id: 'g2', src: 'https://picsum.photos/seed/gallery1bNG/800/600', alt: 'Fitted Kitchen VI', 'data-ai-hint': 'luxury kitchen interior appliances nigeria' },
      { id: 'g3', src: 'https://picsum.photos/seed/gallery1cNG/800/600', alt: 'Master Bedroom Suite Lagos', 'data-ai-hint': 'master bedroom interior luxury bed nigeria' },
      { id: 'g4', src: 'https://picsum.photos/seed/gallery1dNG/800/600', alt: 'Swimming Pool Area VI', 'data-ai-hint': 'swimming pool house exterior luxury nigeria' },
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
    galleryImages: [ // Updated gallery images
      { id: 'g5', src: 'https://picsum.photos/seed/gallery2aNG/800/600', alt: 'Terrace Exterior Abuja', 'data-ai-hint': 'terrace house exterior abuja nigeria' },
      { id: 'g6', src: 'https://picsum.photos/seed/gallery2bNG/800/600', alt: 'Bedroom Abuja', 'data-ai-hint': 'bedroom interior modern nigeria' },
      { id: 'g7', src: 'https://picsum.photos/seed/gallery2cNG/800/600', alt: 'Fitted Kitchen Wuse 2', 'data-ai-hint': 'kitchen interior fitted modern nigeria' },
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
     galleryImages: [ // Updated gallery images
      { id: 'g8', src: 'https://picsum.photos/seed/gallery3aNG/800/600', alt: 'Apartment Living Area Lekki', 'data-ai-hint': 'apartment living area interior nigeria' },
      { id: 'g9', src: 'https://picsum.photos/seed/gallery3bNG/800/600', alt: 'Kitchenette Lekki', 'data-ai-hint': 'kitchenette interior apartment nigeria' },
    ],
     isFeatured: false,
     amenities: ['Serviced Apartment', 'Standby Generator', 'Water Treatment'],
  },
];

// Sample reviews data - Can be localized or made more specific
const sampleReviews = [
  {
    id: 'r1',
    name: 'Adekunle B.',
    rating: 5,
    review:
      'Estate Agency helped us find our perfect home in Lagos! The process was smooth and their agents were very professional.',
    imageUrl: 'https://picsum.photos/seed/rev1ng/100/100',
  },
  {
    id: 'r2',
    name: 'Chioma C.',
    rating: 4,
    review:
      'Great platform with lots of useful features. The mortgage calculator helped us plan our finances for our Abuja property.',
    imageUrl: 'https://picsum.photos/seed/rev2ng/100/100',
  },
  {
    id: 'r3',
    name: 'Musa D.',
    rating: 5,
    review:
      'The virtual tours are amazing! It felt like I was really there exploring the house in Lekki. Highly recommend Estate Agency.',
    imageUrl: 'https://picsum.photos/seed/rev3ng/100/100',
  },
];

// Section IDs remain for internal linking if needed
const SECTION_IDS = {
  listings: 'home-listings',
  gallery: 'home-gallery',
  map: 'home-map',
  tours: 'home-tours',
  calculator: 'home-calculator',
  reviews: 'home-reviews',
  contact: 'home-contact',
};


export default function Home() {
  return (
    <div className="flex flex-col space-y-16 md:space-y-24">
      <HeroSlider />

      {/* Sections on the homepage */}
      <section id={SECTION_IDS.listings}>
        <PropertyListings initialProperties={sampleProperties} />
      </section>

      {/* Property Recommendations section removed */}

       {/* Conditionally render Gallery Room if there are properties with gallery images */}
      {sampleProperties.some(p => p.galleryImages && p.galleryImages.length > 0) && (
        <section id={SECTION_IDS.gallery}>
             <GalleryRoom properties={sampleProperties.filter(p => p.galleryImages && p.galleryImages.length > 0)} />
         </section>
      )}

      <section id={SECTION_IDS.map}>
        <InteractiveMapSection properties={sampleProperties} />
      </section>

      <section id={SECTION_IDS.tours}>
         <VirtualToursSection properties={sampleProperties} />
       </section>

      <section id={SECTION_IDS.calculator}>
        <MortgageCalculatorSection />
      </section>

      <section id={SECTION_IDS.reviews}>
        <CustomerReviews reviews={sampleReviews} />
       </section>

      <section id={SECTION_IDS.contact}>
        <ContactFormSection />
      </section>
    </div>
  );
}
