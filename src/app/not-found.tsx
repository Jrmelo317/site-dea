import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-16 text-center">
      <h1 className="font-display text-3xl font-black font-soft text-dea-blue">
        Página não encontrada
      </h1>
      <p className="text-dea-muted">Essa página ainda não foi configurada ou não existe.</p>
      <Button asChild>
        <Link href="/">Voltar ao início</Link>
      </Button>
    </main>
  );
}
