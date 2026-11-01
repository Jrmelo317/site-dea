import Link from "next/link";
import { CartButton } from "@/components/shop/CartButton";
import { HandDrawing } from "@/components/shop/decor/HandDrawing";

const navLinks = [
  { href: "/#destaques", label: "Destaques" },
  { href: "/#catalogo", label: "Catálogo" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 bg-dea-paper bg-grain-dark">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-2 px-3 py-2 sm:px-6">
        <Link
          href="/"
          aria-label="Loja Deus é Amor, página inicial"
          className="group flex min-h-11 min-w-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-dea-blue/50"
        >
          <span className="flex size-10 shrink-0 -rotate-6 items-center justify-center rounded-full border-2 border-dashed border-dea-heart bg-dea-cream text-dea-heart transition-transform group-hover:rotate-0">
            <HandDrawing name="coracao" className="size-6" />
          </span>
          <span className="flex min-w-0 flex-col leading-none">
            <span className="relative truncate font-display text-lg font-black font-soft text-dea-blue sm:text-xl">
              Loja Deus é Amor
              <HandDrawing
                name="sublinhado"
                className="absolute -bottom-1 left-0 h-2 w-full text-dea-heart"
              />
            </span>
            <span className="mt-1.5 truncate font-hand text-sm text-dea-muted">
              feito à mão, com amor
            </span>
          </span>
        </Link>

        <nav aria-label="Principal" className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 sm:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-11 items-center rounded-lg px-3 font-hand text-lg text-dea-blue outline-none hover:text-dea-heart focus-visible:ring-3 focus-visible:ring-dea-blue/50"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <CartButton />
        </nav>
      </div>
      <HandDrawing name="onda" strokeWidth={1.6} className="block h-2 w-full text-dea-sky" />
    </header>
  );
}
