"use client";

import Link from "next/link";
import { HandDrawing } from "@/components/decor/HandDrawing";
import { WashiTape } from "@/components/decor/WashiTape";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useCart } from "@/components/providers/CartProvider";
import { CartItemRow } from "@/components/shop/cart/CartItemRow";
import { ON_LINE } from "@/components/shop/cart/notebook";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatPrice } from "@/lib/formatters";
import { buildWhatsAppOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";

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
    <div className="relative rounded-sm bg-caderno-ruled pt-8 pr-3 pb-6 pl-12 shadow-md sm:pr-6 sm:pl-16">
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
          {/* Esqueleto com o mesmo ritmo dos itens (3 pautas cada, 1 pauta entre eles). */}
          <div role="status" className="flex flex-col gap-8">
            <span className="sr-only">Carregando o carrinho…</span>
            {[0, 1].map((row) => (
              <div key={row} className="flex h-24 gap-3">
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className={ON_LINE}>
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                  <div className={ON_LINE}>
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <div className={ON_LINE}>
                    <Skeleton className="h-5 w-24" />
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end">
                  <div className={ON_LINE}>
                    <Skeleton className="size-5" />
                  </div>
                  <div className="flex h-16 items-end">
                    <Skeleton className="mb-px h-11 w-32 rounded-lg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
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

  const whatsappUrl = buildWhatsAppUrl(buildWhatsAppOrderMessage(items, totalPrice));

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

        <aside aria-labelledby="resumo-titulo" className="relative min-w-0 lg:sticky lg:top-28">
          <div className="relative rotate-1 bg-dea-sand bg-grain-dark p-5 pt-8 shadow-md">
            <WashiTape className="top-0 left-1/2 -translate-y-1/2" />
            <h2 id="resumo-titulo" className="font-hand text-2xl text-dea-blue">
              Resumo do pedido
            </h2>
            <dl className="mt-3 flex flex-col gap-2">
              <div className="flex items-baseline justify-between gap-2 text-dea-muted">
                <dt>Itens</dt>
                <dd>{totalItems}</dd>
              </div>
              <div className="flex items-baseline justify-between gap-2 border-t-2 border-dashed border-dea-blue/30 pt-2">
                <dt className="font-semibold text-dea-ink">Total</dt>
                <dd className="font-display text-3xl font-black font-soft text-dea-blue">
                  {formatPrice(totalPrice)}
                </dd>
              </div>
            </dl>
            <div className="mt-5 flex flex-col gap-2">
              <Button asChild size="lg" className="bg-dea-good text-dea-cream hover:bg-dea-good/90">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon />
                  Confirmar pelo WhatsApp
                  <span className="sr-only"> (abre em nova aba)</span>
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/#destaques">Continuar comprando</Link>
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
