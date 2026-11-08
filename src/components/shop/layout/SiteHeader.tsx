import Image from "next/image";
import Link from "next/link";
import { HandDrawing } from "@/components/decor/HandDrawing";
import { CartButton } from "@/components/shop/layout/CartButton";
import { SITE_NAME } from "@/config/site";

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
          aria-label={`${SITE_NAME}, página inicial`}
          className="group flex min-h-11 min-w-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-dea-blue/50"
        >
          <Image
            src="/images/logo-cruz-coracao.svg"
            alt=""
            width={26}
            height={33}
            unoptimized
            priority
            className="h-9 w-auto shrink-0"
          />
          <span className="flex min-w-0 flex-col pb-1 leading-none">
            <span className="relative truncate font-display text-lg font-black font-soft text-dea-blue sm:text-xl">
              {SITE_NAME}
              <HandDrawing
                name="sublinhado"
                className="absolute -bottom-1 left-0 h-2 w-full text-dea-heart"
              />
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
