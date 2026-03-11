/**
 * Cart context for Moneyling products/programs. Persists to localStorage.
 */

import React, { createContext, useContext, useCallback, useMemo, useEffect, useState } from "react";

export type CartItem = {
  id: string;
  type: "course" | "program";
  code: string;
  name: string;
  url?: string;
  amountInCents?: number;
};

const CART_STORAGE_KEY = "moneyling-cart";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "id"> & { id?: string }) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  count: number;
  totalCents: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    saveCart(items);
  }, [items]);

  const addItem = useCallback((item: Omit<CartItem, "id"> & { id?: string }) => {
    const id = item.id ?? `${item.type}-${item.code}-${item.name}`.replace(/\s+/g, "-").toLowerCase();
    setItems((prev) => {
      if (prev.some((i) => i.id === id)) return prev;
      return [...prev, { ...item, id }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = items.length;
  const totalCents = items.reduce((sum, i) => sum + (i.amountInCents ?? 0), 0);

  const value = useMemo(
    () => ({ items, addItem, removeItem, clearCart, count, totalCents }),
    [items, addItem, removeItem, clearCart, count, totalCents]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
