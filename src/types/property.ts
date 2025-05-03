
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface Property {
  id: string;
  address: string; // Street address
  city: string; // e.g., Lagos, Abuja
  lga?: string; // Local Government Area (Optional)
  state: string; // e.g., Lagos State, FCT
  price: number; // Price stored as a number (e.g., in USD or base currency)
  bedrooms: number;
  bathrooms: number;
  area?: number; // Optional area in sq meters or sq feet
  type: string; // e.g., 'House', 'Flat/Apartment', 'Duplex', 'Bungalow', 'Land'
  images: string[]; // Array of image URLs
  latitude: number;
  longitude: number;
  description: string;
  virtualTourUrl?: string; // Optional URL for virtual tour
  videos?: string[]; // Optional array of video URLs (e.g., YouTube embed URLs)
  '3dAnimationUrl'?: string; // Optional URL for 3D model/animation
  galleryImages?: GalleryImage[]; // Optional detailed gallery images
  // Add any other relevant property details here
  isFeatured?: boolean; // Example: Mark as featured
  amenities?: string[]; // Example: ['Pool', 'Gym', 'Security']
}
