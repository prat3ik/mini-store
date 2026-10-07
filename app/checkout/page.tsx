"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { placeOrder, useCart } from "@/lib/cart";
import { formatPrice, STORE } from "@/lib/products";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, ready } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = placeOrder({ name, email });
    router.push(`/order?id=${order.id}`);
  };

  return (
    <>
      <h1 data-testid="page-title">Checkout</h1>
      {ready && items.length === 0 ? (
        <p className="muted" data-testid="checkout-empty">Your cart is empty. Add something first.</p>
      ) : (
        <div className="detail">
          <form className="form" onSubmit={submit} data-testid="checkout-form">
            <label>
              Full name
              <input className="input" required value={name} onChange={(e) => setName(e.target.value)} data-testid="name" />
            </label>
            <label>
              Email
              <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} data-testid="email" />
            </label>
            <label>
              Address
              <input className="input" required data-testid="address" />
            </label>
            <button type="submit" className="btn" disabled={!ready || items.length === 0} data-testid="place-order">
              {STORE.placeOrderLabel}
            </button>
          </form>
          <div>
            <h2>Order summary</h2>
            <table className="table" data-testid="order-summary">
              <tbody>
                {items.map((l) => (
                  <tr key={l.slug}>
                    <td>{l.product.name} <span className="muted">× {l.quantity}</span></td>
                    <td style={{ textAlign: "right" }}>{formatPrice(l.product.price * l.quantity)}</td>
                  </tr>
                ))}
                <tr>
                  <td><strong>Total</strong></td>
                  <td style={{ textAlign: "right" }}><strong data-testid="summary-total">{formatPrice(total)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
