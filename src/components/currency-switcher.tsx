
'use client';

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrency } from "@/hooks/useCurrency";
import { DollarSign, PoundSterling, BadgeCent } from "lucide-react"; // Using BadgeCent for Naira symbol placeholder

// Helper to get the icon based on currency code
const getCurrencyIcon = (currencyCode: string) => {
    switch (currencyCode) {
        case 'USD': return <DollarSign className="h-4 w-4" />;
        case 'NGN': return <BadgeCent className="h-4 w-4" />; // Placeholder icon for Naira
        case 'GBP': return <PoundSterling className="h-4 w-4" />;
        default: return <DollarSign className="h-4 w-4" />; // Default
    }
};

export function CurrencySwitcher() {
  const { selectedCurrency, setSelectedCurrency, availableCurrencies } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
           {getCurrencyIcon(selectedCurrency)}
           <span className="hidden sm:inline">{selectedCurrency}</span>
           <span className="sr-only">Change currency</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Select Currency</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableCurrencies.map((currency) => (
          <DropdownMenuItem
            key={currency}
            onSelect={() => setSelectedCurrency(currency)}
            className={selectedCurrency === currency ? "bg-accent" : ""}
          >
            {getCurrencyIcon(currency)}
            <span className="ml-2">{currency}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
