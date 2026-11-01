"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { QuantityStepper } from "@/components/shop/QuantityStepper";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatters";

export function CartView() {
  const { items, hydrated, totalItems, totalPrice, updateQuantity, removeItem } = useCart();

  if (!hydrated) {
    return (
      <p role="status" className="py-12 text-center text-dea-muted">
        Carregando carrinho…
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-lg bg-dea-cream px-4 py-12 text-center">
        <p className="font-hand text-2xl text-dea-blue">Seu carrinho está vazio.</p>
        <Button asChild>
          <Link href="/">Ver produtos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <ul className="flex flex-col gap-3 md:col-span-2" aria-label="Itens no carrinho">
        {items.map((item) => (
          <li
            key={item.key}
            className="flex gap-3 rounded-lg border border-dea-line bg-dea-cream p-3"
          >
            <Link
              href={`/produtos/${item.slug}`}
              className="relative size-20 shrink-0 overflow-hidden rounded-md bg-dea-sand outline-none focus-visible:ring-3 focus-visible:ring-dea-blue/50 sm:size-24"
            >
              {item.image && (
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  unoptimized
                  sizes="96px"
                  className="object-cover"
                />
              )}
            </Link>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h2 className="font-semibold text-dea-ink">{item.name}</h2>
                  {item.variantLabel && (
                    <p className="text-sm text-dea-muted">Tamanho: {item.variantLabel}</p>
                  )}
                  <p className="text-sm text-dea-muted">{formatPrice(item.price)} cada</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="-mt-2 -mr-2 text-dea-heart"
                  onClick={() => removeItem(item.key)}
                  aria-label={`Remover ${item.name}${item.variantLabel ? ` tamanho ${item.variantLabel}` : ""}`}
                >
                  <Trash2 aria-hidden="true" />
                </Button>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <QuantityStepper
                  value={item.quantity}
                  label={`Quantidade de ${item.name}`}
                  onChange={(value) => updateQuantity(item.key, value)}
                />
                <p className="font-display font-black font-soft text-dea-blue">
                  {formatPrice(item.price * item.quantity)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside
        aria-label="Resumo do pedido"
        className="flex h-fit flex-col gap-3 rounded-lg bg-dea-night p-4 text-dea-cream bg-grain"
      >
        <p className="text-sm text-dea-sky">
          {totalItems} {totalItems === 1 ? "item" : "itens"}
        </p>
        <p className="flex items-baseline justify-between gap-2">
          <span>Total</span>
          <span className="font-display text-2xl font-black font-soft">
            {formatPrice(totalPrice)}
          </span>
        </p>
        <p className="font-hand text-base text-dea-sand">
          Pagamento e retirada no encontro de quinta-feira.
        </p>
        <Button asChild variant="secondary">
          <Link href="/">Continuar comprando</Link>
        </Button>
      </aside>
    </div>
  );
}
