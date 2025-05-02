import Link from 'next/link';
import { Home } from 'lucide-react'; // Removed social media icons

export function Footer() {
  const currentYear = new Date().getFullYear();

  // Updated footer sections to align with new pages
  const footerSections = [
    {
      title: 'Navigate',
      links: [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/listings', label: 'Listings' },
        { href: '/services', label: 'Services' },
        { href: '/contact', label: 'Contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        // Keep calculator link as it's a component/section, not a full page here
        { href: '/#home-calculator', label: 'Mortgage Calculator' }, // Link to section on home
        // Add links to future guide pages if planned
        // { href: '/guides/buyers', label: 'Buyer Guides' },
        // { href: '/guides/sellers', label: 'Seller Guides' },
        { href: '/faq', label: 'FAQ' }, // Assuming an FAQ page might exist
      ],
    },
    {
      title: 'Legal',
      links: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
        { href: '/accessibility', label: 'Accessibility' },
      ],
    },
  ];


  return (
    <footer className="bg-muted text-muted-foreground mt-16 md:mt-24">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1 lg:col-span-2 pr-8">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Home className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                EstateFindr
              </span>
            </Link>
            <p className="text-sm">
              Helping you find your dream home with advanced tools and expert
              guidance. Explore listings, get personalized recommendations, and
              more.
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-center md:text-left mb-4 md:mb-0">
            &copy; {currentYear} EstateFindr. All rights reserved.
          </p>
          {/* Social Links Removed */}
           <div className="flex space-x-4">
             {/* Placeholder if needed later, currently empty */}
           </div>
        </div>
      </div>
    </footer>
  );
}
