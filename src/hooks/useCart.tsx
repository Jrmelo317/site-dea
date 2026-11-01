"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/types/cart";

const STORAGE_KEY = "@dea:cart";
const MAX_QUANTITY = 99;

type AddItemInput = Omit<CartItem, "key" | "quantity"> & { quantity?: number };

interface CartContextValue {
  items: CartItem[];
  /** `false` até o carrinho ser lido do localStorage (evita hydration mismatch). */
  hydrated: boolean;
  totalItems: number;
  totalPrice: number;
  addItem: (item: AddItemInput) => void;
  updateQuantity: (key: string, quantity: number) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function buildKey(productId: string, variantLabel?: string) {
  return variantLabel ? `${productId}::${variantLabel}` : productId;
}

function clampQuantity(quantity: number) {
  return Math.min(MAX_QUANTITY, Math.max(1, Math.floor(quantity)));
}

function readStorage(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        typeof item.key === "string" &&
        typeof item.price === "number" &&
        typeof item.quantity === "number",
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Lê o localStorage só no cliente, após a montagem.
  useEffect(() => {
    setItems(readStorage());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Armazenamento indisponível (modo privado, cota cheia): segue só em memória.
    }
  }, [items, hydrated]);

  const addItem = useCallback((input: AddItemInput) => {
    const { quantity = 1, ...rest } = input;
    const key = buildKey(rest.productId, rest.variantLabel);
    setItems((current) => {
      const existing = current.find((item) => item.key === key);
      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: clampQuantity(item.quantity + quantity) } : item,
        );
      }
      return [...current, { ...rest, key, quantity: clampQuantity(quantity) }];
    });
  }, []);

  const updateQuantity = useCallback((key: string, quantity: number) => {
    setItems((current) =>
      current.map((item) => (item.key === key ? { ...item, quantity: clampQuantity(quantity) } : item)),
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((current) => current.filter((item) => item.key !== key));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      hydrated,
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
      addItem,
      updateQuantity,
      removeItem,
      clear,
    }),
    [items, hydrated, addItem, updateQuantity, removeItem, clear],
  );

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de <CartProvider>.");
  return context;
}

export { MAX_QUANTITY };
