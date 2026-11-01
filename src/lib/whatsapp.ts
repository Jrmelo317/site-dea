import { WHATSAPP_NUMBER } from "@/config/contact";
import { formatPrice } from "@/lib/formatters";

export interface OrderLine {
  name: string;
  variantLabel?: string;
  quantity: number;
  /** Preço unitário em centavos. */
  price: number;
}

/** Troca o espaço não separável do Intl por espaço comum, para o texto ficar limpo no WhatsApp. */
const money = (cents: number) => formatPrice(cents).replace(/\u00a0/g, " ");

/** Monta a mensagem de pedido enviada pelo WhatsApp. Função pura: mesma entrada, mesmo texto. */
export function buildWhatsAppOrderMessage(lines: OrderLine[], totalCents: number): string {
  const items = lines.map((line) => {
    const name = line.variantLabel ? `${line.name} (Tam. ${line.variantLabel})` : line.name;
    return `- ${name} (${line.quantity}x) - ${money(line.price * line.quantity)}`;
  });
  return [
    "Oi! Vim pelo site e gostaria de comprar:",
    "",
    ...items,
    "",
    "----------",
    "",
    `Minha compra deu ${money(totalCents)}.`,
    "Podem reservar pra mim?",
  ].join("\n");
}

/**
 * Link api.whatsapp.com/send com a mensagem codificada (\n vira %0A).
 * Preserva melhor as quebras de linha no WhatsApp Web e no desktop do que wa.me.
 */
export function buildWhatsAppUrl(message: string, phone: string = WHATSAPP_NUMBER): string {
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
}

/** Corta o texto em `max` caracteres, terminando com "...". */
export function truncateText(text: string, max = 50): string {
  return text.length > max ? `${text.slice(0, max).trimEnd()}...` : text;
}
