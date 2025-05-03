
'use client';

import { createContext, useState, useContext, useMemo, type ReactNode } from 'react';

// Define supported currencies
type Currency = 'USD' | 'NGN' | 'GBP';

// Define exchange rates relative to a base currency (e.g., USD)
// In a real app, fetch these from an API
const exchangeRates: Record<Currency, number> = {
  USD: 1,
  NGN: 1500, // Placeholder rate: 1 USD = 1500 NGN
  GBP: 0.80, // Placeholder rate: 1 USD = 0.80 GBP
};

// Define currency symbols and formatting options
const currencyFormats: Record<Currency, { symbol: string; locale: string }> = {
  USD: { symbol: '$', locale: 'en-US' },
  NGN: { symbol: '₦', locale: 'en-NG' },
  GBP: { symbol: '£', locale: 'en-GB' },
};

interface CurrencyContextProps {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
  formatPrice: (priceInBaseCurrency: number) => string;
  availableCurrencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextProps | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD'); // Default to USD

  const formatPrice = (priceInBaseCurrency: number) => {
    const rate = exchangeRates[selectedCurrency];
    const priceInSelectedCurrency = priceInBaseCurrency * rate;
    const { symbol, locale } = currencyFormats[selectedCurrency];

    // Use Intl.NumberFormat for proper locale-specific formatting
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: selectedCurrency,
      minimumFractionDigits: 0, // Show whole numbers for prices generally
      maximumFractionDigits: 0,
    }).format(priceInSelectedCurrency);

    // Basic formatting (less robust):
    // return `${symbol}${priceInSelectedCurrency.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  const availableCurrencies = Object.keys(exchangeRates) as Currency[];

  const value = useMemo(() => ({
    selectedCurrency,
    setSelectedCurrency,
    formatPrice,
    availableCurrencies,
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
