"use client";

import Link from "next/link";

import { removeFromCart, useCart } from "@/lib/cart";
import { formatPrice, STORE } from "@/lib/products";

export default function CartPage() {
  const { items, total, ready } = useCart();

  if (!ready) return <h1>Your cart</h1>;

  return (
    <>
      <h1 data-testid="page-title">Your cart</h1>
      {items.length === 0 ? (
        <div className="empty" data-testid="cart-empty">
          <p>Your cart is empty.</p>
          <Link href="/" className="btn secondary">Browse products</Link>
        </div>
      ) : (
        <>
          <table className="table" data-testid="cart-table">
            <thead>
              <tr><th>Item</th><th>Qty</th><th>Price</th><th></th></tr>
            </thead>
            <tbody>
              {items.map((l) => (
                <tr key={l.slug} data-testid="cart-line" data-slug={l.slug}>
                  <td data-testid="line-name">{l.product.name}</td>
                  <td data-testid="line-quantity">{l.quantity}</td>
                  <td data-testid="line-price">{formatPrice(l.product.price * l.quantity)}</td>
                  <td>
                    <button type="button" className="btn secondary" onClick={() => removeFromCart(l.slug)} data-testid="remove-line">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="summary">
            <div><span className="muted">Subtotal</span><span data-testid="subtotal">{formatPrice(total)}</span></div>
            <div><span className="muted">Shipping</span><span data-testid="shipping">{STORE.shipping}</span></div>
            <div className="total"><span>Total</span><span data-testid="total">{formatPrice(total)}</span></div>
            <Link href="/checkout" className="btn" data-testid="checkout">Checkout</Link>
          </div>
        </>
      )}
    </>
  );
}
