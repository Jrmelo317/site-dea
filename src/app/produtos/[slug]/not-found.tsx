import Link from "next/link";
import { Button } from "@/components/ui/button";

/** 404 específico de produto: slug que não existe ou saiu do catálogo. */
export default function ProductNotFound() {
  return (
    <main className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-black font-soft text-dea-blue">
        Produto não encontrado
      </h1>
      <p className="text-dea-muted">O produto que você procura não existe ou saiu do catálogo.</p>
      <Button asChild>
        <Link href="/">Voltar ao catálogo</Link>
      </Button>
    </main>
  );
}
