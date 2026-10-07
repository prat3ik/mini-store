"use client";

import { useState } from "react";

import { addToCart } from "@/lib/cart";
import { STORE } from "@/lib/products";

export function AddToCart({ slug }: { slug: string }) {
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(false);

  const add = () => {
    addToCart(slug, quantity);
    setToast(true);
    window.setTimeout(() => setToast(false), 2000);
  };

  return (
    <div style={{ display: "grid", gap: 12 }}>
      <div className="row">
        <span className="muted">Quantity</span>
        <div className="qty">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
          <span data-testid="quantity">{quantity}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)}>+</button>
        </div>
      </div>
      <button type="button" className="btn" onClick={add} data-testid="add-to-cart">
        {STORE.addToCartLabel}
      </button>
      {toast && (
        <div className="toast" role="status" data-testid="added-toast">
          Added to the cart
        </div>
      )}
    </div>
  );
}
