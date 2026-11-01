export type ProductImageKind = "product" | "detail";

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
  images: ProductImage[];
  variants: ProductVariant[];
  featured: boolean;
  active: boolean;
  order: number;
  badge?: string;
}
