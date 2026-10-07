"use client";

import Link from "next/link";
import { useState } from "react";

import { formatPrice, type Product } from "@/lib/products";

export function ProductGrid({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const shown = products.filter((p) =>
    `${p.name} ${p.category}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <>
      <div className="toolbar">
        <input
          className="input"
          placeholder="Search products"
          aria-label="Search products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          data-testid="search"
        />
        <p className="muted" data-testid="results-count">
          Showing {shown.length} products
        </p>
      </div>
      <div className="grid" data-testid="product-grid">
        {shown.map((p) => (
          <article key={p.slug} className="card" data-testid="product-card" data-slug={p.slug}>
            <div className="thumb" aria-hidden="true">{p.emoji}</div>
            <h2>
              <Link href={`/product/${p.slug}`} data-testid="product-name">{p.name}</Link>
            </h2>
            <p className="muted">{p.category}</p>
            <p className="price" data-testid="product-price">{formatPrice(p.price)}</p>
            <Link href={`/product/${p.slug}`} className="btn secondary">View</Link>
          </article>
        ))}
      </div>
    </>
  );
}
