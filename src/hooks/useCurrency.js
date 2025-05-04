
'use client';

import { useContext } from 'react';
import { useCurrencyContext } from '@/components/providers/currency-provider'; // Adjust path as needed

// Re-export the context hook for easier consumption
export const useCurrency = () => {
  const context = useCurrencyContext();
  if (!context) {
    // This error should technically be caught by useCurrencyContext,
    // but added here for extra safety during development.
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  // Context now includes more properties like convertToBaseCurrency, etc.
  return context;
};
