'use client';

import { APIProvider } from '@vis.gl/react-google-maps';

export function MapsProvider({ children }) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey || apiKey === 'YOUR_MAPS_API_KEY_HERE') {
    return (
      <>
        <div className="container py-4 text-center text-destructive bg-destructive/10 border border-destructive rounded-md my-4">
          <p className="font-semibold">Map Configuration Required</p>
          <p className="text-sm mt-1">
            Google Maps API Key is not configured. Map features are disabled until a valid key is set in the environment.
          </p>
        </div>
      </>
    );
  }

  return <APIProvider apiKey={apiKey}>{children}</APIProvider>;
}
