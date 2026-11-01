# Site Deus é Amor (DEA) · Vitrine & Carrinho

Este repositório contém o código-fonte do site do **Grupo de Jovens Deus é Amor**, desenvolvido em **Next.js 16**, **React 19** e **Tailwind CSS v4**.

O projeto funciona como uma vitrine virtual com carrinho de compras integrado, permitindo que os jovens selecionem produtos (camisetas, terços, artigos de oração e acessórios) e confirmem o pedido através de uma mensagem pré-formatada consolidada no WhatsApp.

---

## 🛍️ Modelo do MVP

1. **Catálogo de Produtos:** Dados centralizados em `src/data/products.json`.
2. **Imagens:** Cada produto conta com 1 ou 2 imagens (armazenadas localmente em `public/` ou hospedadas externamente em bucket S3/CDN).
3. **Carrinho de Compras:** Salva os itens selecionados no `localStorage` do navegador para não perder o pedido caso a página recarregue.
4. **Fechamento via WhatsApp:** O botão de confirmação compila a lista de itens e o valor total em uma mensagem pronta enviada para o WhatsApp do grupo, onde é combinada a entrega e o pagamento presencial no encontro de quinta-feira.

---

## 🚀 Começando

### Pré-requisitos
- Node.js 20+ instalado
- npm ou pnpm

### Instalação e Execução

```bash
# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev

# Validar lint
npm run lint

# Gerar build de produção
npm run build
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar o projeto.

---

## 🎨 Design Tokens & Estilos

O site utiliza a identidade visual baseada no conceito **"Novo Lote + Caderno"**, integrando o tema através do Tailwind CSS v4 em [`src/app/globals.css`](src/app/globals.css).

### Cores Principais
- `bg-dea-blue` (`#00479F`): Azul principal da marca
- `bg-dea-sand` (`#E7E0CA`): Areia quente de contraste
- `bg-dea-paper` (`#F6F2E7`): Fundo padrão de papel/caderno
- `bg-dea-night` (`#0B2550`): Azul escuro profundo para seções noturnas
- `bg-dea-heart` (`#C8372D`): Vermelho para carimbos e etiquetas de destaque
- `bg-dea-sky` (`#84ADBD`): Azul suave para pautas e acentos
- `bg-dea-cream` (`#FBF8F0`): Creme para cartões e selos

### Fontes Tipográficas
- `font-display`: **Fraunces** (Títulos, preços e logotipo com `font-black font-soft`)
- `font-ui`: **Jost** (Interface, botões, dados e navegação)
- `font-hand`: **Gochi Hand** (Anotações manuscritas, recados afetivos)
- `font-read`: **Newsreader** (Versículos e citações reflexivas)

---

## 🤖 Guia para Desenvolvimento com IA e Padrões de Código

Todos os desenvolvedores e assistentes de inteligência artificial (Cursor, Copilot, ChatGPT, Antigravity) devem seguir os padrões descritos em:

* 📄 **[`AGENTS.md`](AGENTS.md)**: Regras obrigatórias de tokens, convenção de pastas, carrinho e padrões de código para IAs.
* 📐 **[`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)**: Arquitetura detalhada do MVP, fluxo do carrinho, gestão de imagens e formatação do WhatsApp.
* 🧩 **[`docs/ESTRUTURA-COMPONENTES.md`](docs/ESTRUTURA-COMPONENTES.md)**: Estrutura de componentes da loja (server/client, dependências, pontos de extensão e melhorias).
* 🎨 **[`docs/design/`](docs/design/)**: Modelos e protótipos originais de referência (`design.html` e `galeria.html`).
* ⚙️ **[`.cursorrules`](.cursorrules)**: Regras rápidas para editores baseados em IA.

---

## 📁 Estrutura de Pastas

```text
site-dea/
├── src/
│   ├── app/                  # Rotas e páginas (Next.js App Router)
│   ├── components/
│   │   ├── ui/               # Primitivas visuais genéricas (estilo shadcn/ui)
│   │   └── shop/             # Componentes específicos da vitrine e carrinho
│   ├── types/                # Contratos e tipos TypeScript (product.ts, cart.ts)
│   ├── data/                 # Catálogo de produtos em JSON (products.json)
│   ├── hooks/                # Hooks customizados (useCart.ts com localStorage)
│   └── lib/                  # Funções utilitárias (gerador WhatsApp, formatadores)
├── docs/                     # Documentação e guias de arquitetura
└── public/                   # Ativos estáticos e imagens locais
```
