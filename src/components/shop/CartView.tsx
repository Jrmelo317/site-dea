"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { HandDrawing } from "@/components/shop/decor/HandDrawing";
import { WashiTape } from "@/components/shop/decor/WashiTape";
import { QuantityStepper } from "@/components/shop/QuantityStepper";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatters";

/** Folha de caderno pautada com duas fitas — estética "feito à mão" do blog. */
function NotebookSheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-sm bg-caderno-ruled px-4 pt-8 pb-6 shadow-md sm:pr-6 sm:pl-16">
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
      <NotebookSheet>
        <p role="status" className="py-10 text-center font-hand text-xl text-dea-muted">
          Abrindo o caderno…
        </p>
      </NotebookSheet>
    );
  }

  if (items.length === 0) {
    return (
      <NotebookSheet>
        <div className="flex flex-col items-center gap-4 py-8 text-center">
          <HandDrawing name="coracao" className="size-14 text-dea-heart" />
          <p className="font-hand text-2xl text-dea-blue">Seu carrinho está vazio.</p>
          <p className="max-w-xs text-sm text-dea-muted">
            Dá uma olhada nos destaques e escolha algo com carinho.
          </p>
          <Button asChild size="lg">
            <Link href="/#destaques">Ver destaques</Link>
          </Button>
        </div>
      </NotebookSheet>
    );
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-3">
      <section aria-labelledby="itens-titulo" className="lg:col-span-2">
        <NotebookSheet>
          <h2 id="itens-titulo" className="mb-2 font-hand text-xl text-dea-heart">
            {totalItems} {totalItems === 1 ? "item anotado" : "itens anotados"}
          </h2>
          <ul className="flex flex-col divide-y divide-dashed divide-dea-sky">
            {items.map((item) => {
              const variant = item.variantLabel ? ` tamanho ${item.variantLabel}` : "";
              return (
                <li key={item.key} className="flex gap-3 py-4">
                  <Link
                    href={`/produtos/${item.slug}`}
                    className="relative size-20 shrink-0 -rotate-2 overflow-hidden rounded-sm border-4 border-dea-cream bg-dea-sand shadow-sm outline-none focus-visible:ring-3 focus-visible:ring-dea-blue/50 sm:size-24"
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
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0">
                        <h3 className="font-semibold break-words text-dea-ink">{item.name}</h3>
                        <p className="text-sm text-dea-muted">
                          {item.variantLabel && <>Tam. {item.variantLabel} · </>}
                          {formatPrice(item.price)} cada
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="-mt-2 -mr-2 text-dea-heart"
                        onClick={() => removeItem(item.key)}
                        aria-label={`Remover ${item.name}${variant}`}
                      >
                        <Trash2 aria-hidden="true" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <QuantityStepper
                        value={item.quantity}
                        label={`Quantidade de ${item.name}${variant}`}
                        onChange={(value) => updateQuantity(item.key, value)}
                      />
                      <p className="font-display text-lg font-black font-soft text-dea-blue">
                        <span className="sr-only">Subtotal: </span>
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-end pt-2">
            <Button variant="link" className="font-hand text-lg text-dea-muted" onClick={clear}>
              Esvaziar carrinho
            </Button>
          </div>
        </NotebookSheet>
      </section>

      <aside aria-labelledby="resumo-titulo" className="relative lg:sticky lg:top-28">
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
          <div className="mt-4 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="stamp-seal size-16 shrink-0 font-display text-xs font-black"
            >
              DEA
              <br />
              quinta
            </span>
            <p className="font-hand text-lg leading-snug text-dea-ink">
              Pagamento e retirada no encontro de quinta-feira.
            </p>
          </div>
          <div className="mt-5 flex flex-col gap-2">
            <Button asChild variant="default" size="lg">
              <Link href="/#destaques">Continuar comprando</Link>
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
