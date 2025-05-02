// src/app/services/page.tsx
import { CoreServicesGrid } from '@/components/services-page-components/core-services-grid';
import { TechShowcase } from '@/components/services-page-components/tech-showcase';
import type { Property } from '@/types/property';
import { Home } from 'lucide-react'; // Import Home icon

// Sample properties needed for Map, Tours, Recommendations, Gallery
const sampleProperties: Property[] = [
   {
    id: 's1',
    address: '1 Service Ave, Helping Hand City',
    price: 600000,
    bedrooms: 3,
    bathrooms: 2,
    area: 1900,
    type: 'House',
    images: ['https://picsum.photos/seed/servprop1/800/600'],
    latitude: 34.06,
    longitude: -118.26,
    description: 'Example property for service demonstration.',
    virtualTourUrl: 'https://your-virtual-tour-provider.com/tour/s1',
     videos: [],
     '3dAnimationUrl': undefined,
     galleryImages: [{ id: 'sg1', src: 'https://picsum.photos/seed/servgal1/800/600', alt: 'Service Demo Image' }],
  },
   {
    id: 's2',
    address: '2 Support St, Client Corner',
    price: 450000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    type: 'Condo',
    images: ['https://picsum.photos/seed/servprop2/800/600'],
    latitude: 34.07,
    longitude: -118.27,
    description: 'Another property showcasing our services.',
    virtualTourUrl: undefined,
     videos: [],
     '3dAnimationUrl': undefined,
      galleryImages: [{ id: 'sg2', src: 'https://picsum.photos/seed/servgal2/800/600', alt: 'Client Focused Room' }],
  },
];


export default function ServicesPage() {
  return (
    <div className="flex flex-col space-y-16 md:space-y-24 container py-12 md:py-16">

       {/* Services Overview Section */}
        <section id="services-overview" className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Comprehensive Services</h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                 EstateFindr offers a full suite of services to support you whether you're buying, selling,
                 or just exploring the real estate market.
             </p>
        </section>

       {/* Core Services Grid */}
       <CoreServicesGrid />

      {/* Technology Showcase Section */}
      <TechShowcase sampleProperties={sampleProperties} />

    </div>
  );
}
