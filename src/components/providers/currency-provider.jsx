
'use client';

import { createContext, useState, useContext, useMemo } from 'react';

// Define supported currencies
// Removed type definition
const BASE_CURRENCY = 'USD'; // Define the base currency for internal calculations

// Define exchange rates relative to the BASE_CURRENCY
// In a real app, fetch these from an API
const exchangeRatesToBase = { // Removed type
  USD: 1,
  NGN: 1 / 1600, // 1 NGN = 1/1600 USD (Inverse of USD -> NGN)
  GBP: 1 / 0.80, // 1 GBP = 1/0.80 USD (Inverse of USD -> GBP)
};

// Currency symbols and formatting options
const currencyFormats = { // Removed type
  USD: { symbol: '$', locale: 'en-US' },
  NGN: { symbol: '₦', locale: 'en-NG' },
  GBP: { symbol: '£', locale: 'en-GB' },
};

// Removed interface

const CurrencyContext = createContext(undefined); // Removed type

export const CurrencyProvider = ({ children }) => { // Removed type
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); // Removed type

   // Convert a value FROM a specified currency TO the base currency (USD)
   const convertToBaseCurrency = (amount, fromCurrency) => { // Removed types
    if (fromCurrency === BASE_CURRENCY) return amount;
    const rate = exchangeRatesToBase[fromCurrency];
    return amount * rate;
  };

  // Convert a value FROM the base currency (USD) TO a target currency
  const convertFromBaseCurrency = (amountInBase, targetCurrency) => { // Removed types
    if (targetCurrency === BASE_CURRENCY) return amountInBase;
    // Need the inverse rate (BASE -> TARGET)
    // Find the rate for 1 unit of base currency in the target currency
    const rateBaseToTarget = 1 / exchangeRatesToBase[targetCurrency];
    return amountInBase * rateBaseToTarget;
  };


  // Formats a price already in BASE currency for display in the SELECTED currency
  const formatPrice = (priceInBaseCurrency) => { // Removed type
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

   const getCurrencySymbol = (currency) => { // Removed type
    return currencyFormats[currency].symbol;
   };


  const availableCurrencies = Object.keys(exchangeRatesToBase); // Removed type assertion

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
