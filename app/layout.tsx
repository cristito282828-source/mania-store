import type { Metadata } from 'next';
import './globals.css';
import { RecentlyViewedProvider } from '@/components/providers/RecentlyViewedProvider';
import { CartProvider } from '@/components/providers/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: {
    default: 'Mania Store - Tienda Online',
    template: '%s | Mania Store'
  },
  description: 'Descubre los mejores perfumes y fragancias en Mania Store. Calidad premium y los mejores precios.',
  keywords: ['perfumes', 'fragancias', 'perfumeria', 'tienda online', 'Mania Store'],
  authors: [{ name: 'Mania Store' }],
  icons: {
    icon: '/logo%20mania.png',
    apple: '/logo%20mania.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://maniastorecali.com',
    siteName: 'Mania Store',
    title: 'Mania Store - Tienda Online de Fragancias y Perfumes',
    description: 'Descubre los mejores perfumes y fragancias en Mania Store.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <CartProvider>
          <RecentlyViewedProvider>
            {children}
          </RecentlyViewedProvider>
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
