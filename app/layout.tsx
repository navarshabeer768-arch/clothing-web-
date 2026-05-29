import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { QueryProvider } from '@/components/providers/query-provider'
import { CartDrawer } from '@/components/layout/cart-drawer'

export const metadata: Metadata = {
  title: {
    default: 'LUXÉ — Premium Fashion & Timepieces',
    template: '%s | LUXÉ',
  },
  description: 'Discover the finest luxury fashion, clothing, and watches. Curated collections for the discerning few.',
  keywords: ['luxury fashion', 'designer clothing', 'luxury watches', 'premium fashion'],
  openGraph: {
    type: 'website',
    siteName: 'LUXÉ',
    title: 'LUXÉ — Premium Fashion & Timepieces',
    description: 'Discover the finest luxury fashion, clothing, and watches.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Jost:wght@200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <QueryProvider>
          {children}
          <CartDrawer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  )
}
