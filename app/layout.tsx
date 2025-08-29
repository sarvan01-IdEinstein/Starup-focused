import Script from 'next/script'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { CartProvider } from '@/context/CartContext'
import { AudienceProvider } from '@/lib/contexts/AudienceContext'
import FloatingContactHub from '@/components/shared/FloatingContactHub'
import ErrorBoundary from '@/components/shared/ErrorBoundary'
import StructuredData from '@/components/shared/StructuredData'
import GoogleAnalytics from '@/components/analytics/GoogleAnalytics'
import SessionProvider from '@/components/providers/SessionProvider'
import { META } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = META;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Performance Optimization: Preload critical resources */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//analytics.google.com" />
        <StructuredData type="organization" />
        <StructuredData type="website" />
        <GoogleAnalytics />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <ErrorBoundary>
            <CartProvider>
              <AudienceProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-grow">
                    {children}
                  </main>
                  <Footer />
                  <FloatingContactHub />
                </div>
              </AudienceProvider>
            </CartProvider>
          </ErrorBoundary>
        </SessionProvider>
              {/* Optimized third-party scripts - Only load if GA ID is configured */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}