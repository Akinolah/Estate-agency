import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { MapsProvider } from '@/components/providers/maps-provider'; // Import the new provider
import { QueryClientProvider } from '@/components/providers/query-client-provider';
import { BackToTopButton } from '@/components/back-to-top'; // Import BackToTopButton

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'EstateFindr - Find Your Dream Home',
  description:
    'Search property listings, get AI recommendations, and find your perfect home with EstateFindr.',
};

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
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
            <BackToTopButton /> {/* Add BackToTopButton */}
          </MapsProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
