'use client';

import { useState } from 'react';
import { Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import type { Property } from '@/types/property';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PropertyCard } from './property-card'; // Reuse PropertyCard for InfoWindow content

interface InteractiveMapSectionProps {
  properties: Property[];
}

export function InteractiveMapSection({ properties }: InteractiveMapSectionProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Calculate center of the map - simple average for now
  const centerLat = properties.length > 0
    ? properties.reduce((sum, p) => sum + p.latitude, 0) / properties.length
    : 34.0522; // Default to LA
  const centerLng = properties.length > 0
    ? properties.reduce((sum, p) => sum + p.longitude, 0) / properties.length
    : -118.2437; // Default to LA

  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  return (
    // Container div without the section ID
    <div className="container py-12 md:py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Explore Properties on the Map</h2>
      <Card className="shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div style={{ height: '60vh', width: '100%' }}>
            <Map
              defaultCenter={{ lat: centerLat, lng: centerLng }}
              defaultZoom={11}
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
                  {/* Reuse PropertyCard for a consistent look, scaled down */}
                  <div className="w-[320px] p-1">
                    <PropertyCard property={selectedProperty} />
                  </div>
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
