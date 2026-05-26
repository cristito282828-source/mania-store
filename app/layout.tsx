import type { Metadata } from 'next';
import './globals.css';
import { RecentlyViewedProvider } from '@/components/providers/RecentlyViewedProvider';
import { CartProvider } from '@/components/providers/CartProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';

export const metadata: Metadata = {
  title: {
    default: 'Store Desing - Tienda Online',
    template: '%s | Store Desing'
  },
  description: 'Descubre los mejores productos deportivos, fitness y accesorios en Store Desing. Calidad premium y los mejores precios.',
  keywords: ['deportes', 'fitness', 'accesorios deportivos', 'tienda online', 'Store Desing'],
  authors: [{ name: 'Store Desing' }],
  icons: {
    icon: '/logo%20mania.png',
    apple: '/logo%20mania.png',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://forzasport.com',
    siteName: 'Store Desing',
    title: 'Store Desing - Tienda Online de Productos Deportivos y Fitness',
    description: 'Descubre los mejores productos deportivos y fitness en Store Desing.',
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
