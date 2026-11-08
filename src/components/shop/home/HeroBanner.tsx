import Image from "next/image";
import Link from "next/link";
import { HandDrawing } from "@/components/decor/HandDrawing";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section
      aria-labelledby="faixa-titulo"
      className="relative isolate overflow-hidden bg-dea-night"
    >
      <Image
        src="/images/grupo/faixa-grupo.jpg"
        alt="Jovens do Grupo Deus é Amor reunidos no auditório"
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dea-night/70 bg-grain" />
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-4 py-14 sm:px-6 sm:py-20">
        <span className="-rotate-2 rounded-sm bg-dea-heart px-2 py-0.5 text-sm font-semibold tracking-wide text-dea-cream uppercase">
          Novo lote
        </span>
        <h1
          id="faixa-titulo"
          className="max-w-xl font-display text-4xl font-black font-soft text-dea-cream sm:text-5xl"
        >
          Jovens evangelizando{" "}
          <span className="relative inline-block">
            jovens
            <HandDrawing
              name="sublinhado"
              className="absolute -bottom-2 left-0 h-3 w-full text-dea-heart"
            />
          </span>
        </h1>
        <p className="max-w-md text-base text-dea-sand sm:text-lg">
          Camisetas, terços e lembranças do Grupo Deus é Amor. Pagamento e retirada no encontro de
          quinta-feira.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild size="lg" variant="secondary" className="text-base">
            <Link href="#destaques">Ver destaques</Link>
          </Button>
          <span className="flex items-center gap-1 font-hand text-lg text-dea-sky">
            <HandDrawing name="brilhinhos" className="size-6" /> toda quinta, 19h30!
          </span>
        </div>
      </div>
    </section>
  );
}
