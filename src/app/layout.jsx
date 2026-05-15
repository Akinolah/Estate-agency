'use client';

import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';
import { MapsProvider } from '@/components/providers/maps-provider';
import { QueryClientProvider } from '@/components/providers/query-client-provider';
import { BackToTopButton } from '@/components/back-to-top';
import { CurrencyProvider } from '@/components/providers/currency-provider';
import { AuthProvider } from '@/components/providers/auth-provider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const roboto_mono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${roboto_mono.variable} font-sans antialiased flex flex-col min-h-screen`}>
        <QueryClientProvider>
          <AuthProvider>
            <MapsProvider>
              <CurrencyProvider>
                <Header />
                <main className="flex-grow px-4 sm:px-6 lg:px-8">{children}</main>
                <Footer />
                <Toaster />
                <BackToTopButton />
              </CurrencyProvider>
            </MapsProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
