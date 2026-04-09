'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

export interface CartItem {
  id: string | number;
  name: string;
  price: string;
  image: string;
  category: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: string | number) => void;
  updateQuantity: (id: string | number, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (e) {
          console.error('Failed to parse cart:', e);
        }
      }
    } else {
      setItems([]);
    }
    setIsInitialized(true);
  }, [user]);

  // Save cart to localStorage on change
  useEffect(() => {
    if (isInitialized && user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(items));
    }
  }, [items, user, isInitialized]);

  const parsePrice = (price: any): number => {
    if (typeof price === 'number') return price;
    if (!price) return 0;
    // Strip everything except digits to handle both commas and dots as separators
    const clean = String(price).replace(/[^\d]/g, '');
    return parseInt(clean, 10) || 0;
  };

  const addToCart = (product: any) => {
    const isExisting = items.some((item) => item.id === product.id);
    
    if (isExisting) {
      toast.info(`Increased quantity of ${product.name}`);
      setItems((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      toast.success(`${product.name} added to cart!`);
      setItems((prev) => [...prev, { ...product, quantity: 1, price: String(product.price) }]);
    }
  };

  const removeFromCart = (id: string | number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.warn('Item removed from cart');
  };

  const updateQuantity = (id: string | number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    if (user) {
      localStorage.removeItem(`cart_${user.id}`);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotal = items.reduce((sum, item) => {
    const priceValue = parsePrice(item.price);
    return sum + priceValue * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
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
