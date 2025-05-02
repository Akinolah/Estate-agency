// src/app/about/page.tsx
import { CustomerReviews } from '@/components/customer-reviews';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Building, TrendingUp, CheckCircle } from 'lucide-react';

// Re-use sample reviews data if needed, or fetch specific about-related testimonials
const sampleReviews = [
  {
    id: 'r1',
    name: 'Alice B.',
    rating: 5,
    review:
      'Working with EstateFindr was a fantastic experience. Their team is knowledgeable and truly cares about finding the right fit.',
    imageUrl: 'https://picsum.photos/seed/rev1/100/100',
  },
  {
    id: 'r2',
    name: 'Mark S.',
    rating: 5,
    review:
      'The professionalism and dedication shown by EstateFindr were top-notch. They made the complex process of buying a home seem easy.',
    imageUrl: 'https://picsum.photos/seed/rev4/100/100', // Use different seed
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col space-y-16 md:space-y-24 container py-12 md:py-16">
      {/* About Us Section */}
      <section id="about-us" className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About EstateFindr</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
          We are dedicated to simplifying the real estate process, leveraging technology and expertise
          to help you find your perfect property with confidence and ease.
        </p>
         <div className="relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden shadow-lg">
            <Image
                src="https://picsum.photos/seed/aboutHero/1200/675"
                alt="EstateFindr Team or Office"
                fill
                 sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                style={{ objectFit: 'cover' }}
                data-ai-hint="team meeting office real estate professionals"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
         </div>
      </section>

      {/* Our Mission/Values */}
       <section id="mission-values" className="grid md:grid-cols-2 gap-12 items-center">
         <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission & Values</h2>
            <p className="text-muted-foreground mb-4">
              Our mission is to empower clients with the best tools, information, and support to make
              informed real estate decisions. We are committed to:
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
                         <span className="font-semibold">Expertise:</span> Providing knowledgeable guidance through market complexities.
                     </span>
                </li>
            </ul>
        </div>
         <div className="relative aspect-square rounded-lg overflow-hidden shadow-md">
             <Image
                src="https://picsum.photos/seed/missionValues/600/600"
                alt="Abstract image representing values or mission"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                data-ai-hint="abstract lightbulb compass teamwork"
            />
         </div>
       </section>


      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="bg-muted py-16 md:py-20 rounded-lg">
        <div className="container">
             <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Why Choose EstateFindr?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                 <div className="flex flex-col items-center">
                     <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4 inline-flex">
                        <Users className="w-8 h-8" />
                     </div>
                    <h3 className="text-xl font-semibold mb-2">Expert Team</h3>
                    <p className="text-muted-foreground text-sm">
                    Experienced agents ready to guide you through every step.
                    </p>
                 </div>
                 <div className="flex flex-col items-center">
                    <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4 inline-flex">
                        <Building className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Vast Listings</h3>
                     <p className="text-muted-foreground text-sm">
                    Access to a wide range of properties to match your needs.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                     <div className="bg-primary text-primary-foreground rounded-full p-4 mb-4 inline-flex">
                        <TrendingUp className="w-8 h-8" />
                     </div>
                    <h3 className="text-xl font-semibold mb-2">Smart Tools</h3>
                     <p className="text-muted-foreground text-sm">
                    AI recommendations, calculators, and virtual tours at your fingertips.
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
