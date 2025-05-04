
'use client';

import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function QueryClientProvider({ children }) { // Removed type
  // Use useState to ensure QueryClient is only created once per component instance
  const [queryClient] = useState(() => new QueryClient());

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
}
