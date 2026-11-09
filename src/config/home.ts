/**
 * Curadoria ordenada exclusiva da faixa; [] a oculta.
 * Não usa Product.featured (marcador geral), highlights (abas) nem order (catálogo).
 * FEATURED_PRODUCT_IDS permite injetar IDs separados por vírgula nos testes de servidor.
 */
const editorialProductIds: readonly string[] = [
  "camiseta-sagrado-coracao",
  "terco-madeira-azul",
  "caneca-deus-e-amor",
];

export const featuredProductIds: readonly string[] =
  process.env.FEATURED_PRODUCT_IDS === undefined
    ? editorialProductIds
    : process.env.FEATURED_PRODUCT_IDS.split(",").filter(Boolean);
