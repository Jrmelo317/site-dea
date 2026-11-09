export type ProductImageKind = "product" | "detail";

export type ProductHighlight = "novidades" | "promocoes" | "mais-pedidos";

export interface ProductImage {
  /** Caminho local (`/images/...`) ou URL completa (`https://...`). */
  url: string;
  alt: string;
  kind: ProductImageKind;
}

export interface ProductVariant {
  id: string;
  label: string;
  available: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  categoryId: string;
  /** Preço em centavos (ex.: 6500 = R$ 65,00). */
  price: number;
  /** Preço "de" em centavos, para itens em promoção. */
  compareAtPrice?: number;
  images: ProductImage[];
  variants: ProductVariant[];
  /** Marcador geral legado; não seleciona a faixa editorial nem as abas da home. */
  featured: boolean;
  active: boolean;
  /** Ordem no catálogo, independente da faixa editorial da home. */
  order: number;
  badge?: string;
  /** Seções de destaque da Página Inicial em que o produto aparece. */
  highlights?: ProductHighlight[];
}
