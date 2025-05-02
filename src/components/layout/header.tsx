
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, ChevronDown } from 'lucide-react'; // Added ChevronDown for potential dropdowns
import { cn } from '@/lib/utils';
import { useState } from 'react'; // For potential dropdown state management

export function Header() {
  // Updated navigation items for page links
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/listings', label: 'Listings' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  // Example state for dropdown - can be expanded later
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center"> {/* Increased height slightly */}
        {/* Logo - Adjusted positioning with flex basis */}
        <div className="flex-[0.15] mr-4"> {/* Approx 15% width + margin */}
             <Link href="/" className="flex items-center space-x-2 group">
                 <Home className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="font-bold text-lg sm:inline-block group-hover:text-primary transition-colors">
                  EstateFindr
                 </span>
            </Link>
        </div>


        {/* Desktop Navigation - Centered */}
        <nav className="hidden flex-[0.7] items-center justify-center md:flex"> {/* Approx 70% width */}
            <div className="flex space-x-2 lg:space-x-4 text-sm font-medium"> {/* Reduced spacing slightly */}
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                   className={cn(
                      "relative px-3 py-2 rounded-md transition-all duration-300 ease-out hover:bg-accent/80", // Added hover background
                      "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 after:-translate-x-1/2", // Underline effect
                      "hover:after:w-full" // Expand underline on hover
                  )}
                >
                  {item.label}
                  {/* Example Dropdown Indicator */}
                   {/* {item.label === 'Services' && <ChevronDown className="inline ml-1 h-4 w-4" />} */}
                </Link>
              ))}
             </div>
        </nav>

        {/* CTA Button - Pushed to the right */}
        <div className="hidden flex-[0.15] items-center justify-end md:flex"> {/* Approx 15% width */}
           <Button
              size="sm"
              asChild
              className="group relative overflow-hidden transition-all duration-300 ease-out hover:shadow-md hover:scale-105 active:scale-95"
            >
             <Link href="/listings">
                 <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                 <span className="relative z-10">Buy Properties</span>
             </Link>
           </Button>
        </div>

        {/* Mobile Menu Trigger (Right) */}
        <div className="flex items-center md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" /> {/* Slightly larger icon */}
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0"> {/* Remove padding */}
              <div className="flex flex-col h-full">
                 {/* Mobile Header */}
                 <div className="p-4 border-b mb-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center space-x-2">
                      <Home className="h-6 w-6 text-primary" />
                      <span className="font-bold">EstateFindr</span>
                    </Link>
                     {/* Optional: Close button inside content */}
                     {/* <SheetClose asChild> <Button variant="ghost" size="icon"> <X className="h-5 w-5" /> </Button> </SheetClose> */}
                 </div>
                 {/* Mobile Nav Items */}
                <nav className="flex flex-col space-y-1 px-4 flex-grow"> {/* Reduced space-y */}
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                       className="block px-3 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors" // Adjusted padding
                    >
                      {item.label}
                    </Link>
                  ))}
                 </nav>
                 {/* Mobile Footer (CTA) */}
                 <div className="p-4 mt-auto border-t bg-muted/50">
                     <Button className="w-full text-base py-3" asChild>
                     <Link href="/listings">Buy Properties</Link>
                    </Button>
                 </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
