
'use client'; // Add this directive because CurrencyProvider uses context

import type { Metadata } from 'next';
// Import standard Google Fonts instead of Geist
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { MapsProvider } from '@/components/providers/maps-provider'; // Import the new provider
import { QueryClientProvider } from '@/components/providers/query-client-provider';
import { BackToTopButton } from '@/components/back-to-top'; // Import BackToTopButton
import { CurrencyProvider } from '@/components/providers/currency-provider'; // Import CurrencyProvider

// Configure standard Google Fonts
const inter = Inter({
  variable: '--font-inter', // Update variable name
  subsets: ['latin'],
});

const roboto_mono = Roboto_Mono({
  variable: '--font-roboto-mono', // Update variable name
  subsets: ['latin'],
  weight: ['400', '700'], // Specify weights if needed
});


// Metadata cannot be defined in a client component. Move to a parent server component if needed.
// export const metadata: Metadata = {
//   title: 'Estate Agency - Find Your Dream Property in Nigeria',
//   description:
//     'Search property listings, get accurate information, and find your perfect property in Nigeria with Estate Agency.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Removed whitespace between <html> and <body> tag which causes hydration error
    <html lang="en" className="scroll-smooth">
      <body
        // Use the new font variable names
        className={`${inter.variable} ${roboto_mono.variable} font-sans antialiased flex flex-col min-h-screen`} // Added font-sans as default
      >
        <QueryClientProvider>
          {/* Wrap the content that needs map context with MapsProvider */}
          <MapsProvider>
             {/* Wrap content that needs currency context with CurrencyProvider */}
            <CurrencyProvider>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
                <Toaster />
                <BackToTopButton /> {/* Add BackToTopButton */}
            </CurrencyProvider>
          </MapsProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

