
// src/app/about/page.jsx
import { CustomerReviews } from '@/components/customer-reviews';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building, TrendingUp, CheckCircle } from 'lucide-react';

// Re-use sample reviews data - updated for Nigerian context
const sampleReviews = [
  {
    id: 'r1',
    name: 'Adekunle B.',
    rating: 5,
    review:
      'Working with Estate Agency was a fantastic experience. Their team is knowledgeable and truly cares about finding the right fit in Lagos.',
    imageUrl: 'https://picsum.photos/seed/rev1ng/100/100',
  },
  {
    id: 'r2',
    name: 'Aisha S.',
    rating: 5,
    review:
      'The professionalism and dedication shown by Estate Agency were top-notch. They made the complex process of buying a home in Abuja seem easy.',
    imageUrl: 'https://picsum.photos/seed/rev4ng/100/100', // Use different seed
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col space-y-16 md:space-y-24 container py-12 md:py-16">
      {/* About Us Section */}
      <section id="about-us" className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Estate Agency</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          We are dedicated to simplifying the real estate process in Nigeria, leveraging technology and local expertise
          to help you find your perfect property with confidence and ease.
        </p>
         <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <Image
                src="https://picsum.photos/seed/aboutHeroNG/1200/675"
                alt="Estate Agency Team or Office in Nigeria"
                fill
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                style={{ objectFit: 'cover' }}
                data-ai-hint="team meeting office real estate professionals nigeria lagos abuja"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
         </div>
      </section>

      {/* Our Mission/Values */}
       <section id="mission-values" className="grid md:grid-cols-2 gap-12 items-center">
         <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission & Values</h2>
            <p className="text-muted-foreground mb-4">
              Our mission is to empower clients with the best tools, local market information, and support to make
              informed real estate decisions in Nigeria. We are committed to:
            </p>
            <ul className="space-y-3">
                <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-1" />
                    <span>
                        <span className="font-semibold">Integrity:</span> Conducting business with the highest ethical standards.
                     </span>
                </li>
                 <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-1" />
                     <span>
                        <span className="font-semibold">Innovation:</span> Utilizing cutting-edge technology to enhance user experience.
                     </span>
                 </li>
                 <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-1" />
                     <span>
                        <span className="font-semibold">Client Focus:</span> Prioritizing client needs and satisfaction above all else.
                     </span>
                </li>
                <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-1" />
                     <span>
                         <span className="font-semibold">Local Expertise:</span> Providing knowledgeable guidance through the complexities of the Nigerian property market.
                     </span>
                </li>
            </ul>
        </div>
         <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
             <Image
                src="https://picsum.photos/seed/missionValuesNG/600/600"
                alt="Abstract image representing values or mission"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                data-ai-hint="abstract nigeria map handshake teamwork"
            />
         </div>
       </section>


      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="bg-muted py-16 md:py-20 rounded-lg">
        <div className="container">
             <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Why Choose Estate Agency?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                 <div className="flex flex-col items-center">
                     <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4 inline-flex">
                        <Users className="w-8 h-8" />
                     </div>
                    <h3 className="text-xl font-semibold mb-2">Expert Local Team</h3>
                    <p className="text-muted-foreground text-sm">
                    Experienced agents ready to guide you through the Nigerian market.
                    </p>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4 inline-flex">
                        <Building className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Extensive Listings</h3>
                     <p className="text-muted-foreground text-sm">
                    Access to a wide range of properties across major Nigerian cities.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                     <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4 inline-flex">
                        <TrendingUp className="w-8 h-8" />
                     </div>
                    <h3 className="text-xl font-semibold mb-2">Smart Tools</h3>
                     <p className="text-muted-foreground text-sm">
                    Advanced search, calculators, and virtual tours at your fingertips.
                    </p>
                 </div>
            </div>
         </div>
      </section>

      {/* Customer Reviews Section (re-used component) */}
      <CustomerReviews reviews={sampleReviews} />

    </div>
  );
}

