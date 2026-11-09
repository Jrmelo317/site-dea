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
- Node.js 24+ instalado (`nvm use`)
- npm ou pnpm

### Instalação e Execução

```bash
# Instalar dependências
npm install

# Variáveis de ambiente (veja abaixo)
cp .env.example .env.local

# Iniciar o servidor de desenvolvimento
npm run dev

# Validar lint
npm run lint

# Gerar build de produção
npm run build
```

Abra [http://localhost:3000](http://localhost:3000) no navegador para visualizar o projeto.

### Variáveis de ambiente

| Variável | Obrigatória | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Recomendada | Número que recebe os pedidos do carrinho, só dígitos (DDI + DDD + número), ex.: `5544999701412`. Sem ela, o carrinho esconde o botão "Confirmar pelo WhatsApp" e mostra um aviso. |

Na Vercel, cadastre em **Settings → Environment Variables** (Production e Preview). Por ser `NEXT_PUBLIC_`, o valor entra no bundle no build: depois de mudar, faça um novo deploy.

### Faixa de produtos em destaque

Edite `editorialProductIds` em [`src/config/home.ts`](src/config/home.ts) com os IDs do catálogo na ordem desejada. Esta é a única fonte de seleção e ordem da faixa. `Product.featured` é um marcador geral legado, atualmente sem consumidor; `highlights` seleciona as abas Novidades/Promoções/Mais pedidos, e `order` ordena o catálogo. Esses campos não precisam coincidir com a curadoria da faixa. Na migração para o backend, preserve a seleção ordenada da home como configuração editorial própria, separada das categorias das abas. Use `[]` para ocultá-la. IDs repetidos, inexistentes, inativos e produtos sem nenhuma variação disponível são ignorados; produtos ativos sem variações continuam elegíveis.

A faixa usa uma prateleira horizontal compacta: miniatura, nome e preço, com todos os itens do mesmo tamanho e sem sobreposição. A rolagem é manual por toque, trackpad ou teclado; a barra de rolagem fica oculta. O card inteiro abre o produto. O link “Ver todos” ficará oculto enquanto a seção de catálogo ainda for apenas um card modelo. Não há rotação automática nem controles de carrossel. Com um produto, ele fica alinhado ao início da fileira.

### Testes da faixa

Use Node.js 24+ (declarado em `engines` e `.nvmrc`). A suíte unitária usa o runner nativo `node:test`, sem um segundo framework; `npm run test:specs` é o alias padronizado para `npm test`. `npm test` valida seleção, ordem e disponibilidade. `npm run test:e2e` valida a home no Chromium do Playwright (`npx playwright install chromium` antes da primeira execução), incluindo prateleira, teclado, celular e continuidade até o link do WhatsApp (sem envio real). O servidor de testes usa a porta 3100 e um número fictício próprio.

A suíte usa a seleção configurada. `npm run test:e2e:states` repete os testes com seleção vazia, única, IDs inválidos/repetidos e dois produtos em ordem invertida. Esse comando injeta `FEATURED_PRODUCT_IDS` (IDs separados por vírgula, vazio para ocultar) no servidor via `webServer.env`, sem alterar arquivos. Essa variável é exclusiva dos testes; não a configure no deploy. Precisa de pelo menos dois produtos elegíveis no catálogo.

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
│   │   ├── shop/             # Componentes específicos da vitrine e carrinho
│   │   └── providers/        # CartProvider.tsx: contexto + hook useCart com localStorage
│   ├── types/                # Contratos e tipos TypeScript (product.ts, cart.ts)
│   ├── data/                 # Catálogo de produtos em JSON (products.json)
│   └── lib/                  # Funções utilitárias (gerador WhatsApp, formatadores)
├── docs/                     # Documentação e guias de arquitetura
└── public/                   # Ativos estáticos e imagens locais
```
