import Image from "next/image";
import Link from "next/link";
import { CartButton } from "@/components/shop/CartButton";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-dea-line bg-dea-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-2 px-3 py-1 sm:px-4">
        <Link
          href="/"
          className="flex min-h-11 min-w-0 items-center gap-2 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-dea-blue/50"
        >
          <Image
            src="/images/avatar-dea.svg"
            alt=""
            width={32}
            height={32}
            unoptimized
            className="size-8"
          />
          <span className="truncate font-display text-lg font-black font-soft text-dea-blue">
            Loja Deus é Amor
          </span>
        </Link>
        <CartButton />
      </div>
    </header>
  );
}
