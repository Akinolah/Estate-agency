
// src/app/services/page.tsx
import { CoreServicesGrid } from '@/components/services-page-components/core-services-grid';
import { TechShowcase } from '@/components/services-page-components/tech-showcase';
import type { Property } from '@/types/property';

// Sample properties needed for Map, Tours, Gallery - Nigerian context
const sampleProperties: Property[] = [
   {
    id: 's1',
    address: '1 Service Avenue',
    city: 'Ikeja',
    state: 'Lagos',
    price: 600000, // Base price USD
    bedrooms: 3,
    bathrooms: 2,
    area: 190, // sqm
    type: 'Semi-Detached Duplex',
    images: ['https://picsum.photos/seed/servprop1ng/800/600'],
    latitude: 6.6018, // Approx Ikeja
    longitude: 3.3515, // Approx Ikeja
    description: 'Example property for service demonstration in Ikeja.',
    virtualTourUrl: 'https://your-virtual-tour-provider.com/tour/s1',
     videos: [],
     '3dAnimationUrl': undefined,
     galleryImages: [{ id: 'sg1', src: 'https://picsum.photos/seed/servgal1ng/800/600', alt: 'Service Demo Image Ikeja' }],
  },
   {
    id: 's2',
    address: '2 Support Street, Garki',
    city: 'Abuja',
    state: 'FCT',
    price: 450000, // Base price USD
    bedrooms: 2,
    bathrooms: 2,
    area: 150, // sqm
    type: 'Flat/Apartment',
    images: ['https://picsum.photos/seed/servprop2ng/800/600'],
    latitude: 9.057, // Approx Garki
    longitude: 7.489, // Approx Garki
    description: 'Another property showcasing our services in Abuja.',
    virtualTourUrl: undefined,
     videos: [],
     '3dAnimationUrl': undefined,
      galleryImages: [{ id: 'sg2', src: 'https://picsum.photos/seed/servgal2ng/800/600', alt: 'Client Focused Room Abuja' }],
  },
];


export default function ServicesPage() {
  return (
    <div className="flex flex-col space-y-16 md:space-y-24 container py-12 md:py-16">

       {/* Services Overview Section */}
        <section id="services-overview" className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Comprehensive Real Estate Services</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                 Estate Agency offers a full suite of services to support you whether you're buying, selling,
                 or just exploring the real estate market in Nigeria.
             </p>
        </section>

       {/* Core Services Grid */}
       <CoreServicesGrid />

      {/* Technology Showcase Section */}
      <TechShowcase sampleProperties={sampleProperties} />

    </div>
  );
}

