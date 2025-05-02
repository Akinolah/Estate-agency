import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { APIProvider } from '@vis.gl/react-google-maps';
import { QueryClientProvider } from '@/components/providers/query-client-provider';

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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <QueryClientProvider>
          <APIProvider
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
          >
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </APIProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
