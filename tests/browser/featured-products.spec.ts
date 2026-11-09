import { expect, test } from "@playwright/test";
import { featuredProductIds } from "../../src/config/home";
import { selectFeaturedProducts } from "../../src/lib/featured-products";
import { formatCentsToBRL } from "../../src/lib/formatters";
import { getProducts } from "../../src/lib/products";

const selected = selectFeaturedProducts(getProducts(), featuredProductIds);
const [first] = selected;

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("prateleira plana mantém produtos lado a lado e não gira automaticamente", async ({
  page,
}) => {
  test.skip(selected.length === 0, "Sem produtos selecionados.");
  await page.clock.install();
  const rail = page.getByRole("region", { name: "Produtos em destaque", exact: true });
  await expect(rail.getByRole("listitem")).toHaveCount(selected.length);
  await expect(rail.getByRole("link")).toHaveCount(selected.length);
  await expect(rail.getByRole("button")).toHaveCount(0);
  await expect(rail).toHaveCSS("scrollbar-width", "none");
  for (const product of selected) {
    await expect(rail.getByRole("link", { name: new RegExp(product.name) })).toHaveAttribute(
      "href",
      `/produtos/${product.slug}`,
    );
  }
  const cards = await rail.getByRole("listitem").all();
  const firstBox = await cards[0].boundingBox();
  for (const card of cards.slice(1)) {
    const box = await card.boundingBox();
    expect(box?.y).toBe(firstBox?.y);
    expect(box?.width).toBe(firstBox?.width);
    expect(box?.x ?? 0).toBeGreaterThan(firstBox?.x ?? 0);
  }
  const before = await rail.evaluate((element) => element.scrollLeft);
  await page.clock.fastForward(21000);
  expect(await rail.evaluate((element) => element.scrollLeft)).toBe(before);
});

test("teclado alcança os produtos fora da tela e a rolagem fica dentro da faixa", async ({
  page,
}) => {
  test.skip(selected.length < 2, "A seleção atual não precisa rolar.");
  await page.setViewportSize({ width: 320, height: 800 });
  const rail = page.getByRole("region", { name: "Produtos em destaque", exact: true });
  await rail.focus();
  await expect(rail).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  // Isola a navegação por Tab da animação nativa iniciada pela seta.
  await page.reload();
  await rail.focus();
  const last = rail.getByRole("link").last();
  for (const _product of selected) await page.keyboard.press("Tab");
  await expect(last).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(last).toBeInViewport({ ratio: 0.5 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("deslize por toque percorre a fileira sem abrir um produto", async ({ page }) => {
  test.skip(selected.length < 2, "A seleção atual não precisa rolar.");
  await page.setViewportSize({ width: 375, height: 800 });
  const rail = page.getByRole("region", { name: "Produtos em destaque", exact: true });
  await rail.scrollIntoViewIfNeeded();
  const box = await rail.boundingBox();
  if (!box) throw new Error("Prateleira não visível");
  const touch = await page.context().newCDPSession(page);
  await touch.send("Emulation.setTouchEmulationEnabled", { enabled: true });
  const y = box.y + box.height / 2;
  await touch.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: box.x + 260, y }],
  });
  for (const offset of [220, 180, 140, 100, 60]) {
    await touch.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x: box.x + offset, y }],
    });
  }
  await touch.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect.poll(() => rail.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0);
  await expect(page).toHaveURL("/");
});

test("faixa compacta preserva conteúdo, posição e compra em celular", async ({
  page,
}, testInfo) => {
  test.skip(selected.length === 0, "Sem produto selecionado para navegar.");
  await page.setViewportSize({ width: 320, height: 800 });
  const section = page.getByRole("region", { name: "Da nossa lojinha", exact: true });
  const rail = page.getByRole("region", { name: "Produtos em destaque", exact: true });
  const banner = await page
    .getByRole("region", { name: "Jovens evangelizando jovens" })
    .boundingBox();
  const band = await section.boundingBox();
  const highlights = await page
    .getByRole("region", { name: "Destaques", exact: true })
    .boundingBox();
  expect(banner && band && highlights && banner.y < band.y && band.y < highlights.y).toBeTruthy();
  expect(band?.height ?? Infinity).toBeLessThan((banner?.height ?? 0) / 2);
  await expect(rail.getByRole("listitem").first()).toContainText(formatCentsToBRL(first.price));
  await expect(section.getByRole("link", { name: "Ver todos", exact: true })).toHaveCount(0);
  for (const product of selected) {
    const link = rail.getByRole("link", { name: new RegExp(product.name) });
    await expect(link).toHaveAccessibleName(
      new RegExp(formatCentsToBRL(product.price).replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
    if (product.compareAtPrice) {
      await expect(link.locator("del")).toHaveText(
        `De ${formatCentsToBRL(product.compareAtPrice)}`,
      );
    } else {
      await expect(link.locator("del")).toHaveCount(0);
    }
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await section.screenshot({ path: testInfo.outputPath("prateleira-mobile.png") });
  await rail.getByRole("link", { name: new RegExp(first.name) }).click();
  await expect(page).toHaveURL(new RegExp(`/produtos/${first.slug}$`));
  const variant = first.variants.find((item) => item.available);
  if (variant) await page.getByRole("radio", { name: variant.label, exact: true }).click();
  await page.getByRole("button", { name: "Adicionar ao carrinho", exact: true }).click();
  await page.getByRole("link", { name: "Ver carrinho", exact: true }).click();
  await expect(page).toHaveURL(/\/carrinho$/);
  await page.reload();
  await expect(page.getByText(first.name, { exact: true })).toBeVisible();
  const url = new URL(
    (await page.getByRole("link", { name: /Confirmar/ }).getAttribute("href")) ?? "",
  );
  expect(url.hostname).toBe("api.whatsapp.com");
  expect(url.searchParams.get("text")).toContain(first.name);
});

test("zero produtos oculta a seção e um produto fica estático sem controles", async ({
  page,
}, testInfo) => {
  const section = page.getByRole("region", { name: "Da nossa lojinha", exact: true });
  if (selected.length === 0) {
    await expect(section).toHaveCount(0);
    return;
  }
  await expect(section.getByRole("heading", { name: first.name })).toBeVisible();
  await expect(section.getByRole("button")).toHaveCount(0);
  if (selected.length === 1) {
    await page.clock.install();
    await page.clock.fastForward(21000);
    await expect(section.getByRole("heading", { name: first.name })).toBeVisible();
  }
  await section.screenshot({ path: testInfo.outputPath("prateleira-desktop.png") });
});
