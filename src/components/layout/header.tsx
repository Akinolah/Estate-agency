import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Home, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Header() {
  const navItems = [
    { href: '#listings', label: 'Listings' },
    { href: '#recommendations', label: 'Recommendations' },
    { href: '#map', label: 'Map' },
    { href: '#tours', label: 'Virtual Tours' },
    { href: '#calculator', label: 'Calculator' }, // Updated label slightly
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://facebook.com', icon: Facebook, label: 'Facebook' },
    { href: 'https://twitter.com', icon: Twitter, label: 'Twitter' },
    { href: 'https://instagram.com', icon: Instagram, label: 'Instagram' },
    { href: 'https://linkedin.com', icon: Linkedin, label: 'LinkedIn' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Home className="h-6 w-6 text-primary" />
          <span className="font-bold sm:inline-block">EstateFindr</span>
        </Link>

        {/* Desktop Navigation (Centered) */}
        <nav className="hidden flex-1 items-center justify-center space-x-4 text-sm font-medium md:flex lg:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground/80 text-foreground/60 px-2 py-1 rounded-md" // Added padding and rounding
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Social Icons (Right) */}
        <div className="hidden items-center space-x-3 md:flex">
          {socialLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={link.label}
            >
              <link.icon className="h-5 w-5" />
            </Link>
          ))}
           <Button size="sm" variant="outline">Log In</Button> {/* Example Login Button */}
        </div>

        {/* Mobile Menu Trigger (Right) */}
        <div className="flex items-center md:hidden">
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
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-base font-medium hover:bg-accent rounded-md" // Adjusted styling
                    >
                      {item.label}
                    </Link>
                  ))}
                 </nav>
                 {/* Mobile Footer (Optional: Login/Social) */}
                 <div className="p-4 mt-auto border-t">
                    <Button className="w-full mb-4" variant="outline">Log In</Button>
                    <div className="flex justify-center space-x-4">
                       {socialLinks.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={link.label}
                        >
                          <link.icon className="h-5 w-5" />
                        </Link>
                      ))}
                    </div>
                 </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
