# Estrutura de componentes — Loja Deus É Amor (site-dea)

Mapa da loja e de onde estender. Complementa o [ARCHITECTURE.md](ARCHITECTURE.md).
Pilha: Next.js 16 App Router com `cacheComponents: true`, React 19, Tailwind 4 com tokens `dea-*`, shadcn (`radix-nova`) e Biome.

## 1. Estrutura

Legenda: **[S]** Server Component · **[C]** Client Component (`"use client"`) · **[—]** módulo sem JSX (dados, tipos, funções).

```
src/
├── app/                                ROTAS (finas: buscam dados e compõem)
│   ├── layout.tsx                [S]   fontes, metadata, <CartProvider>, <SiteHeader>
│   ├── globals.css                     tema: --color-dea-*, vars shadcn, efeitos (caderno, grão, fita)
│   ├── page.tsx                  [S]   Início: HeroBanner → #destaques (Highlights) → #catalogo
│   ├── not-found.tsx             [S]   404 genérica do site
│   ├── carrinho/page.tsx         [S]   metadata + <CartView/>
│   └── produtos/[slug]/
│       ├── page.tsx              [S]   generateStaticParams, generateMetadata, notFound(), instant=false (404 real)
│       └── not-found.tsx         [S]   "Produto não encontrado"
│
├── components/
│   ├── ui/                             PRIMITIVAS genéricas (shadcn), sem regra de negócio
│   │   ├── button.tsx            [S*]  cva com variantes e tamanhos
│   │   ├── skeleton.tsx          [S]   bloco de carregamento (animate-pulse, aria-hidden)
│   │   └── tabs.tsx              [C]   Radix Tabs em formato de "chips"
│   ├── decor/                          ENFEITES "feito à mão" (HandDrawing, WashiTape)
│   ├── icons/WhatsAppIcon.tsx    [S]   logo do WhatsApp em SVG inline
│   ├── providers/
│   │   └── CartProvider.tsx      [C]   CartContext + hook useCart + localStorage("@dea:cart") + flag `hydrated`
│   └── shop/                           COMPONENTES DA LOJA, por feature
│       ├── layout/               SiteHeader [S], CartButton [C]
│       ├── home/                 HeroBanner [S], Highlights [C]
│       ├── product/              ProductCard [S], ProductDetails [C]
│       └── cart/
│           ├── CartView.tsx      [C]   orquestra os estados: carregando → vazio → com itens
│           ├── CartSkeleton.tsx  [S]   carregamento com linhas falsas na pauta (role=status)
│           ├── CartItemRow.tsx   [C]   uma linha do carrinho (3 pautas, quantidade abaixo da lixeira)
│           ├── CartSummary.tsx   [S*]  resumo do pedido + botão do WhatsApp
│           ├── QuantityStepper.tsx [C] −/valor/+ (fieldset + legend + output aria-live)
│           └── notebook.ts       [—]   ON_LINE: classe que apoia o texto na pauta de 32px
│
├── lib/
│   ├── products.ts               [—]   getProducts / getProductBySlug / getProductsByHighlight
│   ├── formatters.ts             [—]   formatCentsToBRL (centavos → "R$ 65,00")
│   ├── whatsapp.ts               [—]   buildWhatsAppOrderMessage (pura), buildWhatsAppUrl, truncateText
│   └── utils.ts                  [—]   cn
├── config/
│   ├── contact.ts                [—]   WHATSAPP_NUMBER, lido de NEXT_PUBLIC_WHATSAPP_NUMBER
│   └── site.ts                   [—]   SITE_NAME
├── types/                        product.ts, cart.ts
└── data/products.json            produtos de exemplo (preços em centavos)
```

\* sem estado; vira client quando importado por um Client Component.

### Convenções que a estrutura assume

- **Pauta de 32px.** Linha de texto = `h-8` (`ON_LINE`), item do carrinho = 3 pautas (`h-24`), espaço entre itens = `gap-8`. O passo de `--ruled` no `globals.css` precisa continuar igual.
- **Dinheiro em centavos** em todo o código; só `formatCentsToBRL` converte para texto.
- **Estado só no `CartProvider`.** Os componentes leem por `useCart()`; nada lê o localStorage direto.
- **WhatsApp configurável.** Sem `NEXT_PUBLIC_WHATSAPP_NUMBER`, `buildWhatsAppUrl` retorna `null` e o `CartSummary` esconde o botão (veja o README).

## 2. Pontos de extensão (Catálogo e Detalhes)

| Onde | Como estender |
|---|---|
| `data/products.json` → `lib/products.ts` | Trocar a fonte (CMS/API/planilha) mantendo as assinaturas `getProducts`/`getProductBySlug`/`getProductsByHighlight`. Se virarem `async`, as páginas já são Server Components e é só usar `await` |
| `types/product.ts` | Campos prontos: `categoryId`, `featured`, `order`, `badge`, `compareAtPrice`, `highlights`, `variants[].available`, `images[].kind` |
| `shop/product/ProductCard.tsx` | Card sem estado com `product` como única prop. Pode ganhar variantes (`compact`, `featured`) sem quebrar a Início |
| `app/page.tsx` seção `#catalogo` | Trocar o card único por `<ProductGrid products={getProducts()} />` e, depois, filtros por `categoryId` via `searchParams` |
| `shop/product/ProductDetails.tsx` | Galeria, descrição longa, guia de tamanhos. Usar `useCart().addItem({...})`, que já agrupa por produto+variação |
| `shop/home/Highlights.tsx` | Novas abas: adicionar ao tipo `ProductHighlight` e ao array `tabs` |
| `shop/cart/*` | Novas partes do carrinho (frete, cupom) entram como componentes ao lado de `CartSummary`; o `CartView` só decide o estado |
