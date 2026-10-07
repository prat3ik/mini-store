"use client";

import Link from "next/link";

import { useCart } from "@/lib/cart";
import { STORE } from "@/lib/products";

export function Header() {
  const { count, ready } = useCart();
  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="brand" data-testid="brand">
          🛍️ {STORE.name}
        </Link>
        <nav className="nav">
          <Link href="/" data-testid="nav-products">All products</Link>
          <Link href="/cart" data-testid="nav-cart" className="row">
            Cart
            <span className="badge" data-testid="cart-count" aria-label="Items in cart">
              {ready ? count : 0}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
