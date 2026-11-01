const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** Formata um valor em centavos como moeda brasileira (ex.: 6500 → "R$ 65,00"). */
export function formatPrice(cents: number): string {
  return brl.format(cents / 100);
}
