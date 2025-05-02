
export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
}

export interface Property {
  id: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area?: number; // Optional area in sqft
  type: string; // e.g., 'House', 'Condo', 'Townhouse'
  images: string[]; // Array of image URLs
  latitude: number;
  longitude: number;
  description: string;
  virtualTourUrl?: string; // Optional URL for virtual tour
  videos?: string[]; // Optional array of video URLs (e.g., YouTube embed URLs)
  '3dAnimationUrl'?: string; // Optional URL for 3D model/animation
  galleryImages?: GalleryImage[]; // Optional detailed gallery images
  // Add any other relevant property details here
}
