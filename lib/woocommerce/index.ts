/**
 * WOOCOMMERCE GRAPHQL CLIENT
 *
 * Cliente GraphQL para conectar con WooCommerce vía WPGraphQL
 * Basado en la estructura de Shopify pero adaptado para WooCommerce
 */

import { cache } from 'react';
import {
  addToCartMutation,
  updateCartItemMutation
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import { getCollectionQuery, getCollectionsQuery } from './queries/collection';
import {
  getProductQuery,
  getProductsQuery
} from './queries/product';
import { getSearchProductsQuery } from './queries/search';
import {
  WooCart,
  WooCartOperation,
  WooAddToCartOperation,
  WooUpdateCartOperation,
  WooCollection,
  WooCollectionOperation,
  WooCollectionsOperation,
  WooProduct,
  WooProductOperation,
  WooProductsOperation,
  WooSearchOperation,
  Product,
  Collection
} from './types';

const GRAPHQL_ENDPOINT = '/api/graphql';

const domain = process.env.NEXT_PUBLIC_WOOCOMMERCE_URL
  ? process.env.NEXT_PUBLIC_WOOCOMMERCE_URL.replace(/\/$/, '')
  : '';

const directEndpoint = `${domain}/graphql`;

const TAGS = {
  products: 'woo-products',
  collections: 'woo-collections',
  product: (slug: string) => `woo-product-${slug}`,
  collection: (slug: string) => `woo-collection-${slug}`
};

export async function woocommerceFetch<T>({
  headers,
  query,
  variables,
  tags
}: {
  headers?: HeadersInit;
  query: string;
  variables?: object;
  tags?: string[];
}): Promise<{ status: number; body: T } | never> {
  const isServer = typeof window === 'undefined';
  const endpoint = isServer ? directEndpoint : GRAPHQL_ENDPOINT;

  try {
    const fetchOptions: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      })
    };

    if (!isServer) {
      fetchOptions.credentials = 'include';
    }

    const result = await fetch(endpoint, fetchOptions);
    const body = await result.json();

    if (body.errors) {
      console.error('GraphQL errors:', body.errors);
    }

    return { status: result.status, body };
  } catch (error) {
    console.error('WooCommerce fetch exception:', {
      endpoint,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    throw error;
  }
}

function parsePrice(priceHtml: string | undefined): { amount: string; currencyCode: string } {
  if (!priceHtml) {
    return { amount: '0', currencyCode: 'USD' };
  }

  const priceHtmlStr = String(priceHtml);
  let cleanPrice = priceHtmlStr
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/[ -]/g, ' ');

  cleanPrice = cleanPrice.replace(/<[^>]*>/g, '').trim();
  cleanPrice = cleanPrice.replace(/\s+/g, ' ');

  const priceMatch = cleanPrice.match(/[\$€£¥]?\s*([\d,.]+)/);
  const currencyMatch = cleanPrice.match(/[\$€£¥]/);

  if (!priceMatch) {
    return { amount: '0', currencyCode: 'USD' };
  }

  const amount = priceMatch[1]?.replace(/,/g, '.') || '0';
  const currencySymbol = currencyMatch ? currencyMatch[0] : '$';
  const currencyCode = mapCurrencyCode(currencySymbol);

  return { amount, currencyCode };
}

function mapCurrencyCode(symbol: string): string {
  const currencyMap: Record<string, string> = {
    '$': 'USD',
    '€': 'EUR',
    '£': 'GBP',
    '¥': 'JPY'
  };
  return currencyMap[symbol] || 'USD';
}

const reshapeProduct = (product: WooProduct): Product => {
  if (!product) {
    return {} as Product;
  }

  const { amount: price, currencyCode } = parsePrice(product.price || '');

  return {
    id: product.id,
    handle: product.slug,
    title: product.name,
    description: product.description || '',
    descriptionHtml: product.description || '',
    availableForSale: product.stockStatus === 'IN_STOCK',
    priceRange: {
      minVariantPrice: { amount: price, currencyCode },
      maxVariantPrice: { amount: price, currencyCode }
    },
    variants: product.variations?.nodes.map((v) => ({
      id: v.id,
      title: v.name || product.name,
      availableForSale: v.stockStatus === 'IN_STOCK',
      quantityAvailable: v.stockQuantity,
      selectedOptions: v.attributes?.nodes.map(attr => ({
        name: attr.name,
        value: attr.value
      })) || [],
      price: parsePrice(v.price || ''),
      compareAtPrice: v.regularPrice ? parsePrice(v.regularPrice) : undefined
    })) || [],
    featuredImage: product.image ? {
      url: product.image.sourceUrl,
      altText: product.image.altText || product.name,
      width: 0,
      height: 0
    } : {
      url: '',
      altText: product.name,
      width: 0,
      height: 0
    },
    images: product.galleryImages?.nodes.map(img => ({
      url: img.sourceUrl,
      altText: img.altText || product.name,
      width: 0,
      height: 0
    })) || [],
    seo: {
      title: product.name,
      description: product.shortDescription || product.description || ''
    },
    tags: [],
    updatedAt: product.modified || new Date().toISOString(),
    collections: []
  };
};

const reshapeProducts = (products: WooProduct[]): Product[] => {
  return products.filter(Boolean).map(reshapeProduct);
};

const reshapeCollection = (collection: WooCollection): Collection => {
  if (!collection) {
    return {} as Collection;
  }

  return {
    handle: collection.slug,
    title: collection.name,
    description: collection.description || '',
    path: `/search/${collection.slug}`,
    seo: {
      title: collection.name,
      description: collection.description || ''
    },
    updatedAt: new Date().toISOString(),
    image: collection.image ? {
      url: collection.image.sourceUrl,
      altText: collection.image.altText || collection.name,
      width: 0,
      height: 0
    } : undefined
  };
};

const reshapeCollections = (collections: WooCollection[]): Collection[] => {
  return collections.filter(Boolean).map(reshapeCollection);
};

const reshapeCart = (cart: WooCart): unknown => {
  if (!cart) {
    return undefined;
  }

  return {
    id: 'cart',
    checkoutUrl: '',
    cost: {
      subtotalAmount: parsePrice(cart.subtotal),
      totalAmount: parsePrice(cart.total),
      totalTaxAmount: parsePrice(cart.totalTax || '0')
    },
    lines: {
      edges: cart.contents?.nodes.map(item => ({
        node: {
          id: item.key,
          quantity: item.quantity,
          cost: {
            totalAmount: parsePrice(item.total)
          },
          merchandise: {
            id: item.product?.node?.id || '',
            title: item.product?.node?.name || '',
            selectedOptions: [],
            product: {
              id: item.product?.node?.id || '',
              handle: item.product?.node?.slug || '',
              title: item.product?.node?.name || '',
              featuredImage: item.product?.node?.image ? {
                url: item.product.node.image.sourceUrl,
                altText: item.product.node.image.altText || '',
                width: 0,
                height: 0
              } : {
                url: '',
                altText: '',
                width: 0,
                height: 0
              }
            }
          }
        }
      }))
    },
    totalQuantity: cart.contents?.nodes.reduce((sum, item) => sum + item.quantity, 0) || 0
  };
};

// ============================================================================
// QUERIES - PRODUCTOS
// ============================================================================

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await woocommerceFetch<WooProductOperation>({
    query: getProductQuery,
    variables: { slug: handle },
    tags: [TAGS.products, TAGS.product(handle)]
  });

  const product = res.body.data.product;
  if (!product) {
    return undefined;
  }

  if (product.__typename === 'SimpleProduct') {
    return reshapeProduct({
      ...product,
      variations: { nodes: [] }
    } as WooProduct);
  }

  return reshapeProduct(product);
}

export async function getProducts({
  query
}: {
  query?: string;
}): Promise<Product[]> {
  const res = await woocommerceFetch<WooProductsOperation>({
    query: getProductsQuery,
    variables: {
      search: query
    },
    tags: [TAGS.products]
  });

  const products = res.body.data.products?.nodes || [];
  return reshapeProducts(products);
}

// ============================================================================
// QUERIES - COLECCIONES
// ============================================================================

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const res = await woocommerceFetch<WooCollectionOperation>({
    query: getCollectionQuery,
    variables: { slug: handle },
    tags: [TAGS.collections, TAGS.collection(handle)]
  });

  const collection = res.body.data.productCategory;
  if (!collection) {
    return undefined;
  }

  return reshapeCollection(collection);
}

export const getCollections = cache(async (): Promise<Collection[]> => {
  try {
    const res = await woocommerceFetch<WooCollectionsOperation>({
      query: getCollectionsQuery,
      tags: [TAGS.collections]
    });

    const wooCollections = res.body.data.productCategories?.nodes || [];

    const validCollections = wooCollections.filter((collection: WooCollection) =>
      collection.slug &&
      collection.slug !== 'undefined' &&
      collection.slug !== '' &&
      !collection.slug.toLowerCase().includes('uncategorized')
    );

    return reshapeCollections(validCollections);
  } catch (error) {
    console.error('Error fetching collections:', error);
    return [];
  }
});

// ============================================================================
// QUERIES - BÚSQUEDA
// ============================================================================

export async function getSearchProducts(searchQuery: string): Promise<Product[]> {
  const res = await woocommerceFetch<WooSearchOperation>({
    query: getSearchProductsQuery,
    variables: { search: searchQuery },
    tags: [TAGS.products]
  });

  const products = res.body.data.products?.nodes || [];
  return reshapeProducts(products);
}

// ============================================================================
// MUTATIONS - CARRITO
// ============================================================================

export async function getCart(): Promise<unknown> {
  const res = await woocommerceFetch<WooCartOperation>({
    query: getCartQuery
  });

  if (!res.body.data?.cart) {
    return undefined;
  }
  return reshapeCart(res.body.data.cart as WooCart);
}

export async function addToCart(
  productId: string,
  quantity: number = 1
): Promise<unknown> {
  const res = await woocommerceFetch<WooAddToCartOperation>({
    query: addToCartMutation,
    variables: { productId, quantity }
  });

  if (!res.body.data?.addToCart) {
    return undefined;
  }
  return reshapeCart(res.body.data.addToCart as WooCart);
}

export async function updateCartItem(
  key: string,
  quantity: number
): Promise<unknown> {
  const res = await woocommerceFetch<WooUpdateCartOperation>({
    query: updateCartItemMutation,
    variables: { key, quantity }
  });

  if (!res.body.data?.updateCartItems) {
    return undefined;
  }
  return reshapeCart(res.body.data.updateCartItems.cart as WooCart);
}

export async function removeFromCart(key: string): Promise<unknown> {
  return updateCartItem(key, 0);
}