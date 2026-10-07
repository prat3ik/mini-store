"use client";

// Cart lives in localStorage so the store needs no server state. Every
// component that renders cart data subscribes through useCart() and re-renders
// when any tab changes it.
import { useEffect, useState } from "react";

import { getProduct, type Product } from "./products";

export interface CartLine {
  slug: string;
  quantity: number;
}

export interface Order {
  id: string;
  lines: CartLine[];
  total: number;
  name: string;
  email: string;
  placedAt: string;
}

const CART_KEY = "mini-store.cart";
const ORDER_KEY = "mini-store.last-order";
const CART_EVENT = "mini-store:cart";

function read(): CartLine[] {
  try {
    return JSON.parse(window.localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function write(lines: CartLine[]) {
  window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(slug: string, quantity = 1) {
  const lines = read();
  const line = lines.find((l) => l.slug === slug);
  if (line) line.quantity += quantity;
  else lines.push({ slug, quantity });
  write(lines);
}

export function removeFromCart(slug: string) {
  write(read().filter((l) => l.slug !== slug));
}

export function clearCart() {
  write([]);
}

export function cartTotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + (getProduct(l.slug)?.price ?? 0) * l.quantity, 0);
}

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}

export function placeOrder(input: { name: string; email: string }): Order {
  const lines = read();
  const order: Order = {
    id: Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
    lines,
    total: cartTotal(lines),
    name: input.name,
    email: input.email,
    placedAt: new Date().toISOString(),
  };
  window.localStorage.setItem(ORDER_KEY, JSON.stringify(order));
  clearCart();
  return order;
}

export function readLastOrder(): Order | null {
  try {
    return JSON.parse(window.localStorage.getItem(ORDER_KEY) || "null");
  } catch {
    return null;
  }
}

/** Live view of the cart. `ready` is false during SSR and the first client paint. */
export function useCart() {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setLines(read());
    sync();
    setReady(true);
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const items = lines
    .map((l) => ({ ...l, product: getProduct(l.slug) as Product }))
    .filter((l) => l.product);

  return { lines, items, ready, count: cartCount(lines), total: cartTotal(lines) };
}
