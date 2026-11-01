import { ProductGrid } from "@/components/shop/ProductGrid";
import { ProfileHeader } from "@/components/shop/ProfileHeader";
import { SampleDataNotice } from "@/components/shop/SampleDataNotice";
import { getProducts } from "@/lib/products";

export default function PaginaInicial() {
  const products = getProducts();

  return (
    <main className="mx-auto max-w-4xl pb-10">
      <ProfileHeader productCount={products.length} />
      <div className="px-3 pb-4 sm:px-4">
        <SampleDataNotice />
      </div>
      <ProductGrid products={products} />
    </main>
  );
}
