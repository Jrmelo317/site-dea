const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/**
 * Converte centavos (inteiro) em texto de moeda brasileira.
 * @param cents valor em centavos, ex.: 6500
 * @returns ex.: "R$ 65,00" (com espaço não separável do Intl)
 */
export function formatCentsToBRL(cents: number): string {
  return brl.format(cents / 100);
}
