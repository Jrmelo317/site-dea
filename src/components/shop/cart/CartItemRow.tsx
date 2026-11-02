"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ON_LINE } from "@/components/shop/cart/notebook";
import { QuantityStepper } from "@/components/shop/cart/QuantityStepper";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatters";
import { truncateText } from "@/lib/whatsapp";
import type { CartItem } from "@/types/cart";

interface CartItemRowProps {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

/** Um item do carrinho escrito no caderno: 3 pautas (h-24), quantidade à direita, abaixo da lixeira. */
export function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  const variant = item.variantLabel ? ` tamanho ${item.variantLabel}` : "";
  const shortName = truncateText(item.name);
  return (
    <li key={item.key} className="flex h-24 gap-3">
      <Link
        href={`/produtos/${item.slug}`}
        title={item.name}
        className="relative hidden size-16 shrink-0 -rotate-2 overflow-hidden rounded-sm border-4 border-dea-cream bg-dea-sand shadow-sm outline-none focus-visible:ring-3 focus-visible:ring-dea-blue/50 sm:block"
      >
        {item.image && (
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            unoptimized
            sizes="64px"
            className="object-cover"
          />
        )}
      </Link>
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 title={item.name} className={`${ON_LINE} min-w-0 font-semibold text-dea-ink`}>
          <span className="truncate">{shortName}</span>
        </h3>
        <p className={`${ON_LINE} text-sm text-dea-muted`}>
          <span className="truncate">
            {item.variantLabel && <>Tam. {item.variantLabel} · </>}
            {formatPrice(item.price)} cada
          </span>
        </p>
        <p className={`${ON_LINE} font-display text-lg font-black font-soft text-dea-blue`}>
          <span className="sr-only">Subtotal: </span>
          {formatPrice(item.price * item.quantity)}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end">
        {/* Ícone apoiado na pauta; o botão transparente se estende para cima até 44px. */}
        <div className="flex h-8 items-end">
          <Button
            variant="ghost"
            size="icon"
            className="-mr-2 -mb-1 size-11 items-end pb-1 text-dea-heart"
            onClick={onRemove}
            aria-label={`Remover ${item.name}${variant}`}
          >
            <Trash2 aria-hidden="true" />
          </Button>
        </div>
        {/* Stepper (44px) apoiado na 3ª pauta, com fundo de papel para a pauta do meio não cortá-lo. */}
        <div className="flex h-16 items-end">
          <div className="mb-px rounded-lg bg-dea-cream shadow-sm">
            <QuantityStepper
              value={item.quantity}
              label={`Quantidade de ${item.name}${variant}`}
              onChange={onQuantityChange}
            />
          </div>
        </div>
      </div>
    </li>
  );
}
