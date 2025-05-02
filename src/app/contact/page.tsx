// src/app/contact/page.tsx
import { ContactFormSection } from '@/components/contact-form-section';
import { InteractiveMapSection } from '@/components/interactive-map-section'; // Reuse map to show location
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin } from 'lucide-react';
import type { Property } from '@/types/property'; // Import Property type if needed for map

// Define office location(s) - adjust coordinates and details as needed
const officeLocation: Property = {
  id: 'office-location',
  address: '456 Business Ave, Suite 100, Metropolis',
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
             <CardContent className="space-y-4 text-muted-foreground">
                <div className="flex items-start">
                    <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-1" />
                    <div>
                        <p className="font-medium text-foreground">Address:</p>
                        <p>{officeLocation.address}</p>
                        {/* Add more address lines if needed */}
                    </div>
                </div>
                 <div className="flex items-center">
                    <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                     <div>
                        <p className="font-medium text-foreground">Phone:</p>
                        <a href="tel:+1234567890" className="hover:text-primary">(123) 456-7890</a>
                    </div>
                 </div>
                <div className="flex items-center">
                     <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
                    <div>
                        <p className="font-medium text-foreground">Email:</p>
                        <a href="mailto:info@estatefindr.com" className="hover:text-primary">info@estatefindr.com</a>
                     </div>
                 </div>
                 {/* Add Business Hours if desired */}
                 {/* <div className="flex items-start"> ... </div> */}
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
