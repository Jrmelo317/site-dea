"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/providers/CartProvider";
import { cn } from "@/lib/utils";

export function CartButton() {
  const { totalItems, hydrated } = useCart();
  const pathname = usePathname();
  const count = hydrated ? totalItems : 0;
  const label = count === 1 ? "Carrinho, 1 item" : `Carrinho, ${count} itens`;
  const current = pathname === "/carrinho";

  return (
    <Link
      href="/carrinho"
      aria-label={label}
      aria-current={current ? "page" : undefined}
      className={cn(
        "relative flex min-h-11 min-w-11 rotate-2 items-center justify-center gap-2 rounded-sm bg-dea-sand bg-grain-dark px-3 text-dea-blue shadow-sm outline-none transition-transform hover:rotate-0 focus-visible:ring-3 focus-visible:ring-dea-blue/50",
        current && "rotate-0 ring-2 ring-dea-blue",
      )}
    >
      <ShoppingBag className="size-5" aria-hidden="true" />
      <span className="hidden font-hand text-lg sm:inline" aria-hidden="true">
        Carrinho
      </span>
      {count > 0 && (
        <span
          aria-hidden="true"
          className="absolute -top-2 -right-2 flex size-6 -rotate-12 items-center justify-center rounded-full border-2 border-dea-paper bg-dea-heart text-xs font-bold text-dea-cream"
        >
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
