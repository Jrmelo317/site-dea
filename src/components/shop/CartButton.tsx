"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";

export function CartButton() {
  const { totalItems, hydrated } = useCart();
  const count = hydrated ? totalItems : 0;
  const label = count === 1 ? "Carrinho, 1 item" : `Carrinho, ${count} itens`;

  return (
    <Button asChild variant="ghost" size="icon" className="relative text-dea-blue">
      <Link href="/carrinho" aria-label={label}>
        <ShoppingBag className="size-6" aria-hidden="true" />
        {count > 0 && (
          <span
            aria-hidden="true"
            className="absolute top-0.5 right-0.5 flex min-w-5 items-center justify-center rounded-full bg-dea-heart px-1 text-xs font-semibold text-dea-cream"
          >
            {count > 99 ? "99+" : count}
          </span>
        )}
      </Link>
    </Button>
  );
}
