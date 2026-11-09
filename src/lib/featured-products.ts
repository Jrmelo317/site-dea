import type { Product } from "@/types/product";

/** Seleciona a faixa na ordem editorial, sem alterar o catálogo. */
export function selectFeaturedProducts(
  products: readonly Product[],
  ids: readonly string[],
): Product[] {
  return [...new Set(ids)].flatMap((id) => {
    const product = products.find((candidate) => candidate.id === id);
    return product?.active &&
      (product.variants.length === 0 || product.variants.some((variant) => variant.available))
      ? [product]
      : [];
  });
}
