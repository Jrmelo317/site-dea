import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductDetails } from "@/components/shop/ProductDetails";
import { SampleDataNotice } from "@/components/shop/SampleDataNotice";
import { getProductBySlug, getProducts } from "@/lib/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

/** Rota bloqueante: garante HTTP 404 real para slug inválido. */
export const instant = false;

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produto não encontrado · Loja Deus é Amor" };
  return { title: `${product.name} · Loja Deus é Amor`, description: product.description };
}

export default async function DetalhesProduto({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <main className="mx-auto flex max-w-4xl flex-col gap-4 px-3 pt-2 pb-10 sm:px-4">
      <Link
        href="/"
        className="-ml-2 inline-flex min-h-11 w-fit items-center gap-1 rounded-lg px-2 text-sm font-semibold text-dea-blue outline-none focus-visible:ring-3 focus-visible:ring-dea-blue/50"
      >
        <ChevronLeft className="size-5" aria-hidden="true" /> Voltar ao catálogo
      </Link>
      <ProductDetails product={product} />
      <SampleDataNotice />
    </main>
  );
}
