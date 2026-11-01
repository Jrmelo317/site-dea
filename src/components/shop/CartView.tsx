"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { HandDrawing } from "@/components/shop/decor/HandDrawing";
import { WashiTape } from "@/components/shop/decor/WashiTape";
import { QuantityStepper } from "@/components/shop/QuantityStepper";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/formatters";
import { buildWhatsAppOrderMessage, buildWhatsAppUrl, truncateText } from "@/lib/whatsapp";

/**
 * Uma linha de texto "escrita" na pauta do caderno: altura de uma pauta (h-8 = 32px,
 * igual ao passo de --ruled) e conteúdo apoiado no fundo, logo acima do traço.
 */
const ON_LINE = "flex h-8 items-end pb-1 leading-none";

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
          <p role="status" className="py-10 text-center font-hand text-xl text-dea-muted">
            Abrindo o caderno…
          </p>
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
            <p className="max-w-xs text-sm text-dea-muted">
              Dá uma olhada nos destaques e escolha algo com carinho.
            </p>
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
            {/* Cada item ocupa 4 pautas (h-32) e o espaço entre itens é 1 pauta, mantendo o ritmo. */}
            <ul className="flex flex-col gap-8">
              {items.map((item) => {
                const variant = item.variantLabel ? ` tamanho ${item.variantLabel}` : "";
                const shortName = truncateText(item.name);
                return (
                  <li key={item.key} className="flex h-24 gap-3">
                    {/* Quantidade na coluna da direita, abaixo da lixeira. Item = 3 pautas (h-24). */}
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
                      <h3
                        title={item.name}
                        className={`${ON_LINE} min-w-0 font-semibold text-dea-ink`}
                      >
                        <span className="truncate">{shortName}</span>
                      </h3>
                      <p className={`${ON_LINE} text-sm text-dea-muted`}>
                        <span className="truncate">
                          {item.variantLabel && <>Tam. {item.variantLabel} · </>}
                          {formatPrice(item.price)} cada
                        </span>
                      </p>
                      <p
                        className={`${ON_LINE} font-display text-lg font-black font-soft text-dea-blue`}
                      >
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
                          onClick={() => removeItem(item.key)}
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
                            onChange={(value) => updateQuantity(item.key, value)}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
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
