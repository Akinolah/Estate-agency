
'use client';

import { useContext } from 'react';
import { useCurrencyContext } from '@/components/providers/currency-provider'; // Adjust path as needed

export const useCurrency = () => {
  const context = useCurrencyContext();
  if (!context) {
    // This error should technically be caught by useCurrencyContext,
    // but added here for extra safety during development.
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
