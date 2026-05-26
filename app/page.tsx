import Link from 'next/link';

/**
 * HOME PAGE - WooCommerce
 */

export const revalidate = 60;

import { getCollections as getWooCollections } from '@/lib/woocommerce';
import { ProductCard } from '@/components/ui/product-card';
import { WooNavbar } from '@/components/layout/navbar/woo-navbar';
import FooterCustom from '@/components/custom/FooterCustom';
import { BannerCarousel } from '@/components/custom/BannerCarousel';
import { CategoryCarousel } from '@/components/custom/CategoryCarousel';
import { WooProduct, WooProductsOperation } from '@/lib/woocommerce/types';

export const metadata = {
  title: 'Store Desing - Tu Tienda Online de Deportes y Fitness',
  description: 'Descubre los mejores productos deportivos, fitness y accesorios en Store Desing. Calidad premium y los mejores precios.',
  keywords: 'deportes, fitness, accesorios deportivos, tienda online, Store Desing',
};

interface AdaptedProduct {
  id: string;
  name: string;
  slug: string;
  price: string;
  image: string;
  category: string;
  description: string;
}

async function getFeaturedProducts(): Promise<AdaptedProduct[]> {
  try {
    const { woocommerceFetch } = await import('@/lib/woocommerce');
    const { getProductsQuery } = await import('@/lib/woocommerce/queries/product');

    const res = await woocommerceFetch<WooProductsOperation>({
      query: getProductsQuery,
      variables: {}
    });

    const products = res.body.data.products?.nodes || [];

    if (!products || products.length === 0) {
      return [];
    }

    const cleanPrice = (price: string) => {
      if (!price) return price;
      return String(price)
        .replace(/&nbsp;/gi, ' ')
        .replace(/&#160;/gi, ' ')
        .replace(/&amp;/gi, '&')
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    };

    return products.slice(0, 8).map((product) => {
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: cleanPrice(product.price || '') || 'Precio no disponible',
        image: product.image?.sourceUrl || '/placeholder.jpg',
        category: 'Accesorios',
        description: product.description || product.shortDescription || ''
      };
    });
  } catch {
    return [];
  }
}

interface AdaptedCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
  path: string;
}

async function getCategories(): Promise<AdaptedCategory[]> {
  try {
    const collections = await getWooCollections();

    if (!collections || collections.length === 0) {
      return [];
    }

    return collections
      .filter((collection) =>
        collection.handle &&
        collection.handle !== 'undefined' &&
        collection.handle !== '' &&
        collection.handle !== 'all' &&
        !collection.handle.toLowerCase().includes('uncategorized')
      )
      .map((collection) => ({
        id: collection.handle,
        name: collection.title || collection.name || 'Sin nombre',
        slug: collection.handle,
        image: collection.image?.url || '/placeholder-category.jpg',
        path: collection.path || `/search/${collection.handle}`
      }));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  // Obtener datos en paralelo
  const [products, categories] = await Promise.all([
    getFeaturedProducts(),
    getCategories()
  ]);

  return (
    <>
      <WooNavbar />
      <main className="min-h-screen bg-gray-50">
      {/* Banner Carousel */}
      <div className="pt-20">
        <BannerCarousel />
      </div>

      {/* Categorías - Carrusel continuo */}
      {categories.length > 0 && <CategoryCarousel categories={categories} />}

      {/* Productos Destacados */}
      {products.length > 0 && (
        <section className="py-16 bg-[#f5f5f5]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Productos Destacados
              </h2>
              <Link
                href="/search"
                className="text-green-700 hover:text-green-800 font-semibold"
              >
                Ver todos →
              </Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FooterCustom />
    </main>
    </>
  );
}
