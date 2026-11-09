import Image from "next/image";
import Link from "next/link";
import { formatCentsToBRL } from "@/lib/formatters";
import type { Product } from "@/types/product";

export function FeaturedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section
      aria-labelledby="faixa-produtos-titulo"
      className="border-y border-dea-line bg-dea-paper"
    >
      <div className="mx-auto max-w-5xl px-4 py-3 sm:px-6">
        <div className="mb-1 flex items-center justify-between gap-3">
          <h2 id="faixa-produtos-titulo" className="font-hand text-lg text-dea-blue">
            Da nossa lojinha
          </h2>
          <Link
            href="/#catalogo"
            className="inline-flex min-h-11 items-center rounded-sm px-1 text-sm font-medium text-dea-blue underline-offset-4 outline-none hover:underline focus-visible:ring-3 focus-visible:ring-dea-blue"
          >
            Ver todos
          </Link>
        </div>
        <section
          aria-label="Produtos em destaque"
          tabIndex={products.length > 1 ? 0 : undefined}
          className="scrollbar-hidden snap-x snap-mandatory scroll-px-1 overflow-x-auto overscroll-x-contain rounded-md px-1 py-2 outline-none focus-visible:ring-3 focus-visible:ring-dea-blue"
        >
          <ul className="flex items-stretch gap-4">
            {products.map((product) => {
              const image = product.images[0];
              return (
                <li key={product.id} className="w-64 shrink-0 snap-start sm:w-72">
                  <article className="h-full">
                    <Link
                      href={`/produtos/${product.slug}`}
                      aria-label={`Ver ${product.name}`}
                      className="flex h-full min-h-24 items-center gap-3 rounded-md py-1 outline-none focus-visible:ring-3 focus-visible:ring-dea-blue"
                    >
                      <span className="relative size-14 shrink-0 overflow-hidden rounded-md bg-dea-sand">
                        {image && (
                          <Image
                            src={image.url}
                            alt={image.alt}
                            fill
                            unoptimized
                            sizes="56px"
                            className="object-contain"
                          />
                        )}
                      </span>
                      <div className="flex min-w-0 flex-col items-start gap-1">
                        {product.badge && (
                          <span className="text-xs text-dea-muted">{product.badge}</span>
                        )}
                        <h3 className="text-sm leading-snug font-medium text-dea-blue">
                          {product.name}
                        </h3>
                        <p className="text-sm text-dea-night">{formatCentsToBRL(product.price)}</p>
                      </div>
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </section>
  );
}
