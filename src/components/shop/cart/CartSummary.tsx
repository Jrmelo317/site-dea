import Link from "next/link";
import { WashiTape } from "@/components/decor/WashiTape";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/lib/formatters";
import { buildWhatsAppOrderMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { CartItem } from "@/types/cart";

interface CartSummaryProps {
  items: CartItem[];
  totalItems: number;
  /** Total em centavos. */
  totalPrice: number;
}

/** Post-it com o resumo do pedido e a confirmação pelo WhatsApp. */
export function CartSummary({ items, totalItems, totalPrice }: CartSummaryProps) {
  const whatsappUrl = buildWhatsAppUrl(buildWhatsAppOrderMessage(items, totalPrice));
  return (
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
              {formatCentsToBRL(totalPrice)}
            </dd>
          </div>
        </dl>
        <div className="mt-5 flex flex-col gap-2">
          {whatsappUrl ? (
            <Button asChild size="lg" className="bg-dea-good text-dea-cream hover:bg-dea-good/90">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon />
                Confirmar pelo WhatsApp
                <span className="sr-only"> (abre em nova aba)</span>
              </a>
            </Button>
          ) : (
            <p role="note" className="rounded-md bg-dea-cream p-3 text-sm text-dea-muted">
              O pedido pelo WhatsApp está indisponível no momento. Fale com a gente no encontro de
              quinta-feira.
            </p>
          )}
          <Button asChild variant="outline" size="lg">
            <Link href="/#destaques">Continuar comprando</Link>
          </Button>
        </div>
      </div>
    </aside>
  );
}
