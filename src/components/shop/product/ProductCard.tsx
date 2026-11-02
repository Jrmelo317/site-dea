import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/formatters";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

/**
 * Card MODELO de produto (template). Estrutura mínima e funcional:
 * imagem, selo, nome e preço, levando à página de Detalhes.
 * TODO: detalhamento visual a cargo de outro membro da equipe.
 */
export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-lg border border-dea-line bg-dea-cream">
      <div className="relative aspect-square bg-dea-sand">
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            unoptimized
            sizes="(min-width: 640px) 33vw, 100vw"
            className="object-cover"
          />
        )}
        {product.badge && (
          <span className="absolute top-2 left-2 rounded-sm bg-dea-heart px-2 py-0.5 text-xs font-semibold text-dea-cream">
            {product.badge}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1 p-3">
        <h3 className="font-semibold text-dea-ink">
          <Link
            href={`/produtos/${product.slug}`}
            className="outline-none after:absolute after:inset-0 focus-visible:underline"
          >
            {product.name}
          </Link>
        </h3>
        <p className="flex items-baseline gap-2">
          <span className="font-display font-black font-soft text-dea-blue">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice && (
            <s className="text-sm text-dea-muted">
              <span className="sr-only">de </span>
              {formatPrice(product.compareAtPrice)}
            </s>
          )}
        </p>
      </div>
    </article>
  );
}
