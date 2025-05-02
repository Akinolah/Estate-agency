import Link from 'next/link';
import { Home, Twitter, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'; // Added social media icons
import { BackToTopButton } from '../back-to-top'; // Assuming back-to-top is separate

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
        { href: '/#home-calculator', label: 'Mortgage Calculator' }, // Link to section on home
        { href: '/faq', label: 'FAQ' },
        // Add links to future blog/news pages if planned
        // { href: '/blog', label: 'Blog' },
        // { href: '/news', label: 'Market News' },
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
     {
        title: 'Company',
        links: [
          { href: '/about#mission-values', label: 'Our Mission' }, // Link to section in about page
          // { href: '/careers', label: 'Careers' },
          // { href: '/press', label: 'Press Kit' },
          { href: '/contact', label: 'Partnerships' }, // Use contact page for partnerships
        ],
    },
  ];

  const socialLinks = [
    { href: 'https://x.com/estatefindr', label: 'Twitter', icon: Twitter },
    { href: 'https://facebook.com/estatefindr', label: 'Facebook', icon: Facebook },
    { href: 'https://instagram.com/estatefindr', label: 'Instagram', icon: Instagram },
    { href: 'https://linkedin.com/company/estatefindr', label: 'LinkedIn', icon: Linkedin },
     { href: 'https://youtube.com/@estatefindr', label: 'YouTube', icon: Youtube },
  ];


  return (
    <footer className="bg-muted text-muted-foreground mt-16 md:mt-24 relative"> {/* Added relative for back-to-top positioning */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-8"> {/* Adjusted grid for more content */}
          {/* Logo and Description */}
          <div className="md:col-span-2 lg:col-span-2 pr-8">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Home className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                EstateFindr
              </span>
            </Link>
            <p className="text-sm mb-4">
              Helping you find your dream home with advanced tools and expert
              guidance. Explore listings, get personalized recommendations, and
              more.
            </p>
             {/* Newsletter Signup (Example) */}
            {/*
             <form className="flex gap-2 mt-4">
                 <Input type="email" placeholder="Enter your email" className="flex-grow" />
                 <Button type="submit" variant="secondary" size="sm">Subscribe</Button>
             </form>
            */}
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider"> {/* Enhanced title style */}
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-primary hover:underline transition-colors" // Enhanced link style
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
            &copy; {currentYear} EstateFindr. All rights reserved. Made with ❤️.
          </p>
           {/* Social Media Links */}
           <div className="flex space-x-4">
             {socialLinks.map((social) => (
                 <a
                   key={social.label}
                   href={social.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="text-muted-foreground hover:text-primary transition-colors"
                   aria-label={social.label}
                 >
                   <social.icon className="h-5 w-5" />
                 </a>
             ))}
           </div>
        </div>
      </div>
       {/* BackToTopButton is now in layout.tsx */}
    </footer>
  );
}
