export interface CartItem {
  /** Chave única do item: produto + variação. */
  key: string;
  productId: string;
  slug: string;
  name: string;
  /** Preço unitário em centavos. */
  price: number;
  image: string;
  imageAlt: string;
  variantLabel?: string;
  quantity: number;
}
