import type { Metadata } from "next";
import { CartView } from "@/components/shop/cart/CartView";

export const metadata: Metadata = {
  title: "Carrinho · Loja Deus é Amor",
};

export default function CartPage() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-3 pt-6 pb-12 sm:px-6 sm:pt-10">
      <CartView />
    </main>
  );
}
