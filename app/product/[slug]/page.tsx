import Link from 'next/link';
import Image from 'next/image';
import { WooNavbar } from '@/components/layout/navbar/woo-navbar';
import FooterCustom from '@/components/custom/FooterCustom';
import { ProductDescriptionWoo } from '@/components/product/ProductDescriptionWoo';
import { ProductViewTracker } from '@/components/product/ProductViewTracker';
import { WooProduct, WooProductOperation } from '@/lib/woocommerce/types';

/**
 * PÁGINA INDIVIDUAL DE PRODUCTO - WooCommerce
 * Next.js 15: params es async y debe ser awaited
 */

// ISR: Revalidar automáticamente cada 60 segundos
export const revalidate = 60;

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const { woocommerceFetch } = await import('@/lib/woocommerce');
    const { getProductQuery } = await import('@/lib/woocommerce/queries/product');

    const res = await woocommerceFetch<WooProductOperation>({
      query: getProductQuery,
      variables: { slug }
    });

    const product = res.body.data.product;

    if (!product) {
      return {
        title: 'Producto no encontrado'
      };
    }

    return {
      title: product.name,
      description: product.shortDescription || product.description?.slice(0, 160) || ''
    };
  } catch {
    return {
      title: 'Producto'
    };
  }
}

async function getProduct(slug: string) {
  try {
    const { woocommerceFetch } = await import('@/lib/woocommerce');
    const { getProductQuery } = await import('@/lib/woocommerce/queries/product');

    const res = await woocommerceFetch<WooProductOperation>({
      query: getProductQuery,
      variables: { slug }
    });

    return res.body.data.product;
  } catch {
    return null;
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  const image = product.image?.sourceUrl || '/placeholder.jpg';
  const galleryImages = product.galleryImages?.nodes || [];

  // Preparar datos para el tracker de productos vistos
  const productForTracker = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.image?.sourceUrl
  };

  return (
    <>
      <WooNavbar />
      <main className="min-h-screen bg-white pt-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Inicio
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-16">
          {/* Galería de imágenes - 60% (3 columnas) */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={image}
                  alt={product.name || 'Producto'}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>

              {galleryImages.length > 0 && (
                <div className="grid grid-cols-4 gap-4">
                  {galleryImages.map((img, index) => (
                    <div
                      key={img.sourceUrl || index}
                      className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 cursor-pointer hover:opacity-75"
                    >
                      <Image
                        src={img.sourceUrl}
                        alt={`${product.name || 'Producto'} - ${index + 1}`}
                        fill
                        className="object-cover object-center"
                        sizes="25vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info del producto - 40% (2 columnas) - Sticky */}
          <div className="lg:col-span-2 lg:sticky lg:top-32 lg:self-start">
            <ProductDescriptionWoo product={product} />
          </div>
        </div>
      </div>
    </main>

    <ProductViewTracker product={productForTracker} />

    <FooterCustom />
    </>
  );
}
