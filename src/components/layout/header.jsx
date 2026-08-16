'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, LayoutDashboard, LogIn, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CurrencySwitcher } from '@/components/currency-switcher';
import { useAuth } from '@/components/providers/auth-provider';

export function Header() {
  const { isAuthenticated, signOut } = useAuth();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/listings', label: 'Listings' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <div className="flex-[0.15] mr-4">
          <Link href="/" className="flex items-center space-x-2 group">
            <Home className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-110" />
            <span className="font-bold text-lg sm:inline-block group-hover:text-primary transition-colors">
              Estate Agency
            </span>
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden flex-[0.7] items-center justify-center md:flex">
          <div className="flex space-x-2 lg:space-x-4 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "relative px-3 py-2 rounded-md transition-all duration-300 ease-out hover:bg-accent/80",
                  "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 after:-translate-x-1/2",
                  "hover:after:w-full"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* Right Section: Currency Switcher & Auth & CTA */}
        <div className="hidden flex-[0.15] items-center justify-end space-x-3 md:flex">
          <CurrencySwitcher />
          {isAuthenticated ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/auth/login">
                  <LogIn className="mr-2 h-4 w-4" /> Sign In
                </Link>
              </Button>
              <Button size="sm" asChild className="transition-all duration-300 ease-out hover:shadow-md hover:scale-105 active:scale-95">
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Trigger (Right) */}
        <div className="flex items-center md:hidden ml-auto space-x-2">
          <CurrencySwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[320px] p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b mb-4 flex justify-between items-center">
                  <Link href="/" className="flex items-center space-x-2">
                    <Home className="h-6 w-6 text-primary" />
                    <span className="font-bold">Estate Agency</span>
                  </Link>
                </div>
                <nav className="flex flex-col space-y-1 px-4 flex-grow">
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-3 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="border-t my-2" />
                  {isAuthenticated ? (
                    <>
                      <Link
                        href="/dashboard"
                        className="flex items-center px-3 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                      >
                        <LayoutDashboard className="mr-2 h-5 w-5" /> Dashboard
                      </Link>
                      <button
                        onClick={signOut}
                        className="flex items-center px-3 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors text-left"
                      >
                        <LogOut className="mr-2 h-5 w-5" /> Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/auth/login"
                        className="flex items-center px-3 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                      >
                        <LogIn className="mr-2 h-5 w-5" /> Sign In
                      </Link>
                      <Link
                        href="/auth/signup"
                        className="flex items-center px-3 py-3 text-base font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </nav>
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
