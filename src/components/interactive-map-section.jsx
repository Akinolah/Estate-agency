'use client';

import { useState } from 'react';
import { Map, AdvancedMarker, Pin, InfoWindow } from '@vis.gl/react-google-maps';
import { Card, CardContent } from '@/components/ui/card';
import { useCurrency } from '@/hooks/useCurrency';
import { MapPin } from 'lucide-react';

const DEFAULT_CENTER_LAT = 6.4297;
const DEFAULT_CENTER_LNG = 3.4239;
const DEFAULT_ZOOM = 15;

export function InteractiveMapSection({ properties }) {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const { formatPrice } = useCurrency();

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  if (!apiKey || apiKey === 'YOUR_MAPS_API_KEY_HERE') {
    return (
      <div className="container py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Explore Properties on the Map</h2>
        <Card className="shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <div className="flex flex-col items-center justify-center text-center p-12 min-h-[40vh] bg-muted/30">
              <MapPin className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Map Unavailable</h3>
              <p className="text-muted-foreground max-w-md">
                The interactive map requires a valid Google Maps API key. Please configure{' '}
                <code className="text-xs bg-muted px-1.5 py-0.5 rounded">NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</code>{' '}
                in your environment to enable this feature.
              </p>
              <p className="text-sm text-muted-foreground mt-4">
                {properties.length} {properties.length === 1 ? 'property' : 'properties'} available.{' '}
                <a href="/listings" className="text-primary hover:underline">View listings instead</a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const centerLat = properties.length > 0
    ? properties.reduce((sum, p) => sum + p.latitude, 0) / properties.length
    : DEFAULT_CENTER_LAT;
  const centerLng = properties.length > 0
    ? properties.reduce((sum, p) => sum + p.longitude, 0) / properties.length
    : DEFAULT_CENTER_LNG;

  const zoomLevel = properties.length <= 1 ? DEFAULT_ZOOM : 13;

  return (
    <div className="container py-12 md:py-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Explore Properties on the Map</h2>
      <Card className="shadow-lg overflow-hidden">
        <CardContent className="p-0">
          <div style={{ height: '60vh', width: '100%' }}>
            <Map
              center={{ lat: centerLat, lng: centerLng }}
              zoom={zoomLevel}
              mapId={mapId}
              gestureHandling={'greedy'}
              disableDefaultUI={false}
            >
              {properties.map((property) => (
                <AdvancedMarker
                  key={property.id}
                  position={{ lat: property.latitude, lng: property.longitude }}
                  onClick={() => setSelectedProperty(property)}
                  title={property.address}
                >
                  <Pin background={'hsl(var(--primary))'} borderColor={'white'} glyphColor={'white'} />
                </AdvancedMarker>
              ))}

              {selectedProperty && (
                <InfoWindow
                  position={{ lat: selectedProperty.latitude, lng: selectedProperty.longitude }}
                  onCloseClick={() => setSelectedProperty(null)}
                  maxWidth={350}
                >
                  <div className="p-2 space-y-1">
                    <h3 className="font-semibold text-base">{selectedProperty.address}</h3>
                    <p className="text-sm text-muted-foreground">{selectedProperty.city}, {selectedProperty.state}</p>
                    <p className="font-medium text-primary">{formatPrice(selectedProperty.price)}</p>
                    <p className="text-xs">{selectedProperty.bedrooms} beds | {selectedProperty.bathrooms} baths</p>
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
