# Diretrizes para Agentes de IA e Desenvolvedores · Site Déa

Este arquivo define as regras de arquitetura, padrões de código e diretrizes de design para o desenvolvimento do site do **Grupo de Jovens Deus é Amor (DEA)**.

> **Importante para IAs (Cursor, Copilot, ChatGPT, Antigravity):**
> Siga rigorosamente os padrões deste documento. Não invente cores hexadecimais arbitrárias nem use medidas fixas entre colchetes (use sempre as tags/classes utilitárias do Tailwind), respeite a arquitetura de pastas sob `src/` e mantenha o código modular e fortemente tipado.

---

## 1. Visão Geral do Projeto (Escopo do MVP)
- **Objetivo:** Vitrine virtual com carrinho de compras para venda de produtos do grupo de jovens (camisetas, terços, moletons, ecobags, bonés, etc.).
- **Modelo de negócio e fechamento:** 
  - Os produtos ficam catalogados em um arquivo local `src/data/products.json`.
  - Cada produto tem **1 ou 2 imagens** (podendo ser locais em `/public` ou URLs externas de CDN/S3).
  - O usuário pode adicionar múltiplos itens ao **carrinho de compras**, com persistência no `localStorage`.
  - Ao clicar em confirmar o pedido, o sistema gera uma mensagem consolidada com todos os itens e valor total, abrindo o **WhatsApp** de quem atende os pedidos do grupo.
  - A combinação do pagamento e entrega acontece presencialmente no encontro de quinta-feira.
- **Stack Tecnológica:**
  - **Framework:** Next.js 16+ (App Router com Turbopack sob pasta `src/`)
  - **Linguagem:** TypeScript 5+ (modo estrito)
  - **Estilização:** Tailwind CSS v4 (com `@theme` em `src/app/globals.css`)
  - **Componentes:** Padrão compatível com shadcn/ui (Radix UI + CVA)

---

## 2. Design Tokens e Estilos Obrigatórios

O design do site mistura duas estéticas centrais: **"Novo Lote"** (editorial marcante em azul e areia) e **"Caderno"** (papel pautado, anotações à mão, polaroids e carimbos).

### A. Paleta de Cores (Tailwind Classes)
**NUNCA use cores hexadecimais soltas nas classes**. Use sempre as variáveis do tema:

| Classe Tailwind | Hexadecimal | Uso Recomendado |
| :--- | :--- | :--- |
| `bg-dea-blue` / `text-dea-blue` | `#00479F` | Azul principal da identidade, botões primários e títulos |
| `bg-dea-sand` / `text-dea-sand` | `#E7E0CA` | Areia quente, botões secundários e contrastes acolhedores |
| `bg-dea-paper` / `text-dea-paper` | `#F6F2E7` | Papel off-white quente (fundo padrão de páginas e caderno) |
| `bg-dea-night` / `text-dea-night` | `#0B2550` | Azul escuro profundo para seções hero e rodapés |
| `bg-dea-heart` / `text-dea-heart` | `#C8372D` | Vermelho coração para tags (*"Novo lote"*), carimbos e notas |
| `bg-dea-sky` / `text-dea-sky` | `#84ADBD` | Azul suave para contrastes sobre fundo escuro e pautas |
| `bg-dea-cream` / `text-dea-cream` | `#FBF8F0` | Creme suave para cartões, selos e polaroids |
| `text-dea-ink` | `#000000` | Preto para texto corrido e leitura |
| `text-dea-muted` / `border-dea-line` | `#5A6476` / `#D9DEE6` | Textos auxiliares e linhas divisórias suaves |

### B. Tipografia
As fontes estão pré-carregadas no Next.js sem layout shift:

- `font-display`: **Fraunces** (use com `font-black font-soft` para títulos principais, preços e logos).
- `font-ui`: **Jost** (use para botões, menus, descrições e interfaces em geral).
- `font-hand`: **Gochi Hand** (use para anotações manuscritas, recados, bilhetinhos e detalhes de caderno).
- `font-read`: **Newsreader** (use com `italic` para citações reflexivas e versículos).

### C. Texturas e Efeitos Especiais
- `.bg-grain`: Textura de granulado para fundos escuros (`bg-dea-blue`, `bg-dea-night`).
- `.bg-grain-dark`: Textura de granulado para fundos claros (`bg-dea-sand`).
- `.bg-caderno-ruled`: Fundo de caderno com linhas pautadas e margem vermelha.
- `.bg-caderno-grid`: Fundo de caderno quadriculado.
- `.stamp-seal`: Carimbo circular em estilo selo com traço vermelho.
- `.polaroid-shadow`: Sombra clássica de fotografia impressa.

### D. Medidas, Dimensões e Espaçamentos (Escala Tailwind Padrão)
**NUNCA use medidas fixas ou valores arbitrários entre colchetes** (ex: `text-[11px]`, `w-[320px]`, `p-[14px]`).
- Use sempre as classes e utilitários nativos da escala do Tailwind CSS:
  - **Tipografia:** `text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, etc.
  - **Espaçamento e padding:** `p-1`, `p-2`, `p-3`, `p-4`, `p-6`, etc.
  - **Dimensões e alturas:** `h-10`, `h-11`, `h-12`, `w-full`, `max-w-md`, etc.

---

## 3. Arquitetura de Pastas e Responsabilidades

O código da aplicação fica centralizado no diretório `src/`:

```text
site-dea/
├── src/
│   ├── app/                  # Rotas e páginas (Next.js App Router)
│   │   ├── layout.tsx        # Shell global e fontes Google
│   │   ├── globals.css       # Configuração do Tailwind v4 (@theme)
│   │   └── page.tsx          # Vitrine principal
│   ├── components/
│   │   ├── ui/               # Primitivas visuais genéricas (Button, Badge, Card, Sheet)
│   │   └── shop/             # Componentes de domínio (ProductCard, ProductGrid, CartDrawer)
│   ├── types/                # Contratos TypeScript (product.ts, cart.ts)
│   ├── data/                 # Catálogo estático em JSON (products.json)
│   ├── hooks/                # Hooks customizados (useCart.ts para gerenciar localStorage)
│   └── lib/                  # Utilitários puros (whatsapp.ts, formatters.ts)
├── docs/                     # Documentação de arquitetura
│   └── design/               # Modelos de referência (design.html, galeria.html)
└── public/                   # Ativos estáticos e imagens locais
```

---

## 4. Regras de Código para Desenvolvedores e IAs

1. **Evite repetição de código (DRY em UI):**
   - Não crie botões repetindo 15 classes do Tailwind. Use ou crie primitivas em `src/components/ui/button.tsx`.
   - Utilize o padrão **shadcn/ui** para componentes interativos como a gaveta do carrinho (`Sheet`).

2. **Gerenciamento do Carrinho (`localStorage`):**
   - Isole o estado do carrinho em um hook reutilizável (ex: `src/hooks/useCart.ts` ou React Context).
   - Previna erros de hidratação (SSR mismatch) lendo o `localStorage` apenas após a montagem do componente no cliente (`useEffect`).

3. **Desacoplamento do WhatsApp (`src/lib/whatsapp.ts`):**
   - A interface do carrinho nunca deve concatenar strings de URL diretamente.
   - Centralize a função geradora de URL (`buildWhatsAppCartUrl(items, total)`) em `src/lib/whatsapp.ts`.

4. **Imagens Flexíveis (1 ou 2 por produto):**
   - Não acople a aplicação a um único provedor de imagens. O campo de imagem deve aceitar `/images/...` ou URLs completas `https://...`.
   - Utilize o componente `<Image />` do `next/image`.

5. **TypeScript Estrito:**
   - Todo dado de produto e item de carrinho deve ter interface explícita (`Product`, `CartItem`).
   - Evite o uso de `any`.

6. **Mobile-First e Acessibilidade:**
   - Todo layout deve ser pensado primeiro para telas de celular.
   - Botões de adicionar ao carrinho e alterar quantidade devem ter área de toque confortável (`min-h-11`).

7. **Proibição de Medidas Fixas Arbitrárias (Use Classes/Tags do Tailwind):**
   - **NUNCA use valores arbitrários ou medidas fixas entre colchetes** (ex: proibir `text-[11px]`, `text-[10px]`, `w-[320px]`, `p-[15px]`, `h-[44px]`).
   - Utilize sempre as **classes e escalas pré-definidas do Tailwind CSS** (ex: `text-xs`, `text-sm`, `w-80`, `p-4`, `min-h-11`, `gap-3`).
   - Essa prática garante coerência visual com o Design System, previsibilidade no layout responsivo e facilidade de manutenção.

---

## 5. Primitivas de UI com shadcn/ui

O projeto usa o **shadcn/ui** para as primitivas que exigem maior configuração de acessibilidade. O código é **gerado dentro do repositório** (`src/components/ui/`) — não é uma lib no `node_modules`, e sim propriedade do projeto.

### A. Critério de inclusão (o que vai para `ui/`)

Use shadcn/ui **somente** quando o componente tiver complexidade de acessibilidade ou interação (focus trap, fechamento por `Esc`, `aria-*`, navegação por teclado, foco restaurado):

- ✅ **shadcn/ui:** `button`, e futuramente `dialog`, `sheet` (gaveta do carrinho), `dropdown-menu`, `select`, `tabs`, `switch`, `checkbox`, `popover`, `tooltip`, `toast`.
- ❌ **Tailwind puro** (em `src/components/shop/`): elementos estáticos ou simples — card de produto, badge/tag, seções, cabeçalhos, tipografia.

Critério rápido: se o componente é só visual, é Tailwind puro; se tem comportamento/teclado/foco, é shadcn.

### B. Fronteiras de importação

- `radix-ui` (e demais dependências de primitivas) **só é importado dentro de `src/components/ui/`**.
- O restante da aplicação importa exclusivamente as primitivas: `import { Button } from "@/components/ui/button"`.
- Nunca recriar um componente interativo já disponível na `ui/` — se precisar de um novo comportamento, adicione a primitiva (item C) e componha em `shop/`.
- Classes condicionais sempre via `cn()` (`@/lib/utils`).

### C. Como adicionar um novo componente

```bash
npx shadcn@latest add <componente>
```

- O `components.json` na raiz é a fonte de verdade dos aliases/paths do CLI — não apague nem altere os aliases.
- O arquivo gerado é **seu**: edite livremente para aderir a este AGENTS.md (tokens da marca, `min-h-11`, sem valores arbitrários, textos em pt-BR).
- Após gerar, revise sempre: o código do shadcn vem em estilos genéricos (medidas fixas, textos em inglês) que violam as regras 6 e 7 acima.

### D. Tokens semânticos do shadcn ↔ identidade DEA

As variáveis semânticas do shadcn (`--primary`, `--background`...) estão mapeadas para as cores da marca em `src/app/globals.css`. Dentro de `src/components/ui/` prefira essas classes em vez das `dea-*`:

| Classe shadcn | Cor DEA |
| :--- | :--- |
| `bg-background` / `text-foreground` | `dea-paper` / `dea-ink` |
| `bg-primary` / `text-primary-foreground` | `dea-blue` / `dea-cream` |
| `bg-secondary` / `text-secondary-foreground` | `dea-sand` / `dea-blue` |
| `bg-card`, `bg-popover` | `dea-cream` |
| `text-muted-foreground` | `dea-muted` |
| `border-border`, `border-input` | `dea-line` |
| `text-destructive` | `dea-heart` |
| `ring-ring` (foco) | `dea-blue` |

Fora de `ui/`, continue usando as classes `dea-*` normalmente. Componentes shadcn instalados hoje: **`button`** (`src/components/ui/button.tsx`).

> **Nota de estilo:** o CLI `init` usou o preset `radix-nova` (`components.json` → `"style": "radix-nova"`), que gera componentes com `radix-ui` unificado, pacote `cn` e ícones `lucide-react`.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:nextjs-agent-feedback -->

## Report Next.js feedback

The project owner enabled `experimental.agentFeedback`, authorizing this feedback pass. When enabled, `next dev` writes this block and restores it if removed. Commit `AGENTS.md` with your work to keep the tree clean.

During the current user request, retain anonymized facts as feedback candidates for meaningful or recurring Next.js issues:

- Crashes, hangs, OOMs, or unexpected slowness
- Incorrect behavior, output, errors, or diagnostics
- Missing, unclear, or conflicting documentation
- Unexpected CLI, codemod, Skill, or upgrade behavior and non-obvious workarounds

Continue the current user request without reporting immediately. Routine debugging is not feedback. Verify changes before retaining them as feedback candidates. Never retain code, logs, paths, URLs, secrets, personal information, or project-specific data.

Retain qualifying friction even if it is later fixed or worked around; record the final outcome during the reporting pass.

Before the final response, run one reporting pass. If candidates remain, from this file's directory run `npx --no-install next internal agent-feedback-instructions` once without piping or truncating its output. Follow its output or error guidance. If a network sandbox blocks it, retry with network access; if it still returns no output, continue normally.

<!-- END:nextjs-agent-feedback -->
