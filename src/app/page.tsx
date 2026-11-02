import { HeroBanner } from "@/components/shop/home/HeroBanner";
import { Highlights } from "@/components/shop/home/Highlights";
import { ProductCard } from "@/components/shop/product/ProductCard";
import { SampleDataNotice } from "@/components/shop/SampleDataNotice";
import { getProducts, getProductsByHighlight } from "@/lib/products";

export default function HomePage() {
  const [modelo] = getProducts();
  const groups = {
    novidades: getProductsByHighlight("novidades"),
    promocoes: getProductsByHighlight("promocoes"),
    "mais-pedidos": getProductsByHighlight("mais-pedidos"),
  };

  return (
    <main className="pb-12">
      <HeroBanner />

      <div className="mx-auto flex max-w-5xl flex-col gap-10 px-3 pt-8 sm:px-6">
        <SampleDataNotice />

        <section
          id="destaques"
          aria-labelledby="destaques-titulo"
          className="flex scroll-mt-24 flex-col gap-4"
        >
          <h2
            id="destaques-titulo"
            className="font-display text-2xl font-black font-soft text-dea-blue sm:text-3xl"
          >
            Destaques
          </h2>
          <Highlights groups={groups} />
        </section>

        <section
          id="catalogo"
          aria-labelledby="catalogo-titulo"
          className="flex scroll-mt-24 flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <h2
              id="catalogo-titulo"
              className="font-display text-2xl font-black font-soft text-dea-blue sm:text-3xl"
            >
              Catálogo
            </h2>
            <p className="font-hand text-lg text-dea-muted">
              Card modelo — o catálogo completo vem em breve.
            </p>
          </div>
          {modelo && (
            <div className="max-w-xs">
              <ProductCard product={modelo} />
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
