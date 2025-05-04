
'use client';

import { createContext, useState, useContext, useMemo, type ReactNode } from 'react';

// Define supported currencies
type Currency = 'USD' | 'NGN' | 'GBP';
const BASE_CURRENCY: Currency = 'USD'; // Define the base currency for internal calculations

// Define exchange rates relative to the BASE_CURRENCY
// In a real app, fetch these from an API
const exchangeRatesToBase: Record<Currency, number> = {
  USD: 1,
  NGN: 1 / 1500, // 1 NGN = 1/1500 USD (Inverse of USD -> NGN)
  GBP: 1 / 0.80, // 1 GBP = 1/0.80 USD (Inverse of USD -> GBP)
};

// Define currency symbols and formatting options
const currencyFormats: Record<Currency, { symbol: string; locale: string }> = {
  USD: { symbol: '$', locale: 'en-US' },
  NGN: { symbol: '₦', locale: 'en-NG' },
  GBP: { symbol: '£', locale: 'en-GB' },
};

interface CurrencyContextProps {
  selectedCurrency: Currency;
  baseCurrency: Currency; // Expose base currency
  setSelectedCurrency: (currency: Currency) => void;
  formatPrice: (priceInBaseCurrency: number) => string; // Formats a base currency value to selected currency string
  convertToBaseCurrency: (priceInSelectedCurrency: number, currency: Currency) => number; // Converts from any currency to base
  convertFromBaseCurrency: (priceInBaseCurrency: number, targetCurrency: Currency) => number; // Converts from base to any currency
  availableCurrencies: Currency[];
  getCurrencySymbol: (currency: Currency) => string; // Utility to get symbol
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD'); // Default to USD

   // Convert a value FROM a specified currency TO the base currency (USD)
   const convertToBaseCurrency = (amount: number, fromCurrency: Currency): number => {
    if (fromCurrency === BASE_CURRENCY) return amount;
    const rate = exchangeRatesToBase[fromCurrency];
    return amount * rate;
  };

  // Convert a value FROM the base currency (USD) TO a target currency
  const convertFromBaseCurrency = (amountInBase: number, targetCurrency: Currency): number => {
    if (targetCurrency === BASE_CURRENCY) return amountInBase;
    // Need the inverse rate (BASE -> TARGET)
    // Find the rate for 1 unit of base currency in the target currency
    const rateBaseToTarget = 1 / exchangeRatesToBase[targetCurrency];
    return amountInBase * rateBaseToTarget;
  };


  // Formats a price already in BASE currency for display in the SELECTED currency
  const formatPrice = (priceInBaseCurrency: number) => {
    const priceInSelectedCurrency = convertFromBaseCurrency(priceInBaseCurrency, selectedCurrency);
    const { locale } = currencyFormats[selectedCurrency];

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: selectedCurrency,
       // Adjust fraction digits based on currency or preference
       minimumFractionDigits: selectedCurrency === 'NGN' ? 0 : 2,
      maximumFractionDigits: selectedCurrency === 'NGN' ? 0 : 2,
    }).format(priceInSelectedCurrency);
  };

   const getCurrencySymbol = (currency: Currency): string => {
    return currencyFormats[currency].symbol;
   };


  const availableCurrencies = Object.keys(exchangeRatesToBase) as Currency[];

  const value = useMemo(() => ({
    selectedCurrency,
    baseCurrency: BASE_CURRENCY,
    setSelectedCurrency,
    formatPrice,
    convertToBaseCurrency,
    convertFromBaseCurrency,
    availableCurrencies,
    getCurrencySymbol,
  }), [selectedCurrency]); // Dependencies ensure value updates correctly

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrencyContext = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrencyContext must be used within a CurrencyProvider');
  }
  return context;
};

