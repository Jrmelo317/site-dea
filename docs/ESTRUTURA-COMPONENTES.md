# Estrutura de componentes — Loja Deus É Amor (site-dea)

Revisão estrutural da branch `feat/catalogo-inicial`, referente ao commit **`0762b92`**. Complementa o [ARCHITECTURE.md](ARCHITECTURE.md).
Pilha: Next.js 16.4 App Router com `cacheComponents: true`, React 19, Tailwind 4 com tokens `dea-*`, shadcn (`radix-nova`) e Biome.

---

## 1. Estrutura (árvore anotada)

Legenda: **[S]** Server Component · **[C]** Client Component (`"use client"`) · **[—]** módulo sem JSX (dados, tipos, funções).

```
src/
├── app/                                  ROTAS (finas: buscam dados e compõem)
│   ├── layout.tsx            [S] 63 l.   fontes, metadata (favicon do blog), <CartProvider>, <SiteHeader>
│   ├── globals.css               256 l.  tema: --m-*, --color-dea-*, vars shadcn, efeitos (caderno, grão, fita, carimbo)
│   ├── page.tsx              [S] 61 l.   Início: HeroBanner → aviso → #destaques (Highlights) → #catalogo (1 ProductCard modelo)
│   ├── not-found.tsx         [S] 16 l.   404
│   ├── carrinho/page.tsx     [S] 14 l.   metadata + <CartView/>  (o título fica no CartView porque depende da contagem)
│   └── produtos/[slug]/page.tsx [S] 45 l. generateStaticParams, generateMetadata, notFound(), instant=false (404 real)
│
├── components/
│   ├── icons/WhatsAppIcon.tsx [S] 22 l.  logo oficial do WhatsApp em SVG inline (currentColor, aria-hidden)
│   ├── ui/                               PRIMITIVAS genéricas (shadcn), sem regra de negócio
│   │   ├── button.tsx        [S*] 65 l.  cva com variantes e tamanhos (*sem estado; vira client se importado por client)
│   │   └── tabs.tsx          [C] 51 l.   Radix Tabs em formato de "chips" (min-h-11)
│   │
│   ├── decor/                            ENFEITES "feito à mão" (portados do DEA-blog; reaproveitáveis fora da loja)
│   │   ├── HandDrawing.tsx   [S] 50 l.   SVG de traço único: coracao, sublinhado, brilhinhos, onda (currentColor)
│   │   └── WashiTape.tsx     [S] 11 l.   fita adesiva (.tape-strip)
│   ├── providers/
│   │   └── CartProvider.tsx  [C] 122 l.  CartContext + CartProvider + hook useCart + localStorage("@dea:cart") + flag `hydrated`
│   │
│   └── shop/                             COMPONENTES DA LOJA (conhecem Product/Cart), por feature
│       ├── layout/
│       │   ├── SiteHeader.tsx    [S] 60 l.  logo cruz-coração + SITE_NAME + nav (sm+) + CartButton + onda
│       │   └── CartButton.tsx    [C] 40 l.  post-it com contador; useCart + usePathname (aria-current)
│       ├── home/
│       │   ├── HeroBanner.tsx    [S] 54 l.  faixa com a foto do grupo (/images/grupo/faixa-grupo.jpg)
│       │   └── Highlights.tsx    [C] 44 l.  abas Novidades/Promoções/Mais pedidos → grade de ProductCard
│       ├── product/
│       │   ├── ProductCard.tsx   [S] 59 l.  CARD MODELO (TODO): imagem, selo, nome (link esticado), preço/"de"
│       │   └── ProductDetails.tsx[C] 155 l. DETALHES MODELO (TODO): galeria simples, tamanho, quantidade, adicionar
│       ├── cart/
│       │   ├── CartView.tsx      [C] 212 l. título com contagem, estados (carregando/vazio), folha de caderno, itens, resumo, WhatsApp
│       │   └── QuantityStepper.tsx[C] 42 l. −/valor/+ (fieldset + legend + output aria-live)
│
├── lib/
│   ├── products.ts           [—] 19 l.   repositório: getProducts / getProductBySlug / getProductsByHighlight (lê o JSON)
│   ├── formatters.ts         [—] 6 l.    formatCentsToBRL (centavos → BRL)
│   ├── whatsapp.ts           [—] 38 l.   buildWhatsAppOrderMessage (pura), buildWhatsAppUrl, truncateText
│   └── utils.ts              [—] 1 l.    re-exporta `cn`
├── config/
│   ├── contact.ts            [—] 2 l.    WHATSAPP_NUMBER (número oficial, só dígitos)
│   └── site.ts               [—] 2 l.    SITE_NAME ("Loja Deus É Amor"), usado nas metadata e no header
├── types/
│   ├── product.ts            [—] 36 l.   Product, ProductImage, ProductVariant, ProductHighlight
│   └── cart.ts               [—] 13 l.   CartItem (snapshot do produto + key + quantity)
└── data/products.json        [—] 87 l.   3 produtos de EXEMPLO (preços em centavos, destaques)
```

### Responsabilidade, dependências e acoplamento por módulo

| Módulo | Tipo | Responsabilidade | Depende de | Acoplamento |
|---|---|---|---|---|
| [`app/layout`](../src/app/layout.tsx) | S | Casca global, fontes, provider | CartProvider, SiteHeader, config/site, utils | Baixo. Provider no topo é o padrão do App Router |
| `app/page` | S | Monta a Início e agrupa os destaques | lib/products, shop/* | Baixo. Dados entram por props |
| `app/carrinho/page` | S | Rota e metadata | CartView | Mínimo. Mas o `<h1>` mora no CartView |
| `app/produtos/[slug]` | S | SSG, 404, metadata | lib/products, ProductDetails | Baixo |
| `ui/button`, `ui/tabs` | S/C | Primitivas | radix, cva, utils | Nenhum com o domínio ✔ |
| `shop/layout/SiteHeader` | S | Marca e navegação | CartButton, decor, config/site, next/image | Baixo. Os links de nav são uma constante local |
| `shop/layout/CartButton` | C | Atalho do carrinho com contador | useCart, next/navigation | Médio (contexto), o que é aceitável |
| `shop/home/HeroBanner` | S | Faixa de abertura | decor, ui/button | Baixo. Os textos estão fixos no componente |
| `shop/home/Highlights` | C | Abas de destaques | ui/tabs, ProductCard, types | Baixo. Recebe `groups` por props ✔ |
| [`shop/product/ProductCard`](../src/components/shop/product/ProductCard.tsx) | S | Card modelo | formatters, types | Baixo ✔ (sem estado, reutilizável) |
| [`shop/product/ProductDetails`](../src/components/shop/product/ProductDetails.tsx) | C | Variação, quantidade e adicionar ao carrinho | useCart, QuantityStepper, ui/button, formatters | Médio. Mistura apresentação e ação |
| [`shop/cart/CartView`](../src/components/shop/cart/CartView.tsx) | C | Página do carrinho inteira | useCart, lib/whatsapp, QuantityStepper, decor, ui/button, formatters | **Alto.** Concentra 5 responsabilidades |
| `shop/cart/QuantityStepper` | C | Controle de quantidade | ui/button, `MAX_QUANTITY` de providers/CartProvider | Baixo, mas importa uma constante do provider (ver melhorias) |
| `decor/*` | S | Enfeites visuais | utils | Nenhum ✔ |
| `icons/WhatsAppIcon` | S | Logo do WhatsApp | utils | Nenhum ✔ |
| [`providers/CartProvider`](../src/components/providers/CartProvider.tsx) (`useCart`) | C | Estado do carrinho e persistência | types/cart | Baixo. É a única fonte de estado ✔ |
| [`lib/products`](../src/lib/products.ts) | — | Acesso a dados | data/products.json, types | Isola a fonte de dados ✔ (é o ponto de troca para uma API/CMS) |
| [`lib/whatsapp`](../src/lib/whatsapp.ts) | — | Mensagem e URL do pedido | config/contact, formatters | Baixo. A função principal é pura ✔ |
| `config/contact` | — | Constantes de contato | — | — |

---

## 2. Pontos fortes

1. **Camadas bem separadas:** `data` → `lib/products` (repositório) → `app/*` (Server Components buscam) → `components/shop` (apresentação). A única fonte de estado é o `CartProvider`. Nenhum componente lê o JSON diretamente.
2. **Server por padrão.** Só usa `"use client"` onde há interação (7 arquivos). Header, Hero, Card, decor e as rotas são Server Components, com pouco JS enviado ao navegador.
3. **SSR seguro com localStorage.** `readStorage` só roda em `useEffect`, e o flag `hydrated` evita divergência de hidratação: o contador mostra 0 e o carrinho mostra "Abrindo o caderno…" até ler o armazenamento. A leitura valida o formato, e a escrita tolera falha (modo privado ou cota cheia).
4. **Dinheiro em centavos** (inteiros) com um único `formatCentsToBRL`. Não há erro de ponto flutuante.
5. **Regra de negócio testável:** `buildWhatsAppOrderMessage` e `truncateText` são funções puras, e `clampQuantity`/`buildKey` estão isoladas. O número do WhatsApp fica em config.
6. **Rota de detalhes robusta:** `generateStaticParams` + `notFound()` + `instant = false`, que dá HTTP 404 real (compatível com `cacheComponents`).
7. **Tokens.** Os TSX usam só a escala do Tailwind e `dea-*`. Não há hex nem `px` nos componentes (os únicos `[...]` são variantes de dados, como `data-[state=active]`, e seletores do shadcn, que não são medidas arbitrárias).
8. **Acessibilidade acima da média:**
   - `lang="pt-BR"`; `aria-labelledby` em cada seção; `aria-current` no carrinho; `aria-label` descritivo nos botões de ícone ("Remover Camiseta … tamanho M").
   - `fieldset`/`legend` e `output aria-live` no seletor de quantidade; preço "de" com `sr-only`; links esticados no card; anel `focus-visible` em tudo.
   - Toque ≥ 44px (verificado por script em 320 e 1280px) e sem rolagem horizontal em 320px.
9. **Decor isolada e reaproveitável** (`components/decor/`), portada do DEA-blog. Usa `currentColor`, então a cor vem dos tokens.

---

## 3. Melhorias recomendadas (por prioridade)

### P1 — antes do merge
1. **Quebrar o `CartView` (208 linhas, 5 responsabilidades).** Sugestão:
   - `cart/CartTitle.tsx` (h1 + plural);
   - `cart/NotebookSheet.tsx` (vira `decor/NotebookSheet`, reaproveitável);
   - `cart/CartLineItem.tsx` (uma linha "na pauta");
   - `cart/CartSummary.tsx` (totais + botões);
   - `cart/WhatsAppCheckoutButton.tsx`;
   - `CartView` fica só como orquestrador dos estados carregando, vazio e com itens.

   Isso facilita testes e evita conflitos de merge com quem for mexer no carrinho.
2. **Ritmo da pauta acoplado por "número mágico".** Item do carrinho = 3 pautas (`h-24`), com a quantidade na coluna da direita, abaixo da lixeira. O passo de 32px de `--ruled` no CSS precisa bater com `h-8`/`h-16`/`h-24`/`gap-8` no TSX. Documentar em comentário nos dois lados ou expor `--pauta: 2rem` e derivar o gradiente dele. Um nome com mais de uma linha já é contido pelo `truncate`, mas uma fonte maior (zoom de texto) desalinha.
3. **Pendências do PR #7 ainda abertas** (cruzamento detalhado abaixo): cores triplicadas no `globals.css`, `px`/`rgba` fixos nos efeitos, `.dark` sem tema, tamanhos `xs`/`sm`/`icon-xs`/`icon-sm` do Button abaixo de 44px e falta de Vitest/Playwright.
4. ~~**Placeholder do WhatsApp.**~~ Resolvido: `WHATSAPP_NUMBER = "5544999701412"`, e o link usa `api.whatsapp.com/send`, que preserva as quebras de linha. Opcional: mover para `NEXT_PUBLIC_WHATSAPP_NUMBER` para trocar sem deploy de código.

### P2 — logo após
5. **`MAX_QUANTITY` mora em `providers/CartProvider`** e é importado pelo `QuantityStepper` (UI dependendo do provider). Mover para `config/cart.ts` ou `lib/cart.ts`, junto com `clampQuantity`/`buildKey`, que também podem virar funções puras exportadas para teste.
6. **Lógica de carrinho dentro do Provider.** Extrair um reducer puro (`cartReducer`) em `lib/cart.ts` e deixar o Provider só com estado e persistência. Isso facilita o Vitest.
7. **Snapshot de preço no localStorage.** `CartItem` guarda `price`/`name`/`image` copiados. Se o catálogo mudar, o carrinho mostra preço antigo. Recomendado: guardar só `productId`/`variantLabel`/`quantity` e resolver os dados com `getProductBySlug`, ou versionar a chave (`@dea:cart:v1`) e revalidar ao hidratar.
8. **Sincronizar abas do navegador:** escutar o evento `storage` no Provider.
9. **`ProductDetails` (155 l., client)** mistura galeria, seletor de tamanho e ação. Separar `ProductGallery` (server), `VariantPicker` (client) e `AddToCartForm` (client) para o próximo membro estender sem tocar no todo.
10. **Textos fixos** no HeroBanner, nos links de nav e nas labels das abas. Centralizar em `config/site.ts` (nav, hero, labels dos destaques) para trocar conteúdo sem mexer em componentes.

### P3 — organização e higiene
11. ~~**Nomes e pastas.**~~ Feito: `shop/` dividido em `layout/`, `home/`, `product/` e `cart/`; `decor/` foi para `components/decor`; `hooks/useCart.tsx` virou `components/providers/CartProvider.tsx` (o hook `useCart` continua exportado de lá).
12. ~~**CSS morto.**~~ Feito: removidas `.stamp-seal`, `.stamp-seal-blue`, `.bg-caderno-grid`, `.bg-crumple`, `.polaroid-shadow`, as variáveis `--crumple`/`--grid` (só usadas por elas) e o desenho `seta`.
13. ~~**Idioma dos nomes.**~~ Feito: o AGENTS.md não fixa o idioma, mas todos os exemplos e componentes são em inglês; as páginas viraram `HomePage`, `ProductPage` e `CartPage`. Rotas e textos da interface seguem em português.
14. ~~**Título do site.**~~ Feito: `SITE_NAME = "Loja Deus É Amor"` em `src/config/site.ts`, usado nas metadata e no header.
15. **Imagens com `unoptimized`** (necessário para SVG). Quando entrarem fotos reais em JPG/WebP, remover para usar a otimização do Next.

### Acessibilidade — ajustes finos
- O tooltip do nome truncado usa `title`, que não aparece no toque nem por teclado. O `aria-label` do botão já tem o nome completo; para mobile, considerar mostrar o nome inteiro na página de Detalhes (já acontece) ou trocar por Tooltip/Popover acessível.
- O botão do WhatsApp abre em nova aba e avisa por `sr-only` ✔.
- O `h2` "Itens do carrinho" está `sr-only`. Confirmar que a ordem de títulos (h1 → h2 → h3) faz sentido para quem usa leitor de tela ✔.
- O contraste do creme sobre `dea-good` (#1e7a4c) é de cerca de 5,0:1 (AA) ✔.

---

## 4. Pontos de extensão para o outro membro (Catálogo e Detalhes)

| Onde | Como estender |
|---|---|
| `data/products.json` → `lib/products.ts` | Trocar a fonte (CMS/API/planilha) mantendo as assinaturas `getProducts`/`getProductBySlug`/`getProductsByHighlight`. Se virarem `async`, as páginas já são Server Components e é só usar `await` |
| `types/product.ts` | Campos prontos: `categoryId`, `featured`, `order`, `badge`, `compareAtPrice`, `highlights`, `variants[].available`, `images[].kind` |
| `shop/product/ProductCard.tsx` (TODO) | Card sem estado com `product` como única prop. Pode ganhar variantes (`compact`, `featured`) sem quebrar a Início |
| `app/page.tsx` seção `#catalogo` | Trocar o card único por `<ProductGrid products={getProducts()} />` e, depois, filtros por `categoryId` via `searchParams` |
| `shop/product/ProductDetails.tsx` (TODO) | Galeria, descrição longa, guia de tamanhos. Usar `useCart().addItem({...})`, que já agrupa por produto+variação |
| `Highlights` | Novas abas: adicionar ao tipo `ProductHighlight` e ao array `tabs` |

---

## 5. Cruzamento com as pendências do PR #7 (review do PR #7)

| Pendência | Situação no commit `0762b92` | Ação |
|---|---|---|
| Unificar cores (`--m-*`, `--color-dea-*`, vars do shadcn) | **Aberta.** O mesmo hex aparece em até 3 lugares (ex.: `#00479f` em `--m-blue`, `--primary`, `--color-dea-blue`) | Definir só `--color-dea-*` e fazer `--primary: var(--color-dea-blue)` e `--m-*: var(--color-dea-*)` |
| Hex/px fixos no CSS de efeitos | **Aberta.** `rgba(...)` e `31px`/`38px`/`22px`/`4px` em `--ruled`, `--margin` e `.tape-strip`. Os TSX estão limpos ✔ | Usar `color-mix(in oklab, var(--color-dea-sky) 50%, transparent)` e `rem`/variáveis, ou documentar a exceção no topo do `globals.css` |
| `.dark` | **Aberta.** Bloco `.dark` presente e não tematizado | Remover (o site não tem tema escuro) ou mapear para `dea-night` |
| AGENTS.md / ARCHITECTURE.md (site institucional) | **Aberta.** Esta branch não mexeu na documentação | Acrescentar a seção "Loja" e a árvore desta revisão |
| Button `xs`/`sm` < 44px | **Aberta** no primitivo (`h-6`, `h-7`, `size-6`, `size-7`). **Nenhum uso** na loja hoje; os botões usados têm `min-h-11`/`size-11` ✔ | Subir para `min-h-11` ou remover as variantes |
| Vitest + Playwright | **Aberta.** Sem `test:specs`/`test:e2e` no `package.json`. Já existem candidatas óbvias a teste (whatsapp, formatters, clamp/buildKey) | Ver lista de testes sugeridos no PR |
