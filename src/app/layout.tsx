
'use client'; // Add this directive because CurrencyProvider uses context

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { MapsProvider } from '@/components/providers/maps-provider'; // Import the new provider
import { QueryClientProvider } from '@/components/providers/query-client-provider';
import { BackToTopButton } from '@/components/back-to-top'; // Import BackToTopButton
import { CurrencyProvider } from '@/components/providers/currency-provider'; // Import CurrencyProvider

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <html lang="en" className="scroll-smooth"> {/* Added scroll-smooth */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
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
