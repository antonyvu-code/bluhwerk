'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const CartCtx = createContext(null);
const KEY = 'bluhwerk_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  // Aus localStorage laden (nur Client)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const add = useCallback((plant) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === plant.slug);
      if (found) return prev.map((i) => (i.slug === plant.slug ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { slug: plant.slug, name: plant.name, sci: plant.sci, price: plant.price, img: plant.img, qty: 1 }];
    });
  }, []);

  const remove = useCallback((slug) => setItems((prev) => prev.filter((i) => i.slug !== slug)), []);
  const clear = useCallback(() => setItems([]), []);
  const setQty = useCallback((slug, qty) =>
    setItems((prev) => prev.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i))), []);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const total = items.reduce((n, i) => n + i.qty * i.price, 0);

  return (
    <CartCtx.Provider value={{ items, add, remove, setQty, clear, count, total, ready }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartCtx);
  if (!ctx) throw new Error('useCart must be inside CartProvider');
  return ctx;
}
