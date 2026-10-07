"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { readLastOrder, type Order } from "@/lib/cart";
import { formatPrice, getProduct, STORE } from "@/lib/products";

export default function OrderPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setOrder(readLastOrder());
    setReady(true);
  }, []);

  if (!ready) return <h1>Order</h1>;
  if (!order) {
    return (
      <>
        <h1>No order yet</h1>
        <Link href="/" className="muted">← All products</Link>
      </>
    );
  }

  return (
    <>
      <h1 className="ok" data-testid="confirmation-title">{STORE.confirmationTitle}</h1>
      <p className="muted">
        Order <code data-testid="order-id">{order.id}</code> for {order.name}. A receipt went to {order.email}.
      </p>
      <table className="table" data-testid="order-lines">
        <tbody>
          {order.lines.map((l) => {
            const p = getProduct(l.slug);
            return (
              <tr key={l.slug}>
                <td>{p?.name} <span className="muted">× {l.quantity}</span></td>
                <td style={{ textAlign: "right" }}>{formatPrice((p?.price ?? 0) * l.quantity)}</td>
              </tr>
            );
          })}
          <tr>
            <td><strong>Amount charged</strong></td>
            <td style={{ textAlign: "right" }}><strong data-testid="amount-charged">{formatPrice(order.total)}</strong></td>
          </tr>
        </tbody>
      </table>
      <p style={{ marginTop: 16 }}><Link href="/" className="btn secondary">Keep shopping</Link></p>
    </>
  );
}
