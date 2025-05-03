
'use client';

import { useState } from 'react';
import { Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import type { Property } from '@/types/property';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// Removed PropertyCard import for debugging
// import { PropertyCard } from './property-card';
import { useCurrency } from '@/hooks/useCurrency'; // Import currency hook

interface InteractiveMapSectionProps {
  properties: Property[];
}

// Define default center coordinates based on the provided link
const DEFAULT_CENTER_LAT = 6.5448678;
const DEFAULT_CENTER_LNG = 3.2029503;
const DEFAULT_ZOOM = 13; // Extracted from the 13.34z in the URL


export function InteractiveMapSection({ properties }: InteractiveMapSectionProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const { formatPrice } = useCurrency(); // Get currency formatting function

  // Calculate center of the map - simple average if properties exist, otherwise use default
  const centerLat = properties.length > 0
    ? properties.reduce((sum, p) => sum + p.latitude, 0) / properties.length
    : DEFAULT_CENTER_LAT;
  const centerLng = properties.length > 0
    ? properties.reduce((sum, p) => sum + p.longitude, 0) / properties.length
    : DEFAULT_CENTER_LNG;

  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  return (
    // Container div without the section ID
    <div className="container py-12 md:py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Explore Properties on the Map</h2>
      <Card className="shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div style={{ height: '60vh', width: '100%' }}>
            <Map
              center={{ lat: centerLat, lng: centerLng }} // Use calculated or default center
              zoom={DEFAULT_ZOOM} // Use default zoom
              mapId={mapId} // Optional: Use a custom map style
              gestureHandling={'greedy'} // Allows easier interaction on touch devices
              disableDefaultUI={false}
            >
              {properties.map((property) => (
                <AdvancedMarker
                  key={property.id}
                  position={{ lat: property.latitude, lng: property.longitude }}
                  onClick={() => setSelectedProperty(property)}
                  title={property.address} // Tooltip on hover
                >
                  {/* Use a simple Pin or a custom SVG */}
                  <Pin background={'hsl(var(--primary))'} borderColor={'white'} glyphColor={'white'} />
                  {/* Example Custom Icon:
                   <span style={{ fontSize: '2rem' }}>🏠</span>
                   */}
                </AdvancedMarker>
              ))}

              {selectedProperty && (
                <InfoWindow
                  position={{ lat: selectedProperty.latitude, lng: selectedProperty.longitude }}
                  onCloseClick={() => setSelectedProperty(null)}
                  maxWidth={350} // Adjust max width as needed
                >
                  {/* Simplified InfoWindow content for debugging */}
                  <div className="p-2 space-y-1">
                     <h3 className="font-semibold text-base">{selectedProperty.address}</h3>
                     <p className="text-sm text-muted-foreground">{selectedProperty.city}, {selectedProperty.state}</p>
                     <p className="font-medium text-primary">{formatPrice(selectedProperty.price)}</p>
                     <p className="text-xs">{selectedProperty.bedrooms} beds | {selectedProperty.bathrooms} baths</p>
                  </div>
                  {/*
                  // Original code using PropertyCard:
                  <div className="w-[320px] p-1">
                    <PropertyCard property={selectedProperty} />
                  </div>
                  */}
                </InfoWindow>
              )}
            </Map>
          </div>
        </CardContent>
      </Card>
       <p className="text-center text-muted-foreground mt-4 text-sm">
            Click on a marker to view property details.
          </p>
    </div>
  );
}

      