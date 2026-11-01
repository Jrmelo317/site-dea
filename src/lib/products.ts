import productsData from "@/data/products.json";
import type { Product } from "@/types/product";

/** Catálogo de EXEMPLO — substituir pelos produtos reais do grupo. */
const products = (productsData as Product[])
  .filter((product) => product.active)
  .sort((a, b) => a.order - b.order);

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
