import type { Metadata } from "next";
import { Fraunces, Gochi_Hand, Jost, Newsreader } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/shop/SiteHeader";
import { CartProvider } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK"],
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const gochiHand = Gochi_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gochi",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Loja Deus é Amor · Jovens Evangelizando Jovens",
  description:
    "Vitrine de produtos do Grupo de Jovens Deus é Amor: camisetas, acessórios, artigos de oração e devoção.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={cn(fraunces.variable, jost.variable, gochiHand.variable, newsreader.variable)}
    >
      <body className="font-ui antialiased bg-dea-paper text-dea-ink min-h-screen overflow-x-hidden">
        <CartProvider>
          <SiteHeader />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
