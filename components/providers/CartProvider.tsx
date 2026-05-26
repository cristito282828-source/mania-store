'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';
import { getProduct } from '@/lib/woocommerce';

// Interface for items stored in the local cart
interface LocalCartItem {
  key: string;
  productId: string;
  productName: string;
  productSlug: string;
  variationName?: string;
  size?: string;
  price: number; // numeric price per unit (CLP)
  priceDisplay: string; // formatted price for display
  quantity: number;
  image?: {
    sourceUrl?: string;
    altText?: string;
  };
}

interface LocalCart {
  contents: {
    nodes: LocalCartItem[];
  };
  subtotal: string;
  total: string;
  shippingTotal: string;
  discountTotal: string;
  feeTotal: string;
}

interface CartContextType {
  cart: LocalCart | null;
  itemCount: number;
  isLoading: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  addToCart: (productId: string, quantity?: number, productData?: any) => Promise<boolean>;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  refreshCart: () => void;
}

const CART_STORAGE_KEY = 'pinneacle_cart';

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper to format a number as Chilean peso currency
const formatCLP = (num: number) => {
  const rounded = Math.round(num);
  return '$' + rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

// Helper to parse price strings that may contain "$", "&nbsp;" or other characters
const parsePrice = (priceStr: string): number => {
  if (!priceStr) return 0;
  let cleaned = priceStr.replace(/[^0-9.,]/g, '') || '0';
  const hasComma = cleaned.includes(',');
  const hasDot = cleaned.includes('.');

  if (hasComma && hasDot) {
    const parts = cleaned.split('.');
    if (parts.length === 2 && (parts[1]?.length ?? 0) <= 2) {
      cleaned = cleaned.replace(/,/g, '').replace(/\.\d+$/, '');
    } else {
      cleaned = cleaned.replace(/,/g, '').replace(/\./g, '');
    }
  } else if (hasDot) {
    const parts = cleaned.split('.');
    if (parts.length > 1 && parts.some(p => p.length === 3)) {
      cleaned = cleaned.replace(/\./g, '');
    } else {
      cleaned = Math.round(parseFloat(cleaned)).toString();
    }
  } else if (hasComma) {
    const parts = cleaned.split(',');
    if (parts.length === 2 && (parts[1]?.length ?? 0) <= 2) {
      cleaned = parts[0] || '0';
    } else {
      cleaned = cleaned.replace(/,/g, '');
    }
  }
  return parseFloat(cleaned || '0');
};

// Persist cart to localStorage
const saveCart = (cart: LocalCart | null) => {
  if (typeof window !== 'undefined') {
    if (cart) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }
};

// Load cart from localStorage
const loadCart = (): LocalCart | null => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(CART_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
  }
  return null;
};

// Compute totals based on numeric price values
const calculateCartTotals = (items: LocalCartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return {
    subtotal: formatCLP(subtotal),
    total: formatCLP(subtotal),
    shippingTotal: '$0',
    discountTotal: '$0',
    feeTotal: '$0',
  };
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<LocalCart | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Initialise cart from storage
  useEffect(() => {
    const savedCart = loadCart();
    if (savedCart) setCart(savedCart);
  }, []);

  // Persist cart on changes
  useEffect(() => {
    saveCart(cart);
  }, [cart]);

  // Add a product (or variant) to the cart
  const addToCart = useCallback(async (productId: string, quantity: number = 1, productData?: any): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Resolve product data either from argument or API
      let product = productData;
      if (!product) {
        product = await getProduct(productId);
      }
      if (!product) {
        alert('Producto no encontrado');
        return false;
      }

      // Determine numeric price
      const rawPrice = String(product.priceRange?.minVariantPrice?.amount || product.priceRange?.maxVariantPrice?.amount || '0');
      const priceNum = parsePrice(rawPrice);

      setCart(prevCart => {
        const baseCart: any = prevCart ?? {
          contents: { nodes: [] },
          subtotal: '$0',
          total: '$0',
          shippingTotal: '$0',
          discountTotal: '$0',
          feeTotal: '$0',
        };
        const existingItem = baseCart.contents.nodes.find((item: any) => item.productId === productId || item.productSlug === product.handle);
        if (existingItem) {
          // Increase quantity
          const updatedNodes = baseCart.contents.nodes.map((item: any) => {
            if (item.productId === productId || item.productSlug === product.handle) {
              const newQuantity = item.quantity + quantity;
              const newTotal = item.price * newQuantity;
              return { ...item, quantity: newQuantity, priceDisplay: formatCLP(newTotal) };
            }
            return item;
          });
          const totals = calculateCartTotals(updatedNodes);
          return { ...baseCart, contents: { nodes: updatedNodes }, ...totals };
        } else {
          // Create new cart item
          const newItem: LocalCartItem = {
            key: `${productId}-${Date.now()}`,
            productId,
            productName: productData?.title || product.title,
            productSlug: product.handle,
            variationName: productData?.variationName,
            size: productData?.size,
            price: priceNum,
            priceDisplay: formatCLP(priceNum * quantity),
            quantity,
            image: product.featuredImage
              ? { sourceUrl: product.featuredImage.url, altText: product.featuredImage.altText || product.name }
              : undefined,
          };
          const updatedNodes = [...baseCart.contents.nodes, newItem];
          const totals = calculateCartTotals(updatedNodes);
          return { ...baseCart, contents: { nodes: updatedNodes }, ...totals };
        }
      });

      openCart();
      return true;
    } catch (error: any) {
      console.error('Error adding to cart:', error);
      alert('Error al agregar al carrito');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [openCart]);

  // Update quantity of an existing item
  const updateQuantity = useCallback((key: string, quantity: number) => {
    if (!cart) return;
    if (quantity < 1) {
      removeItem(key);
      return;
    }
    setCart(prevCart => {
      if (!prevCart) return prevCart;
      const updatedNodes = prevCart.contents.nodes.map(item => {
        if (item.key === key) {
          const newSubtotal = item.price * quantity;
          return { ...item, quantity, priceDisplay: formatCLP(newSubtotal) };
        }
        return item;
      });
      const totals = calculateCartTotals(updatedNodes);
      return { ...prevCart, contents: { nodes: updatedNodes }, ...totals };
    });
  }, [cart, removeItem]);

  // Remove an item entirely
  const removeItem = useCallback((key: string) => {
    setCart(prevCart => {
      if (!prevCart) return prevCart;
      const updatedNodes = prevCart.contents.nodes.filter(item => item.key !== key);
      if (updatedNodes.length === 0) return null;
      const totals = calculateCartTotals(updatedNodes);
      return { ...prevCart, contents: { nodes: updatedNodes }, ...totals };
    });
  }, []);

  const clearCart = useCallback(() => setCart(null), []);

  const refreshCart = useCallback(() => {
    const savedCart = loadCart();
    setCart(savedCart);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const itemCount = useMemo(() => {
    if (!cart) return 0;
    return cart.contents.nodes.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const value: CartContextType = {
    cart,
    itemCount,
    isLoading,
    isOpen,
    openCart,
    closeCart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    refreshCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
