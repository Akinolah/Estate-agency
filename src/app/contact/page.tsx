// src/app/contact/page.tsx
import { ContactFormSection } from '@/components/contact-form-section';
import { InteractiveMapSection } from '@/components/interactive-map-section'; // Reuse map to show location
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock, MessageSquare, Twitter, Facebook, Instagram } from 'lucide-react';
import type { Property } from '@/types/property'; // Import Property type if needed for map
import Link from 'next/link';

// Define office location(s) - adjust coordinates and details as needed
const officeLocation: Property = {
  id: 'office-location',
  address: '456 Business Ave, Suite 100, Metropolis, CA 90210', // Added Zip
  price: 0, // Not applicable
  bedrooms: 0, // Not applicable
  bathrooms: 0, // Not applicable
  type: 'Office',
  images: [], // No images needed for map marker usually
  latitude: 34.052235, // Example: Los Angeles City Hall latitude
  longitude: -118.243683, // Example: Los Angeles City Hall longitude
  description: 'Our Main Office Location',
   // Add other required fields from Property type with appropriate defaults/values
  area: undefined,
  virtualTourUrl: undefined,
  videos: [],
  '3dAnimationUrl': undefined,
  galleryImages: [],
};

// Define company details
const companyDetails = {
    phone: '(123) 456-7890',
    email: 'info@estatefindr.com',
    whatsappNumber: '+11234567890', // Use international format for WhatsApp links
    businessHours: 'Mon - Fri: 9:00 AM - 6:00 PM',
    socials: {
        twitter: 'https://x.com/estatefindr', // Replace with actual links
        facebook: 'https://facebook.com/estatefindr',
        instagram: 'https://instagram.com/estatefindr',
    }
}

export default function ContactPage() {
  return (
    <div className="flex flex-col space-y-16 md:space-y-24 container py-12 md:py-16">
      {/* Page Header */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          We're here to help! Reach out with any questions or inquiries, and our team will get back to you shortly.
        </p>
      </section>

      {/* Contact Form and Info */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <ContactFormSection />
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
           <Card className="shadow-md">
             <CardHeader>
                <CardTitle className="text-2xl">Contact Details</CardTitle>
             </CardHeader>
             <CardContent className="space-y-6 text-muted-foreground">
                {/* Address */}
                <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-medium text-foreground">Address:</p>
                        <p>{officeLocation.address}</p>
                        {/* Add more address lines if needed */}
                    </div>
                </div>
                 {/* Phone */}
                 <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                     <div>
                        <p className="font-medium text-foreground">Phone:</p>
                        <a href={`tel:${companyDetails.phone.replace(/\D/g, '')}`} className="hover:text-primary transition-colors">{companyDetails.phone}</a>
                    </div>
                 </div>
                 {/* Email */}
                <div className="flex items-center">
                     <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                    <div>
                        <p className="font-medium text-foreground">Email:</p>
                        <a href={`mailto:${companyDetails.email}`} className="hover:text-primary transition-colors">{companyDetails.email}</a>
                     </div>
                 </div>
                 {/* WhatsApp */}
                 <div className="flex items-center">
                     <MessageSquare className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                     <div>
                         <p className="font-medium text-foreground">WhatsApp:</p>
                         <a href={`https://wa.me/${companyDetails.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Chat with us</a>
                     </div>
                 </div>
                 {/* Business Hours */}
                 <div className="flex items-start">
                    <Clock className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-1" />
                     <div>
                        <p className="font-medium text-foreground">Business Hours:</p>
                        <p>{companyDetails.businessHours}</p>
                    </div>
                 </div>
                 {/* Social Media */}
                  <div className="pt-4 border-t">
                     <p className="font-medium text-foreground mb-3">Connect with us:</p>
                     <div className="flex space-x-4">
                         <a href={companyDetails.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                            <Twitter className="w-6 h-6" />
                         </a>
                         <a href={companyDetails.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                            <Facebook className="w-6 h-6" />
                        </a>
                         <a href={companyDetails.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                             <Instagram className="w-6 h-6" />
                        </a>
                        {/* Add other social links as needed */}
                     </div>
                  </div>
             </CardContent>
           </Card>

           {/* Office Location Map */}
           <div className="mt-8 lg:mt-0">
              <h3 className="text-2xl font-semibold mb-4 text-center lg:text-left">Our Location</h3>
              {/* Pass only the office location to the map */}
              <InteractiveMapSection properties={[officeLocation]} />
           </div>

        </div>
      </section>

    </div>
  );
}
