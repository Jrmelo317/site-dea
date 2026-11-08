"use client";

import { ProductCard } from "@/components/shop/product/ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product, ProductHighlight } from "@/types/product";

const tabs: { value: ProductHighlight; label: string }[] = [
  { value: "novidades", label: "Novidades" },
  { value: "promocoes", label: "Promoções" },
  { value: "mais-pedidos", label: "Mais pedidos" },
];

interface HighlightsProps {
  groups: Record<ProductHighlight, Product[]>;
}

export function Highlights({ groups }: HighlightsProps) {
  return (
    <Tabs defaultValue="novidades">
      <TabsList aria-label="Tipos de destaque">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {groups[tab.value].length > 0 ? (
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {groups[tab.value].map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-hand text-lg text-dea-muted">Nada por aqui ainda.</p>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
