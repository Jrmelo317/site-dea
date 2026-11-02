# Arquitetura e Diretrizes do Projeto · Site Déa

Este documento define a arquitetura técnica, fluxo de dados e decisões estruturais para o desenvolvimento da vitrine virtual do **Grupo de Jovens Deus é Amor (DEA)**.

---

## 1. Visão Geral da Arquitetura (MVP)

O projeto é uma aplicação **Next.js (App Router)** estática e modular estruturada na pasta `src/`, sem backend próprio no MVP:
- **Catálogo de Produtos:** Armazenado em arquivo local `src/data/products.json`.
- **Carrinho de Compras:** Gerenciado no estado do frontend com persistência automática no `localStorage`.
- **Checkout / Fechamento de Pedido:** O carrinho consolidado gera uma mensagem pré-formatada e abre o WhatsApp do responsável pelo grupo para combinar pagamento e entrega no encontro presencial de quinta-feira.

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Interface Visual                              │
│  src/components/ui (primitivas) + src/components/shop (vitrine)        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                    Estado do Carrinho (Frontend)                       │
│       providers/CartProvider       ◄──► localStorage                  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                      Fechamento do Pedido (Adapter)                    │
│   src/lib/whatsapp.ts (formata lista de itens e total)                 │
│                        │                                               │
│                        ▼                                               │
│           Abre WhatsApp (wa.me)                                        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Decisões Estruturais do MVP

### A. Catálogo de Dados (`src/data/products.json`)
Os produtos do MVP ficam salvos em um arquivo JSON versionado no projeto sob `src/data/products.json`. 

**Formato recomendado para cada produto:**
```json
[
  {
    "id": "camiseta-imaculado-coracao",
    "slug": "camiseta-imaculado-coracao",
    "name": "Camiseta Imaculado Coração",
    "description": "Com Deus é Amor bordado na frente.",
    "categoryId": "camisetas",
    "price": 10000,
    "images": [
      { "url": "https://res.cloudinary.com/.../frente.jpg", "alt": "Camiseta azul, frente", "kind": "product" },
      { "url": "https://res.cloudinary.com/.../bordado.jpg", "alt": "Detalhe do bordado", "kind": "detail" }
    ],
    "variants": [
      { "id": "camiseta-imaculado-coracao-p", "label": "P", "available": true },
      { "id": "camiseta-imaculado-coracao-m", "label": "M", "available": true },
      { "id": "camiseta-imaculado-coracao-g", "label": "G", "available": false }
    ],
    "featured": true,
    "active": true,
    "order": 1,
    "badge": "Novo lote"
  }
]
```

### B. Gestão de Imagens (1 a 2 fotos por produto)
- Cada produto terá no máximo **1 ou 2 imagens** no MVP.
- **Agnóstico ao local de hospedagem:** O JSON aceitará tanto caminhos relativos da pasta `public/` (ex: `/images/products/...`) quanto URLs externas (S3, Cloudinary ou CDN).
- Se optarem por S3 ou outro serviço externo, configure o domínio no arquivo `next.config.ts`:
  ```ts
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" } // ou domínio específico
    ]
  }
  ```
- Use sempre o componente `<Image />` do `next/image` para garantir carregamento progressivo e lazy loading no celular.

### C. Carrinho de Compras com `localStorage`
O carrinho é parte central da experiência do MVP:
1. O usuário navega pela vitrine e pode adicionar múltiplos itens (com tamanho/variação quando aplicável).
2. O estado é salvo imediatamente no `localStorage` sob uma chave padrão (ex: `@dea:cart`).
3. Uma gaveta/modal (ex: `CartDrawer.tsx` em `src/components/shop/`) exibe:
   - Lista dos itens adicionados com foto pequena, quantidade e tamanho.
   - Botões para alterar quantidade ou remover item.
   - Valor subtotal calculado.
4. Botão **"Confirmar Pedido via WhatsApp"**:
   - Converte todos os itens do carrinho em uma mensagem única.
   - Abre o link do WhatsApp (`https://wa.me/...`).
   - (Opcional) Limpa o carrinho após a confirmação.

### D. Formatação da Mensagem no WhatsApp (`src/lib/whatsapp.ts`)
A mensagem enviada no WhatsApp deve ser clara, organizada e pronta para conferência:

```text
Olá! Paz e bem! Gostaria de fazer o seguinte pedido na vitrine Deus é Amor:

🛍️ ITENS DO PEDIDO:
• 1x Camiseta Sagrado Coração (Tam: M) — R$ 100,00
• 1x Terço de Madeira Azul — R$ 25,00
• 1x Caderno de Oração — R$ 35,00

💰 TOTAL: R$ 160,00

Como podemos combinar o pagamento e a retirada na quinta-feira?
```

---

## 3. Padrões de Código e Diretrizes de Manutenção

1. **Desacoplamento:**
   - Componentes de UI não montam texto do WhatsApp manualmente. Quem faz isso é uma função pura em `src/lib/whatsapp.ts`.
2. **Resiliência do `localStorage`:**
   - Trate o carregamento do `localStorage` dentro de um `useEffect` para evitar erros de hidratação (*hydration mismatch*) no Next.js (SSR).
3. **Performance Mobile-First:**
   - Como a maioria dos pedidos virá do smartphone via WhatsApp, mantenha o bundle enxuto e garanta que o carrinho abra suavemente em telas menores.
