// src/app/services/page.tsx
import { InteractiveMapSection } from '@/components/interactive-map-section';
import { MortgageCalculatorSection } from '@/components/mortgage-calculator-section';
import { VirtualToursSection } from '@/components/virtual-tours-section';
import { PropertyRecommendations } from '@/components/property-recommendations';
import { GalleryRoom } from '@/components/gallery-room';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Handshake, Search, Network, Wrench, Bot, Home } from 'lucide-react';
import type { Property } from '@/types/property';
import Image from 'next/image';

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
        <section id="core-services">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center p-6">
                     <CardHeader className="p-0 mb-4">
                         <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3 inline-flex">
                            <Handshake className="w-8 h-8" />
                         </div>
                        <CardTitle className="text-xl font-semibold">Buyer Representation</CardTitle>
                     </CardHeader>
                     <CardContent className="p-0">
                        <CardDescription className="text-sm">
                             Expert guidance through the entire home buying process, from search to closing.
                             We negotiate on your behalf to secure the best deal.
                         </CardDescription>
                    </CardContent>
                </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center p-6">
                     <CardHeader className="p-0 mb-4">
                         <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3 inline-flex">
                            <Home className="w-8 h-8" />
                         </div>
                        <CardTitle className="text-xl font-semibold">Seller Representation</CardTitle>
                     </CardHeader>
                     <CardContent className="p-0">
                        <CardDescription className="text-sm">
                             Strategic marketing and pricing for your property. We manage showings, offers,
                             and negotiations to achieve a successful sale.
                        </CardDescription>
                    </CardContent>
                 </Card>

                <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center p-6">
                     <CardHeader className="p-0 mb-4">
                         <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3 inline-flex">
                            <Search className="w-8 h-8" />
                         </div>
                        <CardTitle className="text-xl font-semibold">Advanced Property Search</CardTitle>
                     </CardHeader>
                     <CardContent className="p-0">
                        <CardDescription className="text-sm">
                            Utilize our powerful platform with detailed filters, map search, and saved search
                            notifications to find properties easily.
                         </CardDescription>
                    </CardContent>
                </Card>

                 <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center p-6">
                     <CardHeader className="p-0 mb-4">
                         <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3 inline-flex">
                            <Bot className="w-8 h-8" />
                         </div>
                        <CardTitle className="text-xl font-semibold">AI-Powered Insights</CardTitle>
                     </CardHeader>
                     <CardContent className="p-0">
                        <CardDescription className="text-sm">
                            Receive personalized property recommendations based on your behavior and preferences,
                            powered by our intelligent algorithms.
                         </CardDescription>
                     </CardContent>
                </Card>

                 <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center p-6">
                     <CardHeader className="p-0 mb-4">
                         <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3 inline-flex">
                            <Network className="w-8 h-8" />
                         </div>
                        <CardTitle className="text-xl font-semibold">Market Analysis</CardTitle>
                     </CardHeader>
                     <CardContent className="p-0">
                        <CardDescription className="text-sm">
                            Stay informed with comprehensive market reports, neighborhood insights, and property
                            valuation estimates.
                         </CardDescription>
                     </CardContent>
                </Card>

                 <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center p-6">
                    <CardHeader className="p-0 mb-4">
                        <div className="bg-primary text-primary-foreground rounded-full p-4 mb-3 inline-flex">
                            <Wrench className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-xl font-semibold">Resource Connections</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <CardDescription className="text-sm">
                            Access our network of trusted professionals, including mortgage lenders, inspectors,
                             and contractors.
                        </CardDescription>
                    </CardContent>
                 </Card>
             </div>
        </section>

      {/* Technology Showcase Section */}
      <section id="tech-showcase" className="space-y-16 md:space-y-20">
         <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Leveraging Technology for You</h2>

        {/* Each component can be wrapped or presented as part of the service page */}
        {/* We add descriptive text around each reused component */}

        <div className="p-6 md:p-8 rounded-lg bg-secondary/30">
           <h3 className="text-2xl font-semibold mb-4">Personalized Recommendations</h3>
           <p className="text-muted-foreground mb-6">Our AI analyzes your activity to suggest properties you might love. Give it a try!</p>
            <PropertyRecommendations />
        </div>

         <div className="p-6 md:p-8 rounded-lg bg-secondary/30">
            <h3 className="text-2xl font-semibold mb-4">Explore with Virtual Tours</h3>
             <p className="text-muted-foreground mb-6">Step inside properties anytime, anywhere with our immersive virtual tours.</p>
            <VirtualToursSection properties={sampleProperties.filter(p => p.virtualTourUrl)} />
         </div>

         <div className="p-6 md:p-8 rounded-lg bg-secondary/30">
             <h3 className="text-2xl font-semibold mb-4">Visualize Property Galleries</h3>
             <p className="text-muted-foreground mb-6">See properties in detail through curated image galleries.</p>
            <GalleryRoom properties={sampleProperties.filter(p => p.galleryImages && p.galleryImages.length > 0)} />
        </div>

        <div className="p-6 md:p-8 rounded-lg bg-secondary/30">
            <h3 className="text-2xl font-semibold mb-4">Interactive Map Search</h3>
             <p className="text-muted-foreground mb-6">Discover properties based on location and explore neighborhoods visually.</p>
            <InteractiveMapSection properties={sampleProperties} />
         </div>

         <div className="p-6 md:p-8 rounded-lg bg-secondary/30">
            <h3 className="text-2xl font-semibold mb-4">Estimate Your Mortgage</h3>
             <p className="text-muted-foreground mb-6">Plan your finances with our easy-to-use mortgage calculator.</p>
            <MortgageCalculatorSection />
         </div>

      </section>
    </div>
  );
}
