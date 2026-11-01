import type { Metadata } from "next";
import { CartView } from "@/components/shop/CartView";

export const metadata: Metadata = {
  title: "Carrinho · Loja Deus é Amor",
};

export default function Carrinho() {
  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-4 px-3 pt-4 pb-10 sm:px-4">
      <h1 className="font-display text-3xl font-black font-soft text-dea-blue">Carrinho</h1>
      <CartView />
    </main>
  );
}
