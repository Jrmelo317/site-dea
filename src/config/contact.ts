/**
 * Número do WhatsApp da loja, lido de `NEXT_PUBLIC_WHATSAPP_NUMBER` (DDI + DDD + número).
 * Qualquer caractere que não seja dígito é descartado. Sem a variável, fica `undefined`
 * e o carrinho esconde o botão de confirmar pelo WhatsApp.
 */
export const WHATSAPP_NUMBER: string | undefined =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || undefined;

if (!WHATSAPP_NUMBER && process.env.NODE_ENV !== "production") {
  console.warn(
    "[contato] NEXT_PUBLIC_WHATSAPP_NUMBER não definido: o botão do WhatsApp fica escondido. Veja .env.example.",
  );
}
