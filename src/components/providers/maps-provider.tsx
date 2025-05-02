'use client';

import type { ReactNode } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';

interface MapsProviderProps {
  children: ReactNode;
}

export function MapsProvider({ children }: MapsProviderProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error("Google Maps API Key is missing. Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable.");
    // Render children without the provider, or show an error message
    return <>{children}</>;
    // Or alternatively:
    // return <div className="flex items-center justify-center h-screen">Missing Google Maps API Key</div>;
  }

  return <APIProvider apiKey={apiKey}>{children}</APIProvider>;
}
