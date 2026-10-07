import Link from "next/link";
import { notFound } from "next/navigation";

import { AddToCart } from "@/components/AddToCart";
import { formatPrice, getProduct, PRODUCTS } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <p><Link href="/" className="muted">← All products</Link></p>
      <div className="detail">
        <div className="thumb" aria-hidden="true">{product.emoji}</div>
        <div style={{ display: "grid", gap: 12 }}>
          <h1 data-testid="product-name">{product.name}</h1>
          <p className="muted">{product.description}</p>
          <p className="price" style={{ fontSize: 24 }} data-testid="product-price">{formatPrice(product.price)}</p>
          <AddToCart slug={product.slug} />
        </div>
      </div>
    </>
  );
}
