import { ProductGrid } from "@/components/ProductGrid";
import { PRODUCTS, STORE } from "@/lib/products";

export default function HomePage() {
  return (
    <>
      <h1 data-testid="page-title">{STORE.name}</h1>
      <p className="muted">{STORE.tagline}</p>
      <ProductGrid products={PRODUCTS} />
    </>
  );
}
