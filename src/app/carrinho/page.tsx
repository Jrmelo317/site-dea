import type { Metadata } from "next";
import { CartView } from "@/components/shop/CartView";
import { HandDrawing } from "@/components/shop/decor/HandDrawing";

export const metadata: Metadata = {
  title: "Carrinho · Loja Deus é Amor",
};

export default function Carrinho() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-6 px-3 pt-6 pb-12 sm:px-6 sm:pt-10">
      <header className="flex flex-col gap-1">
        <h1 className="relative w-fit font-display text-3xl font-black font-soft text-dea-blue sm:text-4xl">
          Meu carrinho
          <HandDrawing
            name="sublinhado"
            className="absolute -bottom-2 left-0 h-3 w-full text-dea-heart"
          />
        </h1>
        <p className="mt-2 font-hand text-lg text-dea-muted">sua listinha para a quinta-feira</p>
      </header>
      <CartView />
    </main>
  );
}
