"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useId, useState } from "react";
import { useCart } from "@/components/providers/CartProvider";
import { QuantityStepper } from "@/components/shop/cart/QuantityStepper";
import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/lib/formatters";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
}

/**
 * Estrutura MODELO da página de Detalhes: funcional (tamanho, quantidade,
 * adicionar ao carrinho), sem acabamento visual.
 * TODO: detalhamento a cargo de outro membro da equipe.
 */
export function ProductDetails({ product }: ProductDetailsProps) {
  const { addItem } = useCart();
  const sizeLabelId = useId();
  const firstAvailable = product.variants.find((variant) => variant.available);
  const [size, setSize] = useState<string | undefined>(
    product.variants.length === 1 ? firstAvailable?.label : undefined,
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const image = product.images[0];
  const needsSize = product.variants.length > 0;

  function handleAdd() {
    if (needsSize && !size) {
      setError("Escolha um tamanho antes de adicionar.");
      return;
    }
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: image?.url ?? "",
      imageAlt: image?.alt ?? product.name,
      variantLabel: size,
      quantity,
    });
    setError(null);
    setAdded(true);
  }

  return (
    <article className="grid gap-6 md:grid-cols-2 md:gap-8">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-dea-sand">
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            fill
            unoptimized
            priority
            sizes="(min-width: 768px) 448px, 100vw"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-3xl font-black font-soft text-dea-blue">
            {product.name}
          </h1>
          <p className="font-display text-2xl font-black font-soft text-dea-ink">
            {formatCentsToBRL(product.price)}
          </p>
          <p className="text-base text-dea-ink">{product.description}</p>
        </div>

        {needsSize && (
          <div className="flex flex-col gap-2">
            <p id={sizeLabelId} className="text-sm font-semibold text-dea-muted">
              Tamanho
            </p>
            <div role="radiogroup" aria-labelledby={sizeLabelId} className="flex flex-wrap gap-2">
              {product.variants.map((variant) => {
                const selected = size === variant.label;
                return (
                  // biome-ignore lint/a11y/useSemanticElements: botões com role radio para um seletor visual de tamanhos
                  <button
                    key={variant.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    disabled={!variant.available}
                    onClick={() => {
                      setSize(variant.label);
                      setError(null);
                      setAdded(false);
                    }}
                    className={cn(
                      "min-h-11 min-w-11 cursor-pointer rounded-lg border px-3 font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-dea-blue/50",
                      selected
                        ? "border-dea-blue bg-dea-blue text-dea-cream"
                        : "border-dea-line bg-dea-cream text-dea-blue hover:border-dea-blue",
                      !variant.available &&
                        "cursor-not-allowed text-dea-muted line-through opacity-60",
                    )}
                  >
                    {variant.label}
                    {!variant.available && <span className="sr-only"> (esgotado)</span>}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-dea-muted">Quantidade</p>
          <QuantityStepper
            value={quantity}
            label="Quantidade"
            onChange={(value) => {
              setQuantity(value);
              setAdded(false);
            }}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Button size="lg" className="w-full text-base" onClick={handleAdd}>
            Adicionar ao carrinho
          </Button>
          <p role="status" aria-live="polite" className="min-h-6 text-sm">
            {error && <span className="text-dea-heart">{error}</span>}
            {added && (
              <span className="inline-flex items-center gap-1 text-dea-good">
                <Check className="size-4" aria-hidden="true" /> Adicionado!{" "}
                <Link
                  href="/carrinho"
                  className="font-semibold text-dea-blue underline underline-offset-4"
                >
                  Ver carrinho
                </Link>
              </span>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}
