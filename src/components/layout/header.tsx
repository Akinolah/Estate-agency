
'use client';

import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button'; // Import buttonVariants
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home } from 'lucide-react';
import { cn } from '@/lib/utils'; // Import cn

export function Header() {
  // Updated navigation items for page links
  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/listings', label: 'Listings' }, // Assuming listings page route
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Logo - Pushed to the left */}
        <div className="mr-4 flex">
             <Link href="/" className="flex items-center space-x-2">
                 <Home className="h-6 w-6 text-primary" />
                <span className="font-bold sm:inline-block">EstateFindr</span>
            </Link>
        </div>


        {/* Desktop Navigation - Centered */}
        <nav className="hidden flex-1 items-center justify-center md:flex">
            <div className="flex space-x-4 text-sm font-medium lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.label} // Use label as key if hrefs might not be unique temporarily
                  href={item.href}
                  className="transition-colors hover:text-foreground/80 text-foreground/60 px-2 py-1 rounded-md" // Added padding and rounding
                >
                  {item.label}
                </Link>
              ))}
             </div>
        </nav>

        {/* CTA Button - Pushed to the right */}
        <div className="hidden items-center space-x-3 md:flex ml-4">
           {/* Replace Button asChild with styled Link */}
           <Link href="/listings" className={cn(buttonVariants({ size: "sm" }))}>
             Buy Properties
           </Link>
        </div>

        {/* Mobile Menu Trigger (Right) */}
        <div className="flex items-center md:hidden ml-auto"> {/* Use ml-auto to push trigger right */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px]"> {/* Adjusted width */}
              <div className="flex flex-col h-full">
                 {/* Mobile Header */}
                 <div className="p-4 border-b mb-4">
                    <Link href="/" className="flex items-center space-x-2">
                      <Home className="h-6 w-6 text-primary" />
                      <span className="font-bold">EstateFindr</span>
                    </Link>
                 </div>
                 {/* Mobile Nav Items */}
                <nav className="flex flex-col space-y-2 px-4 flex-grow">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md" // Adjusted styling
                    >
                      {item.label}
                    </Link>
                  ))}
                 </nav>
                 {/* Mobile Footer (CTA) */}
                 <div className="p-4 mt-auto border-t">
                    {/* Replace Button asChild with styled Link */}
                    <Link href="/listings" className={cn(buttonVariants({ className: "w-full" }))}>
                      Buy Properties
                    </Link>
                 </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

