"use client";

import Link from "next/link";
import { HandDrawing } from "@/components/decor/HandDrawing";
import { WashiTape } from "@/components/decor/WashiTape";
import { useCart } from "@/components/providers/CartProvider";
import { CartItemRow } from "@/components/shop/cart/CartItemRow";
import { CartSkeleton } from "@/components/shop/cart/CartSkeleton";
import { CartSummary } from "@/components/shop/cart/CartSummary";
import { Button } from "@/components/ui/button";

function CartTitle({ count }: { count?: number }) {
  const suffix =
    count === undefined ? "" : ` - ${count} ${count === 1 ? "item anotado" : "itens anotados"}`;
  return (
    <h1 className="relative w-fit font-display text-3xl font-black font-soft text-dea-blue sm:text-4xl">
      Meu carrinho{suffix}
      <HandDrawing
        name="sublinhado"
        className="absolute -bottom-2 left-0 h-3 w-full text-dea-heart"
      />
    </h1>
  );
}

/** Folha de caderno pautada com duas fitas — estética "feito à mão" do blog. */
function NotebookSheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-sm bg-caderno-ruled pt-8 pr-3 pb-6 pl-7 shadow-md sm:pr-6 sm:pl-16">
      <WashiTape className="top-0 left-1/4 -translate-y-1/2" />
      <WashiTape className="top-0 left-3/4 -translate-y-1/2 rotate-3" />
      {children}
    </div>
  );
}

export function CartView() {
  const { items, hydrated, totalItems, totalPrice, updateQuantity, removeItem, clear } = useCart();

  if (!hydrated) {
    return (
      <>
        <CartTitle />
        <NotebookSheet>
          <CartSkeleton />
        </NotebookSheet>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <CartTitle count={0} />
        <NotebookSheet>
          <div className="flex flex-col items-center gap-4 py-8 text-center">
            <HandDrawing name="coracao" className="size-14 text-dea-heart" />
            <p className="font-hand text-2xl text-dea-blue">Seu carrinho está vazio.</p>
            <Button asChild size="lg">
              <Link href="/#destaques">Ver destaques</Link>
            </Button>
          </div>
        </NotebookSheet>
      </>
    );
  }

  return (
    <>
      <CartTitle count={totalItems} />
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-3">
        <section aria-labelledby="itens-titulo" className="min-w-0 lg:col-span-2">
          <NotebookSheet>
            <h2 id="itens-titulo" className="sr-only">
              Itens do carrinho
            </h2>
            {/* Cada item ocupa 3 pautas (h-24) e o espaço entre itens é 1 pauta, mantendo o ritmo. */}
            <ul className="flex flex-col gap-8">
              {items.map((item) => (
                <CartItemRow
                  key={item.key}
                  item={item}
                  onQuantityChange={(value) => updateQuantity(item.key, value)}
                  onRemove={() => removeItem(item.key)}
                />
              ))}
            </ul>
            <div className="mt-8 flex h-8 items-end justify-end">
              <Button
                variant="link"
                className="-mb-1 h-11 items-end pb-1 font-hand text-lg leading-none text-dea-muted"
                onClick={clear}
              >
                Esvaziar carrinho
              </Button>
            </div>
          </NotebookSheet>
        </section>

        <CartSummary items={items} totalItems={totalItems} totalPrice={totalPrice} />
      </div>
    </>
  );
}
