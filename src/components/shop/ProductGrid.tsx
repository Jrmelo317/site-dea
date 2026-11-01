import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatters";
import type { Product } from "@/types/product";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <section aria-labelledby="grade-titulo" className="border-t border-dea-line">
      <h2 id="grade-titulo" className="sr-only">
        Produtos
      </h2>
      <ul className="grid grid-cols-3 gap-0.5 sm:gap-1">
        {products.map((product) => {
          const image = product.images[0];
          return (
            <li key={product.id}>
              <Link
                href={`/produtos/${product.slug}`}
                aria-label={`${product.name}, ${formatPrice(product.price)}. Ver detalhes`}
                className="group relative block aspect-square overflow-hidden bg-dea-sand outline-none focus-visible:ring-4 focus-visible:ring-dea-blue focus-visible:ring-inset"
              >
                {image && (
                  <Image
                    src={image.url}
                    alt={image.alt}
                    fill
                    unoptimized
                    sizes="(min-width: 896px) 300px, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                {product.badge && (
                  <span className="absolute top-1 left-1 rounded-sm bg-dea-heart px-1 text-xs font-semibold text-dea-cream">
                    {product.badge}
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 flex flex-col bg-dea-night/80 px-1.5 py-1 text-dea-cream opacity-100 transition-opacity sm:px-2 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
                  <span className="hidden truncate text-sm sm:block">{product.name}</span>
                  <span className="truncate text-xs font-semibold sm:text-sm">{formatPrice(product.price)}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
