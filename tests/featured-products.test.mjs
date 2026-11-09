import assert from "node:assert/strict";
import { test } from "node:test";
import { selectFeaturedProducts } from "../src/lib/featured-products.ts";

function product(id, overrides = {}) {
  return {
    id,
    slug: id,
    name: `Produto ${id}`,
    description: "Produto de teste",
    categoryId: "teste",
    price: 1000,
    images: [{ url: "/teste.svg", alt: `Produto ${id}`, kind: "product" }],
    variants: [],
    featured: false,
    active: true,
    order: 1,
    ...overrides,
  };
}

function variants(availability) {
  return availability.map((available, index) => ({
    id: `variacao-${index}`,
    label: String(index),
    available,
  }));
}

test("a faixa respeita a ordem editorial sem alterar a ordem do catálogo", () => {
  const catalog = [
    product("a", { order: 1, highlights: [] }),
    product("b", { order: 0, featured: true, highlights: ["novidades"] }),
    product("c", { order: 2 }),
  ];
  const original = structuredClone(catalog);
  const ids = [catalog[2].id, catalog[0].id];
  assert.deepEqual(selectFeaturedProducts(catalog, ids), [catalog[2], catalog[0]]);
  assert.deepEqual(catalog, original);
  assert.deepEqual(ids, [catalog[2].id, catalog[0].id]);
});

test("a faixa remove repetições e ignora IDs desconhecidos", () => {
  const first = product("a");
  const second = product("b");
  assert.deepEqual(
    selectFeaturedProducts([first, second], [second.id, "inexistente", first.id, second.id]),
    [second, first],
  );
});

test("a faixa ignora produtos inativos e variações totalmente indisponíveis", () => {
  const unavailable = product("esgotado", { variants: variants([false, false]) });
  const inactive = product("inativo", { active: false });
  const available = product("disponivel");
  const catalog = [unavailable, inactive, available];
  assert.deepEqual(
    selectFeaturedProducts(
      catalog,
      catalog.map((product) => product.id),
    ),
    [available],
  );
});

test("a faixa aceita produto com alguma variação disponível ou sem variações", () => {
  const partial = product("parcial", { variants: variants([false, true]) });
  const noVariants = product("sem-variacoes", { featured: false, highlights: [] });
  assert.deepEqual(selectFeaturedProducts([partial, noVariants], [noVariants.id, partial.id]), [
    noVariants,
    partial,
  ]);
});

test("a faixa fica vazia quando a seleção ou o catálogo não contém produtos elegíveis", () => {
  const catalog = [product("a")];
  assert.deepEqual(selectFeaturedProducts(catalog, []), []);
  assert.deepEqual(selectFeaturedProducts([], ["a"]), []);
  assert.deepEqual(selectFeaturedProducts(catalog, ["inexistente"]), []);
});

test("a faixa não limita a seleção a cinco produtos", () => {
  const catalog = Array.from({ length: 12 }, (_, index) => product(`p${index}`));
  const ids = catalog.map((item) => item.id).reverse();
  assert.deepEqual(
    selectFeaturedProducts(catalog, ids).map((item) => item.id),
    ids,
  );
});

test("atividade e disponibilidade determinam a elegibilidade em todas as combinações", () => {
  for (const active of [false, true]) {
    for (let size = 0; size <= 4; size++) {
      for (let mask = 0; mask < 2 ** size; mask++) {
        const availability = Array.from({ length: size }, (_, index) =>
          Boolean(mask & (2 ** index)),
        );
        const candidate = product("a", { active, variants: variants(availability) });
        const eligible = active && (size === 0 || availability.includes(true));
        assert.deepEqual(
          selectFeaturedProducts([candidate], [candidate.id]),
          eligible ? [candidate] : [],
          JSON.stringify({ active, availability }),
        );
      }
    }
  }
});

test("a seleção aceita entradas congeladas sem alterar dados aninhados", () => {
  function freeze(value) {
    if (value && typeof value === "object") {
      Object.values(value).forEach(freeze);
      Object.freeze(value);
    }
    return value;
  }
  const catalog = freeze([product("a", { variants: variants([false, true]) }), product("b")]);
  const ids = freeze(["b", "a", "b", "inexistente"]);
  const original = structuredClone({ catalog, ids });
  assert.deepEqual(selectFeaturedProducts(catalog, ids), [catalog[1], catalog[0]]);
  assert.deepEqual({ catalog, ids }, original);
});
