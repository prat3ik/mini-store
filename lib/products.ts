// The "database": 2 JSON files read at build time. Edit them, rebuild, done.
import products from "@/data/products.json";
import store from "@/data/store.json";

export interface Product {
  slug: string;
  name: string;
  price: number;
  category: string;
  description: string;
  emoji: string;
}

export const STORE = store;
export const PRODUCTS: Product[] = products;

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: STORE.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
